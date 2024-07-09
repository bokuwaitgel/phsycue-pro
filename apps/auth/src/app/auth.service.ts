import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';

export class AuthService {
  private prisma: PrismaClient;
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.prisma = new PrismaClient();
    this.fastify = fastify;
  }

  async registerUser(email: string, password: string): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error('User already exists');
    }
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.fastify.jwt.sign({ id: user.id, email: user.email });
    return token;
  }

  async validateToken(token: string): Promise<{ id: number; email: string }> {
    try {
      return this.fastify.jwt.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getUserById(id: number): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  }
}