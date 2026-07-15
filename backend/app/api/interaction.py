from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
    InteractionResponse,
)

from app.services.interaction_service import (
    create_interaction,
    get_all_interactions,
    get_interaction_by_id,
    update_interaction,
    delete_interaction,
)

router = APIRouter(
    prefix="/interaction",
    tags=["Interaction"]
)


@router.post("/", response_model=InteractionResponse)
def create_interaction_api(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):
    return create_interaction(db, interaction)


@router.get("/", response_model=List[InteractionResponse])
def get_all_interactions_api(
    db: Session = Depends(get_db)
):
    return get_all_interactions(db)


@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_interaction_api(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    interaction = get_interaction_by_id(
        db,
        interaction_id
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return interaction


@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction_api(
    interaction_id: int,
    interaction_data: InteractionUpdate,
    db: Session = Depends(get_db)
):
    interaction = update_interaction(
        db,
        interaction_id,
        interaction_data
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return interaction


@router.delete("/{interaction_id}")
def delete_interaction_api(
    interaction_id: int,
    db: Session = Depends(get_db)
):
    interaction = delete_interaction(
        db,
        interaction_id
    )

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    return {
        "message": "Interaction deleted successfully"
    }