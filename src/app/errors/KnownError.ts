export class KnownError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 500) {
    super(message)
    this.name = 'KNOWN_ERROR'
    this.statusCode = statusCode
  }
}
