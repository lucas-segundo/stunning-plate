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
  constructor(
    public error: Error,
    public statusCode: number,
  ) {}
}
