import type { Model } from '@stacksjs/types'
import { schema } from '@stacksjs/validation'

export default {
  name: 'PrintDevice',
  table: 'print_devices',
  primaryKey: 'id',
  autoIncrement: true,
  hasMany: ['Receipt'],
  traits: {
    useUuid: true,
    useTimestamps: true,
    useSearch: {
      displayable: ['id', 'name', 'macAddress', 'location', 'terminal', 'status', 'lastPing', 'printCount'],
      searchable: ['name', 'macAddress', 'location', 'terminal'],
      sortable: ['lastPing', 'printCount'],
      filterable: ['status'],
    },

    useSeeder: {
      count: 5,
    },

    useApi: {
      uri: 'print-devices',
    },

    observe: true,
  },

  attributes: {
    name: {
      required: true,
      order: 1,
      fillable: true,
      validation: {
        rule: schema.string().maxLength(100),
        message: {
          maxLength: 'Device name must have a maximum of 100 characters',
        },
      },
      factory: faker => faker.company.name(),
    },

    macAddress: {
      required: true,
      order: 2,
      fillable: true,
      validation: {
        rule: schema.string().maxLength(50),
        message: {
          maxLength: 'MAC address must have a maximum of 50 characters',
        },
      },
      factory: faker => faker.internet.mac(),
    },

    location: {
      required: true,
      order: 3,
      fillable: true,
      validation: {
        rule: schema.string().maxLength(100),
        message: {
          maxLength: 'Location must have a maximum of 100 characters',
        },
      },
      factory: faker => faker.location.streetAddress(),
    },

    terminal: {
      required: true,
      order: 4,
      fillable: true,
      validation: {
        rule: schema.string().maxLength(50),
        message: {
          maxLength: 'Terminal must have a maximum of 50 characters',
        },
      },
      factory: faker => faker.string.alphanumeric(10),
    },

    status: {
      required: true,
      order: 5,
      fillable: true,
      validation: {
        rule: schema.enum(['online', 'offline', 'warning'] as const),
      },
      factory: faker => faker.helpers.arrayElement(['online', 'offline', 'warning']),
    },

    lastPing: {
      required: true,
      order: 6,
      fillable: true,
      validation: {
        rule: schema.number(),
        message: {
          invalid: 'Invalid timestamp format',
        },
      },
      factory: faker => faker.date.recent().toISOString(),
    },

    printCount: {
      required: true,
      order: 7,
      fillable: true,
      validation: {
        rule: schema.number().min(0),
        message: {
          min: 'Print count cannot be negative',
        },
      },
      factory: faker => faker.number.int({ min: 0, max: 1000 }),
    },
  },

  dashboard: {
    highlight: true,
  },
} satisfies Model
