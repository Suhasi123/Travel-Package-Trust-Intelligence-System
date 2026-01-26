from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.services.trust_features import extract_trust_features
from app.ml.model_loader import model
from app.services.trust_score import compute_trust_score

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


@router.get("/companies/{company_id}/trust-score")
def get_trust_score(company_id: int, db: Session = Depends(get_db)):
    score = compute_trust_score(company_id, db, model)

    if score is None:
        raise HTTPException(404, "Company not found")

    return {"company_id": company_id, "trust_score": score}
