import { Controller, Get } from '@nestjs/common';
import { ok } from 'assert/strict';

@Controller('/')
export class HealthChekController {


   @Get()
   healthCheck() {
       return 'client is running';
   }

}
