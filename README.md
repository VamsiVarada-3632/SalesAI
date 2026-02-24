# SalesAI SDR — FastAPI Backend

A clean, production-ready REST API powering the **Prospecting** page for lead discovery and management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI |
| ORM | SQLAlchemy 2.x |
| Database | PostgreSQL |
| Validation | Pydantic v2 |
| Server | Uvicorn |

---

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI app, CORS, startup
│   ├── database.py      # Engine, session, Base
│   ├── models.py        # Lead ORM model
│   ├── schemas.py       # Pydantic schemas
│   └── routes/
│       └── leads.py     # /leads CRUD endpoints
├── .env.example
├── requirements.txt
└── README.md
```

---

## Setup & Running

### 1. Prerequisites
- Python 3.11+
- PostgreSQL running locally (or via Docker)

### 2. Clone / navigate to backend
```bash
cd stitch/backend
```

### 3. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate          # Windows
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Configure environment
```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

`.env` format:
```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/salesai_db
```

### 6. Create the database
```bash
# In psql or your PostgreSQL client:
CREATE DATABASE salesai_db;
```

> Tables are **auto-created** by SQLAlchemy on first startup — no migrations needed.

### 7. Start the server
```bash
uvicorn app.main:app --reload
```

Server runs at: **http://localhost:8000**

Interactive API docs: **http://localhost:8000/docs**

---

## API Reference

### Base URL
```
http://localhost:8000
```

### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/leads` | List leads (search, filter, paginate) |
| `POST` | `/leads` | Create a new lead |
| `PUT` | `/leads/{id}` | Update lead status |
| `DELETE` | `/leads/{id}` | Delete a lead |

---

### GET /leads

Query parameters:

| Param | Type | Description |
|---|---|---|
| `search` | string | Search name, company, or email |
| `industry` | string | Filter by industry |
| `location` | string | Filter by location |
| `page` | int | Page number (default: 1) |
| `limit` | int | Results per page (default: 10, max: 100) |

**Example:**
```
GET /leads?search=john&industry=SaaS&page=1&limit=20
```

---

### POST /leads

```json
{
  "name": "John Smith",
  "company": "Acme Corp",
  "email": "john@acme.com",
  "industry": "SaaS",
  "company_size": 120,
  "location": "San Francisco, CA",
  "job_title": "Sales Director"
}
```

Score is **auto-calculated** before saving:
- `+20` if `industry == "SaaS"`
- `+20` if `company_size > 50`
- `+20` if `job_title` contains `"Manager"` or `"Director"`
- Capped at `100`

---

### PUT /leads/{id}

```json
{ "status": "Contacted" }
```

Valid values: `New`, `Contacted`, `Replied`

---

### DELETE /leads/{id}

Returns `204 No Content` on success.

---

## CORS

The API allows requests from:
- `http://localhost:3000` (Next.js dev server)
- `http://127.0.0.1:3000`

Update `app/main.py` → `allow_origins` for production deployments.
