# React Docker

A containerized React (Vite + TypeScript) application using Docker and Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

## Getting Started

### Run with Docker Compose

```bash
docker compose up --build
```

The app will be available at **http://localhost:5173**.

### Run without Docker

```bash
cd react-app
npm install
npm run dev
```

## Project Structure

```
react-docker/
├── docker-compose.yml    # Docker Compose configuration
├── react-app/
│   ├── Dockerfile        # Docker image definition
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   ├── package.json      # Node.js dependencies
│   └── vite.config.ts    # Vite configuration
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
