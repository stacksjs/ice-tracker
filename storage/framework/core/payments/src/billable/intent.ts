import type { UserModelType } from '@stacksjs/orm'
import type Stripe from 'stripe'
import { manageCustomer, stripe } from '..'

export interface SetupIntent {
  create: (user: UserModelType, params: Stripe.SetupIntentCreateParams) => Promise<Stripe.Response<Stripe.SetupIntent>>
}

export const manageSetupIntent: SetupIntent = (() => {
  async function create(user: UserModelType, params: Stripe.SetupIntentCreateParams): Promise<Stripe.Response<Stripe.SetupIntent>> {
    const customerId = await manageCustomer.createOrGetStripeUser(user, {}).then((customer) => {
      if (!customer || !customer.id) {
        throw new Error('Customer does not exist in Stripe')
      }
      return customer.id
    })

    const defaultParams: Partial<Stripe.SetupIntentCreateParams> = {
      customer: customerId,
      payment_method_types: ['card'],
    }

    const mergedParams = { ...defaultParams, ...params }

    return await stripe.setupIntents.create(mergedParams)
  }

  return { create }
})()
