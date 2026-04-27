from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MoodCreate(BaseModel):
    userId: str
    role: str
    mood: str
    note: Optional[str] = ""

class MoodEntry(BaseModel):
    id: str = Field(alias="_id")
    userId: str
    mood: str
    note: str
    createdAt: datetime
    username: Optional[str] = None
