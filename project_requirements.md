Technical Assessment
Technical Assessment
Goal: Build a production-ready full-stack dashboard that replicates the provided Figma design: https://www.figma.com/design/DdOlRUkYytDFIAe6rnLLDV/Sales-Dashboard-Design--Community-?node-id=8121-2&t=Qh2oOc9STVOVwmqS-1

This will test your Next & NestJS expertise, architecture choices, and delivery quality.

Tech Stack
Frontend

Next.js 14+ (TypeScript, App Router)
Material-UI (MUI)
Chart library (Chart.js, Recharts, etc.)
State: Zustand / Redux Toolkit / Context
Axios or fetch
Backend

NestJS (TypeScript), PostgreSQL, TypeORM
Swagger/OpenAPI, class-validator
Infra

Env config, logging, error handling
Docker (optional)
Project Structure

frontend/   # Next.js (components, hooks, lib, store, theme, utils)

backend/    # config, common, dashboard module, entities, DTOs, migrations, seeds

Required files: README.md, .gitignore, .env.example, tsconfig.json, package.json, next.config.js
Optional: docker-compose.yml, MUI config

Requirements
Design: Implement all components from Figma (pixel-perfect, responsive)
Endpoints (all required):
GET /api/dashboard/metrics
GET /api/dashboard/revenue
GET /api/dashboard/customer-satisfaction
GET /api/dashboard/visitor-insights
GET /api/dashboard/top-products
Data: Mock responses from the back-end that match the data shown in the design
Quality: Validation, error handling, Swagger docs, migrations, seeds, logging
Deliverables
Submit link to GitHub repo & live deployment of the front-end on Vercel and back-end on Render/Railway.