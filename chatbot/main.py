from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful student assistant. "
                        "You can answer ANY question: career, life, studies, coding, motivation."
                    )
                },
                {
                    "role": "user",
                    "content": req.message
                }
            ],
            temperature=0.7
        )

        return {
            "reply": completion.choices[0].message.content
        }

    except Exception as e:
        return {
            "reply": "⚠️ AI is temporarily unavailable. Please try again."
        }
