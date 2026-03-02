import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

// ── Response schemas ──
const HealthResponseSchema = z
  .object({
    status: z.string().openapi({ example: 'ok' }),
    timestamp: z.string().datetime().openapi({ example: '2025-03-01T12:00:00.000Z' }),
    environment: z.string().openapi({ example: 'development' }),
    version: z.string().openapi({ example: '0.0.1' }),
  })
  .openapi('HealthResponse');

// ── Route definition ──
const healthCheckRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['System'],
  summary: 'Health Check',
  description: 'Returns the current health status of the API, including timestamp and environment info.',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: HealthResponseSchema,
        },
      },
      description: 'API is healthy and running',
    },
  },
});

// ── Router ──
export const healthRoute = new OpenAPIHono();

healthRoute.openapi(healthCheckRoute, (c) => {
  return c.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: c.env?.ENVIRONMENT ?? 'unknown',
      version: '0.0.1',
    },
    200,
  );
});
