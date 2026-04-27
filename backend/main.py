from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, moods, stats
from database import client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(moods.router, prefix="/api/moods", tags=["moods"])
app.include_router(stats.router, prefix="/api/stats", tags=["stats"])

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.get("/")
async def root():
    return {"message": "MoodSnap API is running"}
