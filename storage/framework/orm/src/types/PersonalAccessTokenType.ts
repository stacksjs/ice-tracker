import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface PersonalAccessTokensTable {
  id: Generated<number>
  name: string
  token: string
  plain_text_token: string
  abilities: string
  last_used_at?: Date | string
  expires_at?: Date | string
  revoked_at?: Date | string
  ip_address?: string
  device_name?: string
  is_single_use?: boolean
  created_at?: string
  updated_at?: string
}

export type PersonalAccessTokenRead = PersonalAccessTokensTable

export type PersonalAccessTokenWrite = Omit<PersonalAccessTokensTable, 'created_at'> & {
  created_at?: string
}

export interface PersonalAccessTokenResponse {
  data: PersonalAccessTokenJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PersonalAccessTokenJsonResponse extends Omit<Selectable<PersonalAccessTokenRead>, 'password'> {
  [key: string]: any
}

export type NewPersonalAccessToken = Insertable<PersonalAccessTokenWrite>
export type PersonalAccessTokenUpdate = Updateable<PersonalAccessTokenWrite>

export interface IPersonalAccessTokenModelStatic {
  with: (relations: string[]) => IPersonalAccessTokenModel
  select: (params: (keyof PersonalAccessTokenJsonResponse)[] | RawBuilder<string> | string) => IPersonalAccessTokenModel
  find: (id: number) => Promise<IPersonalAccessTokenModel | undefined>
  first: () => Promise<IPersonalAccessTokenModel | undefined>
  last: () => Promise<IPersonalAccessTokenModel | undefined>
  firstOrFail: () => Promise<IPersonalAccessTokenModel | undefined>
  all: () => Promise<IPersonalAccessTokenModel[]>
  findOrFail: (id: number) => Promise<IPersonalAccessTokenModel | undefined>
  findMany: (ids: number[]) => Promise<IPersonalAccessTokenModel[]>
  latest: (column?: keyof PersonalAccessTokensTable) => Promise<IPersonalAccessTokenModel | undefined>
  oldest: (column?: keyof PersonalAccessTokensTable) => Promise<IPersonalAccessTokenModel | undefined>
  skip: (count: number) => IPersonalAccessTokenModel
  take: (count: number) => IPersonalAccessTokenModel
  where: <V = string>(column: keyof PersonalAccessTokensTable, ...args: [V] | [Operator, V]) => IPersonalAccessTokenModel
  orWhere: (...conditions: [string, any][]) => IPersonalAccessTokenModel
  whereNotIn: <V = number>(column: keyof PersonalAccessTokensTable, values: V[]) => IPersonalAccessTokenModel
  whereBetween: <V = number>(column: keyof PersonalAccessTokensTable, range: [V, V]) => IPersonalAccessTokenModel
  whereRef: (column: keyof PersonalAccessTokensTable, ...args: string[]) => IPersonalAccessTokenModel
  when: (condition: boolean, callback: (query: IPersonalAccessTokenModel) => IPersonalAccessTokenModel) => IPersonalAccessTokenModel
  whereNull: (column: keyof PersonalAccessTokensTable) => IPersonalAccessTokenModel
  whereNotNull: (column: keyof PersonalAccessTokensTable) => IPersonalAccessTokenModel
  whereLike: (column: keyof PersonalAccessTokensTable, value: string) => IPersonalAccessTokenModel
  orderBy: (column: keyof PersonalAccessTokensTable, order: 'asc' | 'desc') => IPersonalAccessTokenModel
  orderByAsc: (column: keyof PersonalAccessTokensTable) => IPersonalAccessTokenModel
  orderByDesc: (column: keyof PersonalAccessTokensTable) => IPersonalAccessTokenModel
  groupBy: (column: keyof PersonalAccessTokensTable) => IPersonalAccessTokenModel
  having: <V = string>(column: keyof PersonalAccessTokensTable, operator: Operator, value: V) => IPersonalAccessTokenModel
  inRandomOrder: () => IPersonalAccessTokenModel
  whereColumn: (first: keyof PersonalAccessTokensTable, operator: Operator, second: keyof PersonalAccessTokensTable) => IPersonalAccessTokenModel
  max: (field: keyof PersonalAccessTokensTable) => Promise<number>
  min: (field: keyof PersonalAccessTokensTable) => Promise<number>
  avg: (field: keyof PersonalAccessTokensTable) => Promise<number>
  sum: (field: keyof PersonalAccessTokensTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPersonalAccessTokenModel[]>
  pluck: <K extends keyof IPersonalAccessTokenModel>(field: K) => Promise<IPersonalAccessTokenModel[K][]>
  chunk: (size: number, callback: (models: IPersonalAccessTokenModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPersonalAccessTokenModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPersonalAccessToken: NewPersonalAccessToken) => Promise<IPersonalAccessTokenModel>
  firstOrCreate: (search: Partial<PersonalAccessTokensTable>, values?: NewPersonalAccessToken) => Promise<IPersonalAccessTokenModel>
  updateOrCreate: (search: Partial<PersonalAccessTokensTable>, values?: NewPersonalAccessToken) => Promise<IPersonalAccessTokenModel>
  createMany: (newPersonalAccessToken: NewPersonalAccessToken[]) => Promise<void>
  forceCreate: (newPersonalAccessToken: NewPersonalAccessToken) => Promise<IPersonalAccessTokenModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PersonalAccessTokensTable, values: V[]) => IPersonalAccessTokenModel
  distinct: (column: keyof PersonalAccessTokenJsonResponse) => IPersonalAccessTokenModel
  join: (table: string, firstCol: string, secondCol: string) => IPersonalAccessTokenModel
}

export interface IPersonalAccessTokenModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get token(): string
  set token(value: string)
  get plain_text_token(): string
  set plain_text_token(value: string)
  get abilities(): string
  set abilities(value: string)
  get last_used_at(): Date | string | undefined
  set last_used_at(value: Date | string)
  get expires_at(): Date | string | undefined
  set expires_at(value: Date | string)
  get revoked_at(): Date | string | undefined
  set revoked_at(value: Date | string)
  get ip_address(): string | undefined
  set ip_address(value: string)
  get device_name(): string | undefined
  set device_name(value: string)
  get is_single_use(): boolean | undefined
  set is_single_use(value: boolean)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PersonalAccessTokenJsonResponse) => IPersonalAccessTokenModel
  create: (newPersonalAccessToken: NewPersonalAccessToken) => Promise<IPersonalAccessTokenModel>
  update: (newPersonalAccessToken: PersonalAccessTokenUpdate) => Promise<IPersonalAccessTokenModel | undefined>
  forceUpdate: (newPersonalAccessToken: PersonalAccessTokenUpdate) => Promise<IPersonalAccessTokenModel | undefined>
  save: () => Promise<IPersonalAccessTokenModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PersonalAccessTokenJsonResponse>
  toJSON: () => PersonalAccessTokenJsonResponse
  parseResult: (model: IPersonalAccessTokenModel) => IPersonalAccessTokenModel
}

export type PersonalAccessTokenModelType = IPersonalAccessTokenModel & IPersonalAccessTokenModelStatic
