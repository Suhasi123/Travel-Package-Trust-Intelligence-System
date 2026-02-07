from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.health import router as health_router
from app.api.routes.auth import router as auth_router
from app.api.routes.test_rbac import router as test_router
from app.api.routes.company import router as company_router
from app.api.routes.admin import router as admin_router
from app.api.routes.package import router as package_router
from app.api.routes.review import router as review_router
from app.api.routes.trust import router as trust_router
from app.api.routes.booking import router as booking_router

from app.db.database import engine
from app.db.base import Base
from app.db.models import user, company, company_document, audit_log, package, booking, review, trust_score

from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Travel Package Trust System")

Base.metadata.create_all(bind=engine)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(test_router)
app.include_router(company_router)
app.include_router(admin_router)
app.include_router(package_router)
app.include_router(review_router)
app.include_router(trust_router)
app.include_router(booking_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["https://travel-package-trust-intelligence-s.vercel.app"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
