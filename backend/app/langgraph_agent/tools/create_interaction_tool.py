from sqlalchemy.orm import Session

from app.models.interaction import Interaction


def create_interaction(
    db: Session,
    hcp_id: int,
    interaction_type: str,
    discussion: str,
    summary: str,
    sentiment: str,
    follow_up: str,
    samples_requested: int,
):
    """
    Create a new interaction in database.
    """

    interaction = Interaction(
        hcp_id=hcp_id,
        interaction_type=interaction_type,
        discussion=discussion,
        summary=summary,
        sentiment=sentiment,
        follow_up=follow_up,
        samples_requested=samples_requested,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction