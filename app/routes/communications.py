from datetime import datetime, timezone
from typing import List
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app import models, schemas

router = APIRouter()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get_lead_or_404(lead_id: int, db: Session) -> models.Lead:
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail=f"Lead {lead_id} not found.")
    return lead


def _get_user_or_404(user_id: str, db: Session) -> models.User:
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found.")
    return user


# ===========================================================================
# Messages
# ===========================================================================

VALID_CHANNELS = {"email", "linkedin", "sms", "whatsapp"}
VALID_DIRECTIONS = {"inbound", "outbound"}
VALID_MSG_STATUSES = {"sent", "delivered", "opened", "failed"}


@router.post("/messages", response_model=schemas.MessageOut, status_code=201, tags=["Communications & Scheduling"])
def create_message(payload: schemas.MessageCreate, db: Session = Depends(get_db)):
    """Save a new inbound or outbound message against a lead."""
    _get_lead_or_404(payload.lead_id, db)

    if payload.channel not in VALID_CHANNELS:
        raise HTTPException(status_code=422, detail=f"channel must be one of: {', '.join(VALID_CHANNELS)}")
    if payload.direction not in VALID_DIRECTIONS:
        raise HTTPException(status_code=422, detail=f"direction must be one of: {', '.join(VALID_DIRECTIONS)}")
    if payload.status not in VALID_MSG_STATUSES:
        raise HTTPException(status_code=422, detail=f"status must be one of: {', '.join(VALID_MSG_STATUSES)}")

    msg = models.Message(**payload.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


# ===========================================================================
# Lead Timeline
# ===========================================================================

@router.get("/leads/{lead_id}/timeline", response_model=schemas.LeadTimelineOut, tags=["Communications & Scheduling"])
def get_lead_timeline(lead_id: int, db: Session = Depends(get_db)):
    """
    Fetch a single lead with their full communication history:
    messages, calls, and meetings — all eager-loaded and sorted newest-first.
    """
    lead = (
        db.query(models.Lead)
        .options(
            joinedload(models.Lead.messages),
            joinedload(models.Lead.calls),
            joinedload(models.Lead.meetings),
        )
        .filter(models.Lead.id == lead_id)
        .first()
    )
    if not lead:
        raise HTTPException(status_code=404, detail=f"Lead {lead_id} not found.")

    # Sort each activity list newest-first in Python (avoids subquery complexity)
    lead.messages = sorted(lead.messages, key=lambda m: m.created_at, reverse=True)
    lead.calls = sorted(lead.calls, key=lambda c: c.created_at, reverse=True)
    lead.meetings = sorted(lead.meetings, key=lambda m: m.created_at, reverse=True)

    return lead


# ===========================================================================
# Call Logs
# ===========================================================================

VALID_DISPOSITIONS = {"no answer", "left voicemail", "connected", "meeting booked"}


@router.post("/calls", response_model=schemas.CallLogOut, status_code=201, tags=["Communications & Scheduling"])
def log_call(payload: schemas.CallLogCreate, db: Session = Depends(get_db)):
    """Log a completed VoIP call with notes and disposition."""
    _get_lead_or_404(payload.lead_id, db)

    if payload.disposition not in VALID_DISPOSITIONS:
        raise HTTPException(
            status_code=422,
            detail=f"disposition must be one of: {', '.join(VALID_DISPOSITIONS)}"
        )
    if payload.duration_seconds < 0:
        raise HTTPException(status_code=422, detail="duration_seconds cannot be negative.")

    call = models.CallLog(**payload.model_dump())
    db.add(call)
    db.commit()
    db.refresh(call)
    return call


# ===========================================================================
# Meetings
# ===========================================================================

VALID_MEETING_STATUSES = {"scheduled", "completed", "canceled"}


@router.post("/meetings", response_model=schemas.MeetingOut, status_code=201, tags=["Communications & Scheduling"])
def schedule_meeting(payload: schemas.MeetingCreate, db: Session = Depends(get_db)):
    """Schedule a new meeting. Validates end_time is after start_time."""
    _get_lead_or_404(payload.lead_id, db)

    if payload.end_time <= payload.start_time:
        raise HTTPException(
            status_code=422,
            detail="end_time must be strictly after start_time."
        )
    if payload.status not in VALID_MEETING_STATUSES:
        raise HTTPException(
            status_code=422,
            detail=f"status must be one of: {', '.join(VALID_MEETING_STATUSES)}"
        )

    meeting = models.Meeting(**payload.model_dump())
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting


@router.get("/users/{user_id}/schedule", response_model=List[schemas.MeetingOut], tags=["Communications & Scheduling"])
def get_user_schedule(user_id: str, db: Session = Depends(get_db)):
    """
    Fetch all upcoming (status='scheduled') meetings for a specific sales rep,
    ordered by start_time ascending.
    """
    _get_user_or_404(user_id, db)

    now = datetime.now(timezone.utc)
    meetings = (
        db.query(models.Meeting)
        .filter(
            models.Meeting.user_id == user_id,
            models.Meeting.status == "scheduled",
            models.Meeting.start_time >= now,
        )
        .order_by(models.Meeting.start_time.asc())
        .all()
    )
    return meetings
