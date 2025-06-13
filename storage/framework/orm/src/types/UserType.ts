import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface UsersTable {
  id: Generated<number>
  name: string
  email: string
  password: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type UserRead = UsersTable

export type UserWrite = Omit<UsersTable, 'created_at'> & {
  created_at?: string
}

export interface UserResponse {
  data: UserJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface UserJsonResponse extends Omit<Selectable<UserRead>, 'password'> {
  [key: string]: any
}

export type NewUser = Insertable<UserWrite>
export type UserUpdate = Updateable<UserWrite>

export interface IUserModelStatic {
  with: (relations: string[]) => IUserModel
  select: (params: (keyof UserJsonResponse)[] | RawBuilder<string> | string) => IUserModel
  find: (id: number) => Promise<IUserModel | undefined>
  first: () => Promise<IUserModel | undefined>
  last: () => Promise<IUserModel | undefined>
  firstOrFail: () => Promise<IUserModel | undefined>
  all: () => Promise<IUserModel[]>
  findOrFail: (id: number) => Promise<IUserModel | undefined>
  findMany: (ids: number[]) => Promise<IUserModel[]>
  latest: (column?: keyof UsersTable) => Promise<IUserModel | undefined>
  oldest: (column?: keyof UsersTable) => Promise<IUserModel | undefined>
  skip: (count: number) => IUserModel
  take: (count: number) => IUserModel
  where: <V = string>(column: keyof UsersTable, ...args: [V] | [Operator, V]) => IUserModel
  orWhere: (...conditions: [string, any][]) => IUserModel
  whereNotIn: <V = number>(column: keyof UsersTable, values: V[]) => IUserModel
  whereBetween: <V = number>(column: keyof UsersTable, range: [V, V]) => IUserModel
  whereRef: (column: keyof UsersTable, ...args: string[]) => IUserModel
  when: (condition: boolean, callback: (query: IUserModel) => IUserModel) => IUserModel
  whereNull: (column: keyof UsersTable) => IUserModel
  whereNotNull: (column: keyof UsersTable) => IUserModel
  whereLike: (column: keyof UsersTable, value: string) => IUserModel
  orderBy: (column: keyof UsersTable, order: 'asc' | 'desc') => IUserModel
  orderByAsc: (column: keyof UsersTable) => IUserModel
  orderByDesc: (column: keyof UsersTable) => IUserModel
  groupBy: (column: keyof UsersTable) => IUserModel
  having: <V = string>(column: keyof UsersTable, operator: Operator, value: V) => IUserModel
  inRandomOrder: () => IUserModel
  whereColumn: (first: keyof UsersTable, operator: Operator, second: keyof UsersTable) => IUserModel
  max: (field: keyof UsersTable) => Promise<number>
  min: (field: keyof UsersTable) => Promise<number>
  avg: (field: keyof UsersTable) => Promise<number>
  sum: (field: keyof UsersTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IUserModel[]>
  pluck: <K extends keyof IUserModel>(field: K) => Promise<IUserModel[K][]>
  chunk: (size: number, callback: (models: IUserModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IUserModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newUser: NewUser) => Promise<IUserModel>
  firstOrCreate: (search: Partial<UsersTable>, values?: NewUser) => Promise<IUserModel>
  updateOrCreate: (search: Partial<UsersTable>, values?: NewUser) => Promise<IUserModel>
  createMany: (newUser: NewUser[]) => Promise<void>
  forceCreate: (newUser: NewUser) => Promise<IUserModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof UsersTable, values: V[]) => IUserModel
  distinct: (column: keyof UserJsonResponse) => IUserModel
  join: (table: string, firstCol: string, secondCol: string) => IUserModel
}

export interface IUserModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get email(): string
  set email(value: string)
  get password(): string
  set password(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: UserJsonResponse) => IUserModel
  create: (newUser: NewUser) => Promise<IUserModel>
  update: (newUser: UserUpdate) => Promise<IUserModel | undefined>
  forceUpdate: (newUser: UserUpdate) => Promise<IUserModel | undefined>
  save: () => Promise<IUserModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<UserJsonResponse>
  toJSON: () => UserJsonResponse
  parseResult: (model: IUserModel) => IUserModel
}

export type UserModelType = IUserModel & IUserModelStatic
