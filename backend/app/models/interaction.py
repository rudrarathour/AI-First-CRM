from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_id = Column(Integer, ForeignKey("hcps.id"), nullable=False)

    interaction_type = Column(String(50), nullable=False)

    discussion = Column(Text, nullable=False)

    summary = Column(Text, nullable=True)

    sentiment = Column(String(50), nullable=True)

    follow_up = Column(Text, nullable=True)

    samples_requested = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    hcp = relationship("HCP")