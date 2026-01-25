from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.company import Company
from app.db.models.audit_log import AuditLog
from app.db.models.package import Package

from app.core.rbac import require_role
from app.core.roles import ADMIN

router = APIRouter(prefix="/admin", tags=["Admin"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.patch("/verify-company/{company_id}")
def verify_company(
    company_id: int,
    db: Session = Depends(get_db),
    admin_user=Depends(require_role(ADMIN))
):
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    company.verified_status = True

    log = AuditLog(
        action=f"Verified company {company_id}",
        actor_id=admin_user["user_id"]
    )

    db.add(log)
    db.commit()

    return {"message": "Company verified successfully"}

@router.patch("/approve-package/{package_id}")
def approve_package(
    package_id: int,
    db: Session = Depends(get_db),
    admin_user=Depends(require_role(ADMIN))
):
    pkg = db.query(Package).filter(Package.id == package_id).first()

    if not pkg:
        raise HTTPException(status_code=404, detail="Package not found")

    pkg.status = "approved"

    log = AuditLog(
        action=f"Approved package {package_id}",
        actor_id=admin_user["user_id"]
    )

    db.add(log)
    db.commit()

    return {"message": "Package approved successfully"}
