import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './app.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from './user/users.service';
import { UsersController } from './user/users.controller';
import { AuthController } from './app.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  config from "./config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.auth.env',
      load: [config],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    
  ],
  providers: [AuthService, JwtStrategy, PrismaService, UsersService, JwtAuthGuard],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}