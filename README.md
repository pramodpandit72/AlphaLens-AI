## Deployed Link: https://alpha-lens-ai-zeta.vercel.app/

# AlphaLens AI — AI Investment Research Agent

> AI-powered investment research in seconds. Enter any company name and get instant analysis with financial metrics, risk assessment, news sentiment, and a clear investment verdict.

![AlphaLens AI](https://img.shields.io/badge/AlphaLens-AI-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![LangChain](https://img.shields.io/badge/LangChain-JS-1C3C3C?style=flat-square)
![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-F55036?style=flat-square)

---

## Overview

**AlphaLens AI** is a full-stack AI agent web application that analyzes any publicly traded company and delivers a professional-grade investment research report — in seconds.

The user types a company name (e.g., "Apple", "Tesla", "Nvidia"). The system automatically:
1. Searches the web for company info, news, and financial context using **Tavily**
2. Fetches live financial metrics from **Yahoo Finance**
3. Combines all data into a structured context
4. Sends it to **Llama 3.3 70B** (via Groq + LangChain.js) for deep AI analysis
5. Returns a clean **INVEST ✅ or PASS ❌** verdict with a confidence score and full report

The goal was to build something that feels like a professional AI SaaS product — inspired by tools like Perplexity, Linear, and Vercel — not a generic student project.

---

## Key Features

| Feature | Description |
|---------|-------------|
| 🔍 **AI Research Agent** | Runs 3 parallel Tavily searches: company overview, recent news, and financial news |
| 📊 **Live Financial Data** | Revenue, Market Cap, P/E ratio, EPS, profit margins from Yahoo Finance |
| 📰 **News Sentiment** | Latest headlines with positive/negative/neutral sentiment tagging |
| 🛡️ **Risk Profiling** | Identifies and categorizes business, regulatory, competition & market risks |
| 📈 **Score Cards** | Scores (1-10) for Financial Health, Growth, Innovation, Competition, and Risk |
| ✅ **Invest/Pass Verdict** | Clear recommendation with confidence % and detailed AI reasoning |
| 🔄 **Auto-Retry Logic** | Automatically retries on rate-limit (429) or JSON parsing errors (up to 3 attempts) |
| 📱 **Fully Responsive** | Clean, modern UI that works on mobile, tablet, and desktop |

---

## How to Run It

### Prerequisites

- Node.js 18 or higher
- npm
- A Groq API key ([get one free here](https://console.groq.com))
- A Tavily API key ([get one here](https://tavily.com/))

### Step 1 — Clone the repo

```bash
git clone https://github.com/pramodpandit72/AlphaLens-AI.git
cd AlphaLens-AI
```

### Step 2 — Install dependencies

```bash
# Backend
cd server
npm install

# Frontend (in a new terminal)
cd client
npm install
```

### Step 3 — Set up environment variables

Create `server/.env`:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### Step 4 — Run the app

```bash
# Terminal 1 — Backend
cd server
npm start

# Terminal 2 — Frontend
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Environment Variables

| Variable | Where | Description | Required |
|----------|-------|-------------|----------|
| `PORT` | server/.env | Backend server port | No (default: 5000) |
| `GROQ_API_KEY` | server/.env | Groq API key (free at console.groq.com) | ✅ Yes |
| `TAVILY_API_KEY` | server/.env | Tavily Search API key | ✅ Yes |
| `CLIENT_URL` | server/.env | Frontend URL for CORS | No (default: *) |
| `VITE_API_URL` | client/.env | Backend URL for the frontend | ✅ Yes |

---

## How It Works — Architecture

```
User types company name
        ↓
  React Frontend (Vite)
        ↓ POST /api/analyze
  Express.js Backend
        ↓
  ┌──────────────────────────────┐
  │     AI Agent Pipeline        │
  │                              │
  │  Step 1: Tavily Search       │
  │  (3 parallel searches)       │
  │    - Company overview        │
  │    - Recent news             │
  │    - Financial news          │
  │                              │
  │  Step 2: Yahoo Finance       │
  │  (live financial metrics)    │
  │                              │
  │  Step 3: Context Builder     │
  │  (structures all raw data)   │
  │                              │
  │  Step 4: Prompt Template     │
  │  (injects context into LLM   │
  │   prompt schema)             │
  │                              │
  │  Step 5: Llama 3.3 70B       │
  │  (via Groq + LangChain.js)   │
  │  → Returns structured JSON   │
  └──────────────────────────────┘
        ↓
  Validated & Parsed JSON
        ↓
  React Analysis Dashboard
```

### Key Modules

| File | Role |
|------|------|
| `server/services/searchService.js` | Calls Tavily with 3 parallel search queries |
| `server/services/financialService.js` | Fetches live data from Yahoo Finance |
| `server/utils/contextBuilder.js` | Converts raw API data into clean text context for the LLM |
| `server/prompts/analysisPrompt.js` | The master LLM prompt template with strict JSON schema |
| `server/langchain/agent.js` | Runs the full Groq/Llama AI pipeline with retry logic |
| `server/controllers/analyzeController.js` | Orchestrates the pipeline, deduplicates concurrent requests |

---

## Folder Structure

```
alphalens-ai/
├── client/                        # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── analysis/          # All analysis page components
│   │   │   │   ├── CompanyCard.jsx
│   │   │   │   ├── DecisionCard.jsx
│   │   │   │   ├── FinancialCards.jsx
│   │   │   │   ├── LoadingState.jsx
│   │   │   │   ├── NewsList.jsx
│   │   │   │   ├── ReasoningSection.jsx
│   │   │   │   ├── RiskAnalysis.jsx
│   │   │   │   ├── ScoreCards.jsx
│   │   │   │   └── StrengthsWeaknesses.jsx
│   │   │   ├── Hero.jsx           # Landing page hero + search box
│   │   │   ├── Features.jsx       # Feature cards
│   │   │   ├── HowItWorks.jsx     # 3-step process section
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── CTA.jsx
│   │   ├── hooks/
│   │   │   └── useAnalysis.js     # Analysis state management hook
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── AnalysisPage.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   └── App.jsx
│   ├── vercel.json
│   └── vite.config.js
│
├── server/                        # Node.js + Express backend
│   ├── controllers/
│   │   └── analyzeController.js   # Main controller with in-flight dedup
│   ├── langchain/
│   │   └── agent.js               # Gemini LLM + retry logic
│   ├── middleware/
│   │   └── errorHandler.js        # Global error handling
│   ├── prompts/
│   │   └── analysisPrompt.js      # Master LLM prompt template
│   ├── routes/
│   │   └── analyzeRoutes.js
│   ├── services/
│   │   ├── searchService.js       # Tavily search (3 parallel queries)
│   │   └── financialService.js    # Yahoo Finance data
│   ├── utils/
│   │   └── contextBuilder.js      # Data → LLM-ready text converter
│   ├── index.js                   # Server entry point
│   └── render.yaml                # Render deployment config
│
├── LLM_CHAT_TRANSCRIPT.md         # 🤖 Full AI chat session log (bonus)
├── README.md
└── .gitignore
```

---

## API Reference

### `POST /api/analyze`

Runs the full AI analysis pipeline for a given company.

**Request Body:**
```json
{
  "company": "Apple"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "analysis": {
    "company": "Apple Inc.",
    "ticker": "AAPL",
    "industry": "Consumer Electronics",
    "basicInfo": {
      "ceo": "Tim Cook",
      "headquarters": "Cupertino, CA, USA",
      "founded": "1976",
      "employees": "150,000+",
      "website": "apple.com"
    },
    "financials": {
      "revenue": "$391.0B",
      "netProfit": "$93.7B",
      "marketCap": "$3.1T",
      "peRatio": "31.4",
      "eps": "$6.13",
      "revenueGrowth": "+2.0%",
      "profitMargin": "24.0%"
    },
    "strengths": ["..."],
    "weaknesses": ["..."],
    "risks": [{ "category": "...", "description": "...", "severity": "medium" }],
    "latestNews": [{ "title": "...", "summary": "...", "sentiment": "positive" }],
    "scorecard": {
      "financialHealth": 9,
      "growth": 7,
      "innovation": 9,
      "competition": 8,
      "risk": 7
    },
    "confidence": 88,
    "decision": "INVEST",
    "reason": "Apple's dominant ecosystem, strong cash generation, and expanding services segment make it a compelling long-term investment despite near-term iPhone saturation concerns."
  }
}
```

### `GET /api/health`
Health check. Returns `{ "status": "ok" }`.

---

## Key Decisions & Trade-offs

| Decision | What I chose | Why | What I left out |
|----------|-------------|-----|-----------------|
| **LLM** | Llama 3.3 70B via Groq | Free tier, extremely fast inference, no org restrictions on API keys | GPT-4o (paid), Gemini (org account auth issues) |
| **Search API** | Tavily | Built for AI agents, returns clean structured results | Serper (raw HTML, harder to parse) |
| **Financial Data** | Yahoo Finance (yahoo-finance2) | Free, no API key required, comprehensive coverage | Financial Modeling Prep (requires paid key for full data) |
| **LLM Framework** | LangChain.js | Industry standard, great prompt templating, Gemini support | Direct API calls (less maintainable) |
| **Single LLM call** | One large prompt | Faster, fewer API calls, lower rate-limit risk | Multi-agent chains (slower, more complex) |
| **No database** | Stateless per-request | Simpler deployment, no infra cost | Redis caching (would fix rate limits in production) |
| **In-flight dedup** | Map of active promises | Prevents React StrictMode double-calling the API | Full request queue (overkill for this scale) |
| **Auto retry logic** | 3 attempts with smart wait | Handles 429 rate limits and AI JSON errors gracefully | Full exponential backoff (unnecessary at this scale) |

---

## Example Runs

### Apple (AAPL) — INVEST ✅ (85% confidence)

> Apple's strong brand, continuous innovation, and diversified revenue streams position it well for long-term growth. Despite risks and competition, the company's financial health, high profit margins, and significant R&D investments support a positive outlook. Apple's ability to navigate challenges and capitalize on emerging opportunities — including the $30B+ Broadcom chip deal and upcoming iPhone Air 2 — reinforce its long-term investment case.

**Financials:** Revenue: $451.44B | Net Profit: $94.68B | Market Cap: $4.60T | P/E: 37.98 | EPS: $8.25 | Profit Margin: 27.15%

**Scores:** Financial Health: 8 | Growth: 7 | Innovation: 9 | Competition: 7 | Risk: 6

---

### Tesla (TSLA) — INVEST ✅ (85% confidence)

> Tesla's strong brand recognition, innovative products and services, and growing energy business make it an attractive investment opportunity. While the company faces risks — including a high P/E of 372x and intense competition — its expanding robotaxi service in Miami, energy segment growth, and leadership in the EV market provide a positive long-term outlook.

**Financials:** Revenue: $97.88B | Net Profit: $3.95B | Market Cap: $1.54T | P/E: 372.63 | EPS: $1.10 | Profit Margin: 3.95%

**Scores:** Financial Health: 8 | Growth: 7 | Innovation: 9 | Competition: 7 | Risk: 6

---

### Nvidia (NVDA) — INVEST ✅ (85% confidence)

> NVIDIA's strong revenue growth, high profit margin of 62.97%, and leadership in AI semiconductors make it an attractive long-term investment. Its diversified product portfolio spanning gaming, AI training, and autonomous vehicles — combined with collaborations like Hugging Face's LeRobot partnership — creates significant competitive moats. Despite competition and regulatory risks, NVIDIA's innovation pipeline and financial strength strongly support an INVEST verdict.

**Financials:** Revenue: $60.92B | Net Profit: $15.82B | Market Cap: $5.07T | P/E: 32.05 | EPS: $6.53 | Profit Margin: 62.97%

**Scores:** Financial Health: 8 | Growth: 9 | Innovation: 9 | Competition: 7 | Risk: 6

---

## What I Would Improve With More Time

1. **Caching with Redis** — Cache company analysis for 30 minutes so repeated requests don't consume API quota
2. **Multi-company comparison** — Let users compare 2-3 companies side by side
3. **Historical analysis** — Show how a company's AI score has changed over time with PostgreSQL storage
4. **PDF Export** — Generate a downloadable professional report using Puppeteer or jsPDF
5. **Real-time stock charts** — Embed a live price chart from TradingView or Yahoo Finance
6. **WebSocket loading** — Push real-time step-by-step progress updates to the frontend during analysis
7. **User authentication** — Save analysis history and build a personal dashboard
8. **Prompt optimization** — Fine-tune the prompt with few-shot examples to reduce JSON parse errors
9. **Rate limit management** — Smart request queue that respects Groq API tier limits automatically

---

## AI / LLM Used

This project was built using **Llama 3.3 70B** as the core LLM, accessed via **Groq** (free-tier API) and the **LangChain.js** framework.

> **Note on LLM choice:** The project was originally designed for Google Gemini 2.5 Flash. During development, Google's organizational account policies blocked standard API key generation (returning OAuth tokens instead of API keys). Groq was chosen as the production LLM because it offers a free, reliable API key (`gsk_...` format) with no organizational restrictions, fast inference, and excellent JSON output quality via Llama 3.3 70B.

The entire development process was assisted by an AI coding assistant (Antigravity IDE). The full chat session transcript documenting every conversation, debugging session, and architectural decision made during development is included in **`LLM_CHAT_TRANSCRIPT.md`** in the project root.

---

## Deployment

### Frontend → Vercel

1. Push to GitHub
2. Import project in Vercel, set root directory to `client/`
3. Add env variable: `VITE_API_URL=https://your-render-backend.onrender.com`

### Backend → Render

1. Create Web Service on Render, set root directory to `server/`
2. Build command: `npm install`
3. Start command: `node index.js`
4. Add env variables: `GROQ_API_KEY`, `TAVILY_API_KEY`, `CLIENT_URL`

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Tailwind CSS v4.3, React Router v7, Axios |
| **Backend** | Node.js, Express.js v5 |
| **AI Framework** | LangChain.js |
| **LLM** | Llama 3.3 70B via Groq (free tier) |
| **Search** | Tavily Search API |
| **Financial Data** | Yahoo Finance (yahoo-finance2) |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## License

MIT
