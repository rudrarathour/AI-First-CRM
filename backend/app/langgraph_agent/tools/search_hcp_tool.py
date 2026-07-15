from sqlalchemy.orm import Session

from app.models.hcp import HCP


def search_hcp(db: Session, doctor_name: str):
    """
    Search HCP by doctor name.
    Returns HCP object if found else None.
    """

    return (
        db.query(HCP)
        .filter(HCP.doctor_name.ilike(f"%{doctor_name}%"))
        .first()
    )