from app.schemas.user import UserCreate

user = UserCreate(
    email="alice@example.com",
    username="alice",
    password="supersecret",
)

print(user.model_dump())