import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface WaitlistRestaurantsTable {
  id: Generated<number>
  name: string
  email: string
  phone?: string
  party_size: number
  check_in_time: Date | string
  table_preference: string | string[]
  status: string | string[]
  quoted_wait_time: number
  actual_wait_time?: number
  queue_position?: number
  seated_at?: Date | string
  no_show_at?: Date | string
  cancelled_at?: Date | string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type WaitlistRestaurantRead = WaitlistRestaurantsTable

export type WaitlistRestaurantWrite = Omit<WaitlistRestaurantsTable, 'created_at'> & {
  created_at?: string
}

export interface WaitlistRestaurantResponse {
  data: WaitlistRestaurantJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface WaitlistRestaurantJsonResponse extends Omit<Selectable<WaitlistRestaurantRead>, 'password'> {
  [key: string]: any
}

export type NewWaitlistRestaurant = Insertable<WaitlistRestaurantWrite>
export type WaitlistRestaurantUpdate = Updateable<WaitlistRestaurantWrite>

export interface IWaitlistRestaurantModelStatic {
  with: (relations: string[]) => IWaitlistRestaurantModel
  select: (params: (keyof WaitlistRestaurantJsonResponse)[] | RawBuilder<string> | string) => IWaitlistRestaurantModel
  find: (id: number) => Promise<IWaitlistRestaurantModel | undefined>
  first: () => Promise<IWaitlistRestaurantModel | undefined>
  last: () => Promise<IWaitlistRestaurantModel | undefined>
  firstOrFail: () => Promise<IWaitlistRestaurantModel | undefined>
  all: () => Promise<IWaitlistRestaurantModel[]>
  findOrFail: (id: number) => Promise<IWaitlistRestaurantModel | undefined>
  findMany: (ids: number[]) => Promise<IWaitlistRestaurantModel[]>
  latest: (column?: keyof WaitlistRestaurantsTable) => Promise<IWaitlistRestaurantModel | undefined>
  oldest: (column?: keyof WaitlistRestaurantsTable) => Promise<IWaitlistRestaurantModel | undefined>
  skip: (count: number) => IWaitlistRestaurantModel
  take: (count: number) => IWaitlistRestaurantModel
  where: <V = string>(column: keyof WaitlistRestaurantsTable, ...args: [V] | [Operator, V]) => IWaitlistRestaurantModel
  orWhere: (...conditions: [string, any][]) => IWaitlistRestaurantModel
  whereNotIn: <V = number>(column: keyof WaitlistRestaurantsTable, values: V[]) => IWaitlistRestaurantModel
  whereBetween: <V = number>(column: keyof WaitlistRestaurantsTable, range: [V, V]) => IWaitlistRestaurantModel
  whereRef: (column: keyof WaitlistRestaurantsTable, ...args: string[]) => IWaitlistRestaurantModel
  when: (condition: boolean, callback: (query: IWaitlistRestaurantModel) => IWaitlistRestaurantModel) => IWaitlistRestaurantModel
  whereNull: (column: keyof WaitlistRestaurantsTable) => IWaitlistRestaurantModel
  whereNotNull: (column: keyof WaitlistRestaurantsTable) => IWaitlistRestaurantModel
  whereLike: (column: keyof WaitlistRestaurantsTable, value: string) => IWaitlistRestaurantModel
  orderBy: (column: keyof WaitlistRestaurantsTable, order: 'asc' | 'desc') => IWaitlistRestaurantModel
  orderByAsc: (column: keyof WaitlistRestaurantsTable) => IWaitlistRestaurantModel
  orderByDesc: (column: keyof WaitlistRestaurantsTable) => IWaitlistRestaurantModel
  groupBy: (column: keyof WaitlistRestaurantsTable) => IWaitlistRestaurantModel
  having: <V = string>(column: keyof WaitlistRestaurantsTable, operator: Operator, value: V) => IWaitlistRestaurantModel
  inRandomOrder: () => IWaitlistRestaurantModel
  whereColumn: (first: keyof WaitlistRestaurantsTable, operator: Operator, second: keyof WaitlistRestaurantsTable) => IWaitlistRestaurantModel
  max: (field: keyof WaitlistRestaurantsTable) => Promise<number>
  min: (field: keyof WaitlistRestaurantsTable) => Promise<number>
  avg: (field: keyof WaitlistRestaurantsTable) => Promise<number>
  sum: (field: keyof WaitlistRestaurantsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IWaitlistRestaurantModel[]>
  pluck: <K extends keyof IWaitlistRestaurantModel>(field: K) => Promise<IWaitlistRestaurantModel[K][]>
  chunk: (size: number, callback: (models: IWaitlistRestaurantModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IWaitlistRestaurantModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newWaitlistRestaurant: NewWaitlistRestaurant) => Promise<IWaitlistRestaurantModel>
  firstOrCreate: (search: Partial<WaitlistRestaurantsTable>, values?: NewWaitlistRestaurant) => Promise<IWaitlistRestaurantModel>
  updateOrCreate: (search: Partial<WaitlistRestaurantsTable>, values?: NewWaitlistRestaurant) => Promise<IWaitlistRestaurantModel>
  createMany: (newWaitlistRestaurant: NewWaitlistRestaurant[]) => Promise<void>
  forceCreate: (newWaitlistRestaurant: NewWaitlistRestaurant) => Promise<IWaitlistRestaurantModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof WaitlistRestaurantsTable, values: V[]) => IWaitlistRestaurantModel
  distinct: (column: keyof WaitlistRestaurantJsonResponse) => IWaitlistRestaurantModel
  join: (table: string, firstCol: string, secondCol: string) => IWaitlistRestaurantModel
}

export interface IWaitlistRestaurantModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get email(): string
  set email(value: string)
  get phone(): string | undefined
  set phone(value: string)
  get party_size(): number
  set party_size(value: number)
  get check_in_time(): Date | string
  set check_in_time(value: Date | string)
  get table_preference(): string | string[]
  set table_preference(value: string | string[])
  get status(): string | string[]
  set status(value: string | string[])
  get quoted_wait_time(): number
  set quoted_wait_time(value: number)
  get actual_wait_time(): number | undefined
  set actual_wait_time(value: number)
  get queue_position(): number | undefined
  set queue_position(value: number)
  get seated_at(): Date | string | undefined
  set seated_at(value: Date | string)
  get no_show_at(): Date | string | undefined
  set no_show_at(value: Date | string)
  get cancelled_at(): Date | string | undefined
  set cancelled_at(value: Date | string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: WaitlistRestaurantJsonResponse) => IWaitlistRestaurantModel
  create: (newWaitlistRestaurant: NewWaitlistRestaurant) => Promise<IWaitlistRestaurantModel>
  update: (newWaitlistRestaurant: WaitlistRestaurantUpdate) => Promise<IWaitlistRestaurantModel | undefined>
  forceUpdate: (newWaitlistRestaurant: WaitlistRestaurantUpdate) => Promise<IWaitlistRestaurantModel | undefined>
  save: () => Promise<IWaitlistRestaurantModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<WaitlistRestaurantJsonResponse>
  toJSON: () => WaitlistRestaurantJsonResponse
  parseResult: (model: IWaitlistRestaurantModel) => IWaitlistRestaurantModel
}

export type WaitlistRestaurantModelType = IWaitlistRestaurantModel & IWaitlistRestaurantModelStatic
