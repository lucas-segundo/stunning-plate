import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TablesModule } from './tables/tables.module'
import { BookingsModule } from './bookings/bookings.module'

@Module({
  imports: [UsersModule, TablesModule, BookingsModule],
})
export class AppModule {}
