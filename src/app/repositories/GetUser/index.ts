import { User } from 'entities/User'

export interface GetUserRepository {
  get(id: string): Promise<User>
}
