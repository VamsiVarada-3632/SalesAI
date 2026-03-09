from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

router = APIRouter()

VALID_STATUSES = {"Active", "Paused", "Draft"}


# ---------------------------------------------------------------------------
# GET /campaigns/ — list all campaigns
# ---------------------------------------------------------------------------

@router.get("/", response_model=List[schemas.CampaignOut])
def get_campaigns(db: Session = Depends(get_db)):
    return db.query(models.Campaign).order_by(models.Campaign.created_at.desc()).all()


# ---------------------------------------------------------------------------
# POST /campaigns/ — create a campaign
# ---------------------------------------------------------------------------

@router.post("/", response_model=schemas.CampaignOut, status_code=201)
def create_campaign(campaign_in: schemas.CampaignCreate, db: Session = Depends(get_db)):
    db_campaign = models.Campaign(**campaign_in.model_dump())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign


# ---------------------------------------------------------------------------
# PUT /campaigns/{id} — update a campaign
# ---------------------------------------------------------------------------

@router.put("/{campaign_id}", response_model=schemas.CampaignOut)
def update_campaign(campaign_id: int, campaign_update: schemas.CampaignUpdate, db: Session = Depends(get_db)):
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found.")

    if campaign_update.status and campaign_update.status not in VALID_STATUSES:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid status. Must be one of: {', '.join(VALID_STATUSES)}",
        )

    update_data = campaign_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(campaign, key, value)

    db.commit()
    db.refresh(campaign)
    return campaign


# ---------------------------------------------------------------------------
# DELETE /campaigns/{id}
# ---------------------------------------------------------------------------

@router.delete("/{campaign_id}", status_code=204)
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found.")
    db.delete(campaign)
    db.commit()
