from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional

from app.database import get_db
from app import models, schemas

router = APIRouter()


# ---------------------------------------------------------------------------
# Scoring Logic
# ---------------------------------------------------------------------------

def calculate_score(lead_data: schemas.LeadCreate) -> int:
    """
    Simple rule-based scoring system.
      +20  industry == "SaaS"
      +20  company_size > 50
      +20  job_title contains "Manager" or "Director"
    Score is capped at 100.
    """
    score = 0

    if lead_data.industry and lead_data.industry.strip().lower() == "saas":
        score += 20

    if lead_data.company_size and lead_data.company_size > 50:
        score += 20

    if lead_data.job_title:
        title_lower = lead_data.job_title.lower()
        if "manager" in title_lower or "director" in title_lower:
            score += 20

    return min(score, 100)


# ---------------------------------------------------------------------------
# GET /leads — list with search, filter, pagination
# ---------------------------------------------------------------------------

@router.get("/", response_model=schemas.PaginatedLeads)
def get_leads(
    search: Optional[str] = Query(None, description="Search by name, company, or email"),
    industry: Optional[str] = Query(None, description="Filter by industry"),
    location: Optional[str] = Query(None, description="Filter by location"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Results per page"),
    db: Session = Depends(get_db),
):
    query = db.query(models.Lead)

    # Full-text search across name, company, email
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            or_(
                models.Lead.name.ilike(search_filter),
                models.Lead.company.ilike(search_filter),
                models.Lead.email.ilike(search_filter),
            )
        )

    # Exact-match filters
    if industry:
        query = query.filter(models.Lead.industry.ilike(f"%{industry}%"))
    if location:
        query = query.filter(models.Lead.location.ilike(f"%{location}%"))

    total = query.count()
    leads = (
        query.order_by(models.Lead.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return schemas.PaginatedLeads(total=total, page=page, limit=limit, results=leads)


# ---------------------------------------------------------------------------
# POST /leads — create a new lead with auto-scoring
# ---------------------------------------------------------------------------

@router.post("/", response_model=schemas.LeadOut, status_code=201)
def create_lead(lead_in: schemas.LeadCreate, db: Session = Depends(get_db)):
    # Check for duplicate email
    existing = db.query(models.Lead).filter(models.Lead.email == lead_in.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="A lead with this email already exists.")

    score = calculate_score(lead_in)

    db_lead = models.Lead(
        **lead_in.model_dump(),
        score=score,
        status="New",
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead


# ---------------------------------------------------------------------------
# PUT /leads/{id} — update lead status
# ---------------------------------------------------------------------------

VALID_STATUSES = {"New", "Contacted", "Replied"}


@router.put("/{lead_id}", response_model=schemas.LeadOut)
def update_lead(lead_id: int, lead_update: schemas.LeadUpdate, db: Session = Depends(get_db)):
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    if lead_update.status not in VALID_STATUSES:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid status. Must be one of: {', '.join(VALID_STATUSES)}",
        )

    lead.status = lead_update.status
    db.commit()
    db.refresh(lead)
    return lead


# ---------------------------------------------------------------------------
# DELETE /leads/{id}
# ---------------------------------------------------------------------------

@router.delete("/{lead_id}", status_code=204)
def delete_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    db.delete(lead)
    db.commit()
