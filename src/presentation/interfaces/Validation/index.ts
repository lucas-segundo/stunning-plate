export interface ValidationError {
  code: string
  field: string
  message: string
}

export interface Validation<Data = Record<string, any>> {
  validate: (data: Data) => ValidationError[]
}
