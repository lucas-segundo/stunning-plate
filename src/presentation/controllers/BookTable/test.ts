import { BookTableController } from '.'
import { HTTPResponse } from '../../interfaces/Controller'
import {
  mockBookTableUseCase,
  mockBookTableUseCaseDTO,
} from 'app/useCases/BookTable/mock'
import { mockBooking } from 'entities/Booking/mock'

const makeMocks = () => {
  const { bookTableUseCase } = mockBookTableUseCase()
  const sut = new BookTableController(bookTableUseCase)
  const bookSpy = jest.spyOn(bookTableUseCase, 'book')

  return { sut, bookSpy }
}

describe('BookTableController', () => {
  it('should call create table repo with right params', async () => {
    const { sut, bookSpy } = makeMocks()

    const params = mockBookTableUseCaseDTO()
    await sut.handle(params)

    expect(bookSpy).toHaveBeenCalledWith(params)
  })

  it('should return 201 on success', async () => {
    const { sut, bookSpy } = makeMocks()
    const booking = mockBooking()
    bookSpy.mockResolvedValueOnce(booking)

    const response = (await sut.handle(
      mockBookTableUseCaseDTO(),
    )) as HTTPResponse

    expect(response.data).toBe(booking)
    expect(response.statusCode).toBe(201)
  })
})
