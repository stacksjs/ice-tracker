import type { Model } from '@stacksjs/types'
import { schema } from '@stacksjs/validation'

export default {
  name: 'WaitlistRestaurant',
  table: 'waitlist_restaurants',
  primaryKey: 'id',
  autoIncrement: true,
  belongsTo: ['Customer'],
  traits: {
    useUuid: true,
    useTimestamps: true,
    useSearch: {
      displayable: ['id', 'name', 'email', 'phone', 'partySize', 'checkInTime', 'tablePreference', 'status', 'quotedWaitTime', 'actualWaitTime', 'queuePosition'],
      searchable: ['name', 'email', 'phone'],
      sortable: ['name', 'partySize', 'checkInTime', 'createdAt', 'updatedAt', 'status', 'queuePosition'],
      filterable: ['tablePreference', 'status'],
    },

    useSeeder: {
      count: 10,
    },

    useApi: {
      uri: 'waitlist-restaurants',
    },

    observe: true,
  },

  attributes: {
    name: {
      required: true,
      order: 1,
      fillable: true,
      validation: {
        rule: schema.string().max(255),
        message: {
          max: 'Name must have a maximum of 255 characters',
        },
      },
      factory: faker => faker.person.fullName(),
    },

    email: {
      required: true,
      order: 2,
      fillable: true,
      validation: {
        rule: schema.string().email().max(255),
        message: {
          max: 'Email must have a maximum of 255 characters',
        },
      },
      factory: faker => faker.internet.email(),
    },

    phone: {
      required: false,
      order: 3,
      fillable: true,
      validation: {
        rule: schema.string().max(100),
        message: {
          max: 'Phone number must have a maximum of 100 characters',
        },
      },
      factory: faker => faker.phone.number(),
    },

    partySize: {
      required: true,
      order: 4,
      fillable: true,
      validation: {
        rule: schema.number().min(1),
        message: {
          min: 'Party size must be at least 1',
        },
      },
      factory: faker => faker.number.int({ min: 1, max: 20 }),
    },

    checkInTime: {
      required: true,
      order: 5,
      fillable: true,
      validation: {
        rule: schema.timestamp(),
      },
      factory: faker => faker.date.future().getTime(),
    },

    tablePreference: {
      required: true,
      order: 6,
      fillable: true,
      validation: {
        rule: schema.enum(['indoor', 'bar', 'booth', 'no_preference'] as const),
      },
      factory: faker => faker.helpers.arrayElement(['indoor', 'bar', 'booth', 'no_preference']),
    },

    status: {
      required: true,
      default: 'waiting',
      order: 7,
      fillable: true,
      validation: {
        rule: schema.enum(['waiting', 'seated', 'cancelled', 'no_show'] as const),
      },
      factory: faker => faker.helpers.arrayElement(['waiting', 'seated', 'cancelled', 'no_show']),
    },

    quoted_wait_time: {
      required: true,
      order: 8,
      fillable: true,
      validation: {
        rule: schema.number().min(0),
        message: {
          min: 'Quoted wait time must be at least 0 minutes',
        },
      },
      factory: faker => faker.number.int({ min: 0, max: 120 }),
    },

    actual_wait_time: {
      required: false,
      order: 9,
      fillable: true,
      validation: {
        rule: schema.number().min(0),
        message: {
          min: 'Actual wait time must be at least 0 minutes',
        },
      },
      factory: faker => faker.helpers.maybe(() => faker.number.int({ min: 0, max: 180 }), { probability: 0.7 }),
    },

    queue_position: {
      required: false,
      order: 10,
      fillable: true,
      validation: {
        rule: schema.number().min(1),
        message: {
          min: 'Queue position must be at least 1',
        },
      },
      factory: faker => faker.helpers.maybe(() => faker.number.int({ min: 1, max: 50 }), { probability: 0.7 }),
    },

    seatedAt: {
      required: false,
      order: 11,
      fillable: true,
      validation: {
        rule: schema.timestamp(),
      },
      factory: faker => faker.date.future().getTime(),
    },

    noShowAt: {
      required: false,
      order: 12,
      fillable: true,
      validation: {
        rule: schema.timestamp(),
      },
      factory: faker => faker.date.future().getTime(),
    },

    cancelledAt: {
      required: false,
      order: 13,
      fillable: true,
      validation: {
        rule: schema.timestamp(),
      },
      factory: faker => faker.date.future().getTime(),
    },
  },

  dashboard: {
    highlight: true,
  },
} satisfies Model
