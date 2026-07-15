from sqlalchemy.orm import Session

from app.models.hcp import HCP


def create_hcp(
    db: Session,
    doctor_name: str,
    hospital: str,
):
    """
    Create a new HCP if it does not exist.
    """

    hcp = HCP(
        doctor_name=doctor_name,
        specialization="General",
        hospital=hospital if hospital else "Unknown Hospital",
        city="Unknown",
        phone=None,
        email=None,
    )

    db.add(hcp)
    db.commit()
    db.refresh(hcp)

    return hcp