from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    company = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    industry = Column(String, nullable=True)
    company_size = Column(Integer, nullable=True)
    location = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    score = Column(Integer, default=0)
    status = Column(String, default="New")  # New / Contacted / Replied
    created_at = Column(DateTime(timezone=True), server_default=func.now())
