# Invoice Management Dashboard

Repository ini berisi web application **Invoice Management Dashboard** yang digunakan sebagai target implementasi pipeline DevSecOps. Aplikasi dibuat dengan React, Vite, dan TypeScript, lalu dipaketkan sebagai Docker image production menggunakan Nginx.

Dashboard menampilkan data operasional invoice seperti client/company, nominal pembayaran, status pembayaran, dan due date. Karena konteksnya adalah dashboard internal bisnis, pipeline dibuat untuk memastikan perubahan kode tetap bisa dibuild, dependency aman dari vulnerability tinggi, tidak ada secret yang ter-push, dan source code melewati pengecekan security otomatis.

## Tech Stack

| Area | Tool |
|---|---|
| Frontend | React, Vite, TypeScript |
| Styling | TailwindCSS |
| Mock Backend | JSON Server |
| Testing | Vitest |
| Build Validation | npm, ESLint, Vite |
| CI/CD | GitHub Actions |
| SCA | npm audit, GitHub Dependency Review |
| Secret Scanning | TruffleHog |
| SAST | CodeQL |
| Container | Docker, Nginx |
| Container Scan | Trivy |
| SBOM | Syft |
| Registry | GitHub Container Registry |
| Optional Deploy | GCP Compute Engine, Docker Compose, SSH |

## Local Run

Run development server dengan mock API:

```powershell
cd react-app
npm run api
npm run dev
```

Build dan jalankan image production:

```powershell
docker build -t invoice-app:local ./react-app
docker run --rm -p 8080:80 --name invoice-app invoice-app:local
```

Buka aplikasi:

```text
http://localhost:8080
```

Cek health endpoint:

```powershell
curl http://localhost:8080/health
```

Run dengan Docker Compose:

```powershell
docker compose up --build
```

Stop Compose:

```powershell
docker compose down
```

## DevSecOps Pipeline

Workflow utama ada di `.github/workflows/devsecops.yml`. Pipeline berjalan pada pull request dan push ke branch `main`.

| Stage | Job Name di GitHub Actions | Fungsi |
|---|---|---|
| Build Validation | `Build Validation` | Menjalankan `npm ci`, lint, test, dan build untuk memastikan aplikasi invoice dashboard valid. |
| Dependency Vulnerability Scanning | `Dependency Vulnerability Scanning` | Menjalankan `npm audit --audit-level=high` dan Dependency Review untuk mengecek package pihak ketiga. |
| Secret Scanning | `Secret Scanning - TruffleHog` | Mendeteksi kemungkinan API key, token, atau credential yang tidak sengaja masuk repository. |
| SAST | `SAST - CodeQL` | Menganalisis source code JavaScript/TypeScript untuk menemukan pola bug atau security issue. |
| Docker Build | `Docker Build` | Membuat Docker image production `invoice-app` dari aplikasi React/Vite. |
| Additional Container Scan | `Additional Container Scan - Trivy` | Scan Docker image untuk vulnerability OS/library sebagai security tambahan. |
| Additional SBOM | `Additional SBOM - Syft` | Membuat software bill of materials untuk visibility dependency di image. |
| CD Publish | `CD - Publish Image` | Publish image ke `ghcr.io/putureyvan/invoice-app` pada push ke `main`. |
| Optional Deploy | `Optional Deploy - GCP Staging` | Deploy ke GCP VM jika `ENABLE_STAGING_DEPLOY=true`. |

Fitur security utama yang sesuai dengan laporan:

1. **Dependency Vulnerability Scanning** memakai `npm audit` dan GitHub Dependency Review.
2. **Secret Scanning** memakai TruffleHog.
3. **Static Application Security Testing / SAST** memakai CodeQL.

Trivy dan Syft ditambahkan sebagai hardening yang masih realistis untuk project mahasiswa karena aplikasi sudah dipaketkan dalam Docker image.

## Deployment

Dokumentasi staging deployment ke GCP Compute Engine tersedia di `docs/deployment.md`.

## Contributors

- PutuReyvan - Putu Reyvan
