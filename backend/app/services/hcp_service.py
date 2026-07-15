from sqlalchemy.orm import Session

from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate, HCPUpdate


def create_hcp(db: Session, hcp: HCPCreate):
    db_hcp = HCP(**hcp.model_dump())

    db.add(db_hcp)
    db.commit()
    db.refresh(db_hcp)

    return db_hcp


def get_all_hcps(db: Session):
    return db.query(HCP).all()


def get_hcp_by_id(db: Session, hcp_id: int):
    return db.query(HCP).filter(HCP.id == hcp_id).first()


def update_hcp(db: Session, hcp_id: int, hcp: HCPUpdate):
    db_hcp = get_hcp_by_id(db, hcp_id)

    if not db_hcp:
        return None

    update_data = hcp.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_hcp, key, value)

    db.commit()
    db.refresh(db_hcp)

    return db_hcp


def delete_hcp(db: Session, hcp_id: int):
    db_hcp = get_hcp_by_id(db, hcp_id)

    if not db_hcp:
        return None

    db.delete(db_hcp)
    db.commit()

    return db_hcp