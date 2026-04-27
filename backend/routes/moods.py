from fastapi import APIRouter, HTTPException, Query
from database import db
from models.mood import MoodCreate
from schemas.mood_schema import moods_serializer
from bson import ObjectId
from datetime import datetime
from utils.role_checker import is_admin

router = APIRouter()

@router.post("")
async def create_mood(mood: MoodCreate):
    mood_dict = {
        "userId": ObjectId(mood.userId),
        "mood": mood.mood,
        "note": mood.note,
        "createdAt": datetime.utcnow()
    }
    await db.moods.insert_one(mood_dict)
    return {"message": "Mood recorded"}

@router.get("")
async def get_moods(userId: str = Query(None), role: str = Query(...)):
    if is_admin(role):
        # Admin gets all moods with username join
        pipeline = [
            {"$lookup": {
                "from": "users",
                "localField": "userId",
                "foreignField": "_id",
                "as": "user_info"
            }},
            {"$unwind": "$user_info"},
            {"$project": {
                "_id": 1,
                "userId": 1,
                "mood": 1,
                "note": 1,
                "createdAt": 1,
                "username": "$user_info.username"
            }},
            {"$sort": {"createdAt": -1}}
        ]
        cursor = db.moods.aggregate(pipeline)
        moods = await cursor.to_list(length=100)
    else:
        # User gets their last 10
        cursor = db.moods.find({"userId": ObjectId(userId)}).sort("createdAt", -1).limit(10)
        moods = await cursor.to_list(length=10)
    
    return moods_serializer(moods)

@router.delete("/{id}")
async def delete_mood(id: str, role: str = Query(...)):
    if not is_admin(role):
        raise HTTPException(status_code=403, detail="Forbidden")
    
    result = await db.moods.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mood not found")
    
    return {"message": "Deleted successfully"}
