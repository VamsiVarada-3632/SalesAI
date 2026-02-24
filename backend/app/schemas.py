from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional, List
from datetime import datetime


# ===========================================================================
# Lead Schemas
# ===========================================================================

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
    results: List[LeadOut]


# ===========================================================================
# User Schemas
# ===========================================================================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    role: Optional[str] = "sdr"


class UserOut(BaseModel):
    id: UUID4
    name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


# ===========================================================================
# Message Schemas
# ===========================================================================

class MessageCreate(BaseModel):
    lead_id: int
    user_id: Optional[UUID4] = None
    channel: str          # email | linkedin | sms | whatsapp
    direction: str        # inbound | outbound
    subject: Optional[str] = None
    body: str
    status: Optional[str] = "sent"  # sent | delivered | opened | failed


class MessageUpdate(BaseModel):
    status: str           # sent | delivered | opened | failed


class MessageOut(BaseModel):
    id: UUID4
    lead_id: int
    user_id: Optional[UUID4] = None
    channel: str
    direction: str
    subject: Optional[str] = None
    body: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ===========================================================================
# CallLog Schemas
# ===========================================================================

class CallLogCreate(BaseModel):
    lead_id: int
    user_id: Optional[UUID4] = None
    duration_seconds: int = 0
    notes: Optional[str] = None
    disposition: str  # no answer | left voicemail | connected | meeting booked


class CallLogUpdate(BaseModel):
    notes: Optional[str] = None
    disposition: Optional[str] = None


class CallLogOut(BaseModel):
    id: UUID4
    lead_id: int
    user_id: Optional[UUID4] = None
    duration_seconds: int
    notes: Optional[str] = None
    disposition: str
    created_at: datetime

    class Config:
        from_attributes = True


# ===========================================================================
# Meeting Schemas
# ===========================================================================

class MeetingCreate(BaseModel):
    lead_id: int
    user_id: Optional[UUID4] = None
    title: str
    start_time: datetime
    end_time: datetime
    status: Optional[str] = "scheduled"  # scheduled | completed | canceled
    meeting_link: Optional[str] = None


class MeetingUpdate(BaseModel):
    title: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    status: Optional[str] = None
    meeting_link: Optional[str] = None


class MeetingOut(BaseModel):
    id: UUID4
    lead_id: int
    user_id: Optional[UUID4] = None
    title: str
    start_time: datetime
    end_time: datetime
    status: str
    meeting_link: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ===========================================================================
# Lead Timeline — unified activity feed
# ===========================================================================

class LeadTimelineOut(LeadOut):
    """
    Full lead profile enriched with their complete communication history.
    Used by the frontend to render a unified activity feed.
    """
    messages: List[MessageOut] = []
    calls: List[CallLogOut] = []
    meetings: List[MeetingOut] = []

    class Config:
        from_attributes = True
