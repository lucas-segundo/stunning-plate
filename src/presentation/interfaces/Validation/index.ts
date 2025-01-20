export interface Validation<Data = Record<string, any>> {
  validate: (data: Data) => Promise<void>
}
