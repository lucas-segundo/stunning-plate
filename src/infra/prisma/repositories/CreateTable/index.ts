import {
  CreateTableRepository,
  CreateTableRepositoryParams,
} from 'app/repositories/CreateTable'
import { Table } from 'entities/Table'
import prisma from 'infra/prisma'
import { adaptTableFromPrisma } from 'infra/prisma/adapters/adaptTable'

export class PrismaCreateTableRepository implements CreateTableRepository {
  async create({ seats, status }: CreateTableRepositoryParams): Promise<Table> {
    const table = await prisma.table.create({
      data: {
        seats,
        status,
      },
      select: {
        id: true,
        seats: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return adaptTableFromPrisma(table)
  }
}
