import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { makeCreateUserController } from 'presentation/controllers/CreateUser/factory'
import { CreateUserController } from 'presentation/controllers/CreateUser'

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: CreateUserController,
      useFactory: makeCreateUserController,
    },
  ],
})
export class UsersModule {}
