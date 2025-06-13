import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface OauthAccessTokensTable {
  id: Generated<number>
  token: string
  name?: string
  scopes?: string
  revoked: boolean
  expires_at?: Date | string
  created_at?: string
  updated_at?: string
}

export type OauthAccessTokenRead = OauthAccessTokensTable

export type OauthAccessTokenWrite = Omit<OauthAccessTokensTable, 'created_at'> & {
  created_at?: string
}

export interface OauthAccessTokenResponse {
  data: OauthAccessTokenJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface OauthAccessTokenJsonResponse extends Omit<Selectable<OauthAccessTokenRead>, 'password'> {
  [key: string]: any
}

export type NewOauthAccessToken = Insertable<OauthAccessTokenWrite>
export type OauthAccessTokenUpdate = Updateable<OauthAccessTokenWrite>

export interface IOauthAccessTokenModelStatic {
  with: (relations: string[]) => IOauthAccessTokenModel
  select: (params: (keyof OauthAccessTokenJsonResponse)[] | RawBuilder<string> | string) => IOauthAccessTokenModel
  find: (id: number) => Promise<IOauthAccessTokenModel | undefined>
  first: () => Promise<IOauthAccessTokenModel | undefined>
  last: () => Promise<IOauthAccessTokenModel | undefined>
  firstOrFail: () => Promise<IOauthAccessTokenModel | undefined>
  all: () => Promise<IOauthAccessTokenModel[]>
  findOrFail: (id: number) => Promise<IOauthAccessTokenModel | undefined>
  findMany: (ids: number[]) => Promise<IOauthAccessTokenModel[]>
  latest: (column?: keyof OauthAccessTokensTable) => Promise<IOauthAccessTokenModel | undefined>
  oldest: (column?: keyof OauthAccessTokensTable) => Promise<IOauthAccessTokenModel | undefined>
  skip: (count: number) => IOauthAccessTokenModel
  take: (count: number) => IOauthAccessTokenModel
  where: <V = string>(column: keyof OauthAccessTokensTable, ...args: [V] | [Operator, V]) => IOauthAccessTokenModel
  orWhere: (...conditions: [string, any][]) => IOauthAccessTokenModel
  whereNotIn: <V = number>(column: keyof OauthAccessTokensTable, values: V[]) => IOauthAccessTokenModel
  whereBetween: <V = number>(column: keyof OauthAccessTokensTable, range: [V, V]) => IOauthAccessTokenModel
  whereRef: (column: keyof OauthAccessTokensTable, ...args: string[]) => IOauthAccessTokenModel
  when: (condition: boolean, callback: (query: IOauthAccessTokenModel) => IOauthAccessTokenModel) => IOauthAccessTokenModel
  whereNull: (column: keyof OauthAccessTokensTable) => IOauthAccessTokenModel
  whereNotNull: (column: keyof OauthAccessTokensTable) => IOauthAccessTokenModel
  whereLike: (column: keyof OauthAccessTokensTable, value: string) => IOauthAccessTokenModel
  orderBy: (column: keyof OauthAccessTokensTable, order: 'asc' | 'desc') => IOauthAccessTokenModel
  orderByAsc: (column: keyof OauthAccessTokensTable) => IOauthAccessTokenModel
  orderByDesc: (column: keyof OauthAccessTokensTable) => IOauthAccessTokenModel
  groupBy: (column: keyof OauthAccessTokensTable) => IOauthAccessTokenModel
  having: <V = string>(column: keyof OauthAccessTokensTable, operator: Operator, value: V) => IOauthAccessTokenModel
  inRandomOrder: () => IOauthAccessTokenModel
  whereColumn: (first: keyof OauthAccessTokensTable, operator: Operator, second: keyof OauthAccessTokensTable) => IOauthAccessTokenModel
  max: (field: keyof OauthAccessTokensTable) => Promise<number>
  min: (field: keyof OauthAccessTokensTable) => Promise<number>
  avg: (field: keyof OauthAccessTokensTable) => Promise<number>
  sum: (field: keyof OauthAccessTokensTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IOauthAccessTokenModel[]>
  pluck: <K extends keyof IOauthAccessTokenModel>(field: K) => Promise<IOauthAccessTokenModel[K][]>
  chunk: (size: number, callback: (models: IOauthAccessTokenModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IOauthAccessTokenModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newOauthAccessToken: NewOauthAccessToken) => Promise<IOauthAccessTokenModel>
  firstOrCreate: (search: Partial<OauthAccessTokensTable>, values?: NewOauthAccessToken) => Promise<IOauthAccessTokenModel>
  updateOrCreate: (search: Partial<OauthAccessTokensTable>, values?: NewOauthAccessToken) => Promise<IOauthAccessTokenModel>
  createMany: (newOauthAccessToken: NewOauthAccessToken[]) => Promise<void>
  forceCreate: (newOauthAccessToken: NewOauthAccessToken) => Promise<IOauthAccessTokenModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof OauthAccessTokensTable, values: V[]) => IOauthAccessTokenModel
  distinct: (column: keyof OauthAccessTokenJsonResponse) => IOauthAccessTokenModel
  join: (table: string, firstCol: string, secondCol: string) => IOauthAccessTokenModel
}

export interface IOauthAccessTokenModel {
  // Properties
  readonly id: number
  get token(): string
  set token(value: string)
  get name(): string | undefined
  set name(value: string)
  get scopes(): string | undefined
  set scopes(value: string)
  get revoked(): boolean
  set revoked(value: boolean)
  get expires_at(): Date | string | undefined
  set expires_at(value: Date | string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: OauthAccessTokenJsonResponse) => IOauthAccessTokenModel
  create: (newOauthAccessToken: NewOauthAccessToken) => Promise<IOauthAccessTokenModel>
  update: (newOauthAccessToken: OauthAccessTokenUpdate) => Promise<IOauthAccessTokenModel | undefined>
  forceUpdate: (newOauthAccessToken: OauthAccessTokenUpdate) => Promise<IOauthAccessTokenModel | undefined>
  save: () => Promise<IOauthAccessTokenModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<OauthAccessTokenJsonResponse>
  toJSON: () => OauthAccessTokenJsonResponse
  parseResult: (model: IOauthAccessTokenModel) => IOauthAccessTokenModel
}

export type OauthAccessTokenModelType = IOauthAccessTokenModel & IOauthAccessTokenModelStatic
