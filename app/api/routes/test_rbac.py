from fastapi import APIRouter, Depends
from app.core.rbac import require_role
from app.core.roles import ADMIN, COMPANY, USER

router = APIRouter(prefix="/test", tags=["RBAC Test"])


@router.get("/user")
def user_route(current=Depends(require_role(USER))):
    return {"message": "User access granted"}


@router.get("/company")
def company_route(current=Depends(require_role(COMPANY))):
    return {"message": "Company access granted"}


@router.get("/admin")
def admin_route(current=Depends(require_role(ADMIN))):
    return {"message": "Admin access granted"}
