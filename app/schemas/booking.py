from pydantic import BaseModel

class BookingCreate(BaseModel):
    package_id : int