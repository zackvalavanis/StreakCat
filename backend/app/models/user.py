from sqlalchemy import Column, String, Integer, Float
from app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID 
import uuid



class User(Base): 
  __tablename__ = "users"
  id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
  first_name: Column(String)
  last_name: Column(String)
  email: Column(String, unique=True, nullable=False, index=True)
  hashed_password: Column(String, nullable=False)
  created_at=Column(DateTime(timezone=True), server_default=func.now())
  updated_at=Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
