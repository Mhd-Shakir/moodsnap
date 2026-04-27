def mood_serializer(mood) -> dict:
    return {
        "id": str(mood["_id"]),
        "userId": str(mood["userId"]),
        "mood": mood["mood"],
        "note": mood.get("note", ""),
        "createdAt": mood["createdAt"],
        "username": mood.get("username")
    }

def moods_serializer(moods) -> list:
    return [mood_serializer(mood) for mood in moods]
