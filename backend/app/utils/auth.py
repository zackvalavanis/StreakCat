import bcrypt
from jose import jwt
from datetime import datetime, timedelta 
from app.config import settings

def hashed_password(password: str): 
  return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password()

def create_access_token() 