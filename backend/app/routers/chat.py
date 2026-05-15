from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.auth import get_current_user
from app.models.user import User
from app.models.task import Task 
from app.database import get_db 
from sqlalchemy.orm import Session
from app.schemas.chats import ChatRequest, ChatResponse
import httpx 
import os 

router = APIRouter()

@router.post('./chat', response_model=ChatResponse)
async def chat(req: ChatRequest, user: User=Depends(get_current_user), db: Session=Depends(get_db)): 
  tasks = db.query(Task).filter(Task.user_id == user.id).all()

  task_summary = "\n".join([
    f"- {t.task_name} | Start: {t.time_start} | End: {t.time_end} | Completed: {t.completed}"
    for t in tasks
  ])

  system_prompt = f"""You are a helpful assistant for a task management app called StreakCat. 
  The user has the following tasks:
  {task_summary}

  Answer questions about their schedule, suggest priorities, and help them stay on track."""  

  async with httpx.AsyncClient() as client: 
    response = await client.post(
      "https://api.openai.com/v1/chat/completions",
          headers={
              "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
              "Content-Type": "application/json"
          },
          json={
              "model": "gpt-4o-mini",
              "messages": [
                  {"role": "system", "content": system_prompt},
                  {"role": "user", "content": req.message}
              ]
          }
      )
    data = response.json()
    reply = data["choices"][0]["message"]["content"]
    return ChatResponse(reply=reply)
  