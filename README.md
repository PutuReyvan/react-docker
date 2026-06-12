# Invoice Management Dashboard

Repository ini berisi web application **Invoice Management Dashboard** yang digunakan sebagai target implementasi pipeline DevSecOps. Frontend dibuat dengan React, Vite, dan TypeScript, backend dibuat dengan Express dan MongoDB, lalu keduanya bisa dijalankan sebagai Docker service.

Dashboard menampilkan data operasional invoice seperti client/company, nominal pembayaran, status pembayaran, dan due date. Aplikasi sekarang diarahkan sebagai CRUD invoice app: pengguna dapat menambah, mengubah, dan menghapus data invoice melalui API, dengan data tersimpan di MongoDB. Karena konteksnya adalah dashboard internal bisnis, pipeline dibuat untuk memastikan perubahan kode tetap bisa dibuild, dependency aman dari vulnerability tinggi, tidak ada secret yang ter-push, dan source code melewati pengecekan security otomatis.

## Tech Stack

| Area | Tool |
|---|---|
| Frontend | React, Vite, TypeScript |
| Styling | TailwindCSS |
| Backend API | Node.js, Express, TypeScript |
| Database | MongoDB |
| Testing | Vitest, Supertest |
| Build Validation | npm, ESLint, TypeScript, Vite |
| CI/CD | GitHub Actions |
| SCA | npm audit, GitHub Dependency Review |
| Secret Scanning | TruffleHog |
| SAST | CodeQL |
| Container | Docker, Nginx |
| Container Scan | Trivy |
| SBOM | Syft |
| Registry | GitHub Container Registry |
| Frontend Optional Deploy | GCP Compute Engine, Docker Compose, SSH |
| Backend Delivery | Docker image publish to GHCR |

## Local Run

Run full-stack lokal dengan frontend, backend, dan MongoDB:

```powershell
docker compose up --build
```

Buka aplikasi:

```text
http://localhost:8080
```

Cek health endpoint:

```powershell
curl http://localhost:8080/health
curl http://localhost:3001/health
curl http://localhost:3001/api/invoices
```

Setelah stack aktif, operasi add/update/delete invoice dilakukan lewat frontend di `http://localhost:8080` atau langsung ke endpoint `http://localhost:3001/api/invoices`. Data invoice dipersist ke volume MongoDB Compose `mongodb-data`.

Stop Compose:

```powershell
docker compose down
```

Run frontend saja untuk development:

```powershell
cd react-app
npm run dev
```

Run backend saja untuk development membutuhkan MongoDB dan env dari `backend/.env.example`:

```powershell
cd backend
npm install
npm run dev
```

Build dan jalankan frontend image production saja:

```powershell
docker build -t invoice-app:local ./react-app
docker run --rm -p 8080:80 --name invoice-app invoice-app:local
```

```text
http://localhost:8080
```

## DevSecOps Pipeline

Workflow frontend utama ada di `.github/workflows/devsecops.yml`. Pipeline berjalan pada pull request dan push ke branch `main` atau `master`.

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

## Evidence untuk Reporting

Screenshot yang disarankan:

- Halaman GitHub Actions workflow run.
- Halaman pull request checks untuk membuktikan trigger `pull_request` berjalan.
- Job `Build Validation`.
- Job `Dependency Vulnerability Scanning`.
- Job `Secret Scanning - TruffleHog`.
- Job `SAST - CodeQL`.
- Job `Docker Build`.
- Job `Additional Container Scan - Trivy`.
- Job `Additional SBOM - Syft`.
- Job `CD - Publish Image` jika push ke `main`.

Jika GCP belum disiapkan, job `Optional Deploy - GCP Staging` boleh skipped karena deploy VM memang digate dengan repository variable.

Workflow backend tambahan ada di `.github/workflows/backend-devsecops.yml`. Workflow ini sengaja dipisah sebagai referensi agar backend jobs bisa digabung ke workflow utama tanpa mengubah pipeline frontend yang sudah stabil.

| Stage | Job Name di GitHub Actions | Fungsi |
|---|---|---|
| Backend Validation | `Backend Validation` | Menjalankan `npm ci`, lint, unit test, dan TypeScript build untuk Express CRUD API. |
| MongoDB Integration Test | `MongoDB Integration Tests` | Menjalankan test API add/update/delete invoice memakai MongoDB service di GitHub Actions. |
| Backend SAST | `Backend SAST - CodeQL` | Menganalisis source code backend TypeScript. |
| Backend SCA | `Backend Dependency Vulnerability Scanning` | Menjalankan Dependency Review dan `npm audit --audit-level=high`. |
| Backend Secret Scan | `Backend Secret Scanning - TruffleHog` | Mendeteksi credential/API key yang tidak sengaja masuk repo. |
| Backend Docker Build | `Backend Docker Build` | Build image backend `invoice-api`. |
| Backend Container Scan | `Backend Container Scan - Trivy` | Scan vulnerability pada image backend. |
| Backend SBOM | `Backend SBOM - Syft` | Generate SBOM backend image. |
| Backend Publish | `Backend CD - Publish Image to GHCR` | Publish image backend ke GHCR pada push ke `main`/`master`. |

## Deployment

Dokumentasi staging deployment frontend ke AWS EC2 tersedia di [Staging Deployment Guide](docs/deployment.md). 

Dokumentasi backend CRUD dan MongoDB persistence tersedia di [Backend Architecture & Handoff](docs/backend-handoff.md)

## Contributors

- [![GitHub](https://img.shields.io/badge/GitHub-@PutuReyvan-green?logo=github)](https://github.com/PutuReyvan)- Putu Reyvan
- [![GitHub Username](https://img.shields.io/badge/GitHub-@farhanelta-red?logo=github)](https://github.com/farhanelta)  - Farhan Elta
- [![GitHub Username](https://img.shields.io/badge/GitHub-@livenintendoswitch-blue?logo=github)](https://github.com/livenintendoswitch) - Leonard Ferdinand Rianto Suwanta
- [![GitHub Username](https://img.shields.io/badge/GitHub-@Wannnkd-purple?logo=github)](https://github.com/Wannnkd) - Juan Kairupan

# app can be found here:
https://sna.ambasing.shop