import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface RequestsTable {
  id: Generated<number>
  method?: string | string[]
  path?: string
  status_code?: number
  duration_ms?: number
  ip_address?: string
  memory_usage?: number
  user_agent?: string
  error_message?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export type RequestRead = RequestsTable

export type RequestWrite = Omit<RequestsTable, 'created_at'> & {
  created_at?: string
}

export interface RequestResponse {
  data: RequestJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface RequestJsonResponse extends Omit<Selectable<RequestRead>, 'password'> {
  [key: string]: any
}

export type NewRequest = Insertable<RequestWrite>
export type RequestUpdate = Updateable<RequestWrite>

export interface IRequestModelStatic {
  with: (relations: string[]) => IRequestModel
  select: (params: (keyof RequestJsonResponse)[] | RawBuilder<string> | string) => IRequestModel
  find: (id: number) => Promise<IRequestModel | undefined>
  first: () => Promise<IRequestModel | undefined>
  last: () => Promise<IRequestModel | undefined>
  firstOrFail: () => Promise<IRequestModel | undefined>
  all: () => Promise<IRequestModel[]>
  findOrFail: (id: number) => Promise<IRequestModel | undefined>
  findMany: (ids: number[]) => Promise<IRequestModel[]>
  latest: (column?: keyof RequestsTable) => Promise<IRequestModel | undefined>
  oldest: (column?: keyof RequestsTable) => Promise<IRequestModel | undefined>
  skip: (count: number) => IRequestModel
  take: (count: number) => IRequestModel
  where: <V = string>(column: keyof RequestsTable, ...args: [V] | [Operator, V]) => IRequestModel
  orWhere: (...conditions: [string, any][]) => IRequestModel
  whereNotIn: <V = number>(column: keyof RequestsTable, values: V[]) => IRequestModel
  whereBetween: <V = number>(column: keyof RequestsTable, range: [V, V]) => IRequestModel
  whereRef: (column: keyof RequestsTable, ...args: string[]) => IRequestModel
  when: (condition: boolean, callback: (query: IRequestModel) => IRequestModel) => IRequestModel
  whereNull: (column: keyof RequestsTable) => IRequestModel
  whereNotNull: (column: keyof RequestsTable) => IRequestModel
  whereLike: (column: keyof RequestsTable, value: string) => IRequestModel
  orderBy: (column: keyof RequestsTable, order: 'asc' | 'desc') => IRequestModel
  orderByAsc: (column: keyof RequestsTable) => IRequestModel
  orderByDesc: (column: keyof RequestsTable) => IRequestModel
  groupBy: (column: keyof RequestsTable) => IRequestModel
  having: <V = string>(column: keyof RequestsTable, operator: Operator, value: V) => IRequestModel
  inRandomOrder: () => IRequestModel
  whereColumn: (first: keyof RequestsTable, operator: Operator, second: keyof RequestsTable) => IRequestModel
  max: (field: keyof RequestsTable) => Promise<number>
  min: (field: keyof RequestsTable) => Promise<number>
  avg: (field: keyof RequestsTable) => Promise<number>
  sum: (field: keyof RequestsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IRequestModel[]>
  pluck: <K extends keyof IRequestModel>(field: K) => Promise<IRequestModel[K][]>
  chunk: (size: number, callback: (models: IRequestModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IRequestModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newRequest: NewRequest) => Promise<IRequestModel>
  firstOrCreate: (search: Partial<RequestsTable>, values?: NewRequest) => Promise<IRequestModel>
  updateOrCreate: (search: Partial<RequestsTable>, values?: NewRequest) => Promise<IRequestModel>
  createMany: (newRequest: NewRequest[]) => Promise<void>
  forceCreate: (newRequest: NewRequest) => Promise<IRequestModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof RequestsTable, values: V[]) => IRequestModel
  distinct: (column: keyof RequestJsonResponse) => IRequestModel
  join: (table: string, firstCol: string, secondCol: string) => IRequestModel
}

export interface IRequestModel {
  // Properties
  readonly id: number
  get method(): string | string[] | undefined
  set method(value: string | string[])
  get path(): string | undefined
  set path(value: string)
  get status_code(): number | undefined
  set status_code(value: number)
  get duration_ms(): number | undefined
  set duration_ms(value: number)
  get ip_address(): string | undefined
  set ip_address(value: string)
  get memory_usage(): number | undefined
  set memory_usage(value: number)
  get user_agent(): string | undefined
  set user_agent(value: string)
  get error_message(): string | undefined
  set error_message(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: RequestJsonResponse) => IRequestModel
  create: (newRequest: NewRequest) => Promise<IRequestModel>
  update: (newRequest: RequestUpdate) => Promise<IRequestModel | undefined>
  forceUpdate: (newRequest: RequestUpdate) => Promise<IRequestModel | undefined>
  save: () => Promise<IRequestModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<RequestJsonResponse>
  toJSON: () => RequestJsonResponse
  parseResult: (model: IRequestModel) => IRequestModel
}

export type RequestModelType = IRequestModel & IRequestModelStatic
