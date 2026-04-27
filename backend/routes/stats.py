from fastapi import APIRouter, Query
from database import db
from bson import ObjectId
from utils.role_checker import is_admin

router = APIRouter()

@router.get("")
async def get_stats(userId: str = Query(None), role: str = Query(...)):
    match_query = {}
    if not is_admin(role):
        match_query = {"userId": ObjectId(userId)}
    
    pipeline = [
        {"$match": match_query},
        {"$group": {
            "_id": "$mood",
            "count": {"$sum": 1}
        }}
    ]
    
    cursor = db.moods.aggregate(pipeline)
    results = await cursor.to_list(length=10)
    
    stats = {"happy": 0, "sad": 0, "neutral": 0, "angry": 0}
    for res in results:
        mood_type = res["_id"]
        if mood_type in stats:
            stats[mood_type] = res["count"]
            
    return stats
