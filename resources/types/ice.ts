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

export type ValidationError = {
  [key: string]: {
    message: string
  }[]
}

export type ResponseError = {
  error: string
} | ValidationError

export function isGeneralError(error: ResponseError): error is { error: string } {
  return 'error' in error
}

export interface RegisterError {
  errors: ResponseError
}

export interface RegisterResponse {
  data: {
    token: string
    user: {
      id: number
      email: string
      name: string
    }
  }
}

export interface Response<T> {
  errors: ResponseError
  data: T
}

export interface User {
  name: string
  email: string
  password: string
}

export interface ErrorResponse {
  message: string
}

export interface UserData {
  id: number
  email: string
  name: string
}

export interface MeResponse {
  user: UserData
}