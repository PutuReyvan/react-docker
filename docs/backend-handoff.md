# Backend Handoff

## Backend Role

The backend turns the invoice tracker from a static dashboard into a service-backed CRUD application. It gives the frontend an API boundary for listing, reading, creating, updating, and deleting invoices, keeps validation on the server, and persists invoice data in MongoDB.

## Database Choice

MongoDB is the intended persistence layer for this assignment because it is a real database while still being simple to run in Docker Compose. Created, updated, and deleted invoices are stored in MongoDB instead of a temporary JSON file or frontend-only state. It is a better handoff target than `db.json` because it exercises a production-like service dependency, persistence, connection strings, and environment injection. It is also lighter for this assignment than Supabase because the team can run the app and database locally with containers without provisioning an external platform first.

## Local Docker Compose Run

Root `docker-compose.yml` now runs the full local stack:

- `invoice-api`: builds from `backend/Dockerfile`, exposes `PORT`, and serves `/health` plus `/api/invoices`.
- `mongodb`: runs MongoDB for local invoice persistence.
- `react-app`: serves the frontend with Nginx and proxies `/api/` to `invoice-api`.

When the backend services are wired into Compose, run:

```powershell
docker compose up --build
```

Then verify:

```powershell
curl http://localhost:3001/health
curl http://localhost:3001/api/invoices
```

After verification, exercise the full CRUD path from the frontend or API: add an invoice, update its fields/status, delete it, and confirm the list reflects the persisted MongoDB state. For host-based backend development, MongoDB is also exposed on `localhost:27017`.

## Environment Variables

Use `backend/.env.example` as the local template. Do not commit real secrets.

| Variable | Local value | Deployment value later |
|---|---|---|
| `PORT` | Usually `3001` | Runtime port expected by the container |
| `MONGODB_URI` | `mongodb://mongodb:27017` inside Compose, or `mongodb://localhost:27017` when the backend runs on the host | MongoDB connection string for the chosen deployment target |
| `MONGODB_DB_NAME` | `invoice_app` | Environment-specific database name, for example `invoice_app_staging` |
| `CORS_ORIGIN` | Frontend origins such as `http://localhost:8080,http://localhost:5173` | Deployed frontend origin or comma-separated allowed origins |

## Backend Workflow Coverage

The new backend workflow should validate the API with install, lint, tests, and TypeScript build, then add the same security gates around the backend containerized delivery path:

- CodeQL SAST for JavaScript/TypeScript.
- Dependency Review and `npm audit --audit-level=high` for `backend/package-lock.json`.
- TruffleHog verified secret scanning.
- Docker image build from `backend/Dockerfile`.
- Trivy container vulnerability scan for high and critical OS/library findings.
- Syft SBOM generation for the backend image.
- Image publish on pushes to the protected deployment branches once the backend registry target is agreed.

The MongoDB integration job runs the API CRUD tests against a real MongoDB service in GitHub Actions. Unit tests still use an in-memory repository, so local backend development does not require MongoDB unless you want to run the integration script.

## Handoff Package Note

The handoff ZIP should include the integrated backend, frontend API wiring, root `docker-compose.yml`, docs, and workflow reference files. Because this repository may be receiving parallel backend/frontend changes, rebuild `handoff/backend-devsecops-package.zip` only after those code changes are merged so the archive matches the final source tree.
