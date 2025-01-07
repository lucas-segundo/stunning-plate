export interface Table {
  id: string
  status: 'free' | 'occupied' | 'reserved'
  seats: number
}
