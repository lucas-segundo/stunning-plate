import { BookTableController } from '.'
import { HTTPResponse } from '../../interfaces/Controller'
import {
  mockBookTableUseCase,
  mockBookTableUseCaseDTO,
} from 'app/useCases/BookTable/mock'
import { mockBooking } from 'entities/Booking/mock'
import { mockValidation } from 'presentation/interfaces/Validation/mock'

export const mockBookTableControllerParams = () => {
  const dto = mockBookTableUseCaseDTO()

  return {
    ...dto,
    date: dto.date.toDateString(),
  }
}

const makeMocks = () => {
  const { bookTableUseCase } = mockBookTableUseCase()
  const validation = mockValidation()
  validation.validate.mockResolvedValue()

  const sut = new BookTableController(bookTableUseCase, validation)

  const bookSpy = jest.spyOn(bookTableUseCase, 'book')
  const booking = mockBooking()
  bookSpy.mockResolvedValueOnce(booking)

  return { sut, bookSpy, booking, validation }
}

describe('BookTableController', () => {
  it('should call create table repo with right params', async () => {
    const { sut, bookSpy } = makeMocks()
    const params = mockBookTableControllerParams()
    await sut.handle(params)

    expect(bookSpy).toHaveBeenCalledWith({
      ...params,
      date: new Date(params.date),
    })
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeMocks()
    const params = mockBookTableControllerParams()
    await sut.handle(params)

    expect(validation.validate).toHaveBeenCalledWith(params)
  })

  it('should return 201 on success', async () => {
    const { sut, booking } = makeMocks()

    const response = (await sut.handle(
      mockBookTableControllerParams(),
    )) as HTTPResponse

    expect(response.data).toBe(booking)
    expect(response.statusCode).toBe(201)
  })
})
