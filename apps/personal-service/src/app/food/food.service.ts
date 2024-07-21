import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
} from './food.dto';

@Injectable()
export class FoodService {
  
  constructor(private prisma: PrismaService) {}

}
