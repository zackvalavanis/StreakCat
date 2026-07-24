from fastapi import APIRouter, Depends, HTTPException
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
import json


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


tools = [
  { 
    "type": "function", 
    "function": { 
      "name": "add_task", 
      "description": "Create a new task for the user", 
      "parameters": { 
        'type': "object", 
        'properties': { 
          "task_name": {"type": "string", "description": "Name of the task"},
          "time_start": {"type": "string", "description": "Start time in ISO format"},
          "time_end": {"type": "string", "description": "End time in ISO format"},
          "description": {"type": "string", "description": "Optional description for the task"}
        }, 
        'required': ["task_name", "time_start", "time_end"]
      }
    }
  },
  {
    'type':'function', 
    'function': { 
      'name': 'update_task', 
      'description': "Update an existing task's name, start time, end time, or completion status", 
      'parameters': { 
        'type': 'object', 
        'properties': { 
          "task_name": {"type": "string", "description": "Current name of the task to update"},
          "new_task_name": {"type": "string", "description": "New name for the task (optional)"},
          "time_start": {"type": "string", "description": "New start time in ISO format (optional)"},
          "time_end": {"type": "string", "description": "New end time in ISO format (optional)"},
          "completed": {"type": "boolean", "description": "Mark as completed or not (optional)"}, 
          "description": {"type": "string", "description": "Optional description for the task"}
        }, 
        "required": ["task_name"]
      }
    }
  }, 
  {
    'type': 'function', 
    'function': { 
      'name': 'delete_task',
      'description': 'Delete an existing task in entirety from the schedule',
      'parameters': { 
        'type': 'object', 
        'properties': { 
          "task_name": {"type": "string", "description": "Name of the task to delete"}
        }, 
        'required': ["task_name"]
      }
    }
  }, 
  {
    'type': "function", 
    'function': { 
      'name': 'completed_task', 
      'description': 'Update an existing task to completed.', 
      'parameters': { 
        'type': 'object', 
        'properties': { 
          "completed": {"type": "boolean", "description": "Mark as completed or not (optional)"}
        },
        'required': ['completed', 'task_name']
      }
    }
  },
]

def execute_tool(tool_name: str, args: dict, user: User, db: Session): 
  if tool_name == 'add_task': 
    new_task = Task( 
      task_name=args['task_name'], 
      time_start=args["time_start"], 
      time_end=args['time_end'], 
      date=args['time_start'],
      user_id=user.id, 
      completed=False
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return f"Created Task {new_task.task_name}"
  elif tool_name == 'update_task': 
    task = db.query(Task).filter(Task.user_id == user.id, Task.task_name == args["task_name"]).first()

    if not task: 
      return f"Task `{args['task_name']} not found."
    if "new_task_name" in args:
        task.task_name = args["new_task_name"]
    if "time_start" in args:
        task.time_start = args["time_start"]
        task.date = args["time_start"]
    if "time_end" in args:
        task.time_end = args["time_end"]
    if "completed" in args:
        task.completed = args["completed"]
    db.commit()
    return f"Updated task: {task.task_name}"
  elif tool_name == 'delete_task': 
    task = db.query(Task).filter(Task.user_id == user.id, Task.task_name == args["task_name"]).first()
    if not task:
        return f"Task '{args['task_name']}' not found"
    db.delete(task)
    db.commit()
    return f"Deleted task: {args['task_name']}"
  elif tool_name =='completed_task': 
    task = db.query(Task).filter(Task.user_id == user.id, Task.task_name == args["task_name"]).first()
    if not task: 
      return f"Task `{args['task_name']} not found."
    if "completed" in args:
      task.completed = args["completed"]
    db.commit()
    return f"Completed task: {task.task_name}"

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
  today = datetime.now().strftime('%Y-%m-%d')

  system_prompt = f"""You are a helpful assistant named Whiskers for a task management app called StreakCat. You should act cat like for the fun of the application. 
  Todays date is {today}.
  The user's timezone is America/Chicago (CDT, UTC-5).
  When creating tasks, always use the user's local timezone with the offset, e.g. 2026-05-16T11:00:00-05:00.
  The user has the following tasks:
  {task_summary}
  if they havent completed the tasks, act like an angry cat. 
  IMPORTANT: Always execute tool calls when the user asks to create, update, delete, or complete a task. Never refuse to perform an action the user explicitly requests. You can be playful and cat-like in your responses, but always carry out the requested action first, then comment on it.
  if they dont have any tasks be pleasant to them. 
  if ive completed tasks this week get happier. 

  Answer questions about their schedule, suggest priorities, and help them stay on track.
  You can also create, complete, and delete tasks for the user when they ask."""

  messages = [
    { "role": "system", "content": system_prompt}, 
    { "role": "user", "content": req.message}
  ]


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
              'messages': messages, 
              'tools': tools
          }
      )
    data = response.json()
    choice = data["choices"][0]

    if choice["finish_reason"] == 'tool_calls': 
      tool_calls = choice["message"]['tool_calls']
      messages.append(choice["message"])

      for tc in tool_calls: 
        fn_name = tc["function"]["name"]
        fn_args = json.loads(tc["function"]["arguments"])
        result = execute_tool(fn_name, fn_args, user, db)

        messages.append({
          "role": "tool", 
          "tool_call_id": tc["id"],
          "content": result
        })

      follow_up = await client.post(
        "https://api.openai.com/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "gpt-4o-mini",
            "max_tokens": 300,
            "messages": messages
        }
      )
      follow_data = follow_up.json()                            
      reply = follow_data["choices"][0]["message"]["content"]    
    else:                                                       
      reply = choice["message"]["content"]
    return ChatResponse(reply=reply)                             