# MoodSnap — Role-Based Mood Tracking System

A complete web application for tracking moods with user and admin roles.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Axios
- **Backend**: Python FastAPI, MongoDB Atlas, Motor (Async driver)
- **Database**: MongoDB Atlas

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas cluster URL

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in `.env`:
   - Set `MONGO_URI` with your MongoDB Atlas connection string.
5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.local`:
   - `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Features
- **Mock Auth**: Simple username and role-based login.
- **Mood Tracking**: Users can record moods with notes.
- **Admin Control**: Admins can view all users' moods and delete entries.
- **Stats**: Aggregated mood counts (personal for users, global for admins).

## Folder Structure
- `backend/`: FastAPI application.
- `frontend/`: Next.js application with Tailwind components.
