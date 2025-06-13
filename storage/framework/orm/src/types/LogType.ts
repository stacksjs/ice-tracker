import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface LogsTable {
  id: Generated<number>
  timestamp: number
  type: string | string[]
  source: string | string[]
  message: string
  project: string
  stacktrace?: string
  file?: string
  created_at?: string
  updated_at?: string
}

export type LogRead = LogsTable

export type LogWrite = Omit<LogsTable, 'created_at'> & {
  created_at?: string
}

export interface LogResponse {
  data: LogJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface LogJsonResponse extends Omit<Selectable<LogRead>, 'password'> {
  [key: string]: any
}

export type NewLog = Insertable<LogWrite>
export type LogUpdate = Updateable<LogWrite>

export interface ILogModelStatic {
  with: (relations: string[]) => ILogModel
  select: (params: (keyof LogJsonResponse)[] | RawBuilder<string> | string) => ILogModel
  find: (id: number) => Promise<ILogModel | undefined>
  first: () => Promise<ILogModel | undefined>
  last: () => Promise<ILogModel | undefined>
  firstOrFail: () => Promise<ILogModel | undefined>
  all: () => Promise<ILogModel[]>
  findOrFail: (id: number) => Promise<ILogModel | undefined>
  findMany: (ids: number[]) => Promise<ILogModel[]>
  latest: (column?: keyof LogsTable) => Promise<ILogModel | undefined>
  oldest: (column?: keyof LogsTable) => Promise<ILogModel | undefined>
  skip: (count: number) => ILogModel
  take: (count: number) => ILogModel
  where: <V = string>(column: keyof LogsTable, ...args: [V] | [Operator, V]) => ILogModel
  orWhere: (...conditions: [string, any][]) => ILogModel
  whereNotIn: <V = number>(column: keyof LogsTable, values: V[]) => ILogModel
  whereBetween: <V = number>(column: keyof LogsTable, range: [V, V]) => ILogModel
  whereRef: (column: keyof LogsTable, ...args: string[]) => ILogModel
  when: (condition: boolean, callback: (query: ILogModel) => ILogModel) => ILogModel
  whereNull: (column: keyof LogsTable) => ILogModel
  whereNotNull: (column: keyof LogsTable) => ILogModel
  whereLike: (column: keyof LogsTable, value: string) => ILogModel
  orderBy: (column: keyof LogsTable, order: 'asc' | 'desc') => ILogModel
  orderByAsc: (column: keyof LogsTable) => ILogModel
  orderByDesc: (column: keyof LogsTable) => ILogModel
  groupBy: (column: keyof LogsTable) => ILogModel
  having: <V = string>(column: keyof LogsTable, operator: Operator, value: V) => ILogModel
  inRandomOrder: () => ILogModel
  whereColumn: (first: keyof LogsTable, operator: Operator, second: keyof LogsTable) => ILogModel
  max: (field: keyof LogsTable) => Promise<number>
  min: (field: keyof LogsTable) => Promise<number>
  avg: (field: keyof LogsTable) => Promise<number>
  sum: (field: keyof LogsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ILogModel[]>
  pluck: <K extends keyof ILogModel>(field: K) => Promise<ILogModel[K][]>
  chunk: (size: number, callback: (models: ILogModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ILogModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newLog: NewLog) => Promise<ILogModel>
  firstOrCreate: (search: Partial<LogsTable>, values?: NewLog) => Promise<ILogModel>
  updateOrCreate: (search: Partial<LogsTable>, values?: NewLog) => Promise<ILogModel>
  createMany: (newLog: NewLog[]) => Promise<void>
  forceCreate: (newLog: NewLog) => Promise<ILogModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof LogsTable, values: V[]) => ILogModel
  distinct: (column: keyof LogJsonResponse) => ILogModel
  join: (table: string, firstCol: string, secondCol: string) => ILogModel
}

export interface ILogModel {
  // Properties
  readonly id: number
  get timestamp(): number
  set timestamp(value: number)
  get type(): string | string[]
  set type(value: string | string[])
  get source(): string | string[]
  set source(value: string | string[])
  get message(): string
  set message(value: string)
  get project(): string
  set project(value: string)
  get stacktrace(): string | undefined
  set stacktrace(value: string)
  get file(): string | undefined
  set file(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: LogJsonResponse) => ILogModel
  create: (newLog: NewLog) => Promise<ILogModel>
  update: (newLog: LogUpdate) => Promise<ILogModel | undefined>
  forceUpdate: (newLog: LogUpdate) => Promise<ILogModel | undefined>
  save: () => Promise<ILogModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<LogJsonResponse>
  toJSON: () => LogJsonResponse
  parseResult: (model: ILogModel) => ILogModel
}

export type LogModelType = ILogModel & ILogModelStatic
