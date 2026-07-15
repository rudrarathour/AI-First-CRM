from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class HCPBase(BaseModel):
    doctor_name: str
    specialization: str
    hospital: str
    city: str
    phone: str | None = None
    email: EmailStr | None = None


class HCPCreate(HCPBase):
    pass


class HCPUpdate(BaseModel):
    doctor_name: str | None = None
    specialization: str | None = None
    hospital: str | None = None
    city: str | None = None
    phone: str | None = None
    email: EmailStr | None = None


class HCPResponse(HCPBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)