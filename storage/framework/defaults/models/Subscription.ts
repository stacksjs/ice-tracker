import type { Model } from '@stacksjs/types'
import { faker } from '@stacksjs/faker'
import { schema } from '@stacksjs/validation'

export default {
  name: 'Subscription', // defaults to the sanitized file name
  table: 'subscriptions', // defaults to the lowercase, plural name of the model name (or the name of the model file)
  primaryKey: 'id', // defaults to `id`
  autoIncrement: true, // defaults to true
  belongsTo: ['User'],
  traits: {
    useUuid: true,
  },
  attributes: {
    type: {
      required: true,
      fillable: true,
      validation: {
        rule: schema.string().maxLength(512),
        message: {
          string: 'type must be a string',
          required: 'type is required',
          maxLength: 'type must have a maximum of 512 characters',
        },
      },
      factory: () => faker.lorem.lines(1),
    },

    providerId: {
      required: true,
      unique: true,
      fillable: true,
      validation: {
        rule: schema.string().maxLength(512),
        message: {
          string: 'provider_id must be a string',
          required: 'provider_id is required',
          maxLength: 'provider_id must have a maximum of 512 characters',
        },
      },
      factory: () => faker.string.alphanumeric(10),
    },

    providerStatus: {
      required: true,
      fillable: true,
      validation: {
        rule: schema.string(),
        message: {
          string: 'provider_status must be a string',
          required: 'provider_status is required',
        },
      },
      factory: () => faker.string.alpha(10),
    },
    unitPrice: {
      fillable: true,
      validation: {
        rule: schema.number(),
        message: {
          string: 'unit_price must be a number',
          required: 'unit_price is required',
        },
      },
      factory: () => faker.number.int({ min: 1000, max: 10000 }),
    },

    providerType: {
      required: true,
      fillable: true,
      validation: {
        rule: schema.string(),
        message: {
          string: 'provider_type must be a string',
          required: 'provider_type is required',
        },
      },
      factory: () => faker.string.alpha(10),
    },

    providerPriceId: {
      fillable: true,
      validation: {
        rule: schema.string(),
        message: {
          string: 'provider_price_id must be a string',
        },
      },
      factory: () => faker.commerce.price(),
    },

    quantity: {
      fillable: true,
      validation: {
        rule: schema.number(),
        message: {
          number: 'quantity must be a number',
        },
      },
      factory: () => faker.number.int(100),
    },

    trialEndsAt: {
      fillable: true,
      validation: {
        rule: schema.string(),
        message: {
          string: 'trial_ends_at must be a string',
        },
      },
      factory: () => faker.date.future().toString(),
    },

    endsAt: {
      fillable: true,
      validation: {
        rule: schema.string(),
        message: {
          string: 'ends_at must be a string',
        },
      },
      factory: () => faker.date.future().toString(),
    },

    lastUsedAt: {
      validation: {
        rule: schema.string(),
        message: {
          string: 'last_used_at must be a string',
        },
      },
      fillable: true,
      factory: () => faker.date.recent().toString(),
    },
  },
} satisfies Model
