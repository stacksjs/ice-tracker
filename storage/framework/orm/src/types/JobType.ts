import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface JobsTable {
  id: Generated<number>
  queue: string
  payload: string
  attempts?: number
  available_at?: number
  reserved_at?: Date | string
  created_at?: string
  updated_at?: string
}

export type JobRead = JobsTable

export type JobWrite = Omit<JobsTable, 'created_at'> & {
  created_at?: string
}

export interface JobResponse {
  data: JobJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface JobJsonResponse extends Omit<Selectable<JobRead>, 'password'> {
  [key: string]: any
}

export type NewJob = Insertable<JobWrite>
export type JobUpdate = Updateable<JobWrite>

export interface IJobModelStatic {
  with: (relations: string[]) => IJobModel
  select: (params: (keyof JobJsonResponse)[] | RawBuilder<string> | string) => IJobModel
  find: (id: number) => Promise<IJobModel | undefined>
  first: () => Promise<IJobModel | undefined>
  last: () => Promise<IJobModel | undefined>
  firstOrFail: () => Promise<IJobModel | undefined>
  all: () => Promise<IJobModel[]>
  findOrFail: (id: number) => Promise<IJobModel | undefined>
  findMany: (ids: number[]) => Promise<IJobModel[]>
  latest: (column?: keyof JobsTable) => Promise<IJobModel | undefined>
  oldest: (column?: keyof JobsTable) => Promise<IJobModel | undefined>
  skip: (count: number) => IJobModel
  take: (count: number) => IJobModel
  where: <V = string>(column: keyof JobsTable, ...args: [V] | [Operator, V]) => IJobModel
  orWhere: (...conditions: [string, any][]) => IJobModel
  whereNotIn: <V = number>(column: keyof JobsTable, values: V[]) => IJobModel
  whereBetween: <V = number>(column: keyof JobsTable, range: [V, V]) => IJobModel
  whereRef: (column: keyof JobsTable, ...args: string[]) => IJobModel
  when: (condition: boolean, callback: (query: IJobModel) => IJobModel) => IJobModel
  whereNull: (column: keyof JobsTable) => IJobModel
  whereNotNull: (column: keyof JobsTable) => IJobModel
  whereLike: (column: keyof JobsTable, value: string) => IJobModel
  orderBy: (column: keyof JobsTable, order: 'asc' | 'desc') => IJobModel
  orderByAsc: (column: keyof JobsTable) => IJobModel
  orderByDesc: (column: keyof JobsTable) => IJobModel
  groupBy: (column: keyof JobsTable) => IJobModel
  having: <V = string>(column: keyof JobsTable, operator: Operator, value: V) => IJobModel
  inRandomOrder: () => IJobModel
  whereColumn: (first: keyof JobsTable, operator: Operator, second: keyof JobsTable) => IJobModel
  max: (field: keyof JobsTable) => Promise<number>
  min: (field: keyof JobsTable) => Promise<number>
  avg: (field: keyof JobsTable) => Promise<number>
  sum: (field: keyof JobsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IJobModel[]>
  pluck: <K extends keyof IJobModel>(field: K) => Promise<IJobModel[K][]>
  chunk: (size: number, callback: (models: IJobModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IJobModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newJob: NewJob) => Promise<IJobModel>
  firstOrCreate: (search: Partial<JobsTable>, values?: NewJob) => Promise<IJobModel>
  updateOrCreate: (search: Partial<JobsTable>, values?: NewJob) => Promise<IJobModel>
  createMany: (newJob: NewJob[]) => Promise<void>
  forceCreate: (newJob: NewJob) => Promise<IJobModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof JobsTable, values: V[]) => IJobModel
  distinct: (column: keyof JobJsonResponse) => IJobModel
  join: (table: string, firstCol: string, secondCol: string) => IJobModel
}

export interface IJobModel {
  // Properties
  readonly id: number
  get queue(): string
  set queue(value: string)
  get payload(): string
  set payload(value: string)
  get attempts(): number | undefined
  set attempts(value: number)
  get available_at(): number | undefined
  set available_at(value: number)
  get reserved_at(): Date | string | undefined
  set reserved_at(value: Date | string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: JobJsonResponse) => IJobModel
  create: (newJob: NewJob) => Promise<IJobModel>
  update: (newJob: JobUpdate) => Promise<IJobModel | undefined>
  forceUpdate: (newJob: JobUpdate) => Promise<IJobModel | undefined>
  save: () => Promise<IJobModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<JobJsonResponse>
  toJSON: () => JobJsonResponse
  parseResult: (model: IJobModel) => IJobModel
}

export type JobModelType = IJobModel & IJobModelStatic
