import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { authRoutes } from './app/auth.routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = Fastify({
  logger: true,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key',
});

// Register Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Auth API',
      description: 'API for user authentication',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://${host}:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

// Register Swagger UI
app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
});

app.register(authRoutes);

app.listen({ port, host }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
    console.log(`[ docs  ] http://${host}:${port}/documentation`);
  }
});