from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get('/health')
def health():
    return {'status':'ok'}

@router.get('/userid')
def getUserId( user=Depends(get_current_user), db: Session = Depends(get_db)):
    return {"user_id": user["user_id"]}