export interface Activity {
  id?: number
  title: string
  description: string
  location: [number, number]
  address: string
  infoSource: 'news' | 'social-media' | 'friends'
  wereDetained: boolean
  latlng: string
  date: string
  severity: 'minor' | 'moderate' | 'severe'
  images?: File[]
}