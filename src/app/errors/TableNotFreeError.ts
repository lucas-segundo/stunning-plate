import { KnownError } from './KnownError'

export class TableNotFreeError extends KnownError {
  constructor() {
    super('Table is not free', 400)
    this.name = 'TABLE_NOT_FREE_ERROR'
  }
}
