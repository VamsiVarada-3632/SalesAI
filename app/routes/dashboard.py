from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.get("/summary", response_model=schemas.DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)):
    """
    Returns key metrics computed from real database records plus
    the top-5 highest-scoring leads as today's tasks.
    """

    # --- Metrics ---
    total_emails_sent = (
        db.query(func.count(models.Message.id))
        .filter(models.Message.channel == "email", models.Message.direction == "outbound")
        .scalar() or 0
    )

    opened_emails = (
        db.query(func.count(models.Message.id))
        .filter(models.Message.channel == "email", models.Message.status == "opened")
        .scalar() or 0
    )

    open_rate_pct = (
        round((opened_emails / total_emails_sent) * 100) if total_emails_sent > 0 else 0
    )

    total_replies = (
        db.query(func.count(models.Message.id))
        .filter(models.Message.direction == "inbound")
        .scalar() or 0
    )

    total_meetings = (
        db.query(func.count(models.Meeting.id))
        .scalar() or 0
    )

    metrics = [
        schemas.DashboardMetric(label="Emails Sent", value=str(total_emails_sent), trend=""),
        schemas.DashboardMetric(label="Open Rate", value=f"{open_rate_pct}%", trend=""),
        schemas.DashboardMetric(label="Replies", value=str(total_replies), trend=""),
        schemas.DashboardMetric(label="Meetings Booked", value=str(total_meetings), trend=""),
    ]

    # --- Tasks = top 5 highest-scored leads ---
    top_leads = (
        db.query(models.Lead)
        .order_by(models.Lead.score.desc())
        .limit(5)
        .all()
    )

    tasks = [
        schemas.DashboardTask(
            id=lead.id,
            name=lead.name,
            company=lead.company,
            email=lead.email,
            status=lead.status,
            score=lead.score,
        )
        for lead in top_leads
    ]

    return schemas.DashboardSummary(metrics=metrics, tasks=tasks)
