import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface DeliveryRoutesTable {
  id: Generated<number>
  driver: string
  vehicle: string
  stops: number
  delivery_time: number
  total_distance: number
  last_active?: Date | string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type DeliveryRouteRead = DeliveryRoutesTable

export type DeliveryRouteWrite = Omit<DeliveryRoutesTable, 'created_at'> & {
  created_at?: string
}

export interface DeliveryRouteResponse {
  data: DeliveryRouteJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface DeliveryRouteJsonResponse extends Omit<Selectable<DeliveryRouteRead>, 'password'> {
  [key: string]: any
}

export type NewDeliveryRoute = Insertable<DeliveryRouteWrite>
export type DeliveryRouteUpdate = Updateable<DeliveryRouteWrite>

export interface IDeliveryRouteModelStatic {
  with: (relations: string[]) => IDeliveryRouteModel
  select: (params: (keyof DeliveryRouteJsonResponse)[] | RawBuilder<string> | string) => IDeliveryRouteModel
  find: (id: number) => Promise<IDeliveryRouteModel | undefined>
  first: () => Promise<IDeliveryRouteModel | undefined>
  last: () => Promise<IDeliveryRouteModel | undefined>
  firstOrFail: () => Promise<IDeliveryRouteModel | undefined>
  all: () => Promise<IDeliveryRouteModel[]>
  findOrFail: (id: number) => Promise<IDeliveryRouteModel | undefined>
  findMany: (ids: number[]) => Promise<IDeliveryRouteModel[]>
  latest: (column?: keyof DeliveryRoutesTable) => Promise<IDeliveryRouteModel | undefined>
  oldest: (column?: keyof DeliveryRoutesTable) => Promise<IDeliveryRouteModel | undefined>
  skip: (count: number) => IDeliveryRouteModel
  take: (count: number) => IDeliveryRouteModel
  where: <V = string>(column: keyof DeliveryRoutesTable, ...args: [V] | [Operator, V]) => IDeliveryRouteModel
  orWhere: (...conditions: [string, any][]) => IDeliveryRouteModel
  whereNotIn: <V = number>(column: keyof DeliveryRoutesTable, values: V[]) => IDeliveryRouteModel
  whereBetween: <V = number>(column: keyof DeliveryRoutesTable, range: [V, V]) => IDeliveryRouteModel
  whereRef: (column: keyof DeliveryRoutesTable, ...args: string[]) => IDeliveryRouteModel
  when: (condition: boolean, callback: (query: IDeliveryRouteModel) => IDeliveryRouteModel) => IDeliveryRouteModel
  whereNull: (column: keyof DeliveryRoutesTable) => IDeliveryRouteModel
  whereNotNull: (column: keyof DeliveryRoutesTable) => IDeliveryRouteModel
  whereLike: (column: keyof DeliveryRoutesTable, value: string) => IDeliveryRouteModel
  orderBy: (column: keyof DeliveryRoutesTable, order: 'asc' | 'desc') => IDeliveryRouteModel
  orderByAsc: (column: keyof DeliveryRoutesTable) => IDeliveryRouteModel
  orderByDesc: (column: keyof DeliveryRoutesTable) => IDeliveryRouteModel
  groupBy: (column: keyof DeliveryRoutesTable) => IDeliveryRouteModel
  having: <V = string>(column: keyof DeliveryRoutesTable, operator: Operator, value: V) => IDeliveryRouteModel
  inRandomOrder: () => IDeliveryRouteModel
  whereColumn: (first: keyof DeliveryRoutesTable, operator: Operator, second: keyof DeliveryRoutesTable) => IDeliveryRouteModel
  max: (field: keyof DeliveryRoutesTable) => Promise<number>
  min: (field: keyof DeliveryRoutesTable) => Promise<number>
  avg: (field: keyof DeliveryRoutesTable) => Promise<number>
  sum: (field: keyof DeliveryRoutesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IDeliveryRouteModel[]>
  pluck: <K extends keyof IDeliveryRouteModel>(field: K) => Promise<IDeliveryRouteModel[K][]>
  chunk: (size: number, callback: (models: IDeliveryRouteModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IDeliveryRouteModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newDeliveryRoute: NewDeliveryRoute) => Promise<IDeliveryRouteModel>
  firstOrCreate: (search: Partial<DeliveryRoutesTable>, values?: NewDeliveryRoute) => Promise<IDeliveryRouteModel>
  updateOrCreate: (search: Partial<DeliveryRoutesTable>, values?: NewDeliveryRoute) => Promise<IDeliveryRouteModel>
  createMany: (newDeliveryRoute: NewDeliveryRoute[]) => Promise<void>
  forceCreate: (newDeliveryRoute: NewDeliveryRoute) => Promise<IDeliveryRouteModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof DeliveryRoutesTable, values: V[]) => IDeliveryRouteModel
  distinct: (column: keyof DeliveryRouteJsonResponse) => IDeliveryRouteModel
  join: (table: string, firstCol: string, secondCol: string) => IDeliveryRouteModel
}

export interface IDeliveryRouteModel {
  // Properties
  readonly id: number
  get driver(): string
  set driver(value: string)
  get vehicle(): string
  set vehicle(value: string)
  get stops(): number
  set stops(value: number)
  get delivery_time(): number
  set delivery_time(value: number)
  get total_distance(): number
  set total_distance(value: number)
  get last_active(): Date | string | undefined
  set last_active(value: Date | string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: DeliveryRouteJsonResponse) => IDeliveryRouteModel
  create: (newDeliveryRoute: NewDeliveryRoute) => Promise<IDeliveryRouteModel>
  update: (newDeliveryRoute: DeliveryRouteUpdate) => Promise<IDeliveryRouteModel | undefined>
  forceUpdate: (newDeliveryRoute: DeliveryRouteUpdate) => Promise<IDeliveryRouteModel | undefined>
  save: () => Promise<IDeliveryRouteModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<DeliveryRouteJsonResponse>
  toJSON: () => DeliveryRouteJsonResponse
  parseResult: (model: IDeliveryRouteModel) => IDeliveryRouteModel
}

export type DeliveryRouteModelType = IDeliveryRouteModel & IDeliveryRouteModelStatic
