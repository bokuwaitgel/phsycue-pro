import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    email: { type: 'string' },
  },
};

const loginSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
};

export async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService(fastify);

  fastify.post('/register', {
    schema: {
      description: 'Register a new user',
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
      response: {
        200: userSchema,
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    try {
      const user = await authService.registerUser(email, password);
      reply.send(user);
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  });

  fastify.post('/login', {
    schema: {
      description: 'Login a user',
      tags: ['auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: loginSchema,
        401: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    try {
      const token = await authService.loginUser(email, password);
      reply.send({ token });
    } catch (error) {
      reply.status(401).send({ error: error.message });
    }
  });

  fastify.get('/me', {
    schema: {
      description: 'Get current user information',
      tags: ['auth'],
      security: [{ bearerAuth: [] }],
      response: {
        200: userSchema,
        401: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      reply.status(401).send({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await authService.validateToken(token);
      const user = await authService.getUserById(decoded.id);
      reply.send(user);
    } catch (error) {
      reply.status(401).send({ error: error.message });
    }
  });
}