export interface Activity {
  id: number
  title: string
  description: string
  location: [number, number]
  date: string
  severity: 'minor' | 'moderate' | 'severe'
  images?: File[]
}