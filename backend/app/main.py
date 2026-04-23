from fastapi import FastAPI
from app.database import Base, engine


app = fastAPI()

Base.metadata.create_all(bind=engine)
