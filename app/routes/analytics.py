from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.get("/summary", response_model=schemas.AnalyticsSummary)
def get_analytics_summary(db: Session = Depends(get_db)):
    """
    Returns high-level KPIs and per-rep meeting counts.
    """

    total_leads = db.query(func.count(models.Lead.id)).scalar() or 0
    total_meetings = db.query(func.count(models.Meeting.id)).scalar() or 0
    total_campaigns = db.query(func.count(models.Campaign.id)).scalar() or 0

    # Per-rep performance: count meetings grouped by user
    rep_rows = (
        db.query(models.User, func.count(models.Meeting.id).label("meeting_count"))
        .outerjoin(models.Meeting, models.Meeting.user_id == models.User.id)
        .group_by(models.User.id)
        .order_by(func.count(models.Meeting.id).desc())
        .all()
    )

    reps = [
        schemas.RepPerformance(
            name=user.name,
            email=user.email,
            meetings=meeting_count,
        )
        for user, meeting_count in rep_rows
    ]

    return schemas.AnalyticsSummary(
        total_leads=total_leads,
        total_meetings=total_meetings,
        total_campaigns=total_campaigns,
        reps=reps,
    )
