import { User } from 'entities/User'
import { PrismaUser } from 'infra/prisma/models/User'

export const adaptUserFromPrisma = ({
  id,
  name,
}: Pick<PrismaUser, 'id' | 'name'>): User => {
  return {
    id: id.toString(),
    name,
  }
}
