import { Injectable } from '@nestjs/common'
import { ValidationError } from 'app/errors/ValidationError'
import { Response } from 'express'
import {
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

@Injectable()
export class ResponseHelper {
  constructor() {}

  respond(res: Response, result: HTTPResponse | HTTPErrorResponse) {
    if (result instanceof HTTPResponse) {
      return res.status(result.statusCode).json(result.data)
    } else if (result.error instanceof ValidationError) {
      return res.status(result.error.statusCode).json({
        code: result.error.name,
        message: result.error.message,
        fields: result.error.fieldErrors,
      })
    } else {
      return res.status(result.error.statusCode).json({
        code: result.error.name,
        message: result.error.message,
      })
    }
  }
}
