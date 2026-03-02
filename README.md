# Sanhanat Portfolio Document API

This is the backend API for the documentation-style portfolio website, built with **Hono.js** and **Cloudflare Workers**.

## Tech Stack
- [Hono.js](https://hono.dev/) - Ultrafast web framework for the Edges
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless execution environment
- [Zod OpenAPI](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) - Type-safe OpenAPI validation and spec generation
- [Scalar](https://scalar.com/) - Interactive API Reference documentation

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:8787`.

## API Documentation

The API includes auto-generated interactive documentation:
- **Scalar API Reference UI:** `http://localhost:8787/docs`
- **OpenAPI 3.1 Spec (JSON):** `http://localhost:8787/openapi.json`

## Project Structure

```text
src/
├── index.ts        # Main application entry point (Middleware, OpenAPI routes, Scalar UI)
├── routes/         # API route handlers and Zod schemas (e.g., health.ts)
└── services/       # Core business logic
```

## Deployment

To deploy to your Cloudflare account:

```bash
npm run deploy
```
