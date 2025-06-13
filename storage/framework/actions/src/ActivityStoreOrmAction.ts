import type { ActivityRequestType } from '@stacksjs/orm'
import { Action } from '@stacksjs/actions'

import { Activity } from '@stacksjs/orm'
import { response } from '@stacksjs/router'

export default new Action({
  name: 'Activity Store',
  description: 'Activity Store ORM Action',
  method: 'POST',
  async handle(request: ActivityRequestType) {
    await request.validate()
    const model = await Activity.create(request.all())

    return response.json(model)
  },
})
