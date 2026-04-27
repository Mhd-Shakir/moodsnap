import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://user:password@cluster.mongodb.net/moodsnap")
client = AsyncIOMotorClient(MONGO_URI)
db = client.moodsnap_db
