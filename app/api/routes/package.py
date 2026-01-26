from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.rbac import require_role

from app.core.roles import COMPANY
from app.db.models.company import Company
from app.db.database import SessionLocal
from app.db.models.package import Package
from app.schemas.package import PackageCreate

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


@router.get("")
def list_packages(db: Session = Depends(get_db)):
    packages = db.query(Package).filter(Package.status == "approved").all()
    return packages
