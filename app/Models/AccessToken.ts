import type { Model } from '@stacksjs/types'
import { collect } from '@stacksjs/collections'
import { faker } from '@stacksjs/faker'
import { schema } from '@stacksjs/validation'

export default {
  name: 'AccessToken', // defaults to the sanitized file name
  table: 'personal_access_tokens', // defaults to the lowercase, plural name of the model name (or the name of the model file)
  primaryKey: 'id', // defaults to `id`
  autoIncrement: true, // defaults to true
  belongsTo: ['Team'],
  traits: {
    useTimestamps: true, // defaults to true
    useSeeder: {
      // defaults to a count of 10
      count: 10,
    },
  },

  attributes: {
    name: {
      fillable: true,
      validation: {
        rule: schema.string(),
        message: {
          string: 'name must be a string',
          required: 'name is required',
        },
      },

      factory: () => faker.lorem.sentence({ min: 3, max: 6 }),
    },

    token: {
      fillable: true,
      unique: true,
      validation: {
        rule: schema.string().maxLength(512),
        message: {
          string: 'token must be a string',
          required: 'token is required',
          maxLength: 'token must have a maximum of 512 characters',
        },
      },

      factory: () => faker.string.uuid(),
    },

    plainTextToken: {
      fillable: true,
      validation: {
        rule: schema.string().maxLength(512),
        message: {
          string: 'plainTextToken must be a string',
          required: 'plainTextToken is required',
          maxLength: 'plainTextToken must have a maximum of 512 characters',
        },
      },

      factory: () => faker.string.uuid(),
    },

    abilities: {
      fillable: true,
      validation: {
        rule: schema.enum(['read', 'write', 'admin', 'read|write', 'read|admin', 'write|admin', 'read|write|admin']),
        message: {
          required: 'abilities is required',
          maxLength: 'plainTextToken must have a maximum of 512 characters',
          string:
            '`abilities` must be string of either `read`, `write`, `admin`, `read|write`, `read|admin`, `write|admin`, or `read|write|admin`',
        },
      },

      factory: () =>
        collect(['read', 'write', 'admin', 'read|write', 'read|admin', 'write|admin', 'read|write|admin']).random().first(),
    },
  },
} satisfies Model
