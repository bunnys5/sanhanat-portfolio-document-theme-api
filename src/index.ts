import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { healthRoute } from './routes/health';

type Bindings = {
  ENVIRONMENT: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// ── Global Middleware ──
app.use('/*', cors());
app.use('/*', logger());
app.use('/*', prettyJSON());

// ── Routes ──
app.route('/api', healthRoute);

// ── OpenAPI JSON spec ──
app.doc31('/openapi.json', {
  openapi: '3.1.0',
  info: {
    title: 'Sanhanat Portfolio Document API',
    description: 'Backend API for the documentation-style portfolio website. Built with Hono.js on Cloudflare Workers.',
    version: '0.0.1',
    contact: {
      name: 'Sanhanat Sukkoram',
    },
  },
  servers: [
    {
      url: 'http://localhost:8787',
      description: 'Local Development',
    },
    {
      url: 'https://sanhanat-portfolio-document-api.<your-subdomain>.workers.dev',
      description: 'Production (Cloudflare Workers)',
    },
  ],
});

// ── Scalar API Reference UI ──
app.get(
  '/docs',
  apiReference({
    theme: 'saturn',
    spec: {
      url: '/openapi.json',
    },
    pageTitle: 'Portfolio API — Documentation',
    metaData: {
      title: 'Portfolio API Docs',
      description: 'Interactive API documentation for Sanhanat Portfolio',
    },
  }),
);

export default app;
