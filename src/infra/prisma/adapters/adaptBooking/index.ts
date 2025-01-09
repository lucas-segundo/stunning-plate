import { Booking as PrismaBooking } from '@prisma/client'
import { Booking } from 'entities/Booking'

export const adaptBookingFromPrisma = ({
  id,
  userID,
  tableID,
  date,
}: Pick<PrismaBooking, 'id' | 'userID' | 'tableID' | 'date'>): Booking => {
  return {
    id: id.toString(),
    userID: userID.toString(),
    tableID: tableID.toString(),
    date,
  }
}
