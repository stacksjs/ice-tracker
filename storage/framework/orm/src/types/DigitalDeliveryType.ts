import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface DigitalDeliveriesTable {
  id: Generated<number>
  name: string
  description: string
  download_limit?: number
  expiry_days: number
  requires_login?: boolean
  automatic_delivery?: boolean
  status?: string | string[]
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type DigitalDeliveryRead = DigitalDeliveriesTable

export type DigitalDeliveryWrite = Omit<DigitalDeliveriesTable, 'created_at'> & {
  created_at?: string
}

export interface DigitalDeliveryResponse {
  data: DigitalDeliveryJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface DigitalDeliveryJsonResponse extends Omit<Selectable<DigitalDeliveryRead>, 'password'> {
  [key: string]: any
}

export type NewDigitalDelivery = Insertable<DigitalDeliveryWrite>
export type DigitalDeliveryUpdate = Updateable<DigitalDeliveryWrite>

export interface IDigitalDeliveryModelStatic {
  with: (relations: string[]) => IDigitalDeliveryModel
  select: (params: (keyof DigitalDeliveryJsonResponse)[] | RawBuilder<string> | string) => IDigitalDeliveryModel
  find: (id: number) => Promise<IDigitalDeliveryModel | undefined>
  first: () => Promise<IDigitalDeliveryModel | undefined>
  last: () => Promise<IDigitalDeliveryModel | undefined>
  firstOrFail: () => Promise<IDigitalDeliveryModel | undefined>
  all: () => Promise<IDigitalDeliveryModel[]>
  findOrFail: (id: number) => Promise<IDigitalDeliveryModel | undefined>
  findMany: (ids: number[]) => Promise<IDigitalDeliveryModel[]>
  latest: (column?: keyof DigitalDeliveriesTable) => Promise<IDigitalDeliveryModel | undefined>
  oldest: (column?: keyof DigitalDeliveriesTable) => Promise<IDigitalDeliveryModel | undefined>
  skip: (count: number) => IDigitalDeliveryModel
  take: (count: number) => IDigitalDeliveryModel
  where: <V = string>(column: keyof DigitalDeliveriesTable, ...args: [V] | [Operator, V]) => IDigitalDeliveryModel
  orWhere: (...conditions: [string, any][]) => IDigitalDeliveryModel
  whereNotIn: <V = number>(column: keyof DigitalDeliveriesTable, values: V[]) => IDigitalDeliveryModel
  whereBetween: <V = number>(column: keyof DigitalDeliveriesTable, range: [V, V]) => IDigitalDeliveryModel
  whereRef: (column: keyof DigitalDeliveriesTable, ...args: string[]) => IDigitalDeliveryModel
  when: (condition: boolean, callback: (query: IDigitalDeliveryModel) => IDigitalDeliveryModel) => IDigitalDeliveryModel
  whereNull: (column: keyof DigitalDeliveriesTable) => IDigitalDeliveryModel
  whereNotNull: (column: keyof DigitalDeliveriesTable) => IDigitalDeliveryModel
  whereLike: (column: keyof DigitalDeliveriesTable, value: string) => IDigitalDeliveryModel
  orderBy: (column: keyof DigitalDeliveriesTable, order: 'asc' | 'desc') => IDigitalDeliveryModel
  orderByAsc: (column: keyof DigitalDeliveriesTable) => IDigitalDeliveryModel
  orderByDesc: (column: keyof DigitalDeliveriesTable) => IDigitalDeliveryModel
  groupBy: (column: keyof DigitalDeliveriesTable) => IDigitalDeliveryModel
  having: <V = string>(column: keyof DigitalDeliveriesTable, operator: Operator, value: V) => IDigitalDeliveryModel
  inRandomOrder: () => IDigitalDeliveryModel
  whereColumn: (first: keyof DigitalDeliveriesTable, operator: Operator, second: keyof DigitalDeliveriesTable) => IDigitalDeliveryModel
  max: (field: keyof DigitalDeliveriesTable) => Promise<number>
  min: (field: keyof DigitalDeliveriesTable) => Promise<number>
  avg: (field: keyof DigitalDeliveriesTable) => Promise<number>
  sum: (field: keyof DigitalDeliveriesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IDigitalDeliveryModel[]>
  pluck: <K extends keyof IDigitalDeliveryModel>(field: K) => Promise<IDigitalDeliveryModel[K][]>
  chunk: (size: number, callback: (models: IDigitalDeliveryModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IDigitalDeliveryModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newDigitalDelivery: NewDigitalDelivery) => Promise<IDigitalDeliveryModel>
  firstOrCreate: (search: Partial<DigitalDeliveriesTable>, values?: NewDigitalDelivery) => Promise<IDigitalDeliveryModel>
  updateOrCreate: (search: Partial<DigitalDeliveriesTable>, values?: NewDigitalDelivery) => Promise<IDigitalDeliveryModel>
  createMany: (newDigitalDelivery: NewDigitalDelivery[]) => Promise<void>
  forceCreate: (newDigitalDelivery: NewDigitalDelivery) => Promise<IDigitalDeliveryModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof DigitalDeliveriesTable, values: V[]) => IDigitalDeliveryModel
  distinct: (column: keyof DigitalDeliveryJsonResponse) => IDigitalDeliveryModel
  join: (table: string, firstCol: string, secondCol: string) => IDigitalDeliveryModel
}

export interface IDigitalDeliveryModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): string
  set description(value: string)
  get download_limit(): number | undefined
  set download_limit(value: number)
  get expiry_days(): number
  set expiry_days(value: number)
  get requires_login(): boolean | undefined
  set requires_login(value: boolean)
  get automatic_delivery(): boolean | undefined
  set automatic_delivery(value: boolean)
  get status(): string | string[] | undefined
  set status(value: string | string[])
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: DigitalDeliveryJsonResponse) => IDigitalDeliveryModel
  create: (newDigitalDelivery: NewDigitalDelivery) => Promise<IDigitalDeliveryModel>
  update: (newDigitalDelivery: DigitalDeliveryUpdate) => Promise<IDigitalDeliveryModel | undefined>
  forceUpdate: (newDigitalDelivery: DigitalDeliveryUpdate) => Promise<IDigitalDeliveryModel | undefined>
  save: () => Promise<IDigitalDeliveryModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<DigitalDeliveryJsonResponse>
  toJSON: () => DigitalDeliveryJsonResponse
  parseResult: (model: IDigitalDeliveryModel) => IDigitalDeliveryModel
}

export type DigitalDeliveryModelType = IDigitalDeliveryModel & IDigitalDeliveryModelStatic
