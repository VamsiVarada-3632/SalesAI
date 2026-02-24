import uuid
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def gen_uuid():
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# User (Sales Rep)
# ---------------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="sdr")  # sdr, manager, admin
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    messages = relationship("Message", back_populates="user", lazy="select")
    calls = relationship("CallLog", back_populates="user", lazy="select")
    meetings = relationship("Meeting", back_populates="user", lazy="select")


# ---------------------------------------------------------------------------
# Lead
# ---------------------------------------------------------------------------

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

    # Relationships — full communication history
    messages = relationship("Message", back_populates="lead", lazy="select", cascade="all, delete-orphan")
    calls = relationship("CallLog", back_populates="lead", lazy="select", cascade="all, delete-orphan")
    meetings = relationship("Meeting", back_populates="lead", lazy="select", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# Message
# ---------------------------------------------------------------------------

class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)

    channel = Column(String, nullable=False)    # email | linkedin | sms | whatsapp
    direction = Column(String, nullable=False)  # inbound | outbound
    subject = Column(String, nullable=True)
    body = Column(Text, nullable=False)
    status = Column(String, default="sent")     # sent | delivered | opened | failed

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lead = relationship("Lead", back_populates="messages")
    user = relationship("User", back_populates="messages")


# ---------------------------------------------------------------------------
# CallLog
# ---------------------------------------------------------------------------

class CallLog(Base):
    __tablename__ = "call_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)

    duration_seconds = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    disposition = Column(String, nullable=False)  # no answer | left voicemail | connected | meeting booked

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lead = relationship("Lead", back_populates="calls")
    user = relationship("User", back_populates="calls")


# ---------------------------------------------------------------------------
# Meeting
# ---------------------------------------------------------------------------

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)

    title = Column(String, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, default="scheduled")   # scheduled | completed | canceled
    meeting_link = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lead = relationship("Lead", back_populates="meetings")
    user = relationship("User", back_populates="meetings")
