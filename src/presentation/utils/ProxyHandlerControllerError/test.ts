import { ProxyHandlerControllerError } from './index'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'
import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'

describe('ProxyHandlerControllerError', () => {
  let proxyHandler: ProxyHandlerControllerError
  let target: any

  beforeEach(() => {
    proxyHandler = new ProxyHandlerControllerError()
    target = {
      method: jest.fn().mockResolvedValue('result'),
      property: 'value',
    }
  })

  it('should proxy method calls and handle success', async () => {
    const proxy = new Proxy(target, proxyHandler)
    const result = await proxy.method('param')
    expect(result).toBe('result')
    expect(target.method).toHaveBeenCalledWith(['param'])
  })

  it('should proxy method calls and handle KnownError', async () => {
    target.method.mockRejectedValue(new KnownError('Known error', 400))
    const proxy = new Proxy(target, proxyHandler)
    const result = await proxy.method('param')
    expect(result).toBeInstanceOf(HTTPErrorResponse)
    expect(result.error).toBeInstanceOf(KnownError)
  })

  it('should proxy method calls and handle unexpected errors', async () => {
    target.method.mockRejectedValue(new Error('Unexpected error'))
    const proxy = new Proxy(target, proxyHandler)
    const result = await proxy.method('param')
    expect(result).toBeInstanceOf(HTTPErrorResponse)
    expect(result.error).toBeInstanceOf(UnexpectedError)
  })

  it('should return properties directly', () => {
    const proxy = new Proxy(target, proxyHandler)
    expect(proxy.property).toBe('value')
  })
})
