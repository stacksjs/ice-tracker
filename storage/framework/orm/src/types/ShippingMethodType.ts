import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface ShippingMethodsTable {
  id: Generated<number>
  name: string
  description?: string
  base_rate: number
  free_shipping?: number
  status: string | string[]
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ShippingMethodRead = ShippingMethodsTable

export type ShippingMethodWrite = Omit<ShippingMethodsTable, 'created_at'> & {
  created_at?: string
}

export interface ShippingMethodResponse {
  data: ShippingMethodJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ShippingMethodJsonResponse extends Omit<Selectable<ShippingMethodRead>, 'password'> {
  [key: string]: any
}

export type NewShippingMethod = Insertable<ShippingMethodWrite>
export type ShippingMethodUpdate = Updateable<ShippingMethodWrite>

export interface IShippingMethodModelStatic {
  with: (relations: string[]) => IShippingMethodModel
  select: (params: (keyof ShippingMethodJsonResponse)[] | RawBuilder<string> | string) => IShippingMethodModel
  find: (id: number) => Promise<IShippingMethodModel | undefined>
  first: () => Promise<IShippingMethodModel | undefined>
  last: () => Promise<IShippingMethodModel | undefined>
  firstOrFail: () => Promise<IShippingMethodModel | undefined>
  all: () => Promise<IShippingMethodModel[]>
  findOrFail: (id: number) => Promise<IShippingMethodModel | undefined>
  findMany: (ids: number[]) => Promise<IShippingMethodModel[]>
  latest: (column?: keyof ShippingMethodsTable) => Promise<IShippingMethodModel | undefined>
  oldest: (column?: keyof ShippingMethodsTable) => Promise<IShippingMethodModel | undefined>
  skip: (count: number) => IShippingMethodModel
  take: (count: number) => IShippingMethodModel
  where: <V = string>(column: keyof ShippingMethodsTable, ...args: [V] | [Operator, V]) => IShippingMethodModel
  orWhere: (...conditions: [string, any][]) => IShippingMethodModel
  whereNotIn: <V = number>(column: keyof ShippingMethodsTable, values: V[]) => IShippingMethodModel
  whereBetween: <V = number>(column: keyof ShippingMethodsTable, range: [V, V]) => IShippingMethodModel
  whereRef: (column: keyof ShippingMethodsTable, ...args: string[]) => IShippingMethodModel
  when: (condition: boolean, callback: (query: IShippingMethodModel) => IShippingMethodModel) => IShippingMethodModel
  whereNull: (column: keyof ShippingMethodsTable) => IShippingMethodModel
  whereNotNull: (column: keyof ShippingMethodsTable) => IShippingMethodModel
  whereLike: (column: keyof ShippingMethodsTable, value: string) => IShippingMethodModel
  orderBy: (column: keyof ShippingMethodsTable, order: 'asc' | 'desc') => IShippingMethodModel
  orderByAsc: (column: keyof ShippingMethodsTable) => IShippingMethodModel
  orderByDesc: (column: keyof ShippingMethodsTable) => IShippingMethodModel
  groupBy: (column: keyof ShippingMethodsTable) => IShippingMethodModel
  having: <V = string>(column: keyof ShippingMethodsTable, operator: Operator, value: V) => IShippingMethodModel
  inRandomOrder: () => IShippingMethodModel
  whereColumn: (first: keyof ShippingMethodsTable, operator: Operator, second: keyof ShippingMethodsTable) => IShippingMethodModel
  max: (field: keyof ShippingMethodsTable) => Promise<number>
  min: (field: keyof ShippingMethodsTable) => Promise<number>
  avg: (field: keyof ShippingMethodsTable) => Promise<number>
  sum: (field: keyof ShippingMethodsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IShippingMethodModel[]>
  pluck: <K extends keyof IShippingMethodModel>(field: K) => Promise<IShippingMethodModel[K][]>
  chunk: (size: number, callback: (models: IShippingMethodModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IShippingMethodModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newShippingMethod: NewShippingMethod) => Promise<IShippingMethodModel>
  firstOrCreate: (search: Partial<ShippingMethodsTable>, values?: NewShippingMethod) => Promise<IShippingMethodModel>
  updateOrCreate: (search: Partial<ShippingMethodsTable>, values?: NewShippingMethod) => Promise<IShippingMethodModel>
  createMany: (newShippingMethod: NewShippingMethod[]) => Promise<void>
  forceCreate: (newShippingMethod: NewShippingMethod) => Promise<IShippingMethodModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ShippingMethodsTable, values: V[]) => IShippingMethodModel
  distinct: (column: keyof ShippingMethodJsonResponse) => IShippingMethodModel
  join: (table: string, firstCol: string, secondCol: string) => IShippingMethodModel
}

export interface IShippingMethodModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): string | undefined
  set description(value: string)
  get base_rate(): number
  set base_rate(value: number)
  get free_shipping(): number | undefined
  set free_shipping(value: number)
  get status(): string | string[]
  set status(value: string | string[])
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ShippingMethodJsonResponse) => IShippingMethodModel
  create: (newShippingMethod: NewShippingMethod) => Promise<IShippingMethodModel>
  update: (newShippingMethod: ShippingMethodUpdate) => Promise<IShippingMethodModel | undefined>
  forceUpdate: (newShippingMethod: ShippingMethodUpdate) => Promise<IShippingMethodModel | undefined>
  save: () => Promise<IShippingMethodModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ShippingMethodJsonResponse>
  toJSON: () => ShippingMethodJsonResponse
  parseResult: (model: IShippingMethodModel) => IShippingMethodModel
}

export type ShippingMethodModelType = IShippingMethodModel & IShippingMethodModelStatic
