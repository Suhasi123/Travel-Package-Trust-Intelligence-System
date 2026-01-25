from sqlalchemy import Column, Integer, String, ForeignKey, Float
from app.db.base import Base

class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"))

    destination = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    duration = Column(Integer, nullable=False)

    inclusions = Column(String)

    status = Column(String, default="pending") 
