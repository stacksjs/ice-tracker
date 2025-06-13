import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface DriversTable {
  id: Generated<number>
  name: string
  phone: string
  vehicle_number: string
  license: string
  status?: string | string[]
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type DriverRead = DriversTable

export type DriverWrite = Omit<DriversTable, 'created_at'> & {
  created_at?: string
}

export interface DriverResponse {
  data: DriverJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface DriverJsonResponse extends Omit<Selectable<DriverRead>, 'password'> {
  [key: string]: any
}

export type NewDriver = Insertable<DriverWrite>
export type DriverUpdate = Updateable<DriverWrite>

export interface IDriverModelStatic {
  with: (relations: string[]) => IDriverModel
  select: (params: (keyof DriverJsonResponse)[] | RawBuilder<string> | string) => IDriverModel
  find: (id: number) => Promise<IDriverModel | undefined>
  first: () => Promise<IDriverModel | undefined>
  last: () => Promise<IDriverModel | undefined>
  firstOrFail: () => Promise<IDriverModel | undefined>
  all: () => Promise<IDriverModel[]>
  findOrFail: (id: number) => Promise<IDriverModel | undefined>
  findMany: (ids: number[]) => Promise<IDriverModel[]>
  latest: (column?: keyof DriversTable) => Promise<IDriverModel | undefined>
  oldest: (column?: keyof DriversTable) => Promise<IDriverModel | undefined>
  skip: (count: number) => IDriverModel
  take: (count: number) => IDriverModel
  where: <V = string>(column: keyof DriversTable, ...args: [V] | [Operator, V]) => IDriverModel
  orWhere: (...conditions: [string, any][]) => IDriverModel
  whereNotIn: <V = number>(column: keyof DriversTable, values: V[]) => IDriverModel
  whereBetween: <V = number>(column: keyof DriversTable, range: [V, V]) => IDriverModel
  whereRef: (column: keyof DriversTable, ...args: string[]) => IDriverModel
  when: (condition: boolean, callback: (query: IDriverModel) => IDriverModel) => IDriverModel
  whereNull: (column: keyof DriversTable) => IDriverModel
  whereNotNull: (column: keyof DriversTable) => IDriverModel
  whereLike: (column: keyof DriversTable, value: string) => IDriverModel
  orderBy: (column: keyof DriversTable, order: 'asc' | 'desc') => IDriverModel
  orderByAsc: (column: keyof DriversTable) => IDriverModel
  orderByDesc: (column: keyof DriversTable) => IDriverModel
  groupBy: (column: keyof DriversTable) => IDriverModel
  having: <V = string>(column: keyof DriversTable, operator: Operator, value: V) => IDriverModel
  inRandomOrder: () => IDriverModel
  whereColumn: (first: keyof DriversTable, operator: Operator, second: keyof DriversTable) => IDriverModel
  max: (field: keyof DriversTable) => Promise<number>
  min: (field: keyof DriversTable) => Promise<number>
  avg: (field: keyof DriversTable) => Promise<number>
  sum: (field: keyof DriversTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IDriverModel[]>
  pluck: <K extends keyof IDriverModel>(field: K) => Promise<IDriverModel[K][]>
  chunk: (size: number, callback: (models: IDriverModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IDriverModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newDriver: NewDriver) => Promise<IDriverModel>
  firstOrCreate: (search: Partial<DriversTable>, values?: NewDriver) => Promise<IDriverModel>
  updateOrCreate: (search: Partial<DriversTable>, values?: NewDriver) => Promise<IDriverModel>
  createMany: (newDriver: NewDriver[]) => Promise<void>
  forceCreate: (newDriver: NewDriver) => Promise<IDriverModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof DriversTable, values: V[]) => IDriverModel
  distinct: (column: keyof DriverJsonResponse) => IDriverModel
  join: (table: string, firstCol: string, secondCol: string) => IDriverModel
}

export interface IDriverModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get phone(): string
  set phone(value: string)
  get vehicle_number(): string
  set vehicle_number(value: string)
  get license(): string
  set license(value: string)
  get status(): string | string[] | undefined
  set status(value: string | string[])
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: DriverJsonResponse) => IDriverModel
  create: (newDriver: NewDriver) => Promise<IDriverModel>
  update: (newDriver: DriverUpdate) => Promise<IDriverModel | undefined>
  forceUpdate: (newDriver: DriverUpdate) => Promise<IDriverModel | undefined>
  save: () => Promise<IDriverModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<DriverJsonResponse>
  toJSON: () => DriverJsonResponse
  parseResult: (model: IDriverModel) => IDriverModel
}

export type DriverModelType = IDriverModel & IDriverModelStatic
