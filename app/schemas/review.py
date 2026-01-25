from pydantic import BaseModel

class ReviewCreate(BaseModel):
    booking_id: int
    rating: int
    comment: str
