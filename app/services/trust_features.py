from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from app.db.models.company import Company
from app.db.models.company_document import CompanyDocument
from app.db.models.package import Package
from app.db.models.booking import Booking
from app.db.models.review import Review


REQUIRED_DOCS = ["GST_CERTIFICATE", "LICENSE", "PAN"]


def extract_trust_features(company_id: int, db: Session):
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        return None

    # 1. Company Age (days)
    company_age = (datetime.utcnow() - company.created_at).days

    # 2. Document Completion
    uploaded_docs = db.query(CompanyDocument).filter(
        CompanyDocument.company_id == company_id,
        CompanyDocument.status == "approved"
    ).count()

    doc_completion = uploaded_docs / len(REQUIRED_DOCS)

    # 3. Average Rating
    avg_rating = db.query(func.avg(Review.rating)) \
        .join(Booking, Review.booking_id == Booking.id) \
        .join(Package, Booking.package_id == Package.id) \
        .filter(Package.company_id == company_id) \
        .scalar()

    avg_rating = float(avg_rating) if avg_rating else 0.0

    # 4. Rating Variance (simple)
    ratings = db.query(Review.rating) \
        .join(Booking, Review.booking_id == Booking.id) \
        .join(Package, Booking.package_id == Package.id) \
        .filter(Package.company_id == company_id) \
        .all()

    ratings_list = [r[0] for r in ratings]

    if len(ratings_list) > 1:
        mean = sum(ratings_list) / len(ratings_list)
        variance = sum((x - mean) ** 2 for x in ratings_list) / len(ratings_list)
    else:
        variance = 0.0

    # 5. Cancellation Rate
    total_bookings = db.query(Booking).join(Package).filter(
        Package.company_id == company_id
    ).count()

    cancelled = db.query(Booking).join(Package).filter(
        Package.company_id == company_id,
        Booking.status == "cancelled"
    ).count()

    cancellation_rate = cancelled / total_bookings if total_bookings else 0.0

    # 6. Price Deviation
    company_avg_price = db.query(func.avg(Package.price)).filter(
        Package.company_id == company_id,
        Package.status == "approved"
    ).scalar()

    global_avg_price = db.query(func.avg(Package.price)).filter(
        Package.status == "approved"
    ).scalar()

    price_deviation = 0.0
    if company_avg_price and global_avg_price:
        price_deviation = abs(company_avg_price - global_avg_price) / global_avg_price

    print(
        db.query(Review.rating, Package.company_id)
        .join(Booking, Review.booking_id == Booking.id)
        .join(Package, Booking.package_id == Package.id)
        .all()
    )
    return {
        "company_age": company_age,
        "doc_completion": round(doc_completion, 2),
        "avg_rating": round(avg_rating, 2),
        "rating_variance": round(variance, 2),
        "cancellation_rate": round(cancellation_rate, 2),
        "price_deviation": round(price_deviation, 2),
    }
