import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import  config from "./config"

import {PrismaService} from "../prisma.service";

import { AppController } from './app.controller';
import { ExerciseController } from './exercise/exercise.controller';
import { TodoController } from './todo/todo.controller';
import { CourseController } from './course/course.controller';
import { SchedulerController } from './scheduler/scheduler.controller';
import { UserController } from './user/user.controller';


import { AppService } from './app.service';
import { ExerciseService } from './exercise/exercise.service';
import { TodoService } from './todo/todo.service';
import { CourseService } from './course/course.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { UserService } from './user/user.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.course-service.env',
      load: [config],
    })
  ],
  controllers: [AppController, TodoController, ExerciseController, CourseController, SchedulerController, UserController],
  providers: [AppService, TodoService, ExerciseService, CourseService, SchedulerService, UserService, PrismaService],
})
export class AppModule {}
