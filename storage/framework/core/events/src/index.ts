// thanks to mitt for the base of this wonderful functional event emitter

import type { UserModel } from '../../../orm/src/models/User'

export type EventType = string | symbol

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T = unknown> = (event: T) => void
export type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void

// An array of all currently registered event handlers for a type
export type EventHandlerList<T = unknown> = Array<Handler<T>>
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

export interface Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>

  on: (<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) => void) &
    ((type: '*', handler: WildcardHandler<Events>) => void)

  off: (<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) => void) &
    ((type: '*', handler?: WildcardHandler<Events>) => void)

  emit: (<Key extends keyof Events>(type: Key, event: Events[Key]) => void) &
    (<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never) => void)
}

/**
 * Tiny (~200b) functional event emitter / pubsub.
 */
export default function mitt<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>,
): Emitter<Events> {
  if (!all)
    all = new Map()

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on<Key extends keyof Events>(type: Key | '*', handler: Handler<Events[Key]> | WildcardHandler<Events>) {
      const handlers: Array<Handler<Events[Key]> | WildcardHandler<Events>> | undefined = (
        all as EventHandlerMap<Events>
      ).get(type)
      if (handlers) {
        handlers.push(handler as Handler<Events[Key]> | WildcardHandler<Events>)
      }
      // Explicitly assert the type of the handler array being set in the map. Unsure if there is a better way to do this
      else {
        (all as EventHandlerMap<Events>).set(type, [handler] as
        | EventHandlerList<Events[keyof Events]>
        | WildCardEventHandlerList<Events>)
      }
    },

    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off<Key extends keyof Events>(type: Key | '*', handler?: Handler<Events[Key]> | WildcardHandler<Events>) {
      const handlers: Array<Handler<Events[Key]> | WildcardHandler<Events>> | undefined = (
        all as EventHandlerMap<Events>
      ).get(type)
      if (handlers) {
        if (handler) {
          const index = handlers.indexOf(handler as Handler<Events[Key]> | WildcardHandler<Events>)
          if (index > -1)
            handlers.splice(index, 1)
        }
        else {
          ;(all as EventHandlerMap<Events>).set(type, [])
        }
      }
    },

    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      let handlers = (all as EventHandlerMap<Events>).get(type)
      if (handlers) {
        ;(handlers as EventHandlerList<Events[keyof Events]>).slice().forEach((handler) => {
          if (evt !== undefined)
            handler(evt)
        })
      }
      handlers = (all as EventHandlerMap<Events>).get('*')
      if (handlers) {
        ;(handlers as WildCardEventHandlerList<Events>).slice().forEach((handler) => {
          if (evt !== undefined)
            handler(type, evt)
        })
      }
    },
  }
}

/**
 * This module provides a simple, yet powerful, event bus for the application.
 *
 * TODO: https://vitejs.dev/guide/api-plugin.html#typescript-for-custom-events
 *
 * @example To fire an event, you may use any of the following approaches:
 * ```ts
 * useEvent('user:registered', { name: 'Chris'})
 * dispatch('user:registered', { name: 'Chris'})
 *
 * // alternatively, you may use the following:
 * events.emit('user:registered', { name: 'Chris'})
 * useEvents.emit('user:registered', { name: 'Chris'})
 * ````
 *
 * @example To capture an event, you may use any of the following approaches:
 * ```ts
 * useListen('user:registered', (user) => console.log(user))
 * listen('user:registered', (user) => console.log(user))
 * ```
 */

// TODO: need to create an action that auto generates this Events type from the ./app/Events
interface StacksEvents {
  'user:registered': object
  'user:logged-in': object
  'user:logged-out': object
  'user:updated': Partial<UserModel>
  'user:created': Partial<UserModel>
  'user:deleted': Partial<UserModel>
  'user:password-reset': object
  'user:password-changed': object
  'subscription:created': any
  'subscription:canceled': any
  'paymentMethods:fetched': any
  'customer:fetched': any
  'paymentMethod:fetched': any
  'subscription:fetched': any
  'paymentMethod:deleted': any
}

const events: Emitter<StacksEvents> = mitt<StacksEvents>()
const emitter: Emitter<StacksEvents> = events
const useEvent: typeof emitter.emit = emitter.emit.bind(emitter)
const useEvents = events
const dispatch: typeof emitter.emit = emitter.emit.bind(emitter)

const listen: typeof emitter.on = emitter.on.bind(emitter)
const off: typeof emitter.off = emitter.off.bind(emitter)
const all: typeof emitter.all = emitter.all

export { all, dispatch, events, listen, mitt, off, useEvent, useEvents }
