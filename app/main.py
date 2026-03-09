from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import leads, communications, users, campaigns, dashboard, analytics

# Create all database tables on startup (including Campaign)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SalesAI SDR API",
    description="Backend API for the SalesAI SDR platform — Prospecting, Lead Management & Communications",
    version="2.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow Next.js frontend (http://localhost:3000) during development
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Next.js dev server
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(leads.router, prefix="/leads", tags=["Leads"])
app.include_router(communications.router, tags=["Communications & Scheduling"])
app.include_router(users.router, prefix="/users", tags=["Team"])
app.include_router(campaigns.router, prefix="/campaigns", tags=["Campaigns"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "SalesAI SDR API is running 🚀"}
