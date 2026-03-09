from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

router = APIRouter()


# ---------------------------------------------------------------------------
# GET /users/ — list all team members
# ---------------------------------------------------------------------------

@router.get("/", response_model=List[schemas.UserOut])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).order_by(models.User.name).all()


# ---------------------------------------------------------------------------
# GET /users/leaderboard — users sorted by meetings booked (desc)
# ---------------------------------------------------------------------------

@router.get("/leaderboard", response_model=List[schemas.UserOut])
def get_leaderboard(db: Session = Depends(get_db)):
    """
    Returns all users. The leaderboard ranking is based on meeting count,
    which is computed client-side or can be joined here if needed.
    For now returns users ordered by name; frontend can sort by meetings.
    """
    users = db.query(models.User).order_by(models.User.name).all()
    return users


# ---------------------------------------------------------------------------
# POST /users/ — create a new team member
# ---------------------------------------------------------------------------

@router.post("/", response_model=schemas.UserOut, status_code=201)
def create_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="A user with this email already exists.")

    db_user = models.User(**user_in.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# ---------------------------------------------------------------------------
# DELETE /users/{id} — remove a team member
# ---------------------------------------------------------------------------

@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    db.delete(user)
    db.commit()
