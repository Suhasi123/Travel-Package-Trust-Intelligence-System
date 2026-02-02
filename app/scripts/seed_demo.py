from app.db.database import SessionLocal
from app.db.models.user import User
from app.db.models.company import Company
from app.db.models.package import Package
from app.db.models.trust_score import TrustScore
from app.core.security import hash_password

db = SessionLocal()

print("\n🚀 Seeding Demo Data...\n")

# -----------------------------
# 1. Create Admin User
# -----------------------------
admin_email = "admin@system.com"

admin = db.query(User).filter(User.email == admin_email).first()

if not admin:
    admin = User(
        email=admin_email,
        password_hash=hash_password("admin123"),
        role="admin"
    )
    db.add(admin)
    db.commit()
    print("✅ Admin created: admin@system.com / admin123")
else:
    print("⚠️ Admin already exists")


# -----------------------------
# 2. Create Company User
# -----------------------------
company_email = "company@demo.com"

company_user = db.query(User).filter(User.email == company_email).first()

if not company_user:
    company_user = User(
        email=company_email,
        password_hash=hash_password("company123"),
        role="company"
    )
    db.add(company_user)
    db.commit()
    print("✅ Company user created: company@demo.com / company123")
else:
    print("⚠️ Company user already exists")


# -----------------------------
# 3. Create Normal User
# -----------------------------
user_email = "user@demo.com"

normal_user = db.query(User).filter(User.email == user_email).first()

if not normal_user:
    normal_user = User(
        email=user_email,
        password_hash=hash_password("user123"),
        role="user"
    )
    db.add(normal_user)
    db.commit()
    print("✅ Normal user created: user@demo.com / user123")
else:
    print("⚠️ Normal user already exists")


# -----------------------------
# 4. Create Company Profile
# -----------------------------
company_profile = db.query(Company).filter(
    Company.user_id == company_user.id
).first()

if not company_profile:
    company_profile = Company(
        user_id=company_user.id,
        name="Demo Travels Pvt Ltd",
        description="Verified travel agency for Himachal & Goa trips",
        verified_status=True
    )
    db.add(company_profile)
    db.commit()
    print("✅ Verified company profile created")
else:
    print("⚠️ Company profile already exists")


# -----------------------------
# 5. Insert Trust Score
# -----------------------------
trust = db.query(TrustScore).filter(
    TrustScore.company_id == company_profile.id
).first()

if not trust:
    trust = TrustScore(
        company_id=company_profile.id,
        score=87.5,
    )
    db.add(trust)
    db.commit()
    print("✅ Trust score added")
else:
    print("⚠️ Trust score already exists")


# -----------------------------
# 6. Create Approved Packages
# -----------------------------
existing_packages = db.query(Package).filter(
    Package.company_id == company_profile.id
).count()

if existing_packages == 0:
    pkg1 = Package(
        company_id=company_profile.id,
        destination="Manali Adventure Trip",
        price=12000,
        duration=5,
        inclusions="Hotel + Meals + Sightseeing",
        status="approved"
    )

    pkg2 = Package(
        company_id=company_profile.id,
        destination="Goa Beach Holiday",
        price=18000,
        duration=6,
        inclusions="Resort + Breakfast + Airport Pickup",
        status="approved"
    )

    db.add_all([pkg1, pkg2])
    db.commit()

    print("✅ Approved demo packages created")
else:
    print("⚠️ Packages already exist")


db.close()

print("\n🎉 Demo Seed Completed Successfully!\n")
