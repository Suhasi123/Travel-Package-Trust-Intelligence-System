from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class CompanyDocument(Base):
    __tablename__ = "company_documents"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    doc_type = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    status = Column(String, default="pending")
