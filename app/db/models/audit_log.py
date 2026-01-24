from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db.base import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)
    action = Column(String, nullable=False)
    actor_id = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
