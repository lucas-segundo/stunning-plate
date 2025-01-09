import {
  GetTablesRepository,
  GetTablesRepositoryParams,
} from 'app/repositories/GetTables'
import { Table } from 'entities/Table'
import prisma from 'infra/prisma'
import { adaptTableFromPrisma } from 'infra/prisma/adapters/adaptTable'

export class PrismaGetTablesRepository implements GetTablesRepository {
  async get({ where }: GetTablesRepositoryParams): Promise<Table[]> {
    const prismaTables = await prisma.table.findMany({
      where: {
        status: where?.status?.equals,
      },
    })

    return prismaTables.map((prismaTable) => adaptTableFromPrisma(prismaTable))
  }
}
