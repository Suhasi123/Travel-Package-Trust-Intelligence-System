from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.booking import Booking
from app.db.models.package import Package
from app.db.models.company import Company

from app.schemas.booking import BookingCreate
from app.core.deps import get_current_user
from app.core.rbac import require_role
from app.core.roles import USER
from app.core.roles import COMPANY

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_role(USER))
):
    pkg = db.query(Package).filter(
        Package.id == data.package_id,
        Package.status == "approved"
    ).first()

    if not pkg:
        raise HTTPException(404, "Package not found or not approved")

    booking = Booking(
        user_id=current_user["user_id"],
        package_id=data.package_id,
        status="pending"
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return {"message": "Booking created (pending)", "booking": booking}

@router.get("/my")
def my_bookings(
    db: Session = Depends(get_db),
    current_user=Depends(require_role(USER))
):
    return db.query(Booking).filter(
        Booking.user_id == current_user["user_id"]
    ).all()

@router.get("/company/pending")
def company_pending_bookings(
    db: Session = Depends(get_db),
    current_user=Depends(require_role(COMPANY))
):
    company = db.query(Company).filter(
        Company.user_id == current_user["user_id"]
    ).first()

    if not company:
        raise HTTPException(404, "Company profile not found")

    bookings = db.query(Booking).join(Package).filter(
        Package.company_id == company.id,
        Booking.status == "pending"
    ).all()

    return bookings

@router.patch("/company/{booking_id}/mark-done")
def mark_booking_done(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("company"))
):
    company = db.query(Company).filter(
        Company.user_id == current_user["user_id"]
    ).first()

    booking = db.query(Booking).join(Package).filter(
        Booking.id == booking_id,
        Package.company_id == company.id
    ).first()

    if not booking:
        raise HTTPException(403, "Not allowed")

    if booking.status != "pending":
        raise HTTPException(400, "Booking not in pending state")

    booking.status = "awaiting_user_confirmation"
    db.commit()

    return {"message": "Booking marked done. Waiting for user confirmation"}

@router.patch("/user/{booking_id}/confirm")
def user_confirm_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role(USER))
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user["user_id"]
    ).first()

    if not booking:
        raise HTTPException(403, "Not your booking")

    if booking.status != "awaiting_user_confirmation":
        raise HTTPException(400, "Booking not ready for confirmation")

    booking.status = "completed"
    db.commit()

    return {"message": "Booking confirmed completed"}
