from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID

class TaskResponse(BaseModel): 
  id: UUID
  user_id: UUID
  task_name: str
  time_start: datetime
  time_end: datetime
  date: datetime | None = None
  completed: bool = False
  description: str | None = None

  class Config:
    from_attributes = True

class TaskCreate(BaseModel): 
  task_name: str = Field(..., min_length = 1)
  time_start: datetime
  time_end: datetime
  date: datetime | None = None
  completed: bool  = False
  description: str | None = None


