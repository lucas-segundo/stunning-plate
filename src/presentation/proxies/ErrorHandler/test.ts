import { ErrorHandlerProxy } from './index'
import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'
import { mockController } from 'presentation/interfaces/Controller/mock'

describe('ErrorHandlerProxy', () => {
  let errorHandlerProxy: ErrorHandlerProxy
  let controller: Controller

  beforeEach(() => {
    controller = mockController()
    errorHandlerProxy = new ErrorHandlerProxy(controller)
  })

  it('should return the response from the controller handle method', async () => {
    const params = {}
    const response = new HTTPResponse({}, 200)
    controller.handle = jest.fn().mockResolvedValue(response)

    const result = await errorHandlerProxy.handle(params)

    expect(result).toBe(response)
    expect(controller.handle).toHaveBeenCalledWith(params)
  })

  it('should return HTTPErrorResponse for KnownError', async () => {
    const params = {}
    const error = new KnownError('Known error')
    controller.handle = jest.fn().mockRejectedValue(error)

    const result = (await errorHandlerProxy.handle(params)) as HTTPErrorResponse

    expect(result).toBeInstanceOf(HTTPErrorResponse)
    expect(result.error).toBe(error)
  })

  it('should return HTTPErrorResponse for UnexpectedError', async () => {
    const params = {}
    const error = new Error('Unexpected error')
    controller.handle = jest.fn().mockRejectedValue(error)

    const result = (await errorHandlerProxy.handle(params)) as HTTPErrorResponse

    expect(result).toBeInstanceOf(HTTPErrorResponse)
    expect(result.error).toBeInstanceOf(UnexpectedError)
  })
})
