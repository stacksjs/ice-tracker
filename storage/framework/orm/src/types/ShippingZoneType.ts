import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface ShippingZonesTable {
  id: Generated<number>
  name: string
  countries?: string
  regions?: string
  postal_codes?: string
  status: string | string[]
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ShippingZoneRead = ShippingZonesTable

export type ShippingZoneWrite = Omit<ShippingZonesTable, 'created_at'> & {
  created_at?: string
}

export interface ShippingZoneResponse {
  data: ShippingZoneJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ShippingZoneJsonResponse extends Omit<Selectable<ShippingZoneRead>, 'password'> {
  [key: string]: any
}

export type NewShippingZone = Insertable<ShippingZoneWrite>
export type ShippingZoneUpdate = Updateable<ShippingZoneWrite>

export interface IShippingZoneModelStatic {
  with: (relations: string[]) => IShippingZoneModel
  select: (params: (keyof ShippingZoneJsonResponse)[] | RawBuilder<string> | string) => IShippingZoneModel
  find: (id: number) => Promise<IShippingZoneModel | undefined>
  first: () => Promise<IShippingZoneModel | undefined>
  last: () => Promise<IShippingZoneModel | undefined>
  firstOrFail: () => Promise<IShippingZoneModel | undefined>
  all: () => Promise<IShippingZoneModel[]>
  findOrFail: (id: number) => Promise<IShippingZoneModel | undefined>
  findMany: (ids: number[]) => Promise<IShippingZoneModel[]>
  latest: (column?: keyof ShippingZonesTable) => Promise<IShippingZoneModel | undefined>
  oldest: (column?: keyof ShippingZonesTable) => Promise<IShippingZoneModel | undefined>
  skip: (count: number) => IShippingZoneModel
  take: (count: number) => IShippingZoneModel
  where: <V = string>(column: keyof ShippingZonesTable, ...args: [V] | [Operator, V]) => IShippingZoneModel
  orWhere: (...conditions: [string, any][]) => IShippingZoneModel
  whereNotIn: <V = number>(column: keyof ShippingZonesTable, values: V[]) => IShippingZoneModel
  whereBetween: <V = number>(column: keyof ShippingZonesTable, range: [V, V]) => IShippingZoneModel
  whereRef: (column: keyof ShippingZonesTable, ...args: string[]) => IShippingZoneModel
  when: (condition: boolean, callback: (query: IShippingZoneModel) => IShippingZoneModel) => IShippingZoneModel
  whereNull: (column: keyof ShippingZonesTable) => IShippingZoneModel
  whereNotNull: (column: keyof ShippingZonesTable) => IShippingZoneModel
  whereLike: (column: keyof ShippingZonesTable, value: string) => IShippingZoneModel
  orderBy: (column: keyof ShippingZonesTable, order: 'asc' | 'desc') => IShippingZoneModel
  orderByAsc: (column: keyof ShippingZonesTable) => IShippingZoneModel
  orderByDesc: (column: keyof ShippingZonesTable) => IShippingZoneModel
  groupBy: (column: keyof ShippingZonesTable) => IShippingZoneModel
  having: <V = string>(column: keyof ShippingZonesTable, operator: Operator, value: V) => IShippingZoneModel
  inRandomOrder: () => IShippingZoneModel
  whereColumn: (first: keyof ShippingZonesTable, operator: Operator, second: keyof ShippingZonesTable) => IShippingZoneModel
  max: (field: keyof ShippingZonesTable) => Promise<number>
  min: (field: keyof ShippingZonesTable) => Promise<number>
  avg: (field: keyof ShippingZonesTable) => Promise<number>
  sum: (field: keyof ShippingZonesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IShippingZoneModel[]>
  pluck: <K extends keyof IShippingZoneModel>(field: K) => Promise<IShippingZoneModel[K][]>
  chunk: (size: number, callback: (models: IShippingZoneModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IShippingZoneModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newShippingZone: NewShippingZone) => Promise<IShippingZoneModel>
  firstOrCreate: (search: Partial<ShippingZonesTable>, values?: NewShippingZone) => Promise<IShippingZoneModel>
  updateOrCreate: (search: Partial<ShippingZonesTable>, values?: NewShippingZone) => Promise<IShippingZoneModel>
  createMany: (newShippingZone: NewShippingZone[]) => Promise<void>
  forceCreate: (newShippingZone: NewShippingZone) => Promise<IShippingZoneModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ShippingZonesTable, values: V[]) => IShippingZoneModel
  distinct: (column: keyof ShippingZoneJsonResponse) => IShippingZoneModel
  join: (table: string, firstCol: string, secondCol: string) => IShippingZoneModel
}

export interface IShippingZoneModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get countries(): string | undefined
  set countries(value: string)
  get regions(): string | undefined
  set regions(value: string)
  get postal_codes(): string | undefined
  set postal_codes(value: string)
  get status(): string | string[]
  set status(value: string | string[])
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ShippingZoneJsonResponse) => IShippingZoneModel
  create: (newShippingZone: NewShippingZone) => Promise<IShippingZoneModel>
  update: (newShippingZone: ShippingZoneUpdate) => Promise<IShippingZoneModel | undefined>
  forceUpdate: (newShippingZone: ShippingZoneUpdate) => Promise<IShippingZoneModel | undefined>
  save: () => Promise<IShippingZoneModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ShippingZoneJsonResponse>
  toJSON: () => ShippingZoneJsonResponse
  parseResult: (model: IShippingZoneModel) => IShippingZoneModel
}

export type ShippingZoneModelType = IShippingZoneModel & IShippingZoneModelStatic
