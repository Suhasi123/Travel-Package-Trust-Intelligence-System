from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.company import Company
from app.schemas.company import CompanyCreate

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
