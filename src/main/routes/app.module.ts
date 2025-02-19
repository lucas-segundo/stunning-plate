import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TablesModule } from './tables/tables.module'
import { BookingsModule } from './bookings/bookings.module'
import { AppController } from './app.controller'
import { HealthModule } from './health/health.module'
import { MetricsModule } from './metrics/metrics.module'

@Module({
  imports: [
    UsersModule,
    TablesModule,
    BookingsModule,
    HealthModule,
    MetricsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
