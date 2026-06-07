# Douyin Travel Action API

Express backend for the MVP stage of the Douyin travel inspiration to action plan tool.

The current implementation uses in-memory storage, mock video analysis, and mock outfit generation. It does not download Douyin videos, call AI APIs, connect to a database, or execute shell commands with user URLs.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default service URL: `http://localhost:8000`

## Environment

```text
PORT=8000
FRONTEND_ORIGIN=http://localhost:3000
AI_PROVIDER=mock
```

`FRONTEND_ORIGIN` is the only browser origin allowed by CORS. Requests without an origin, such as server-side tests, are allowed.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

## API

### GET /health

Returns service health.

### GET /api/demo-cases

Returns three mock travel cases: Dali, Suzhou, and Shanghai.

### POST /api/analyze-video

Accepts either a demo case:

```json
{
  "sourceType": "demo",
  "demoCaseId": "dali-lake"
}
```

Or a Douyin URL:

```json
{
  "sourceType": "douyin_url",
  "videoUrl": "https://v.douyin.com/example"
}
```

URL mode validates the URL and domain, then returns mock analysis. It does not crawl, download, or pass the URL to shell commands.

### POST /api/generate-plan

Creates an in-memory plan task from an existing analysis.

### GET /api/result/:id

Returns task progress while processing, then a completed travel plan.

## Future AI Integration

Replace `src/services/mock-video-analyzer.ts` and `src/services/mock-plan-generator.ts` with real provider implementations that satisfy `VideoAnalyzer` and `PlanGenerator`. Routes should not need to change.
