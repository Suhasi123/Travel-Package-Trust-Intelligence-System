from app.db.database import SessionLocal
from app.db.models.user import User
from app.core.security import hash_password

db = SessionLocal()

admin_email = "admin@system.com"

existing = db.query(User).filter(User.email == admin_email).first()

if not existing:
    admin = User(
        email=admin_email,
        password_hash=hash_password("admin123"),
        role="admin"
    )
    db.add(admin)
    db.commit()
    print("Admin created: admin@system.com / admin123")
else:
    print("Admin already exists")

db.close()
