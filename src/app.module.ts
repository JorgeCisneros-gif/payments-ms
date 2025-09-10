import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { HealhChekModule } from './health-check/health-check.module';


@Module({
  imports: [PaymentsModule,HealhChekModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
