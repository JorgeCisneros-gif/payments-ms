import { Module } from '@nestjs/common';
import { HealthChekController } from './health-check.controller';

@Module({
  controllers: [HealthChekController]
})
export class HealhChekModule {}
