from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class LeadBase(BaseModel):
    name: str
    company: str
    email: EmailStr
    industry: Optional[str] = None
    company_size: Optional[int] = None
    location: Optional[str] = None
    job_title: Optional[str] = None


class LeadCreate(LeadBase):
    """Schema for creating a new lead (POST /leads)."""
    pass


class LeadUpdate(BaseModel):
    """Schema for updating a lead's status (PUT /leads/{id})."""
    status: str  # New / Contacted / Replied


class LeadOut(LeadBase):
    """Schema for returning a lead in API responses."""
    id: int
    score: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class PaginatedLeads(BaseModel):
    """Paginated list of leads."""
    total: int
    page: int
    limit: int
    results: list[LeadOut]
