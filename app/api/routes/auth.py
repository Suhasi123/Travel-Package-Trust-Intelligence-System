from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.core.roles import COMPANY, USER
from app.db.database import SessionLocal
from app.db.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password, create_access_token
from app.core.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/register')
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email==user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    
    new_user = User(
        email = user.email,
        password_hash = hash_password(user.password),
        role='user'
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {'message': 'User registered successfully'}

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user or not verify_password(form_data.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {"user_id": db_user.id, "role": db_user.role}
    )

    return {"access_token": token, "token_type": "bearer"}

@router.post("/register-company")
def register_company(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_company_user = User(
        email=user.email,
        password_hash=hash_password(user.password),
        role="company"
    )

    db.add(new_company_user)
    db.commit()
    db.refresh(new_company_user)

    return {"message": "Company account registered successfully"}


@router.get('/me')
def my_details(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    existing = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not existing:
        raise HTTPException(status_code=400, detail="User not registered")
    return {
        "id": existing.id,
        "email": existing.email,
        "role": existing.role
    }