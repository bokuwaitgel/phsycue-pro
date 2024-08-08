import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TrackerService } from './tracker.service';

//dtos
import { 
  StartTrackerDto,
  EndTrackerDto,
} from './tracker.dto';

@ApiTags('tracker')
@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start tracker' })
  @ApiResponse({ status: 201, description: 'Tracker started' })

  async startTracker(@Body() tracker: StartTrackerDto) {
    return this.trackerService.startTracker(tracker);
  }

  @Post('end')
  @ApiOperation({ summary: 'End tracker' })
  @ApiResponse({ status: 201, description: 'Tracker ended' })
  
  async endTracker(@Body() tracker: EndTrackerDto) {
    return this.trackerService.endTracker(tracker);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all tracker' })
  @ApiResponse({ status: 200, description: 'Return all tracker' })

  async getAll(@Param('id') id: string) {
    return this.trackerService.getTracker(id);
  }

  @Get('getTracker/:userId')
  @ApiOperation({ summary: 'Get tracker by id' })
  @ApiResponse({ status: 200, description: 'Data' })
  async getTracker(@Param('userId') personalId: string) {
    return this.trackerService.getTrackers(personalId);
  }

}
