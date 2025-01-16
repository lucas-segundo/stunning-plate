import { BookTableController } from '.'
import { HTTPResponse } from '../../interfaces/Controller'
import { mockBookTableUseCase } from 'app/useCases/BookTable/mock'
import { mockBooking } from 'entities/Booking/mock'
import { mockBookTableControllerParams } from './mock'

const makeMocks = () => {
  const { bookTableUseCase } = mockBookTableUseCase()

  const sut = new BookTableController(bookTableUseCase)

  const bookSpy = jest.spyOn(bookTableUseCase, 'book')
  const booking = mockBooking()
  bookSpy.mockResolvedValueOnce(booking)

  return { sut, bookSpy, booking }
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

  it('should return 201 on success', async () => {
    const { sut, booking } = makeMocks()

    const response = (await sut.handle(
      mockBookTableControllerParams(),
    )) as HTTPResponse

    expect(response.data).toBe(booking)
    expect(response.statusCode).toBe(201)
  })
})
