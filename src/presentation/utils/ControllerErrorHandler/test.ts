import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'
import { ControllerErrorHandler } from './index'

class TestControllerErrorHandler extends ControllerErrorHandler {}

describe('ControllerErrorHandler', () => {
  let errorHandler: ControllerErrorHandler

  beforeEach(() => {
    errorHandler = new TestControllerErrorHandler()
  })

  it('should return HTTPErrorResponse with KnownError', () => {
    const knownError = new KnownError('Known error occurred', 400)
    const response = errorHandler.handleError(knownError)
    expect(response).toBeInstanceOf(HTTPErrorResponse)
    expect(response.error).toBe(knownError)
  })

  it('should return HTTPErrorResponse with UnexpectedError for unknown error', () => {
    const unknownError = new Error('Unknown error occurred')
    const response = errorHandler.handleError(unknownError)
    expect(response).toBeInstanceOf(HTTPErrorResponse)
    expect(response.error).toBeInstanceOf(UnexpectedError)
  })
})
