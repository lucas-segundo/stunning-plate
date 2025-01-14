export class UnexpectedError extends Error {
  statusCode: number
  constructor() {
    super('An unexpected error occurred')
    this.name = 'UNEXPECTED_ERROR'
    this.statusCode = 500
  }
}
