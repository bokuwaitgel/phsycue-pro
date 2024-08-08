import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  StartTrackerDto,
  EndTrackerDto
} from './tracker.dto';

@Injectable()
export class TrackerService {
  constructor(private prisma: PrismaService) {}

  async startTracker(tracker: StartTrackerDto) {

    const personal = await this.prisma.personal.findUnique({
      where: {
        userId: tracker.UserId
      }
    });

    if (!personal) {
      return {
        status: false,
        type: 'fail',
        code: HttpStatus.NOT_FOUND,
        message: 'Personal not found'
      };
    }
    const res = await this.prisma.tracker.create({
      data: {
        personal: {
          connect: {
            id: personal.id
          }
        },
        course: {
          connect: {
            id: tracker.courseId
          }
        },
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Tracker started',
      code : HttpStatus.OK,
      data: res
    }
  }

  async endTracker(tracker: EndTrackerDto) {
    const find = await this.prisma.tracker.findUnique({
      where: {
        id: tracker.id
      }
    });

    if (!find) {
      return {
        status: false,
        type: 'fail',
        code: HttpStatus.NOT_FOUND,
        message: 'Tracker not found'
      };
    }

    const res = await this.prisma.tracker.update({
      where: {
        id: tracker.id
      },
      data: {
        endTime: new Date()
      }
    });

    return {
      status: true,
      type: 'success',
      message: 'Tracker ended',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getTracker(id: string) {
    const find = await this.prisma.tracker.findUnique({
      where: {
        id: id
      },
      include: {
        course: true,
        personal: true
      }
    });

    if (!find) {
      return {
        status: false,
        type: 'fail',
        code: HttpStatus.NOT_FOUND,
        message: 'Tracker not found'
      };
    }

    const total_tracked_time = find.endTime.getTime() - find.startTime.getTime();

    return {
      status: true,
      type: 'success',
      message: 'Tracker found',
      code : HttpStatus.OK,
      data: {
        ...find,
        total_tracked_time
      }
    }
  }

  async getTrackers(userId: string) {
    const personal = await this.prisma.personal.findFirst({
      where: {
        userId: userId
      }
    });

    if (!personal) {
      return {
        status: false,
        type: 'fail',
        code: HttpStatus.NOT_FOUND,
        message: 'Personal not found'
      };
    }

    const res = await this.prisma.tracker.findMany({
      where: {
        personalId: personal.id
      },
      include: {
        course: true,
        personal: true
      }
    });

    const total_tracked_time = res.reduce((acc, curr) => acc + curr.endTime.getTime() - curr.startTime.getTime(), 0);


    return {
      status: true,
      type: 'success',
      code : HttpStatus.OK,
      data: {
        total_tracked_time,
        trackers: res
      }
    }
  }
}
