# Staging Deployment

This project can deploy the Invoice Management Dashboard to a GCP Compute Engine VM. The VM runs the production Docker image with Docker Compose.

Deployment is optional for the assignment evidence. The GitHub Actions workflow always validates, scans, builds, and publishes the Docker image on `main`; the VM deploy job only runs when `ENABLE_STAGING_DEPLOY=true`.

## Runtime Model

- Image registry: `ghcr.io/putureyvan/invoice-app`
- VM app directory: `/opt/invoice-app`
- Runtime: Docker Compose
- Public port: `80`
- Health check: `/health`

Copy `deploy/docker-compose.staging.yml` to the VM as:

```bash
/opt/invoice-app/docker-compose.yml
```

Create the VM environment file:

```bash
APP_IMAGE_TAG=<git-commit-sha>
```

Save it as:

```bash
/opt/invoice-app/.env
```

## VM Requirements

- Ubuntu LTS on GCP Compute Engine.
- Docker Engine and Docker Compose plugin installed.
- Firewall allows:
  - `tcp:22` for SSH
  - `tcp:80` for the web app
- If the GHCR package is private, the VM must login to GHCR:

```bash
echo "<github-token>" | docker login ghcr.io -u "<github-username>" --password-stdin
```

## Manual VM Check

Run this on the VM after the image is available in GHCR:

```bash
cd /opt/invoice-app
docker compose pull
docker compose up -d
curl --fail http://localhost/health
```

Expected health output:

```text
ok
```

## GitHub Actions Deploy

Set these repository secrets:

| Secret | Purpose |
|---|---|
| `STAGING_HOST` | GCP VM external IP or DNS |
| `STAGING_USER` | SSH user on the VM |
| `STAGING_SSH_KEY` | Private key for GitHub Actions SSH access |
| `STAGING_PORT` | SSH port, usually `22` |
| `STAGING_APP_URL` | Public health URL, for example `http://<vm-ip>/health` |

Set this repository variable only when the VM is ready:

| Variable | Value |
|---|---|
| `ENABLE_STAGING_DEPLOY` | `true` |

When enabled, the workflow deploy job:

1. Uses the image tag from the current Git commit SHA.
2. SSHes into `/opt/invoice-app` on the VM.
3. Stores the previous `APP_IMAGE_TAG` for rollback.
4. Writes the new `APP_IMAGE_TAG` to `.env`.
5. Runs `docker compose pull` and `docker compose up -d`.
6. Runs the health check.
7. Restores the previous tag if the health check fails.
