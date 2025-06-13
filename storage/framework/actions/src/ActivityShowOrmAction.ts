import type { ActivityRequestType } from '@stacksjs/orm'
import { Action } from '@stacksjs/actions'

import { Activity } from '@stacksjs/orm'
import { response } from '@stacksjs/router'

export default new Action({
  name: 'Activity Show',
  description: 'Activity Show ORM Action',
  method: 'GET',
  async handle(request: ActivityRequestType) {
    const id = request.getParam('id')

    const model = await Activity.findOrFail(id)

    return response.json(model)
  },
})
