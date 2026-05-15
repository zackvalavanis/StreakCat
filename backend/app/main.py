from fastapi import FastAPI
from app.database import Base, engine
from app.routers.user import router as user_router
from app.routers.auth import router as auth_router
from app.routers.task import router as task_router
from fastapi.middleware.cors import CORSMiddleware
from app.routers.chat import router as chat_router
from app.config import CORS_ORIGINS


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(task_router)
app.include_router(chat_router)

app.add_middleware(
  CORSMiddleware, 
  allow_origins=CORS_ORIGINS, 
  allow_credentials=True, 
  allow_methods=["*"], 
  allow_headers=["*"]
)