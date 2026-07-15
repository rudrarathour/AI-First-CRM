from typing import TypedDict, Optional


class CRMState(TypedDict):
    user_message: str

    intent: Optional[str]

    doctor_name: Optional[str]

    hcp_id: Optional[int]

    interaction_id: Optional[int]

    hospital: Optional[str]

    product: Optional[str]

    # ADD THESE
    date: Optional[str]

    time: Optional[str]

    interaction_type: Optional[str]

    discussion: Optional[str]

    summary: Optional[str]

    sentiment: Optional[str]

    follow_up: Optional[str]

    samples_requested: Optional[int]

    response: Optional[str]