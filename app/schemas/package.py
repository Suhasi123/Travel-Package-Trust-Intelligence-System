from pydantic import BaseModel

class PackageCreate(BaseModel):
    company_id: int
    destination: str
    price: float
    duration: int
    inclusions: str
