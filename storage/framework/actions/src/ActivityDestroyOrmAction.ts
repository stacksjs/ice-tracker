import type { ActivityRequestType } from '@stacksjs/orm'
import { Action } from '@stacksjs/actions'

import { Activity } from '@stacksjs/orm'
import { response } from '@stacksjs/router'

export default new Action({
  name: 'Activity Destroy',
  description: 'Activity Destroy ORM Action',
  method: 'DELETE',
  async handle(request: ActivityRequestType) {
    const id = request.getParam('id')

    const model = await Activity.findOrFail(id)

    model?.delete()

    return response.json({ message: 'Model deleted!' })
  },
})
