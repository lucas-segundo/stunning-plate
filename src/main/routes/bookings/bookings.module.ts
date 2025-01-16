import { Module } from '@nestjs/common'
import { BookingsController } from './bookings.controller'
import { BookTableController } from 'presentation/controllers/BookTable'
import { makeBookTableController } from 'presentation/controllers/BookTable/factory'

@Module({
  controllers: [BookingsController],
  providers: [
    {
      provide: BookTableController,
      useFactory: makeBookTableController,
    },
  ],
})
export class BookingsModule {}
