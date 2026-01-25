from sqlalchemy import Column, Integer, ForeignKey, String, UniqueConstraint
from app.db.base import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)

    rating = Column(Integer, nullable=False)
    comment = Column(String)

    __table_args__ = (
        UniqueConstraint("booking_id", name="one_review_per_booking"),
    )
