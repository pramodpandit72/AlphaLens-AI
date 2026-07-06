# AlphaLens AI — AI Investment Research Agent

> AI-powered investment research in seconds. Enter any company name and get instant analysis with financial metrics, risk assessment, and investment recommendations.

![AlphaLens AI](https://img.shields.io/badge/AlphaLens-AI-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![LangChain](https://img.shields.io/badge/LangChain-JS-1C3C3C?style=flat-square)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google)

---

## Overview

AlphaLens AI is a full-stack web application that uses AI to analyze any publicly traded company and provide investment recommendations. It combines real-time web search, financial data, and AI analysis to deliver professional-grade research reports.

### Key Features

- 🔍 **AI Research** — Searches multiple sources for company information
- 📊 **Financial Analysis** — Real-time financial metrics from Yahoo Finance
- 📰 **Latest News** — Aggregates recent company news with sentiment analysis
- 🛡️ **Risk Detection** — Identifies and categorizes investment risks
- ✅ **Investment Recommendation** — Clear INVEST/PASS verdict with confidence score

---

## Architecture

```
User Input → Frontend (React)
                ↓
           Backend (Express)
                ↓
    ┌───────────┼───────────┐
    ↓           ↓           ↓
 Tavily     Yahoo       Context
 Search     Finance     Builder
    ↓           ↓           ↓
    └───────────┼───────────┘
                ↓
        Prompt Template
                ↓
        Gemini 2.5 Flash
           (LangChain)
                ↓
        Structured JSON
                ↓
        Frontend Report
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Tailwind CSS v4.3, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **AI Framework** | LangChain.js |
| **LLM** | Google Gemini 2.5 Flash |
| **Search** | Tavily Search API |
| **Financial Data** | Yahoo Finance (via yahoo-finance2) |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys for Google AI and Tavily

### 1. Clone the repository

```bash
git clone https://github.com/your-username/alphalens-ai.git
cd alphalens-ai
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up environment variables

**Server** (`server/.env`):
```env
PORT=5000
GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key
```

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start development servers

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | No (default: 5000) |
| `GOOGLE_API_KEY` | Google AI API key for Gemini | Yes |
| `TAVILY_API_KEY` | Tavily Search API key | Yes |
| `VITE_API_URL` | Backend API URL for frontend | Yes |

---

## API Endpoints

### `POST /api/analyze`

Analyzes a company and returns an investment recommendation.

**Request:**
```json
{
  "company": "Apple"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "company": "Apple Inc.",
    "ticker": "AAPL",
    "industry": "Consumer Electronics",
    "basicInfo": { ... },
    "financials": { ... },
    "strengths": [ ... ],
    "weaknesses": [ ... ],
    "risks": [ ... ],
    "latestNews": [ ... ],
    "scorecard": {
      "financialHealth": 9,
      "growth": 7,
      "innovation": 9,
      "competition": 8,
      "risk": 7
    },
    "confidence": 88,
    "decision": "INVEST",
    "reason": "..."
  }
}
```

### `GET /api/health`

Health check endpoint.

---

## Folder Structure

```
alphalens-ai/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── analysis/      # Analysis page components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── CTA.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── layouts/           # Layout wrappers
│   │   ├── pages/             # Page components
│   │   └── services/          # API service layer
│   ├── vercel.json            # Vercel deployment config
│   └── vite.config.js         # Vite + Tailwind config
│
├── server/                    # Express backend
│   ├── controllers/           # Request handlers
│   ├── langchain/             # AI agent pipeline
│   ├── middleware/             # Express middleware
│   ├── prompts/               # LLM prompt templates
│   ├── routes/                # API routes
│   ├── services/              # External API integrations
│   ├── utils/                 # Utility functions
│   ├── index.js               # Server entry point
│   └── render.yaml            # Render deployment config
│
├── .env.example               # Environment variable template
├── .gitignore
└── README.md
```

---

## AI Workflow

The AI pipeline follows a structured agent workflow:

1. **Search Phase** — Tavily API searches for company info, recent news, and financial analysis (3 parallel searches)
2. **Financial Phase** — Yahoo Finance fetches real-time financial metrics (auto-resolves company name to ticker)
3. **Context Building** — All gathered data is structured into a comprehensive context string
4. **Prompt Engineering** — Context is injected into a detailed prompt template with strict JSON schema requirements
5. **LLM Analysis** — Gemini 2.5 Flash analyzes the context and generates a structured research report
6. **Validation** — Response is parsed, validated, and scores are clamped to valid ranges

---

## Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variable `VITE_API_URL` with your Render backend URL

### Backend → Render

1. Create a new Web Service on Render
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add environment variables: `GOOGLE_API_KEY`, `TAVILY_API_KEY`

---

## Trade-offs & Design Decisions

| Decision | Reasoning |
|----------|-----------|
| **Yahoo Finance over Financial Modeling Prep** | Free, no API key required, comprehensive data |
| **Tavily over Serper** | Better structured results, built for AI applications |
| **LangChain.js** | Industry standard for LLM orchestration, good Gemini support |
| **Tailwind CSS v4.3** | Latest CSS-first approach, no config file needed |
| **No database** | Stateless design — each analysis is a fresh API call. Simplifies deployment |
| **Single LLM call** | All analysis in one prompt rather than multiple chain calls — faster, cheaper |

---

## Future Improvements

- [ ] Add comparison feature (compare two companies)
- [ ] Historical analysis caching with Redis/PostgreSQL
- [ ] User authentication and saved reports
- [ ] Portfolio tracking dashboard
- [ ] Real-time stock price charts
- [ ] PDF report export
- [ ] WebSocket for real-time loading updates
- [ ] Multi-language support

---

## License

MIT
