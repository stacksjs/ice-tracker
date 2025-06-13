import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface FailedJobsTable {
  id: Generated<number>
  connection: string
  queue: string
  payload: string
  exception: string
  failed_at?: Date | string
  created_at?: string
  updated_at?: string
}

export type FailedJobRead = FailedJobsTable

export type FailedJobWrite = Omit<FailedJobsTable, 'created_at'> & {
  created_at?: string
}

export interface FailedJobResponse {
  data: FailedJobJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface FailedJobJsonResponse extends Omit<Selectable<FailedJobRead>, 'password'> {
  [key: string]: any
}

export type NewFailedJob = Insertable<FailedJobWrite>
export type FailedJobUpdate = Updateable<FailedJobWrite>

export interface IFailedJobModelStatic {
  with: (relations: string[]) => IFailedJobModel
  select: (params: (keyof FailedJobJsonResponse)[] | RawBuilder<string> | string) => IFailedJobModel
  find: (id: number) => Promise<IFailedJobModel | undefined>
  first: () => Promise<IFailedJobModel | undefined>
  last: () => Promise<IFailedJobModel | undefined>
  firstOrFail: () => Promise<IFailedJobModel | undefined>
  all: () => Promise<IFailedJobModel[]>
  findOrFail: (id: number) => Promise<IFailedJobModel | undefined>
  findMany: (ids: number[]) => Promise<IFailedJobModel[]>
  latest: (column?: keyof FailedJobsTable) => Promise<IFailedJobModel | undefined>
  oldest: (column?: keyof FailedJobsTable) => Promise<IFailedJobModel | undefined>
  skip: (count: number) => IFailedJobModel
  take: (count: number) => IFailedJobModel
  where: <V = string>(column: keyof FailedJobsTable, ...args: [V] | [Operator, V]) => IFailedJobModel
  orWhere: (...conditions: [string, any][]) => IFailedJobModel
  whereNotIn: <V = number>(column: keyof FailedJobsTable, values: V[]) => IFailedJobModel
  whereBetween: <V = number>(column: keyof FailedJobsTable, range: [V, V]) => IFailedJobModel
  whereRef: (column: keyof FailedJobsTable, ...args: string[]) => IFailedJobModel
  when: (condition: boolean, callback: (query: IFailedJobModel) => IFailedJobModel) => IFailedJobModel
  whereNull: (column: keyof FailedJobsTable) => IFailedJobModel
  whereNotNull: (column: keyof FailedJobsTable) => IFailedJobModel
  whereLike: (column: keyof FailedJobsTable, value: string) => IFailedJobModel
  orderBy: (column: keyof FailedJobsTable, order: 'asc' | 'desc') => IFailedJobModel
  orderByAsc: (column: keyof FailedJobsTable) => IFailedJobModel
  orderByDesc: (column: keyof FailedJobsTable) => IFailedJobModel
  groupBy: (column: keyof FailedJobsTable) => IFailedJobModel
  having: <V = string>(column: keyof FailedJobsTable, operator: Operator, value: V) => IFailedJobModel
  inRandomOrder: () => IFailedJobModel
  whereColumn: (first: keyof FailedJobsTable, operator: Operator, second: keyof FailedJobsTable) => IFailedJobModel
  max: (field: keyof FailedJobsTable) => Promise<number>
  min: (field: keyof FailedJobsTable) => Promise<number>
  avg: (field: keyof FailedJobsTable) => Promise<number>
  sum: (field: keyof FailedJobsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IFailedJobModel[]>
  pluck: <K extends keyof IFailedJobModel>(field: K) => Promise<IFailedJobModel[K][]>
  chunk: (size: number, callback: (models: IFailedJobModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IFailedJobModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newFailedJob: NewFailedJob) => Promise<IFailedJobModel>
  firstOrCreate: (search: Partial<FailedJobsTable>, values?: NewFailedJob) => Promise<IFailedJobModel>
  updateOrCreate: (search: Partial<FailedJobsTable>, values?: NewFailedJob) => Promise<IFailedJobModel>
  createMany: (newFailedJob: NewFailedJob[]) => Promise<void>
  forceCreate: (newFailedJob: NewFailedJob) => Promise<IFailedJobModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof FailedJobsTable, values: V[]) => IFailedJobModel
  distinct: (column: keyof FailedJobJsonResponse) => IFailedJobModel
  join: (table: string, firstCol: string, secondCol: string) => IFailedJobModel
}

export interface IFailedJobModel {
  // Properties
  readonly id: number
  get connection(): string
  set connection(value: string)
  get queue(): string
  set queue(value: string)
  get payload(): string
  set payload(value: string)
  get exception(): string
  set exception(value: string)
  get failed_at(): Date | string | undefined
  set failed_at(value: Date | string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: FailedJobJsonResponse) => IFailedJobModel
  create: (newFailedJob: NewFailedJob) => Promise<IFailedJobModel>
  update: (newFailedJob: FailedJobUpdate) => Promise<IFailedJobModel | undefined>
  forceUpdate: (newFailedJob: FailedJobUpdate) => Promise<IFailedJobModel | undefined>
  save: () => Promise<IFailedJobModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<FailedJobJsonResponse>
  toJSON: () => FailedJobJsonResponse
  parseResult: (model: IFailedJobModel) => IFailedJobModel
}

export type FailedJobModelType = IFailedJobModel & IFailedJobModelStatic
