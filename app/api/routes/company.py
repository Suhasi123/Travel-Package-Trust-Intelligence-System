from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.company import Company
from app.schemas.company import CompanyCreate
from app.db.models.company_document import CompanyDocument
from app.schemas.document import DocumentCreate
from app.core.rbac import require_role
from app.core.roles import COMPANY

router = APIRouter(prefix="/companies", tags=["Companies"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{company_id}")
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    return {
        "id": company.id,
        "name": company.name,
        "description": company.description,
        "verified_status": company.verified_status,
        "created_at": company.created_at
    }

@router.post("")
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_role(COMPANY))
):
    new_company = Company(
        user_id=current_user["user_id"],
        name=company.name,
        description=company.description,
        verified_status=False
    )
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company

@router.post("/{company_id}/documents")
def upload_document(
    company_id: int,
    doc: DocumentCreate,
    current_user=Depends(require_role(COMPANY)),
    db: Session = Depends(get_db)
):
    company = db.query(Company).filter(Company.id == company_id).first()

    if company.user_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not your company profile")

    new_doc = CompanyDocument(
        company_id=company_id,
        doc_type=doc.doc_type,
        file_url=doc.file_url,
        status="pending"
    )

    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)

    return {"message": "Document uploaded", "document": new_doc}