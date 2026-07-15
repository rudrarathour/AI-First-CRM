# AI-First CRM for Medical Representatives

An AI-powered CRM system that helps Medical Representatives log, manage, and update doctor interactions using both a structured form and a conversational AI assistant.

## Features

### AI Assistant
- Extracts information from natural language conversations
- Auto-fills interaction forms
- Supports editing existing interaction details
- Voice input support
- Powered by Groq LLM + LangGraph

### HCP Management
- Search Healthcare Professionals (HCPs)
- Automatically create new HCPs if not found
- Store doctor and hospital information

### Interaction Management
- Create interactions
- Update interaction details
- Store discussion, summary, sentiment, and follow-up information
- Track sample requests

### Data Extraction
Automatically extracts:
- Doctor Name
- Hospital
- Product
- Date
- Time
- Interaction Type
- Discussion
- Summary
- Sentiment
- Follow Up
- Samples Requested

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- FastAPI
- SQLAlchemy

### Database
- PostgreSQL

### AI
- LangGraph
- Groq (Llama 3.3 70B Versatile)

---

# Project Structure

```text
AI-First-CRM/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── langgraph_agent/
│   │
│   └── requirements.txt
│
└── README.md
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Configure Environment Variables

Create a `.env` file inside backend:

```env
DATABASE_URL=your_postgresql_connection_string
GROQ_API_KEY=your_groq_api_key
```

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Sample AI Interaction

Example:

```text
Today I met Dr. Rajesh Sharma at Apollo Hospital, Bhopal on 25/07/2026 at 3:45 PM.

We discussed Dolo 650.

The doctor requested 10 sample packs.

Follow up next week.
```

The AI automatically extracts:

```json
{
  "doctor_name": "Dr. Rajesh Sharma",
  "hospital": "Apollo Hospital",
  "product": "Dolo 650",
  "date": "25/07/2026",
  "time": "3:45 PM",
  "samples_requested": 10
}
```

---

# Future Enhancements

- Interaction History
- Dashboard Analytics
- Follow-up Reminders
- Search Interactions
- AI Voice Responses
- Role-Based Authentication

---

# Author

Ramrudra Rathour

B.Tech CSE