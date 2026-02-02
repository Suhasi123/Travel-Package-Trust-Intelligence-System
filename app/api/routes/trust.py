from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.services.trust_features import extract_trust_features
from app.ml.model_loader import model
from app.db.models.trust_score import TrustScore
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

@router.get("/companies/{company_id}/trust-explain")
def trust_explain(company_id: int, db: Session = Depends(get_db)):

    features = extract_trust_features(company_id, db)

    if not features:
        raise HTTPException(404, "Company not found")

    score_obj = db.query(TrustScore).filter(
        TrustScore.company_id == company_id
    ).first()

    trust_score = score_obj.score if score_obj else None

    signals = {}

    # Document completion
    if features["doc_completion"] == 1:
        signals["doc_completion"] = "All required documents verified"
    elif features["doc_completion"] > 0:
        signals["doc_completion"] = "Some documents verified"
    else:
        signals["doc_completion"] = "No verified documents"

    # Rating
    if features["avg_rating"] >= 4:
        signals["avg_rating"] = "High customer ratings"
    elif features["avg_rating"] > 0:
        signals["avg_rating"] = "Mixed customer feedback"
    else:
        signals["avg_rating"] = "No reviews yet"

    # Cancellation
    if features["cancellation_rate"] < 0.2:
        signals["cancellation_rate"] = "Low cancellation history"
    else:
        signals["cancellation_rate"] = "Frequent cancellations detected"

    # Pricing deviation
    if features["price_deviation"] < 0.3:
        signals["price_deviation"] = "Pricing looks normal"
    else:
        signals["price_deviation"] = "Pricing is unusually different from peers"

    return {
        "trust_score": trust_score,
        "signals": signals,
        "raw_features": features
    }
