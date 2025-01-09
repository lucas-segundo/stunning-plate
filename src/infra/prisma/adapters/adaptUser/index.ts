import { User as PrismaUser } from '@prisma/client'
import { User } from 'entities/User'

export const adaptUserFromPrisma = ({ id, name }: PrismaUser): User => {
  return {
    id: id.toString(),
    name,
  }
}
