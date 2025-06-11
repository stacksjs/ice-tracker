interface User {
  name: string
  email: string
  password: string
}

interface ErrorResponse {
  message: string
}

const baseUrl = 'http://localhost:3008'

export function useAuth() {
  async function register(user: User) {
    try {
      const url = `${baseUrl}/register`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (!response.ok) {
        const errorData = await response.json() as ErrorResponse
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    }
    catch (error) {
      console.error(error)
      return error
    }
  }

  async function login(user: User) {
    try {
      const url = `${baseUrl}/login`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (!response.ok) {
        const errorData = await response.json() as ErrorResponse
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    }
    catch (error) {
      console.error(error)
      return error
    }
  }

  return {
    register,
    login,
  }
}
