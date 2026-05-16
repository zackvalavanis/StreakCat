from pydantic import BaseModel, field_validator


class ChatRequest(BaseModel):
    message: str

    @field_validator('message')
    @classmethod
    def validate_message(cls,v): 
      if len(v) > 500: 
        raise ValueError("Message too long (max 500 characters)")
      return v.strip()

class ChatResponse(BaseModel):
    reply: str