import { Module } from '@nestjs/common'
import { BookingsController } from './bookings.controller'
import { BookTableController } from 'presentation/controllers/BookTable'
import { makeBookTableController } from 'presentation/controllers/BookTable/factory'
import { ResponseHelper } from 'main/helpers/Response'

@Module({
  controllers: [BookingsController],
  providers: [
    {
      provide: BookTableController,
      useFactory: makeBookTableController,
    },
    ResponseHelper,
  ],
})
export class BookingsModule {}
