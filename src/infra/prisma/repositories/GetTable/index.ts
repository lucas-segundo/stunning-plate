import { NotFoundError } from 'app/errors/NotFoundError'
import { GetTableRepository } from 'app/repositories/GetTable'
import { Table } from 'entities/Table'
import prisma from 'infra/prisma'
import { adaptTableFromPrisma } from 'infra/prisma/adapters/adaptTable'

export class PrismaGetTableRepository implements GetTableRepository {
  async get(id: string): Promise<Table> {
    const prismaTable = await prisma.table.findFirst({
      where: {
        id: Number(id),
      },
    })

    if (prismaTable) {
      return adaptTableFromPrisma(prismaTable)
    } else {
      throw new NotFoundError('Table not found')
    }
  }
}
