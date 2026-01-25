from pydantic import BaseModel

class PackageCreate(BaseModel):
    destination: str
    price: float
    duration: int
    inclusions: str
