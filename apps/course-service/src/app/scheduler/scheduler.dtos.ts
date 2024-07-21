import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreateSchedulerDto {
    @ApiProperty()
    @IsNotEmpty()
    startTime: string
    @ApiProperty()
    @IsNotEmpty()
    endTime: string
}

export class deleteSchedulerDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string
}

export class getSchedulerByIdDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string
}

export class bookSchedulerDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string
    
}
