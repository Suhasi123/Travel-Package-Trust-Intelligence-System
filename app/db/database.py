# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# from app.core.config import DATABASE_URL

# engine = create_engine(
#     DATABASE_URL,
#     connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
# )

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

# Local fallback
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./local.db"

# Render postgres scheme fix
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)


# ---------- ENGINE CONFIG ----------
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )

else:  # PostgreSQL
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300,
        connect_args={"sslmode": "require"}
    )

# ---------- SESSION ----------
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
