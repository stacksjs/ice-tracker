import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface SubscriptionsTable {
  id: Generated<number>
  type: string
  plan?: string
  provider_id: string
  provider_status: string
  unit_price?: number
  provider_type: string
  provider_price_id?: string
  quantity?: number
  trial_ends_at?: Date | string
  ends_at?: Date | string
  last_used_at?: Date | string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type SubscriptionRead = SubscriptionsTable

export type SubscriptionWrite = Omit<SubscriptionsTable, 'created_at'> & {
  created_at?: string
}

export interface SubscriptionResponse {
  data: SubscriptionJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface SubscriptionJsonResponse extends Omit<Selectable<SubscriptionRead>, 'password'> {
  [key: string]: any
}

export type NewSubscription = Insertable<SubscriptionWrite>
export type SubscriptionUpdate = Updateable<SubscriptionWrite>

export interface ISubscriptionModelStatic {
  with: (relations: string[]) => ISubscriptionModel
  select: (params: (keyof SubscriptionJsonResponse)[] | RawBuilder<string> | string) => ISubscriptionModel
  find: (id: number) => Promise<ISubscriptionModel | undefined>
  first: () => Promise<ISubscriptionModel | undefined>
  last: () => Promise<ISubscriptionModel | undefined>
  firstOrFail: () => Promise<ISubscriptionModel | undefined>
  all: () => Promise<ISubscriptionModel[]>
  findOrFail: (id: number) => Promise<ISubscriptionModel | undefined>
  findMany: (ids: number[]) => Promise<ISubscriptionModel[]>
  latest: (column?: keyof SubscriptionsTable) => Promise<ISubscriptionModel | undefined>
  oldest: (column?: keyof SubscriptionsTable) => Promise<ISubscriptionModel | undefined>
  skip: (count: number) => ISubscriptionModel
  take: (count: number) => ISubscriptionModel
  where: <V = string>(column: keyof SubscriptionsTable, ...args: [V] | [Operator, V]) => ISubscriptionModel
  orWhere: (...conditions: [string, any][]) => ISubscriptionModel
  whereNotIn: <V = number>(column: keyof SubscriptionsTable, values: V[]) => ISubscriptionModel
  whereBetween: <V = number>(column: keyof SubscriptionsTable, range: [V, V]) => ISubscriptionModel
  whereRef: (column: keyof SubscriptionsTable, ...args: string[]) => ISubscriptionModel
  when: (condition: boolean, callback: (query: ISubscriptionModel) => ISubscriptionModel) => ISubscriptionModel
  whereNull: (column: keyof SubscriptionsTable) => ISubscriptionModel
  whereNotNull: (column: keyof SubscriptionsTable) => ISubscriptionModel
  whereLike: (column: keyof SubscriptionsTable, value: string) => ISubscriptionModel
  orderBy: (column: keyof SubscriptionsTable, order: 'asc' | 'desc') => ISubscriptionModel
  orderByAsc: (column: keyof SubscriptionsTable) => ISubscriptionModel
  orderByDesc: (column: keyof SubscriptionsTable) => ISubscriptionModel
  groupBy: (column: keyof SubscriptionsTable) => ISubscriptionModel
  having: <V = string>(column: keyof SubscriptionsTable, operator: Operator, value: V) => ISubscriptionModel
  inRandomOrder: () => ISubscriptionModel
  whereColumn: (first: keyof SubscriptionsTable, operator: Operator, second: keyof SubscriptionsTable) => ISubscriptionModel
  max: (field: keyof SubscriptionsTable) => Promise<number>
  min: (field: keyof SubscriptionsTable) => Promise<number>
  avg: (field: keyof SubscriptionsTable) => Promise<number>
  sum: (field: keyof SubscriptionsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ISubscriptionModel[]>
  pluck: <K extends keyof ISubscriptionModel>(field: K) => Promise<ISubscriptionModel[K][]>
  chunk: (size: number, callback: (models: ISubscriptionModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ISubscriptionModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newSubscription: NewSubscription) => Promise<ISubscriptionModel>
  firstOrCreate: (search: Partial<SubscriptionsTable>, values?: NewSubscription) => Promise<ISubscriptionModel>
  updateOrCreate: (search: Partial<SubscriptionsTable>, values?: NewSubscription) => Promise<ISubscriptionModel>
  createMany: (newSubscription: NewSubscription[]) => Promise<void>
  forceCreate: (newSubscription: NewSubscription) => Promise<ISubscriptionModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof SubscriptionsTable, values: V[]) => ISubscriptionModel
  distinct: (column: keyof SubscriptionJsonResponse) => ISubscriptionModel
  join: (table: string, firstCol: string, secondCol: string) => ISubscriptionModel
}

export interface ISubscriptionModel {
  // Properties
  readonly id: number
  get type(): string
  set type(value: string)
  get plan(): string | undefined
  set plan(value: string)
  get provider_id(): string
  set provider_id(value: string)
  get provider_status(): string
  set provider_status(value: string)
  get unit_price(): number | undefined
  set unit_price(value: number)
  get provider_type(): string
  set provider_type(value: string)
  get provider_price_id(): string | undefined
  set provider_price_id(value: string)
  get quantity(): number | undefined
  set quantity(value: number)
  get trial_ends_at(): Date | string | undefined
  set trial_ends_at(value: Date | string)
  get ends_at(): Date | string | undefined
  set ends_at(value: Date | string)
  get last_used_at(): Date | string | undefined
  set last_used_at(value: Date | string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: SubscriptionJsonResponse) => ISubscriptionModel
  create: (newSubscription: NewSubscription) => Promise<ISubscriptionModel>
  update: (newSubscription: SubscriptionUpdate) => Promise<ISubscriptionModel | undefined>
  forceUpdate: (newSubscription: SubscriptionUpdate) => Promise<ISubscriptionModel | undefined>
  save: () => Promise<ISubscriptionModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<SubscriptionJsonResponse>
  toJSON: () => SubscriptionJsonResponse
  parseResult: (model: ISubscriptionModel) => ISubscriptionModel
}

export type SubscriptionModelType = ISubscriptionModel & ISubscriptionModelStatic
