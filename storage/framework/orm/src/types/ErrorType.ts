import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface ErrorsTable {
  id: Generated<number>
  type: string
  message: string
  stack?: string
  status: number
  additional_info?: string
  created_at?: string
  updated_at?: string
}

export type ErrorRead = ErrorsTable

export type ErrorWrite = Omit<ErrorsTable, 'created_at'> & {
  created_at?: string
}

export interface ErrorResponse {
  data: ErrorJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ErrorJsonResponse extends Omit<Selectable<ErrorRead>, 'password'> {
  [key: string]: any
}

export type NewError = Insertable<ErrorWrite>
export type ErrorUpdate = Updateable<ErrorWrite>

export interface IErrorModelStatic {
  with: (relations: string[]) => IErrorModel
  select: (params: (keyof ErrorJsonResponse)[] | RawBuilder<string> | string) => IErrorModel
  find: (id: number) => Promise<IErrorModel | undefined>
  first: () => Promise<IErrorModel | undefined>
  last: () => Promise<IErrorModel | undefined>
  firstOrFail: () => Promise<IErrorModel | undefined>
  all: () => Promise<IErrorModel[]>
  findOrFail: (id: number) => Promise<IErrorModel | undefined>
  findMany: (ids: number[]) => Promise<IErrorModel[]>
  latest: (column?: keyof ErrorsTable) => Promise<IErrorModel | undefined>
  oldest: (column?: keyof ErrorsTable) => Promise<IErrorModel | undefined>
  skip: (count: number) => IErrorModel
  take: (count: number) => IErrorModel
  where: <V = string>(column: keyof ErrorsTable, ...args: [V] | [Operator, V]) => IErrorModel
  orWhere: (...conditions: [string, any][]) => IErrorModel
  whereNotIn: <V = number>(column: keyof ErrorsTable, values: V[]) => IErrorModel
  whereBetween: <V = number>(column: keyof ErrorsTable, range: [V, V]) => IErrorModel
  whereRef: (column: keyof ErrorsTable, ...args: string[]) => IErrorModel
  when: (condition: boolean, callback: (query: IErrorModel) => IErrorModel) => IErrorModel
  whereNull: (column: keyof ErrorsTable) => IErrorModel
  whereNotNull: (column: keyof ErrorsTable) => IErrorModel
  whereLike: (column: keyof ErrorsTable, value: string) => IErrorModel
  orderBy: (column: keyof ErrorsTable, order: 'asc' | 'desc') => IErrorModel
  orderByAsc: (column: keyof ErrorsTable) => IErrorModel
  orderByDesc: (column: keyof ErrorsTable) => IErrorModel
  groupBy: (column: keyof ErrorsTable) => IErrorModel
  having: <V = string>(column: keyof ErrorsTable, operator: Operator, value: V) => IErrorModel
  inRandomOrder: () => IErrorModel
  whereColumn: (first: keyof ErrorsTable, operator: Operator, second: keyof ErrorsTable) => IErrorModel
  max: (field: keyof ErrorsTable) => Promise<number>
  min: (field: keyof ErrorsTable) => Promise<number>
  avg: (field: keyof ErrorsTable) => Promise<number>
  sum: (field: keyof ErrorsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IErrorModel[]>
  pluck: <K extends keyof IErrorModel>(field: K) => Promise<IErrorModel[K][]>
  chunk: (size: number, callback: (models: IErrorModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IErrorModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newError: NewError) => Promise<IErrorModel>
  firstOrCreate: (search: Partial<ErrorsTable>, values?: NewError) => Promise<IErrorModel>
  updateOrCreate: (search: Partial<ErrorsTable>, values?: NewError) => Promise<IErrorModel>
  createMany: (newError: NewError[]) => Promise<void>
  forceCreate: (newError: NewError) => Promise<IErrorModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ErrorsTable, values: V[]) => IErrorModel
  distinct: (column: keyof ErrorJsonResponse) => IErrorModel
  join: (table: string, firstCol: string, secondCol: string) => IErrorModel
}

export interface IErrorModel {
  // Properties
  readonly id: number
  get type(): string
  set type(value: string)
  get message(): string
  set message(value: string)
  get stack(): string | undefined
  set stack(value: string)
  get status(): number
  set status(value: number)
  get additional_info(): string | undefined
  set additional_info(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ErrorJsonResponse) => IErrorModel
  create: (newError: NewError) => Promise<IErrorModel>
  update: (newError: ErrorUpdate) => Promise<IErrorModel | undefined>
  forceUpdate: (newError: ErrorUpdate) => Promise<IErrorModel | undefined>
  save: () => Promise<IErrorModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ErrorJsonResponse>
  toJSON: () => ErrorJsonResponse
  parseResult: (model: IErrorModel) => IErrorModel
}

export type ErrorModelType = IErrorModel & IErrorModelStatic
