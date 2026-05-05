from app.schemas.users import UserResponse, UserCreate
from app.database import get_db
from sqlalchemy.orm import Session
from app.models.user import User
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID 
from app.utils.auth import hash_password


router = APIRouter()

@router.get('/users', response_model=List[UserResponse])
def get_users(db: Session=Depends(get_db)): 
  users = db.query(User).all()
  return users

@router.post('/users', response_model=UserResponse)
def create_user(user: UserCreate, db: Session=Depends(get_db)): 
  new_user = User (
    email = user.email, 
    first_name = user.first_name, 
    last_name = user.last_name, 
    hashed_password = hash_password(user.password)
  )

  db.add(new_user)
  db.commit()
  db.refresh(new_user)
  return new_user