import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TablesModule } from './tables/tables.module'
import { BookingsModule } from './bookings/bookings.module'
import { AppController } from './app.controller'

@Module({
  imports: [UsersModule, TablesModule, BookingsModule],
  controllers: [AppController],
})
export class AppModule {}
