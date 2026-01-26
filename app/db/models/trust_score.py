from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from datetime import datetime
from app.db.base import Base

class TrustScore(Base):
    __tablename__ = "trust_scores"

    company_id = Column(Integer, ForeignKey("companies.id"), primary_key=True)
    score = Column(Float, nullable=False)
    last_updated = Column(DateTime, default=datetime.utcnow)
