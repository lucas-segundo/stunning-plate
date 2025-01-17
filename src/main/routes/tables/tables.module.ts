import { Module } from '@nestjs/common'
import { TablesController } from './tables.controller'
import { CreateTableController } from 'presentation/controllers/CreateTable'
import { makeCreateTableController } from 'presentation/controllers/CreateTable/factory'
import { makeGetTablesController } from 'presentation/controllers/GetTables/factory'
import { GetTablesController } from 'presentation/controllers/GetTables'

@Module({
  controllers: [TablesController],
  providers: [
    {
      provide: CreateTableController,
      useFactory: makeCreateTableController,
    },
    {
      provide: GetTablesController,
      useFactory: makeGetTablesController,
    },
  ],
})
export class TablesModule {}
