import { User } from 'entities/User'

export type CreateUserRepositoryParams = Omit<User, 'id'>

export interface CreateUserRepository {
  create(params: CreateUserRepositoryParams): Promise<User>
}
