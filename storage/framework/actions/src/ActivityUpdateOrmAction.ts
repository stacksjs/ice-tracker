import type { ActivityRequestType } from '@stacksjs/orm'
import { Action } from '@stacksjs/actions'

import { Activity } from '@stacksjs/orm'
import { response } from '@stacksjs/router'

export default new Action({
  name: 'Activity Update',
  description: 'Activity Update ORM Action',
  method: 'PATCH',
  async handle(request: ActivityRequestType) {
    await request.validate()

    const id = request.getParam('id')
    const model = await Activity.findOrFail(id)

    const result = model?.update(request.all())

    return response.json(result)
  },
})
