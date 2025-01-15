import { Module } from '@nestjs/common'
import { TablesController } from './tables.controller'
import { CreateTableController } from 'presentation/controllers/CreateTable'
import { makeCreateTableController } from 'presentation/controllers/CreateTable/factory'

@Module({
  controllers: [TablesController],
  providers: [
    {
      provide: CreateTableController,
      useFactory: makeCreateTableController,
    },
  ],
})
export class TablesModule {}
