import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface OauthClientsTable {
  id: Generated<number>
  name: string
  secret: string
  provider?: string
  redirect: string
  personal_access_client: boolean
  password_client: boolean
  revoked: boolean
  created_at?: string
  updated_at?: string
}

export type OauthClientRead = OauthClientsTable

export type OauthClientWrite = Omit<OauthClientsTable, 'created_at'> & {
  created_at?: string
}

export interface OauthClientResponse {
  data: OauthClientJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface OauthClientJsonResponse extends Omit<Selectable<OauthClientRead>, 'password'> {
  [key: string]: any
}

export type NewOauthClient = Insertable<OauthClientWrite>
export type OauthClientUpdate = Updateable<OauthClientWrite>

export interface IOauthClientModelStatic {
  with: (relations: string[]) => IOauthClientModel
  select: (params: (keyof OauthClientJsonResponse)[] | RawBuilder<string> | string) => IOauthClientModel
  find: (id: number) => Promise<IOauthClientModel | undefined>
  first: () => Promise<IOauthClientModel | undefined>
  last: () => Promise<IOauthClientModel | undefined>
  firstOrFail: () => Promise<IOauthClientModel | undefined>
  all: () => Promise<IOauthClientModel[]>
  findOrFail: (id: number) => Promise<IOauthClientModel | undefined>
  findMany: (ids: number[]) => Promise<IOauthClientModel[]>
  latest: (column?: keyof OauthClientsTable) => Promise<IOauthClientModel | undefined>
  oldest: (column?: keyof OauthClientsTable) => Promise<IOauthClientModel | undefined>
  skip: (count: number) => IOauthClientModel
  take: (count: number) => IOauthClientModel
  where: <V = string>(column: keyof OauthClientsTable, ...args: [V] | [Operator, V]) => IOauthClientModel
  orWhere: (...conditions: [string, any][]) => IOauthClientModel
  whereNotIn: <V = number>(column: keyof OauthClientsTable, values: V[]) => IOauthClientModel
  whereBetween: <V = number>(column: keyof OauthClientsTable, range: [V, V]) => IOauthClientModel
  whereRef: (column: keyof OauthClientsTable, ...args: string[]) => IOauthClientModel
  when: (condition: boolean, callback: (query: IOauthClientModel) => IOauthClientModel) => IOauthClientModel
  whereNull: (column: keyof OauthClientsTable) => IOauthClientModel
  whereNotNull: (column: keyof OauthClientsTable) => IOauthClientModel
  whereLike: (column: keyof OauthClientsTable, value: string) => IOauthClientModel
  orderBy: (column: keyof OauthClientsTable, order: 'asc' | 'desc') => IOauthClientModel
  orderByAsc: (column: keyof OauthClientsTable) => IOauthClientModel
  orderByDesc: (column: keyof OauthClientsTable) => IOauthClientModel
  groupBy: (column: keyof OauthClientsTable) => IOauthClientModel
  having: <V = string>(column: keyof OauthClientsTable, operator: Operator, value: V) => IOauthClientModel
  inRandomOrder: () => IOauthClientModel
  whereColumn: (first: keyof OauthClientsTable, operator: Operator, second: keyof OauthClientsTable) => IOauthClientModel
  max: (field: keyof OauthClientsTable) => Promise<number>
  min: (field: keyof OauthClientsTable) => Promise<number>
  avg: (field: keyof OauthClientsTable) => Promise<number>
  sum: (field: keyof OauthClientsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IOauthClientModel[]>
  pluck: <K extends keyof IOauthClientModel>(field: K) => Promise<IOauthClientModel[K][]>
  chunk: (size: number, callback: (models: IOauthClientModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IOauthClientModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newOauthClient: NewOauthClient) => Promise<IOauthClientModel>
  firstOrCreate: (search: Partial<OauthClientsTable>, values?: NewOauthClient) => Promise<IOauthClientModel>
  updateOrCreate: (search: Partial<OauthClientsTable>, values?: NewOauthClient) => Promise<IOauthClientModel>
  createMany: (newOauthClient: NewOauthClient[]) => Promise<void>
  forceCreate: (newOauthClient: NewOauthClient) => Promise<IOauthClientModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof OauthClientsTable, values: V[]) => IOauthClientModel
  distinct: (column: keyof OauthClientJsonResponse) => IOauthClientModel
  join: (table: string, firstCol: string, secondCol: string) => IOauthClientModel
}

export interface IOauthClientModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get secret(): string
  set secret(value: string)
  get provider(): string | undefined
  set provider(value: string)
  get redirect(): string
  set redirect(value: string)
  get personal_access_client(): boolean
  set personal_access_client(value: boolean)
  get password_client(): boolean
  set password_client(value: boolean)
  get revoked(): boolean
  set revoked(value: boolean)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: OauthClientJsonResponse) => IOauthClientModel
  create: (newOauthClient: NewOauthClient) => Promise<IOauthClientModel>
  update: (newOauthClient: OauthClientUpdate) => Promise<IOauthClientModel | undefined>
  forceUpdate: (newOauthClient: OauthClientUpdate) => Promise<IOauthClientModel | undefined>
  save: () => Promise<IOauthClientModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<OauthClientJsonResponse>
  toJSON: () => OauthClientJsonResponse
  parseResult: (model: IOauthClientModel) => IOauthClientModel
}

export type OauthClientModelType = IOauthClientModel & IOauthClientModelStatic
