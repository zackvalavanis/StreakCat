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
  tasks = db.query(Task).filter(Task.user_id == user.id).all()
  return tasks

@router.get('/tasks/me/{id}', response_model=TaskResponse)
def get_task(id: UUID, user: User = Depends(get_current_user), db: Session = Depends(get_db)): 
  task = db.query(Task).filter(Task.user_id == user.id and Task.id == id).first()
  if not task: 
   raise HTTPException(status_code=404, details="Task not found")
  return task

@router.post('/tasks/me', response_model=TaskResponse)
def create_task(task: TaskCreate, user: User=Depends(get_current_user), db: Session=Depends(get_db)): 
  new_task = Task(
    task_name=task.task_name, 
    time_start=task.time_start, 
    time_end=task.time_end,
    date=task.date,
    user_id = user.id
  )
  db.add(new_task)
  db.commit()
  db.refresh(new_task)
  return new_task

@router.delete('/tasks/me/{id}')
def delete_task(id: str, user: User=Depends(get_current_user), db: Session=Depends(get_db)): 
  task_d = db.query(Task).filter(Task.user_id == user.id and Task.id == id).first()
  if not task_d: 
    return {"error", "Task not deleted"}

  db.delete(task_d)
  db.commit()
  return {"Message": "Task deleted successfully"}