from app.schemas.user import LoginRequest, TokenResponse
from app.database import get_db
from sqlalchemy.orm import Session
from app.models.user import User
from typing import List 
from fastapi import APIRouter, Depends, HTTPException 
from uuid import UUID
from app.utils.auth import verify_password, create_access_token

router = APIRouter()

@router.post('/auth/login', response_model=TokenResponse)
def login(auth: LoginRequest, db: Session=Depends(get_db)): 
  