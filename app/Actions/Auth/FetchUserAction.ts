import type { RequestInstance } from '@stacksjs/types'
import { Action } from '@stacksjs/actions'
import { response } from '@stacksjs/router'

export default new Action({
  name: 'FetchUserAction',
  description: 'Fetch user data',
  method: 'GET',
  async handle(request: RequestInstance) {
    const user = await request.user()

    return response.json({
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      },
    })
  },
})
