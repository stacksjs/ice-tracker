import type { RequestInstance } from '@stacksjs/types'
import { Action } from '@stacksjs/actions'
import { log } from '@stacksjs/logging'
import { Activity } from '@stacksjs/orm'
import { response } from '@stacksjs/router'

export default new Action({
  name: 'FetchActivities',
  description: 'Fetches all activities from the database.',

  async handle(_request: RequestInstance) {
    try {
      const activities = await Activity.all()

      log.info('Activities fetched', { count: activities.length })

      return response.json({ activities })
    }
    catch (error) {
      console.error(error)
      log.error('Error fetching activities', { error })

      return response.error(error instanceof Error ? error.message : 'Unknown error')
    }
  },
}) 