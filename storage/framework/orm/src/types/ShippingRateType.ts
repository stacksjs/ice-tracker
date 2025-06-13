import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ShippingRatesTable {
  id: Generated<number>
  method: string
  zone: string
  weight_from: number
  weight_to: number
  rate: number
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ShippingRateRead = ShippingRatesTable

export type ShippingRateWrite = Omit<ShippingRatesTable, 'created_at'> & {
  created_at?: string
}

export interface ShippingRateResponse {
  data: ShippingRateJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ShippingRateJsonResponse extends Omit<Selectable<ShippingRateRead>, 'password'> {
  [key: string]: any
}

export type NewShippingRate = Insertable<ShippingRateWrite>
export type ShippingRateUpdate = Updateable<ShippingRateWrite>

export interface IShippingRateModelStatic {
  with: (relations: string[]) => IShippingRateModel
  select: (params: (keyof ShippingRateJsonResponse)[] | RawBuilder<string> | string) => IShippingRateModel
  find: (id: number) => Promise<IShippingRateModel | undefined>
  first: () => Promise<IShippingRateModel | undefined>
  last: () => Promise<IShippingRateModel | undefined>
  firstOrFail: () => Promise<IShippingRateModel | undefined>
  all: () => Promise<IShippingRateModel[]>
  findOrFail: (id: number) => Promise<IShippingRateModel | undefined>
  findMany: (ids: number[]) => Promise<IShippingRateModel[]>
  latest: (column?: keyof ShippingRatesTable) => Promise<IShippingRateModel | undefined>
  oldest: (column?: keyof ShippingRatesTable) => Promise<IShippingRateModel | undefined>
  skip: (count: number) => IShippingRateModel
  take: (count: number) => IShippingRateModel
  where: <V = string>(column: keyof ShippingRatesTable, ...args: [V] | [Operator, V]) => IShippingRateModel
  orWhere: (...conditions: [string, any][]) => IShippingRateModel
  whereNotIn: <V = number>(column: keyof ShippingRatesTable, values: V[]) => IShippingRateModel
  whereBetween: <V = number>(column: keyof ShippingRatesTable, range: [V, V]) => IShippingRateModel
  whereRef: (column: keyof ShippingRatesTable, ...args: string[]) => IShippingRateModel
  when: (condition: boolean, callback: (query: IShippingRateModel) => IShippingRateModel) => IShippingRateModel
  whereNull: (column: keyof ShippingRatesTable) => IShippingRateModel
  whereNotNull: (column: keyof ShippingRatesTable) => IShippingRateModel
  whereLike: (column: keyof ShippingRatesTable, value: string) => IShippingRateModel
  orderBy: (column: keyof ShippingRatesTable, order: 'asc' | 'desc') => IShippingRateModel
  orderByAsc: (column: keyof ShippingRatesTable) => IShippingRateModel
  orderByDesc: (column: keyof ShippingRatesTable) => IShippingRateModel
  groupBy: (column: keyof ShippingRatesTable) => IShippingRateModel
  having: <V = string>(column: keyof ShippingRatesTable, operator: Operator, value: V) => IShippingRateModel
  inRandomOrder: () => IShippingRateModel
  whereColumn: (first: keyof ShippingRatesTable, operator: Operator, second: keyof ShippingRatesTable) => IShippingRateModel
  max: (field: keyof ShippingRatesTable) => Promise<number>
  min: (field: keyof ShippingRatesTable) => Promise<number>
  avg: (field: keyof ShippingRatesTable) => Promise<number>
  sum: (field: keyof ShippingRatesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IShippingRateModel[]>
  pluck: <K extends keyof IShippingRateModel>(field: K) => Promise<IShippingRateModel[K][]>
  chunk: (size: number, callback: (models: IShippingRateModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IShippingRateModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newShippingRate: NewShippingRate) => Promise<IShippingRateModel>
  firstOrCreate: (search: Partial<ShippingRatesTable>, values?: NewShippingRate) => Promise<IShippingRateModel>
  updateOrCreate: (search: Partial<ShippingRatesTable>, values?: NewShippingRate) => Promise<IShippingRateModel>
  createMany: (newShippingRate: NewShippingRate[]) => Promise<void>
  forceCreate: (newShippingRate: NewShippingRate) => Promise<IShippingRateModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ShippingRatesTable, values: V[]) => IShippingRateModel
  distinct: (column: keyof ShippingRateJsonResponse) => IShippingRateModel
  join: (table: string, firstCol: string, secondCol: string) => IShippingRateModel
}

export interface IShippingRateModel {
  // Properties
  readonly id: number
  get method(): string
  set method(value: string)
  get zone(): string
  set zone(value: string)
  get weight_from(): number
  set weight_from(value: number)
  get weight_to(): number
  set weight_to(value: number)
  get rate(): number
  set rate(value: number)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ShippingRateJsonResponse) => IShippingRateModel
  create: (newShippingRate: NewShippingRate) => Promise<IShippingRateModel>
  update: (newShippingRate: ShippingRateUpdate) => Promise<IShippingRateModel | undefined>
  forceUpdate: (newShippingRate: ShippingRateUpdate) => Promise<IShippingRateModel | undefined>
  save: () => Promise<IShippingRateModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ShippingRateJsonResponse>
  toJSON: () => ShippingRateJsonResponse
  parseResult: (model: IShippingRateModel) => IShippingRateModel
}

export type ShippingRateModelType = IShippingRateModel & IShippingRateModelStatic
