# Invoice Management Dashboard — PRD

## Original Problem Statement
"Check on this app? enhance the looks" — GitHub repo: https://github.com/PutuReyvan/react-docker.git

## App Overview
React + TypeScript + Vite Invoice Management Dashboard with FastAPI backend.
Two pages: Dashboard (KPI cards + recent invoices + outstanding balance) and Invoices (searchable/filterable table).

## Architecture
- **Frontend**: Vite + React + TypeScript, port 3000 (`yarn start` → `vite --host --port 3000`)
- **Backend**: FastAPI (Python), port 8001, uvicorn
- **Data**: Static invoice data in FastAPI + frontend mock fallback
- **Icons**: @phosphor-icons/react
- **Fonts**: Cabinet Grotesk (headings), Satoshi (body) via Fontshare CDN

## Design System (Organic & Earthy)
| Token          | Value     | Usage                        |
|----------------|-----------|------------------------------|
| page           | #F5F4F0   | Warm parchment background     |
| surface        | #FFFFFF   | Card backgrounds              |
| surface-alt    | #EFEBE5   | Table header, nav active bg  |
| primary        | #1A201C   | Main text                     |
| secondary      | #5C665F   | Subdued text                  |
| muted          | #8A948D   | Placeholder, labels           |
| border         | #DEDBD4   | All borders                   |
| accent         | #3E5745   | Forest green primary          |
| success-bg/text| #E5EBE6 / #2C4533 | Paid badge           |
| warning-bg/text| #F5EADC / #6B5024 | Pending badge        |
| danger-bg/text | #F5DADA / #732A2A  | Overdue badge        |

## What's Been Implemented (2026-05-07)
- Cloned repo from GitHub, set up in Emergent environment
- Created FastAPI backend with all 12 invoice endpoints
- Added `start` script to package.json for Vite on port 3000
- Set `allowedHosts: true` in vite.config.ts
- Full design overhaul:
  - Tailwind custom color palette (earthy/organic)
  - Fontshare fonts (Cabinet Grotesk + Satoshi)
  - @phosphor-icons/react for nav + stat card icons
  - Flat bordered cards (no shadow, rounded-sm)
  - Earthy rectangular status badges
  - Outstanding balance hero card (dark forest green)
  - Minimalist table with generous row padding
  - Active nav state with chip highlight
  - data-testid attributes throughout
  - All stat cards with Phosphor icons

## Test Results (iteration_1)
- Backend: 100% pass (7/7 tests)
- Frontend: 100% pass
- Fixed: 404 response for non-existent invoice IDs

## Prioritized Backlog
### P0 (Done)
- [x] Setup environment + run app
- [x] Design overhaul (earthy palette, fonts, icons)

### P1 (Next)
- [ ] Add invoice detail modal/page
- [ ] Add "New Invoice" create form
- [ ] Persist data in MongoDB

### P2 (Future)
- [ ] Dashboard charts (revenue trend, status breakdown pie chart)
- [ ] Export to CSV/PDF
- [ ] Client management page
- [ ] Authentication (login/logout)
- [ ] Dark mode toggle
