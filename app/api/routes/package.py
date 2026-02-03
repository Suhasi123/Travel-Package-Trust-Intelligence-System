from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import Query
from sqlalchemy import and_
from sqlalchemy import func

from datetime import datetime
from app.db.models.audit_log import AuditLog
from app.core.rbac import require_role
from app.core.roles import COMPANY
from app.db.models.company import Company
from app.db.database import SessionLocal
from app.db.models.package import Package
from app.schemas.package import PackageCreate
from app.db.models.trust_score import TrustScore
from app.schemas.package import PackageWithTrust
from app.core.deps import get_current_user

router = APIRouter(prefix="/packages", tags=["Packages"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
def create_package(
    pkg: PackageCreate,
    db: Session = Depends(get_db),
    current_company_user=Depends(require_role(COMPANY))
):
    company = db.query(Company).filter(
        Company.user_id == current_company_user["user_id"]
    ).first()

    if not company:
        raise HTTPException(
            status_code=400,
            detail="Company profile not created"
        )

    if not company.verified_status:
        raise HTTPException(
            status_code=403,
            detail="Company must be verified before creating packages"
        )

    new_pkg = Package(
        company_id = company.id,
        destination=pkg.destination,
        price=pkg.price,
        duration=pkg.duration,
        inclusions=pkg.inclusions,
        status="pending"
    )

    db.add(new_pkg)
    db.commit()
    db.refresh(new_pkg)

    return {"message": "Package created, pending approval", "package": new_pkg}

# @router.get("")
# def list_packages(db: Session = Depends(get_db)):
#     packages = db.query(Package).filter(Package.status == "approved").all()
#     return packages

@router.get("/with-trust", response_model=list[PackageWithTrust])
def list_packages_with_trust(
    destination: str = Query(None),
    min_price: float = Query(None),
    max_price: float = Query(None),
    min_duration: int = Query(None),
    max_duration: int = Query(None),
    sort: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(
        Package.id,
        Package.destination,
        Package.price,
        Package.duration,
        Package.inclusions,
        Package.company_id,
        TrustScore.score.label("trust_score")
    ).outerjoin(
        TrustScore,
        TrustScore.company_id == Package.company_id
    ).filter(
        Package.status == "approved",
        Package.is_active == True
    )

    # Filters
    if destination:
        query = query.filter(Package.destination.ilike(f"%{destination}%"))

    if min_price is not None:
        query = query.filter(Package.price >= min_price)

    if max_price is not None:
        query = query.filter(Package.price <= max_price)

    if min_duration is not None:
        query = query.filter(Package.duration >= min_duration)

    if max_duration is not None:
        query = query.filter(Package.duration <= max_duration)

    # Sorting
    if sort == "price_low":
        query = query.order_by(Package.price.asc())
    elif sort == "price_high":
        query = query.order_by(Package.price.desc())
    elif sort == "trust_high":
        query = query.order_by(TrustScore.score.desc().nullslast())

    results = query.all()

    # Convert tuples → dicts
    return [
        {
            "id": r.id,
            "destination": r.destination,
            "price": r.price,
            "duration": r.duration,
            "inclusions": r.inclusions,
            "company_id": r.company_id,
            "trust_score": r.trust_score
        }
        for r in results
    ]

@router.get("/{package_id}")
def get_package(package_id: int, db: Session = Depends(get_db)):
    pkg = db.query(Package).filter(
        Package.id == package_id,
        Package.status == "approved",
        Package.is_active == True
    ).first()

    if not pkg:
        raise HTTPException(status_code=404, detail="Package not found")

    return pkg

@router.delete("/{package_id}")
def soft_delete_package(
    package_id: int,
    db: Session = Depends(get_db),
    current_company_user=Depends(require_role(COMPANY))
):
    # Get company
    company = db.query(Company).filter(
        Company.user_id == current_company_user["user_id"]
    ).first()

    if not company:
        raise HTTPException(400, "Company profile not found")

    # Get package
    pkg = db.query(Package).filter(
        Package.id == package_id,
        Package.company_id == company.id
    ).first()

    if not pkg:
        raise HTTPException(404, "Package not found or not yours")

    # Prevent double delete
    if not pkg.is_active:
        raise HTTPException(400, "Package already removed")

    # ✅ Soft delete
    pkg.is_active = False
    pkg.deleted_at = datetime.utcnow()

    # Log action
    db.add(AuditLog(
        action=f"Company removed package {package_id}",
        actor_id=current_company_user["user_id"]
    ))

    db.commit()

    return {"message": "Package removed successfully"}

@router.delete("/{package_id}")
def delete_package(
    package_id: int,
    db: Session = Depends(get_db),
    current_user= Depends(get_current_user)
):
    package = db.query(Package).filter(Package.id == package_id).first()

    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    # ✅ Only admin OR company owner can delete
    # if current_user.role != "admin" and package.company_id != current_user.company.id:
    #     raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(package)
    db.commit()

    return {"message": "Package deleted successfully"}