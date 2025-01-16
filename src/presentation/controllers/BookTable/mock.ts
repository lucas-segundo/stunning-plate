import { mockBookTableUseCaseDTO } from 'app/useCases/BookTable/mock'

export const mockBookTableControllerParams = () => {
  const dto = mockBookTableUseCaseDTO()

  return {
    ...dto,
    date: dto.date.toDateString(),
  }
}
