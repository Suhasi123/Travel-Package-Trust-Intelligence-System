from pydantic import BaseModel
from typing import Optional

class PackageCreate(BaseModel):
    destination: str
    price: float
    duration: int
    inclusions: str

class PackageWithTrust(BaseModel):
    id: int
    destination: str
    price: float
    duration: int
    inclusions: str
    company_id: int
    trust_score: Optional[float]

    class Config:
        orm_mode = True
