from datetime import datetime
import numpy as np

from app.services.trust_features import extract_trust_features
from app.db.models.trust_score import TrustScore


def compute_trust_score(company_id, db, model):
    features = extract_trust_features(company_id, db)

    if not features:
        return None

    X = np.array([[
        features["company_age"],
        features["doc_completion"],
        features["avg_rating"],
        features["rating_variance"],
        features["cancellation_rate"],
        features["price_deviation"],
    ]])

    prob = model.predict_proba(X)[0][1]  # trust probability
    score = float(round(prob * 100, 2))

    existing = db.query(TrustScore).filter(
        TrustScore.company_id == company_id
    ).first()

    if existing:
        existing.score = score
        existing.last_updated = datetime.utcnow()
    else:
        db.add(TrustScore(
            company_id=company_id,
            score=score
        ))

    db.commit()

    return score
