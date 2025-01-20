import { ResponseHelper } from '.'
import {
  HTTPResponse,
  HTTPErrorResponse,
} from 'presentation/interfaces/Controller'
import {
  ValidationError,
  ValidationFieldError,
} from 'app/errors/ValidationError'
import { Response } from 'express'
import { UnexpectedError } from 'app/errors/UnexpectedError'

describe('ResponseHelper', () => {
  let responseHelper: ResponseHelper
  let res: Response

  beforeEach(() => {
    responseHelper = new ResponseHelper()
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
  })

  it('should respond with HTTPResponse', () => {
    const data = { message: 'Success' }
    const result = new HTTPResponse(data, 200)
    responseHelper.respond(res, result)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(data)
  })

  it('should respond with HTTPErrorResponse and ValidationError', () => {
    const fields: ValidationFieldError[] = [
      {
        code: 'INVALID_TYPE',
        name: 'name',
        message: 'Expected string, received number',
      },
    ]
    const error = new ValidationError(fields)
    const result = new HTTPErrorResponse(error)

    responseHelper.respond(res, result)
    expect(res.status).toHaveBeenCalledWith(error.statusCode)
    expect(res.json).toHaveBeenCalledWith({
      code: error.name,
      message: error.message,
      fields: error.fieldErrors,
    })
  })

  it('should respond with HTTPErrorResponse and other errors', () => {
    const error = new UnexpectedError()
    const result = new HTTPErrorResponse(error)

    responseHelper.respond(res, result)
    expect(res.status).toHaveBeenCalledWith(error.statusCode)
    expect(res.json).toHaveBeenCalledWith({
      code: error.name,
      message: error.message,
    })
  })
})
