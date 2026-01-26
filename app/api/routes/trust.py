from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.services.trust_features import extract_trust_features

router = APIRouter(prefix="/trust", tags=["Trust"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/companies/{company_id}/features")
def get_features(company_id: int, db: Session = Depends(get_db)):
    features = extract_trust_features(company_id, db)

    if not features:
        raise HTTPException(status_code=404, detail="Company not found")

    return features
