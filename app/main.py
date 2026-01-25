from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.api.routes.auth import router as auth_router
from app.api.routes.test_rbac import router as test_router
from app.api.routes.company import router as company_router
from app.api.routes.admin import router as admin_router
from app.api.routes.package import router as package_router

from app.db.database import engine
from app.db.base import Base
from app.db.models import user, company, company_document, audit_log, package

app = FastAPI(title="Travel Package Trust System")

Base.metadata.create_all(bind=engine)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(test_router)
app.include_router(company_router)
app.include_router(admin_router)
app.include_router(package_router)