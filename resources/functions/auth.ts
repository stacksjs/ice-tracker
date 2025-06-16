import type { ErrorResponse, MeResponse, RegisterError, RegisterResponse, User, UserData } from '../types/ice'

const baseUrl = 'http://localhost:3008'

export function useAuth() {
  const user = ref<UserData | null>(null)
  const isAuthenticated = ref(false)

  async function fetchUser() {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        isAuthenticated.value = false
        user.value = null
        return null
      }

      const response = await fetch(`${baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        localStorage.removeItem('token')
        isAuthenticated.value = false
        user.value = null
        return null
      }

      const data = await response.json() as MeResponse
      user.value = data.user
      isAuthenticated.value = true
      return data.user
    }
    catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('token')
      isAuthenticated.value = false
      user.value = null
      return null
    }
  }

  async function checkAuthentication(): Promise<boolean> {
    try {
      const userData = await fetchUser()
      return userData !== null
    }
    catch (error) {
      console.error('Error checking authentication:', error)
      return false
    }
  }

  async function register(user: User): Promise<RegisterResponse | RegisterError> {
    const url = `${baseUrl}/register`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data = await response.json() as RegisterResponse | RegisterError

    if (isRegisterError(data)) {
      return data
    }

    if (isRegisterResponse(data)) {
      console.log(data.data.token)
      localStorage.setItem('token', data.data.token)
      return data
    }

    return data
  }

  function isRegisterError(data: RegisterResponse | RegisterError): data is RegisterError {
    return 'errors' in data
  }

  function isRegisterResponse(data: RegisterResponse | RegisterError): data is RegisterResponse {
    return 'data' in data && 'token' in data.data
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

      const data = await response.json() as RegisterResponse
      localStorage.setItem('token', data.data.token)
      await fetchUser() // Fetch user data after successful login
      return data
    }
    catch (error) {
      return error
    }
  }

  async function logout() {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await fetch(`${baseUrl}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
      }
    }
    catch (error) {
      console.error('Error during logout:', error)
    }
    finally {
      localStorage.removeItem('token')
      user.value = null
      isAuthenticated.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser,
    checkAuthentication,
  }
}
