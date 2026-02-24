from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import leads

# Create all database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SalesAI SDR API",
    description="Backend API for the SalesAI SDR platform — Prospecting & Lead Management",
    version="1.0.0",
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


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "SalesAI SDR API is running 🚀"}
