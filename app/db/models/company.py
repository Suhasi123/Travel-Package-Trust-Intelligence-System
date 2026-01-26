from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy import DateTime

from datetime import datetime
from app.db.base import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String, nullable=False)
    description = Column(String)
    verified_status = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
