import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface WebsocketsTable {
  id: Generated<number>
  type: string | string[]
  socket: string
  details: string
  time: number
  created_at?: string
  updated_at?: string
}

export type WebsocketRead = WebsocketsTable

export type WebsocketWrite = Omit<WebsocketsTable, 'created_at'> & {
  created_at?: string
}

export interface WebsocketResponse {
  data: WebsocketJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface WebsocketJsonResponse extends Omit<Selectable<WebsocketRead>, 'password'> {
  [key: string]: any
}

export type NewWebsocket = Insertable<WebsocketWrite>
export type WebsocketUpdate = Updateable<WebsocketWrite>

export interface IWebsocketModelStatic {
  with: (relations: string[]) => IWebsocketModel
  select: (params: (keyof WebsocketJsonResponse)[] | RawBuilder<string> | string) => IWebsocketModel
  find: (id: number) => Promise<IWebsocketModel | undefined>
  first: () => Promise<IWebsocketModel | undefined>
  last: () => Promise<IWebsocketModel | undefined>
  firstOrFail: () => Promise<IWebsocketModel | undefined>
  all: () => Promise<IWebsocketModel[]>
  findOrFail: (id: number) => Promise<IWebsocketModel | undefined>
  findMany: (ids: number[]) => Promise<IWebsocketModel[]>
  latest: (column?: keyof WebsocketsTable) => Promise<IWebsocketModel | undefined>
  oldest: (column?: keyof WebsocketsTable) => Promise<IWebsocketModel | undefined>
  skip: (count: number) => IWebsocketModel
  take: (count: number) => IWebsocketModel
  where: <V = string>(column: keyof WebsocketsTable, ...args: [V] | [Operator, V]) => IWebsocketModel
  orWhere: (...conditions: [string, any][]) => IWebsocketModel
  whereNotIn: <V = number>(column: keyof WebsocketsTable, values: V[]) => IWebsocketModel
  whereBetween: <V = number>(column: keyof WebsocketsTable, range: [V, V]) => IWebsocketModel
  whereRef: (column: keyof WebsocketsTable, ...args: string[]) => IWebsocketModel
  when: (condition: boolean, callback: (query: IWebsocketModel) => IWebsocketModel) => IWebsocketModel
  whereNull: (column: keyof WebsocketsTable) => IWebsocketModel
  whereNotNull: (column: keyof WebsocketsTable) => IWebsocketModel
  whereLike: (column: keyof WebsocketsTable, value: string) => IWebsocketModel
  orderBy: (column: keyof WebsocketsTable, order: 'asc' | 'desc') => IWebsocketModel
  orderByAsc: (column: keyof WebsocketsTable) => IWebsocketModel
  orderByDesc: (column: keyof WebsocketsTable) => IWebsocketModel
  groupBy: (column: keyof WebsocketsTable) => IWebsocketModel
  having: <V = string>(column: keyof WebsocketsTable, operator: Operator, value: V) => IWebsocketModel
  inRandomOrder: () => IWebsocketModel
  whereColumn: (first: keyof WebsocketsTable, operator: Operator, second: keyof WebsocketsTable) => IWebsocketModel
  max: (field: keyof WebsocketsTable) => Promise<number>
  min: (field: keyof WebsocketsTable) => Promise<number>
  avg: (field: keyof WebsocketsTable) => Promise<number>
  sum: (field: keyof WebsocketsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IWebsocketModel[]>
  pluck: <K extends keyof IWebsocketModel>(field: K) => Promise<IWebsocketModel[K][]>
  chunk: (size: number, callback: (models: IWebsocketModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IWebsocketModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newWebsocket: NewWebsocket) => Promise<IWebsocketModel>
  firstOrCreate: (search: Partial<WebsocketsTable>, values?: NewWebsocket) => Promise<IWebsocketModel>
  updateOrCreate: (search: Partial<WebsocketsTable>, values?: NewWebsocket) => Promise<IWebsocketModel>
  createMany: (newWebsocket: NewWebsocket[]) => Promise<void>
  forceCreate: (newWebsocket: NewWebsocket) => Promise<IWebsocketModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof WebsocketsTable, values: V[]) => IWebsocketModel
  distinct: (column: keyof WebsocketJsonResponse) => IWebsocketModel
  join: (table: string, firstCol: string, secondCol: string) => IWebsocketModel
}

export interface IWebsocketModel {
  // Properties
  readonly id: number
  get type(): string | string[]
  set type(value: string | string[])
  get socket(): string
  set socket(value: string)
  get details(): string
  set details(value: string)
  get time(): number
  set time(value: number)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: WebsocketJsonResponse) => IWebsocketModel
  create: (newWebsocket: NewWebsocket) => Promise<IWebsocketModel>
  update: (newWebsocket: WebsocketUpdate) => Promise<IWebsocketModel | undefined>
  forceUpdate: (newWebsocket: WebsocketUpdate) => Promise<IWebsocketModel | undefined>
  save: () => Promise<IWebsocketModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<WebsocketJsonResponse>
  toJSON: () => WebsocketJsonResponse
  parseResult: (model: IWebsocketModel) => IWebsocketModel
}

export type WebsocketModelType = IWebsocketModel & IWebsocketModelStatic
