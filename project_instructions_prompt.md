MASTER PROMPT — Build “Dabang Sales Dashboard” (Next.js + NestJS)
Goal

Implement a production-ready full-stack dashboard that visually matches the Figma (“Sales Dashboard Design — Community”) and the attached screenshot. Focus on pixel-perfect UI, responsiveness, clean architecture, typed API contracts, instrumentation, and deployability.

Tech & Conventions (hard requirements)

Frontend: Next.js App Router (TypeScript), MUI, Recharts, Axios (or fetch). Follow Next.js App Router conventions for server/client components and layouts. 
Next.js
+1

State: Local component state + derived state. If a global store is needed, use Zustand with selector patterns. 
zustand.docs.pmnd.rs

Backend: NestJS (TypeScript), PostgreSQL via TypeORM, class-validator for DTOs, Swagger for OpenAPI docs. 
docs.nestjs.com
+3
docs.nestjs.com
+3
docs.nestjs.com
+3

Charts: Recharts for line/area/bar charts. 
recharts.org

Quality: ESLint, Prettier, Husky + lint-staged, error boundaries, request logging, input validation, 100% typed.

Deploy: Frontend → Vercel; Backend → Render/Railway; DB → managed Postgres.

Repo Layout

Prefer monorepo with PNPM workspaces:

/dabang-dashboard
  /apps
    /web   (Next.js App Router)
    /api   (NestJS)
  /packages
    /tsconfig
    /eslint-config
  .editorconfig .prettierrc .eslintrc.json package.json pnpm-workspace.yaml
  README.md

Frontend (apps/web)
Libraries

next, react, @mui/material @emotion/react @emotion/styled, @mui/icons-material, recharts, zod, zustand (optional), axios. 
MUI
npm

Pages & Routes (App Router)
/app
  /layout.tsx      // shell: sidebar + topbar
  /page.tsx        // dashboard
  /(routes)
    /leaderboard/page.tsx
    /orders/page.tsx
    /products/page.tsx
    /reports/page.tsx
    /messages/page.tsx
    /settings/page.tsx

UI Shell

Left Sidebar: brand (“Dabang”), nav items (Dashboard, Leaderboard, Orders, Products, Sales Report, Messages, Settings, Sign Out), “Get Pro” card.

Top Bar: title “Dashboard”, search input, locale dropdown, notifications icon, user menu (avatar, role).

Implement with MUI Drawer, List, AppBar/Toolbar, Container, Paper, Grid, Box, Typography, IconButton, and MUI theme overrides to match spacing, rounded cards, shadows, and colors from the Figma. 
MUI

Dashboard Widgets (match layout & spacing)

Today’s Sales (4 KPI tiles + Export button)

KPIs: Total Sales ($1k), Total Orders (300), Products Sold (5), New Customers (8), each with miniature icon, pastel background, and “% from yesterday” delta.

Visitor Insights (multi-series line chart)

Series: Loyal Customers, New Customers, Unique Customers. Use Recharts <ResponsiveContainer><LineChart>…</LineChart></ResponsiveContainer>. 
recharts.org

Total Revenue (grouped bar chart) — Online vs Offline per weekday.

*Customer Satisfaction (dual line/area or smoothed line) — Last Month vs This Month.

Target vs Reality (grouped bars) + kpi badges at right (Reality Sales / Target Sales).

Top Products (ranked list with progress bars and sales %).

Sales Mapping by Country (simple color map placeholder + legend) — start with a card and SVG world map (lightweight), can stub with static colors.

Volume vs Service Level (grouped bars).

Recharts elements: LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, etc. 
recharts.org

Styling & Theming

Create theme.ts with MUI theme tokens (palette, typography scale, radii, shadows).

Cards: subtle shadow, 2xl radius, generous padding, white background, light grey board.

Use MUI sx for quick adjustments; prefer theme values.

Data Fetching

Create /lib/api.ts with axios instance pointing to process.env.NEXT_PUBLIC_API_BASE_URL.

Use Server Components to fetch static data where possible, else client components with SWR-like revalidation.

Types & Contracts

Create types/dashboard.ts mirroring backend DTOs:

export type MetricTile = { label: string; value: number; deltaPct: number; icon: string; currency?: 'USD' };
export type VisitorInsightsPoint = { month: string; loyal: number; new: number; unique: number };
export type RevenuePoint = { weekday: string; online: number; offline: number };
export type SatisfactionPoint = { month: string; lastMonth: number; thisMonth: number };
export type TargetRealityPoint = { month: string; target: number; reality: number };
export type TopProduct = { rank: number; name: string; popularityPct: number; salesPct: number };
export type VolumeServicePoint = { label: string; volume: number; services: number };
export type CountrySales = { iso2: string; label: string; value: number };

Accessibility & Performance

Color-contrast (WCAG AA) for text on pastel cards.

aria-labels on charts; provide table fallbacks for key series.

Image/Avatar with alt.

Backend (apps/api)
Libraries

@nestjs/common/core, @nestjs/swagger, class-validator class-transformer, typeorm, pg, pino pino-pretty (logger). Swagger setup per NestJS recipe; expose /docs. 
docs.nestjs.com

Structure
/src
  main.ts
  app.module.ts
  common/
    filters/http-exception.filter.ts
    interceptors/logging.interceptor.ts
  dashboard/
    dashboard.module.ts
    dashboard.controller.ts
    dashboard.service.ts
    dto/
    entities/
  config/
    database.config.ts

Entities (future-proof; okay to seed/mock now)

Product(id, name, category, popularityPct, salesPct)

KpiSnapshot(id, date, totalSales, totalOrders, productsSold, newCustomers, deltaSalesPct, ...)

VisitorStat(id, month, loyal, new, unique)

RevenueStat(id, weekday, online, offline)

SatisfactionStat(id, month, lastMonth, thisMonth)

TargetRealityStat(id, month, target, reality)

VolumeServiceStat(id, label, volume, services)

CountrySalesStat(id, iso2, label, value)

Use TypeORM with Postgres. 
docs.nestjs.com

DTOs & Validation

Use class-validator for all incoming params. Example:

export class MonthQueryDto { @IsOptional() @IsInt() @Min(1) @Max(12) month?: number; }

REST Endpoints (return shapes exactly as frontend types/*)

GET /api/dashboard/metrics → { tiles: MetricTile[] }

GET /api/dashboard/visitor-insights → VisitorInsightsPoint[]

GET /api/dashboard/revenue → RevenuePoint[]

GET /api/dashboard/satisfaction → SatisfactionPoint[]

GET /api/dashboard/target-vs-reality → TargetRealityPoint[]

GET /api/dashboard/top-products → TopProduct[]

GET /api/dashboard/map → CountrySales[]

GET /api/dashboard/volume-vs-service → VolumeServicePoint[]

Add Swagger decorators to DTOs and controller methods; mount Swagger UI at /docs. 
docs.nestjs.com

Sample Seed Data (align to the screenshot values)
// /prisma-like/seed-dashboard.json (use a TypeORM seeder script instead)
{
  "tiles":[
    {"label":"Total Sales","value":1000,"deltaPct":6,"icon":"payments","currency":"USD"},
    {"label":"Total Order","value":300,"deltaPct":5,"icon":"receipt"},
    {"label":"Product Sold","value":5,"deltaPct":12,"icon":"sell"},
    {"label":"New Customers","value":8,"deltaPct":0.5,"icon":"person_add"}
  ],
  "visitorInsights":[
    {"month":"Jan","loyal":320,"new":180,"unique":260},
    {"month":"Feb","loyal":300,"new":190,"unique":270},
    {"month":"Mar","loyal":340,"new":210,"unique":280},
    {"month":"Apr","loyal":360,"new":230,"unique":300},
    {"month":"May","loyal":330,"new":240,"unique":310},
    {"month":"Jun","loyal":350,"new":260,"unique":330},
    {"month":"Jul","loyal":370,"new":280,"unique":340},
    {"month":"Aug","loyal":390,"new":300,"unique":360},
    {"month":"Sep","loyal":410,"new":320,"unique":380},
    {"month":"Oct","loyal":380,"new":300,"unique":360},
    {"month":"Nov","loyal":360,"new":280,"unique":340},
    {"month":"Dec","loyal":340,"new":260,"unique":320}
  ],
  "revenue":[
    {"weekday":"Monday","online":14000,"offline":9000},
    {"weekday":"Tuesday","online":11000,"offline":7000},
    {"weekday":"Wednesday","online":24000,"offline":15000},
    {"weekday":"Thursday","online":9000,"offline":6000},
    {"weekday":"Friday","online":16000,"offline":12000},
    {"weekday":"Saturday","online":12000,"offline":8000},
    {"weekday":"Sunday","online":18000,"offline":10000}
  ],
  "satisfaction":[
    {"month":"Jan","lastMonth":58,"thisMonth":62},
    {"month":"Feb","lastMonth":60,"thisMonth":65},
    {"month":"Mar","lastMonth":59,"thisMonth":63},
    {"month":"Apr","lastMonth":61,"thisMonth":66},
    {"month":"May","lastMonth":62,"thisMonth":68},
    {"month":"Jun","lastMonth":60,"thisMonth":70}
  ],
  "targetVsReality":[
    {"month":"Jan","target":12000,"reality":9500},
    {"month":"Feb","target":13000,"reality":10200},
    {"month":"Mar","target":14000,"reality":11000},
    {"month":"Apr","target":15000,"reality":11800},
    {"month":"May","target":16000,"reality":12500},
    {"month":"Jun","target":17000,"reality":13200},
    {"month":"Jul","target":18000,"reality":14500}
  ],
  "topProducts":[
    {"rank":1,"name":"Home Decor Range","popularityPct":80,"salesPct":45},
    {"rank":2,"name":"Diva Princess Pink Bag 18\"","popularityPct":60,"salesPct":29},
    {"rank":3,"name":"Bathrobe","popularityPct":50,"salesPct":18},
    {"rank":4,"name":"Apple Smartwatches","popularityPct":40,"salesPct":25}
  ],
  "countrySales":[
    {"iso2":"US","label":"United States","value":19000},
    {"iso2":"IN","label":"India","value":12000},
    {"iso2":"BR","label":"Brazil","value":8000},
    {"iso2":"FR","label":"France","value":7000},
    {"iso2":"CN","label":"China","value":15000}
  ],
  "volumeService":[
    {"label":"A","volume":1135,"services":635},
    {"label":"B","volume":980,"services":520},
    {"label":"C","volume":840,"services":450},
    {"label":"D","volume":1300,"services":760}
  ]
}

Logging, Errors, CORS

Add global ValidationPipe, HttpExceptionFilter, LoggingInterceptor.

Enable CORS for the frontend origin.

Integration Contract (end-to-end)

FE .env.local:

NEXT_PUBLIC_API_BASE_URL=https://<your-api-host>


BE .env:

DATABASE_URL=postgres://user:pass@host:5432/dabang
NODE_ENV=production
PORT=8080
SWAGGER_ENABLED=true


FE calls each endpoint, transforms data (if needed) and renders Recharts components. Keep charts responsive via ResponsiveContainer. 
recharts.org

Acceptance Criteria (pixel + behavior)

Pixel parity with Figma spacing, radii, shadows, and the exact card grid from the screenshot. MUI theme tokens must centralize these decisions. 
MUI

Charts render smoothly, with tooltips and legends; line chart shows 3 colored series for Visitors; bars are grouped for Revenue and Target vs Reality; Reference line on Visitor Insights for the highlighted month. 
recharts.org

KPI tiles show correct primary value and delta label (“+x% from yesterday”).

Accessibility: all interactive elements keyboard-navigable; aria labels for charts & search.

API docs visible at /docs with correct schemas and examples. 
docs.nestjs.com

Type-safe: no any; DTOs and FE types aligned.

Env-based URLs; builds run with pnpm i && pnpm -w build.

Deploy: live FE (Vercel) + BE (Render/Railway) + Postgres (managed). Links in README.

Developer Tasks (sequenced)

Scaffold monorepo; add workspace scripts: dev:web, dev:api, build, lint, format.

Theme & Shell in Next.js App Router: layout, sidebar, topbar (MUI). 
Next.js

Cards & KPI tiles as reusable components (<KpiTile />, <CardSection />).

Charts with Recharts components (line, bar) and responsive wrappers. 
recharts.org

NestJS module DashboardModule + controller/service with hard-coded or seeded data; wire TypeORM Postgres; add Swagger. 
docs.nestjs.com
+2
docs.nestjs.com
+2

Validation & Errors: DTOs with class-validator; global pipes/filters.

Integrate FE↔BE; render real API data; add loading/skeletons.

Accessibility pass; add unit tests for services and component render tests.

Dockerize both apps (optional); CI: lint, typecheck, build.

Deploy; document env vars and runbooks in README.

Example Code Stubs (ask the model to expand)

NestJS Controller

@ApiTags('dashboard')
@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly svc: DashboardService) {}

  @Get('metrics') getMetrics(): MetricsResponse { return this.svc.getMetrics(); }
  @Get('visitor-insights') getVisitors(): VisitorInsightsPoint[] { return this.svc.getVisitorInsights(); }
  @Get('revenue') getRevenue(): RevenuePoint[] { return this.svc.getRevenue(); }
  @Get('satisfaction') getSatisfaction(): SatisfactionPoint[] { return this.svc.getSatisfaction(); }
  @Get('target-vs-reality') getTargetReality(): TargetRealityPoint[] { return this.svc.getTargetVsReality(); }
  @Get('top-products') getTop(): TopProduct[] { return this.svc.getTopProducts(); }
  @Get('map') getMap(): CountrySales[] { return this.svc.getCountrySales(); }
  @Get('volume-vs-service') getVolumeService(): VolumeServicePoint[] { return this.svc.getVolumeVsService(); }
}


(Ensure Swagger decorators & DTOs per NestJS OpenAPI guidelines.) 
docs.nestjs.com

Next.js (App Router) chart usage

// components/charts/VisitorInsights.tsx
'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
export default function VisitorInsights({ data }: { data: VisitorInsightsPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />
        <Line type="monotone" dataKey="loyal" />
        <Line type="monotone" dataKey="new" />
        <Line type="monotone" dataKey="unique" />
      </LineChart>
    </ResponsiveContainer>
  );
}


(Recharts API from docs.) 
recharts.org

README Must Include

Stack overview (with links to docs) — Next.js App Router, MUI, Recharts, NestJS + TypeORM, Swagger. 
Next.js
MUI
recharts.org
docs.nestjs.com
+1

Local dev scripts, env vars, how to seed data, how to run Swagger.

Deploy URLs (FE/BE), screenshots matching Figma.

Notes for the model executing this prompt

Match spacing, colors, typography, and card radii from the Figma screenshot; use MUI theme to centralize tokens. 
MUI

Prefer App Router patterns (layout.tsx, server components for data fetching where applicable). 
Next.js

Keep Recharts components responsive and accessible. 
recharts.org

Document and expose OpenAPI via Swagger at /docs. 
docs.nestjs.com