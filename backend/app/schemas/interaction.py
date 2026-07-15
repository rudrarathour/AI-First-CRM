from datetime import datetime

from pydantic import BaseModel, ConfigDict


class InteractionBase(BaseModel):
    hcp_id: int
    interaction_type: str
    discussion: str
    summary: str | None = None
    sentiment: str | None = None
    follow_up: str | None = None
    samples_requested: int = 0


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(BaseModel):
    interaction_type: str | None = None
    discussion: str | None = None
    summary: str | None = None
    sentiment: str | None = None
    follow_up: str | None = None
    samples_requested: int | None = None


class InteractionResponse(InteractionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)