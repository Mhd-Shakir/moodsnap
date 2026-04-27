from fastapi import APIRouter, HTTPException
from database import db
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    role: str

@router.post("/login")
async def login(request: LoginRequest):
    user = await db.users.find_one({"username": request.username})
    
    if not user:
        new_user = {
            "username": request.username,
            "role": request.role
        }
        result = await db.users.insert_one(new_user)
        userId = str(result.inserted_id)
    else:
        userId = str(user["_id"])
        # Update role if it changed (optional, but keeps mock auth consistent)
        await db.users.update_one({"_id": user["_id"]}, {"$set": {"role": request.role}})

    return {
        "userId": userId,
        "username": request.username,
        "role": request.role
    }
