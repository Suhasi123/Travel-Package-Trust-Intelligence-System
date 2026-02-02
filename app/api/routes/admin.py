from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.company import Company
from app.db.models.company_document import CompanyDocument
from app.db.models.audit_log import AuditLog
from app.db.models.package import Package
from app.services.trust_score import compute_trust_score
from app.ml.model_loader import model
from app.core.rbac import require_role
from app.core.roles import ADMIN

router = APIRouter(prefix="/admin", tags=["Admin"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

REQUIRED_DOCS = ["GST_CERTIFICATE", "LICENSE", "PAN"]

@router.patch("/verify-company/{company_id}")
def verify_company(
    company_id: int,
    db: Session = Depends(get_db),
    admin_user=Depends(require_role(ADMIN))
):
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    approved_docs = db.query(CompanyDocument).filter(
        CompanyDocument.company_id == company_id,
        CompanyDocument.status == "approved"
    ).count()

    if approved_docs < len(REQUIRED_DOCS):
        raise HTTPException(400, "Company cannot be verified without required docs")


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

@router.patch("/approve-document/{doc_id}")
def approve_document(
    doc_id: int,
    db: Session = Depends(get_db),
    admin_user=Depends(require_role(ADMIN))
):
    doc = db.query(CompanyDocument).filter(CompanyDocument.id == doc_id).first()

    if not doc:
        raise HTTPException(404, "Document not found")

    doc.status = "approved"

    db.add(AuditLog(
        action=f"Approved document {doc_id}",
        actor_id=admin_user["user_id"]
    ))

    db.commit()

    compute_trust_score(doc.company_id, db, model)

    return {"message": "Document approved"}

@router.get("/companies")
def list_companies(db: Session = Depends(get_db),
                   admin=Depends(require_role(ADMIN))):
    return db.query(Company).all()


@router.get("/pending-packages")
def pending_packages(db: Session = Depends(get_db),
                     admin=Depends(require_role(ADMIN))):
    return db.query(Package).filter(Package.status == "pending").all()

@router.get("/dashboard")
def admin_dashboard(
    db: Session = Depends(get_db),
    admin=Depends(require_role(ADMIN))
):
    companies = db.query(Company).all()

    result = []

    for c in companies:
        docs = db.query(CompanyDocument).filter(
            CompanyDocument.company_id == c.id
        ).all()

        pending_pkgs = db.query(Package).filter(
            Package.company_id == c.id,
            Package.status == "pending"
        ).all()

        result.append({
            "company": c,
            "documents": docs,
            "pending_packages": pending_pkgs
        })

    return result

@router.get("/audit-logs")
def get_audit_logs(
    db: Session = Depends(get_db),
    admin=Depends(require_role(ADMIN))
):
    logs = db.query(AuditLog).order_by(
        AuditLog.timestamp.desc()
    ).limit(50).all()

    return logs
