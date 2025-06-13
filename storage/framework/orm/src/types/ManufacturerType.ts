import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ManufacturersTable {
  id: Generated<number>
  manufacturer: string
  description?: string
  country: string
  featured?: boolean
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ManufacturerRead = ManufacturersTable

export type ManufacturerWrite = Omit<ManufacturersTable, 'created_at'> & {
  created_at?: string
}

export interface ManufacturerResponse {
  data: ManufacturerJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ManufacturerJsonResponse extends Omit<Selectable<ManufacturerRead>, 'password'> {
  [key: string]: any
}

export type NewManufacturer = Insertable<ManufacturerWrite>
export type ManufacturerUpdate = Updateable<ManufacturerWrite>

export interface IManufacturerModelStatic {
  with: (relations: string[]) => IManufacturerModel
  select: (params: (keyof ManufacturerJsonResponse)[] | RawBuilder<string> | string) => IManufacturerModel
  find: (id: number) => Promise<IManufacturerModel | undefined>
  first: () => Promise<IManufacturerModel | undefined>
  last: () => Promise<IManufacturerModel | undefined>
  firstOrFail: () => Promise<IManufacturerModel | undefined>
  all: () => Promise<IManufacturerModel[]>
  findOrFail: (id: number) => Promise<IManufacturerModel | undefined>
  findMany: (ids: number[]) => Promise<IManufacturerModel[]>
  latest: (column?: keyof ManufacturersTable) => Promise<IManufacturerModel | undefined>
  oldest: (column?: keyof ManufacturersTable) => Promise<IManufacturerModel | undefined>
  skip: (count: number) => IManufacturerModel
  take: (count: number) => IManufacturerModel
  where: <V = string>(column: keyof ManufacturersTable, ...args: [V] | [Operator, V]) => IManufacturerModel
  orWhere: (...conditions: [string, any][]) => IManufacturerModel
  whereNotIn: <V = number>(column: keyof ManufacturersTable, values: V[]) => IManufacturerModel
  whereBetween: <V = number>(column: keyof ManufacturersTable, range: [V, V]) => IManufacturerModel
  whereRef: (column: keyof ManufacturersTable, ...args: string[]) => IManufacturerModel
  when: (condition: boolean, callback: (query: IManufacturerModel) => IManufacturerModel) => IManufacturerModel
  whereNull: (column: keyof ManufacturersTable) => IManufacturerModel
  whereNotNull: (column: keyof ManufacturersTable) => IManufacturerModel
  whereLike: (column: keyof ManufacturersTable, value: string) => IManufacturerModel
  orderBy: (column: keyof ManufacturersTable, order: 'asc' | 'desc') => IManufacturerModel
  orderByAsc: (column: keyof ManufacturersTable) => IManufacturerModel
  orderByDesc: (column: keyof ManufacturersTable) => IManufacturerModel
  groupBy: (column: keyof ManufacturersTable) => IManufacturerModel
  having: <V = string>(column: keyof ManufacturersTable, operator: Operator, value: V) => IManufacturerModel
  inRandomOrder: () => IManufacturerModel
  whereColumn: (first: keyof ManufacturersTable, operator: Operator, second: keyof ManufacturersTable) => IManufacturerModel
  max: (field: keyof ManufacturersTable) => Promise<number>
  min: (field: keyof ManufacturersTable) => Promise<number>
  avg: (field: keyof ManufacturersTable) => Promise<number>
  sum: (field: keyof ManufacturersTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IManufacturerModel[]>
  pluck: <K extends keyof IManufacturerModel>(field: K) => Promise<IManufacturerModel[K][]>
  chunk: (size: number, callback: (models: IManufacturerModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IManufacturerModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newManufacturer: NewManufacturer) => Promise<IManufacturerModel>
  firstOrCreate: (search: Partial<ManufacturersTable>, values?: NewManufacturer) => Promise<IManufacturerModel>
  updateOrCreate: (search: Partial<ManufacturersTable>, values?: NewManufacturer) => Promise<IManufacturerModel>
  createMany: (newManufacturer: NewManufacturer[]) => Promise<void>
  forceCreate: (newManufacturer: NewManufacturer) => Promise<IManufacturerModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ManufacturersTable, values: V[]) => IManufacturerModel
  distinct: (column: keyof ManufacturerJsonResponse) => IManufacturerModel
  join: (table: string, firstCol: string, secondCol: string) => IManufacturerModel
}

export interface IManufacturerModel {
  // Properties
  readonly id: number
  get manufacturer(): string
  set manufacturer(value: string)
  get description(): string | undefined
  set description(value: string)
  get country(): string
  set country(value: string)
  get featured(): boolean | undefined
  set featured(value: boolean)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ManufacturerJsonResponse) => IManufacturerModel
  create: (newManufacturer: NewManufacturer) => Promise<IManufacturerModel>
  update: (newManufacturer: ManufacturerUpdate) => Promise<IManufacturerModel | undefined>
  forceUpdate: (newManufacturer: ManufacturerUpdate) => Promise<IManufacturerModel | undefined>
  save: () => Promise<IManufacturerModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ManufacturerJsonResponse>
  toJSON: () => ManufacturerJsonResponse
  parseResult: (model: IManufacturerModel) => IManufacturerModel
}

export type ManufacturerModelType = IManufacturerModel & IManufacturerModelStatic
