import type { StacksOptions } from '@stacksjs/types'
import { initializeDbConfig } from '../../database/src/utils'
import { defaults } from './defaults'
import { overrides } from './overrides'

// merged defaults and overrides
let configData: StacksOptions | null = null

export function getConfig(): StacksOptions {
  if (!configData) {
    configData = {
      ...defaults,
      ...overrides,
    }
    // Initialize the database config to avoid circular dependencies
    initializeDbConfig(configData)
  }
  return configData
}

export function getAi(): StacksOptions['ai'] {
  return getConfig().ai
}

export function getAnalytics(): StacksOptions['analytics'] {
  return getConfig().analytics
}

export function getApp(): StacksOptions['app'] {
  return getConfig().app
}

export function getAuth(): StacksOptions['auth'] {
  return getConfig().auth
}

export function getRealtime(): StacksOptions['realtime'] {
  return getConfig().realtime
}

export function getCache(): StacksOptions['cache'] {
  return getConfig().cache
}

export function getCloud(): StacksOptions['cloud'] {
  return getConfig().cloud
}

export function getCli(): StacksOptions['cli'] {
  return getConfig().cli
}

export function getDatabase(): StacksOptions['database'] {
  return getConfig().database
}

export function getDns(): StacksOptions['dns'] {
  return getConfig().dns
}

export function getDocs(): StacksOptions['docs'] {
  return getConfig().docs
}

export function getEmail(): StacksOptions['email'] {
  return getConfig().email
}

export function getErrors(): StacksOptions['errors'] {
  return getConfig().errors
}

export function getGit(): StacksOptions['git'] {
  return getConfig().git
}

export function getHashing(): StacksOptions['hashing'] {
  return getConfig().hashing
}

export function getLibrary(): StacksOptions['library'] {
  return getConfig().library
}

export function getLogging(): StacksOptions['logging'] {
  return getConfig().logging
}

export function getNotification(): StacksOptions['notification'] {
  return getConfig().notification
}

export function getPayment(): StacksOptions['payment'] {
  return getConfig().payment
}

export function getPorts(): StacksOptions['ports'] {
  return getConfig().ports
}

export function getQueue(): StacksOptions['queue'] {
  return getConfig().queue
}

export function getSecurity(): StacksOptions['security'] {
  return getConfig().security
}

export function getSaas(): StacksOptions['saas'] {
  return getConfig().saas
}

export function getSearchEngine(): StacksOptions['searchEngine'] {
  return getConfig().searchEngine
}

export function getServices(): StacksOptions['services'] {
  return getConfig().services
}

export function getStorage(): StacksOptions['storage'] {
  return getConfig().storage
}

export function getTeam(): StacksOptions['team'] {
  return getConfig().team
}

export function getUi(): StacksOptions['ui'] {
  return getConfig().ui
}

// Create a proxy object that maintains the same interface
export const config: StacksOptions = new Proxy({} as StacksOptions, {
  get(target, prop: keyof StacksOptions) {
    switch (prop) {
      case 'ai': return getAi()
      case 'analytics': return getAnalytics()
      case 'app': return getApp()
      case 'auth': return getAuth()
      case 'realtime': return getRealtime()
      case 'cache': return getCache()
      case 'cloud': return getCloud()
      case 'cli': return getCli()
      case 'database': return getDatabase()
      case 'dns': return getDns()
      case 'docs': return getDocs()
      case 'email': return getEmail()
      case 'errors': return getErrors()
      case 'git': return getGit()
      case 'hashing': return getHashing()
      case 'library': return getLibrary()
      case 'logging': return getLogging()
      case 'notification': return getNotification()
      case 'payment': return getPayment()
      case 'ports': return getPorts()
      case 'queue': return getQueue()
      case 'security': return getSecurity()
      case 'saas': return getSaas()
      case 'searchEngine': return getSearchEngine()
      case 'services': return getServices()
      case 'storage': return getStorage()
      case 'team': return getTeam()
      case 'ui': return getUi()
      default: return undefined
    }
  },
})

export * from './helpers'
export { defaults, overrides }

type AppEnv = 'dev' | 'stage' | 'prod' | string

export function determineAppEnv(): AppEnv {
  const app = getApp()
  if (app.env === 'local' || app.env === 'development')
    return 'dev'

  if (app.env === 'staging')
    return 'stage'

  if (app.env === 'production')
    return 'prod'

  if (!app.env)
    throw new Error('Couldn\'t determine app environment')

  return app.env
}
