import type { Activity } from '@/types/ice'
import { ref } from 'vue'

const baseUrl = 'http://localhost:3008'

interface ActivitiesResponse {
  activities: Activity[]
}

interface ActivityResponse {
  activity: Activity
}

function getBearerToken(): string | null {
  const token = localStorage.getItem('token')
  return token ? `Bearer ${token}` : null
}

export function useTracker() {
  const activities = ref<Activity[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchActivities() {
    try {
      isLoading.value = true
      error.value = null

      const token = getBearerToken()
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${baseUrl}/activities`, {
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch activities')
      }

      const data = await response.json() as ActivitiesResponse
      activities.value = data.activities
      return data.activities
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return []
    }
    finally {
      isLoading.value = false
    }
  }

  async function createActivity(activity: Partial<Activity>) {
    try {
      isLoading.value = true
      error.value = null

      const token = getBearerToken()
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${baseUrl}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(activity),
      })

      if (!response.ok) {
        throw new Error('Failed to create activity')
      }

      const data = await response.json() as ActivityResponse
      activities.value.push(data.activity)
      return data.activity
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function updateActivity(id: number, activity: Partial<Activity>) {
    try {
      isLoading.value = true
      error.value = null

      const token = getBearerToken()
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${baseUrl}/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(activity),
      })

      if (!response.ok) {
        throw new Error('Failed to update activity')
      }

      const data = await response.json() as ActivityResponse
      const index = activities.value.findIndex(a => a.id === id)
      if (index !== -1) {
        activities.value[index] = data.activity
      }
      return data.activity
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteActivity(id: number) {
    try {
      isLoading.value = true
      error.value = null

      const token = getBearerToken()
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`${baseUrl}/activities/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete activity')
      }

      activities.value = activities.value.filter(a => a.id !== id)
      return true
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    activities,
    isLoading,
    error,
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
  }
}
