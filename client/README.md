# JV Envision Photography – Client

This is the Vite + React frontend for the JV Envision Photography project. It connects to the Express backend to submit contact inquiries and display site content.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
cd client
npm install
cp env.example .env
npm run dev
```

### Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base URL for the backend API. Leave empty to use the Vite dev proxy. | `http://localhost:5000` |

## Development

- `npm run dev` starts the Vite dev server with HMR.
- API requests to `/api/*` are automatically proxied to `http://localhost:5000`.

## Build

```bash
npm run build
```

This outputs a production-ready bundle in `client/dist`.
