import { HTTPErrorResponse } from 'presentation/interfaces/Controller'
import { UseErrorHandler } from '.'

const jestFN = jest.fn()

class TestClass {
  @UseErrorHandler()
  async testMethod() {
    return jestFN()
  }
}

describe('UseErrorHandler', () => {
  it('should call the original method', async () => {
    const testClass = new TestClass()

    testClass.testMethod()

    expect(jestFN).toHaveBeenCalled()
  })

  it('should return an error response when an error is thrown', async () => {
    jestFN.mockImplementation(() => {
      throw new Error('Test Error')
    })
    const testClass = new TestClass()
    const response =
      (await testClass.testMethod()) as unknown as HTTPErrorResponse

    expect(response).toBeInstanceOf(HTTPErrorResponse)
  })
})
