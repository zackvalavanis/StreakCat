from app.schemas.tasks import TaskCreate, TaskResponse
from app.database import get_db
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.task import Task
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID 
from app.utils.auth import hash_password, get_current_user


router = APIRouter()

@router.get('/tasks/me', response_model=List[TaskResponse])
def get_my_tasks(user: User = Depends(get_current_user), db: Session=Depends(get_db)): 
  tasks = db.query(Task).filter(Task.user_id == user.id).all
  return tasks


