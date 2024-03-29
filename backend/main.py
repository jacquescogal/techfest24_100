from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os 
from dotenv import load_dotenv
load_dotenv()
from src.routers.explain_router import explain_router
from src.routers.chat_router import chat_router

from src.routers.explain_router import explain_router
from src.routers.auth_routers import auth_router
from src.routers.hist_routers import history_router
from src.routers.story_routers import story_router


environment = os.getenv("ENVIRONMENT")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True, # Indicates whether to support credentials
    allow_methods=["*"],    # Allows all methods
    allow_headers=["*"],    # Allows all headers
)

app.include_router(explain_router)
app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(history_router)
app.include_router(story_router)

@app.get(
        path="/",
        tags=["root"])

async def root():
    return {"message": "Hello Techfest24!"}
