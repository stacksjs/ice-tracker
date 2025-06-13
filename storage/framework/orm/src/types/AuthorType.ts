import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface AuthorsTable {
  id: Generated<number>
  name: string
  email: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type AuthorRead = AuthorsTable

export type AuthorWrite = Omit<AuthorsTable, 'created_at'> & {
  created_at?: string
}

export interface AuthorResponse {
  data: AuthorJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface AuthorJsonResponse extends Omit<Selectable<AuthorRead>, 'password'> {
  [key: string]: any
}

export type NewAuthor = Insertable<AuthorWrite>
export type AuthorUpdate = Updateable<AuthorWrite>

export interface IAuthorModelStatic {
  with: (relations: string[]) => IAuthorModel
  select: (params: (keyof AuthorJsonResponse)[] | RawBuilder<string> | string) => IAuthorModel
  find: (id: number) => Promise<IAuthorModel | undefined>
  first: () => Promise<IAuthorModel | undefined>
  last: () => Promise<IAuthorModel | undefined>
  firstOrFail: () => Promise<IAuthorModel | undefined>
  all: () => Promise<IAuthorModel[]>
  findOrFail: (id: number) => Promise<IAuthorModel | undefined>
  findMany: (ids: number[]) => Promise<IAuthorModel[]>
  latest: (column?: keyof AuthorsTable) => Promise<IAuthorModel | undefined>
  oldest: (column?: keyof AuthorsTable) => Promise<IAuthorModel | undefined>
  skip: (count: number) => IAuthorModel
  take: (count: number) => IAuthorModel
  where: <V = string>(column: keyof AuthorsTable, ...args: [V] | [Operator, V]) => IAuthorModel
  orWhere: (...conditions: [string, any][]) => IAuthorModel
  whereNotIn: <V = number>(column: keyof AuthorsTable, values: V[]) => IAuthorModel
  whereBetween: <V = number>(column: keyof AuthorsTable, range: [V, V]) => IAuthorModel
  whereRef: (column: keyof AuthorsTable, ...args: string[]) => IAuthorModel
  when: (condition: boolean, callback: (query: IAuthorModel) => IAuthorModel) => IAuthorModel
  whereNull: (column: keyof AuthorsTable) => IAuthorModel
  whereNotNull: (column: keyof AuthorsTable) => IAuthorModel
  whereLike: (column: keyof AuthorsTable, value: string) => IAuthorModel
  orderBy: (column: keyof AuthorsTable, order: 'asc' | 'desc') => IAuthorModel
  orderByAsc: (column: keyof AuthorsTable) => IAuthorModel
  orderByDesc: (column: keyof AuthorsTable) => IAuthorModel
  groupBy: (column: keyof AuthorsTable) => IAuthorModel
  having: <V = string>(column: keyof AuthorsTable, operator: Operator, value: V) => IAuthorModel
  inRandomOrder: () => IAuthorModel
  whereColumn: (first: keyof AuthorsTable, operator: Operator, second: keyof AuthorsTable) => IAuthorModel
  max: (field: keyof AuthorsTable) => Promise<number>
  min: (field: keyof AuthorsTable) => Promise<number>
  avg: (field: keyof AuthorsTable) => Promise<number>
  sum: (field: keyof AuthorsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IAuthorModel[]>
  pluck: <K extends keyof IAuthorModel>(field: K) => Promise<IAuthorModel[K][]>
  chunk: (size: number, callback: (models: IAuthorModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IAuthorModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newAuthor: NewAuthor) => Promise<IAuthorModel>
  firstOrCreate: (search: Partial<AuthorsTable>, values?: NewAuthor) => Promise<IAuthorModel>
  updateOrCreate: (search: Partial<AuthorsTable>, values?: NewAuthor) => Promise<IAuthorModel>
  createMany: (newAuthor: NewAuthor[]) => Promise<void>
  forceCreate: (newAuthor: NewAuthor) => Promise<IAuthorModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof AuthorsTable, values: V[]) => IAuthorModel
  distinct: (column: keyof AuthorJsonResponse) => IAuthorModel
  join: (table: string, firstCol: string, secondCol: string) => IAuthorModel
}

export interface IAuthorModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get email(): string
  set email(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: AuthorJsonResponse) => IAuthorModel
  create: (newAuthor: NewAuthor) => Promise<IAuthorModel>
  update: (newAuthor: AuthorUpdate) => Promise<IAuthorModel | undefined>
  forceUpdate: (newAuthor: AuthorUpdate) => Promise<IAuthorModel | undefined>
  save: () => Promise<IAuthorModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<AuthorJsonResponse>
  toJSON: () => AuthorJsonResponse
  parseResult: (model: IAuthorModel) => IAuthorModel
}

export type AuthorModelType = IAuthorModel & IAuthorModelStatic
