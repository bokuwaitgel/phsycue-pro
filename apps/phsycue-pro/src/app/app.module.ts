import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import  config from "./config"

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { ContentController } from './content/content.controller';
import { CourseController } from './course/course.controller';
import { PersonalController } from './personal/personal.controller';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ContentService } from './content/content.service';
import { CourseService } from './course/course.service';
import { PersonalService } from './personal/personal.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.phsycue-pro.env',
      load: [config],
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, UserController, ContentController, CourseController, PersonalController],
  providers: [AppService, AuthService, UserService, ContentService, CourseService, PersonalService],
})
export class AppModule {}
