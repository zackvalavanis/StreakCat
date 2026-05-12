from sqlalchemy import Column, String, Integer, Float, DateTime, func, Boolean
from app.database import Base
from sqlalchemy.orm import relationship 
from sqlalchemy.dialects.postgresql import UUID 
import uuid
from sqlalchemy import ForeignKey


class Task(Base): 
  __tablename__ = "tasks"
  id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
  task_name=Column(String, nullable=False)
  time_start=Column(DateTime(timezone=True), server_default=func.now())
  time_end=Column(DateTime(timezone=True))
  date=Column(DateTime(timezone=True))
  user_id=Column(UUID(as_uuid=True), ForeignKey("users.id"))
  completed=Column(Boolean, default=False)

  user = relationship('User', back_populates="tasks")

