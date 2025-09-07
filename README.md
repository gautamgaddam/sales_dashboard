# Dabang Sales Dashboard

Monorepo for a sample sales dashboard built with Next.js and NestJS.

## Apps

- **web** – Next.js frontend (runs on port 3000)
- **api** – NestJS backend (runs on port 3001)

## Prerequisites

- Node.js 18+ 
- pnpm (installed automatically during setup)

## Installation and Setup

### 1. Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

## Development

### Quick Start (Recommended)

Use the convenience script to start both applications at once:
```bash
./start-dev.sh
```

This will start both the API and web servers simultaneously and display their URLs.

### Manual Start

Open two terminal windows:

**Terminal 1 - Start the API server:**
```bash
pnpm dev:api
```
This starts the NestJS backend on http://localhost:3001

**Terminal 2 - Start the web application:**
```bash
pnpm dev:web
```
This starts the Next.js frontend on http://localhost:3000

### Accessing the applications

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/docs (Swagger UI)

### API Endpoints

- `GET /api/dashboard/metrics` - Returns dashboard metrics data

## Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   └── tsconfig/     # Shared TypeScript configuration
├── package.json      # Root package.json with workspace scripts
└── pnpm-workspace.yaml
```

## Environment Variables

The following environment variables can be configured in `.env`:

- `NEXT_PUBLIC_API_BASE_URL` - API base URL (defaults to http://localhost:3001)

## Building for Production

```bash
pnpm build
```

## Testing

```bash
pnpm test
```

## Troubleshooting

### Port Conflicts
If you encounter port conflicts:
- Make sure no other applications are using ports 3000 or 3001
- The API runs on port 3001, frontend on port 3000

### TypeScript Issues
If you encounter TypeScript compilation errors:
- Ensure all dependencies are installed: `pnpm install`
- Check that both `@types/node` and `@types/react` are installed

### CORS Issues
CORS is configured to allow requests from localhost:3000 to the API on localhost:3001.
