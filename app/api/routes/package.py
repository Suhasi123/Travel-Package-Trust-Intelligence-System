from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models.package import Package
from app.schemas.package import PackageCreate

router = APIRouter(prefix="/packages", tags=["Packages"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("")
def create_package(pkg: PackageCreate, db: Session = Depends(get_db)):
    new_pkg = Package(
        company_id=pkg.company_id,
        destination=pkg.destination,
        price=pkg.price,
        duration=pkg.duration,
        inclusions=pkg.inclusions,
        status="pending"
    )

    db.add(new_pkg)
    db.commit()
    db.refresh(new_pkg)

    return {"message": "Package created, pending approval", "package": new_pkg}


@router.get("")
def list_packages(db: Session = Depends(get_db)):
    packages = db.query(Package).filter(Package.status == "approved").all()
    return packages
