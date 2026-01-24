from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.company import Company
from app.schemas.company import CompanyCreate
from app.db.models.company_document import CompanyDocument
from app.schemas.document import DocumentCreate

router = APIRouter(prefix="/companies", tags=["Companies"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("")
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    new_company = Company(
        name=company.name,
        description=company.description
    )
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company

@router.post("/{company_id}/documents")
def upload_document(
    company_id: int,
    doc: DocumentCreate,
    db: Session = Depends(get_db)
):
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

@router.get('/{company_id}/status')
def verified_status(company_id: int, db: Session = Depends(get_db)):

    company = db.query(Company).filter(Company.id == company_id).first()

    return {'verified_status': company.verified_status}