from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.review import Review
from app.db.models.booking import Booking
from app.db.models.package import Package
from app.schemas.review import ReviewCreate
from app.services.trust_score import compute_trust_score
from app.ml.model_loader import model
from app.core.deps import get_current_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("")
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    booking = db.query(Booking).filter(
        Booking.id == review.booking_id,
        Booking.user_id == current_user["user_id"],
        Booking.status == "completed"
    ).first()

    if not booking:
        raise HTTPException(
            status_code=403,
            detail="Review not allowed: no verified booking"
        )

    existing = db.query(Review).filter(
        Review.booking_id == review.booking_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Review already submitted for this booking"
        )

    new_review = Review(
        booking_id=review.booking_id,
        rating=review.rating,
        comment=review.comment
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    package = db.query(Package).filter(
        Package.id == booking.package_id
    ).first()
    print(package)
    company_id = package.company_id
    compute_trust_score(company_id, db, model)

    return {"message": "Review submitted successfully", "review": new_review}
