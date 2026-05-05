from pydantic import BaseModel
from datetime import datetime
from uuid import UUID




class TaskResponse(BaseModel): 
  id: UUID
  user_id: UUID
  task_name: str
  time_start: datetime
  time_end: datetime

  class Config:
    from_attributes = True

class TaskCreate(BaseModel): 
  task_name: str
  time_start: datetime
  time_end: datetime


