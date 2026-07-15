from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.base import Base
from app.db.database import engine

# Import all models
import app.models

# Import Routers
from app.api.hcp import router as hcp_router
from app.api.auth import router as auth_router
from app.api.interaction import router as interaction_router
from app.api.ai import router as ai_router

# =========================
# FastAPI App
# =========================
app = FastAPI(
    title="AI-First CRM API",
    version="1.0.0"
)

# =========================
# Create Database Tables
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# CORS Configuration
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://ai-first-crm-jet.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Register Routers
# =========================
app.include_router(hcp_router)
app.include_router(auth_router)
app.include_router(interaction_router)
app.include_router(ai_router)

# =========================
# Root Route
# =========================
@app.get("/")
def root():
    return {
        "message": "AI-First CRM Backend is Running"
    }