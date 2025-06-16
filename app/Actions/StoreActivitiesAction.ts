import type { ActivityJsonResponse } from '@stacksjs/orm'
import { Action } from '@stacksjs/actions'
import { log } from '@stacksjs/logging'
import { Activity } from '@stacksjs/orm'

export default new Action({
  name: 'StoreActivities',
  description: 'Stores a new activity in the database.',

  async handle(request: Request) {
    try {
      const data = await request.json() as Partial<ActivityJsonResponse>

      // Validate required fields
      if (!data.title || !data.description) {
        return {
          status: 400,
          message: 'Title and description are required',
        }
      }

      // Validate location data
      if (!data.latlng && !data.address) {
        return {
          status: 400,
          message: 'Either latlng or address is required',
        }
      }

      // Create the activity record
      const activity = await Activity.create({
        title: data.title,
        description: data.description,
        address: data.address || '',
        latlng: data.latlng || '',
        info_source: data.infoSource || 'news',
        were_detained: data.wereDetained,
      })

      log.info('Activity created', { activityId: activity.id })

      return {
        status: 201,
        activity,
      }
    }
    catch (error) {
      log.error('Error creating activity', { error })

      return {
        status: 500,
        message: 'Failed to create activity',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },
})
