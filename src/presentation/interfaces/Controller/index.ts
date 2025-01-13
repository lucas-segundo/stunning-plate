import { KnownError } from 'app/errors/KnownError'

export interface Controller {
  handle: (params: any) => Promise<HTTPResponse | HTTPErrorResponse>
}

export class HTTPResponse<Data = any> {
  constructor(
    public data: Data,
    public statusCode: number,
  ) {}
}

export class HTTPErrorResponse {
  constructor(public error: KnownError) {}
}
