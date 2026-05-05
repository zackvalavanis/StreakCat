from fastapi.testclient import TestClient 
from app.main import app

client = TestClient(app)

def test_get_users(): 
  response = client.get('/users')
  assert response.status_code==200
  assert isinstance(response.json(), list)

def test_create_user(): 
  response = client.post('/users', json={
    "email": "test@email.com", 
    "first_name" : 'Peter', 
    "last_name": "Dinner", 
    "password": "password"
  })

  assert response.status_code == 200
  data = response.json()
  assert data["email"] == "test@email.com"
  assert data["first_name"] == "Peter"

  
