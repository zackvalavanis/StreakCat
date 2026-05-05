from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_tasks(): 
  auth_response = client.post('/auth/login', json={
    "email": "zack@email.com", 
    "password": "beep"
  })
  token = auth_response.json()["access_token"]

  response = client.get('/tasks/me', 
    headers={"Authorization": f"Bearer {token}"}
  )
  assert response.status_code == 200
  assert isinstance(response.json(), list)




def test_get_task(): 
  auth_response = client.post('/auth/login', json={ 
    "email": "zack@email.com", 
    "password": "beep"
  })
  token = auth_response.json()["access_token"]

  response = client.get('/tasks/me/{id}', headers={
    "Authorization": f"Bearer {token}"
  })
  

def test_create_task(): 
  auth_response = client.post('/auth/login', json={
    "email": "zack@email.com", 
    "password": "beep"
  })
  print(auth_response.status_code)
  print(auth_response.json())
  token = auth_response.json()["access_token"]

  response = client.post('/tasks/me', json={
    "task_name": "Painting", 
    "time_start": "2026-05-04T09:00:00",
    "time_end": "2026-05-04T11:00:00"
  }, 
    headers={"Authorization": f"Bearer {token}"}
  )

  assert response.status_code==200
  data = response.json()
  assert data["task_name"] == "Painting"
