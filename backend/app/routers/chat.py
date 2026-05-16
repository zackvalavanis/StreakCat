from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.utils.auth import get_current_user
from app.models.user import User
from app.models.task import Task 
from app.database import get_db 
from sqlalchemy.orm import Session
from app.schemas.chats import ChatRequest, ChatResponse
from datetime import datetime, timedelta
import httpx 
import os 
from app.config import settings
from typing import List


router = APIRouter()

user_chat_limits: dict[str, List[datetime]] = {}
MAX_MESSAGES_PER_HOUR = 20

def check_rate_limit(user_id: str): 
  now = datetime.now()
  if user_id not in user_chat_limits: 
    user_chat_limits[user_id] = []
  user_chat_limits[user_id] = [
    t for t in user_chat_limits[user_id] if now - t < timedelta(hours=1)
  ]
  if len(user_chat_limits[user_id]) >= MAX_MESSAGES_PER_HOUR:
    raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")
  user_chat_limits[user_id].append(now)



@router.post('/chat', response_model=ChatResponse)
async def chat(req: ChatRequest, user: User=Depends(get_current_user), db: Session=Depends(get_db)): 
  check_rate_limit(str(user.id))
  tasks = db.query(Task).filter(Task.user_id == user.id).all()
  print(f"Found {len(tasks)} tasks for user {user.id}")

  task_summary = "\n".join([
    f"- {t.task_name} | Start: {t.time_start} | End: {t.time_end} | Completed: {t.completed}"
    for t in tasks
  ])
  print(f"Task summary: {task_summary}")

  system_prompt = f"""You are a helpful assistant named Whiskers for a task management app called StreakCat. You should act cat like for the fun of the application. 
  The user has the following tasks:
  {task_summary}

  Answer questions about their schedule, suggest priorities, and help them stay on track."""  

  async with httpx.AsyncClient() as client: 
    response = await client.post(
      "https://api.openai.com/v1/chat/completions",
          headers={
              "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
              "Content-Type": "application/json"
          },
          json={
              "model": "gpt-4o-mini",
              'max_tokens': 300, 
              "messages": [
                  {"role": "system", "content": system_prompt},
                  {"role": "user", "content": req.message}
              ]
          }
      )
    data = response.json()
    reply = data["choices"][0]["message"]["content"]
    return ChatResponse(reply=reply)
  