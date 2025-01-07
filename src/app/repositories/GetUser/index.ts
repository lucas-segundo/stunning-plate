import { User } from 'src/entities/User'

export interface GetUserRepository {
  get(id: string): Promise<User>
}
