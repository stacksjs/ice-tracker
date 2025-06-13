import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface PagesTable {
  id: Generated<number>
  title: string
  template: string
  views?: number
  published_at?: Date | string
  conversions?: number
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PageRead = PagesTable

export type PageWrite = Omit<PagesTable, 'created_at'> & {
  created_at?: string
}

export interface PageResponse {
  data: PageJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PageJsonResponse extends Omit<Selectable<PageRead>, 'password'> {
  [key: string]: any
}

export type NewPage = Insertable<PageWrite>
export type PageUpdate = Updateable<PageWrite>

export interface IPageModelStatic {
  with: (relations: string[]) => IPageModel
  select: (params: (keyof PageJsonResponse)[] | RawBuilder<string> | string) => IPageModel
  find: (id: number) => Promise<IPageModel | undefined>
  first: () => Promise<IPageModel | undefined>
  last: () => Promise<IPageModel | undefined>
  firstOrFail: () => Promise<IPageModel | undefined>
  all: () => Promise<IPageModel[]>
  findOrFail: (id: number) => Promise<IPageModel | undefined>
  findMany: (ids: number[]) => Promise<IPageModel[]>
  latest: (column?: keyof PagesTable) => Promise<IPageModel | undefined>
  oldest: (column?: keyof PagesTable) => Promise<IPageModel | undefined>
  skip: (count: number) => IPageModel
  take: (count: number) => IPageModel
  where: <V = string>(column: keyof PagesTable, ...args: [V] | [Operator, V]) => IPageModel
  orWhere: (...conditions: [string, any][]) => IPageModel
  whereNotIn: <V = number>(column: keyof PagesTable, values: V[]) => IPageModel
  whereBetween: <V = number>(column: keyof PagesTable, range: [V, V]) => IPageModel
  whereRef: (column: keyof PagesTable, ...args: string[]) => IPageModel
  when: (condition: boolean, callback: (query: IPageModel) => IPageModel) => IPageModel
  whereNull: (column: keyof PagesTable) => IPageModel
  whereNotNull: (column: keyof PagesTable) => IPageModel
  whereLike: (column: keyof PagesTable, value: string) => IPageModel
  orderBy: (column: keyof PagesTable, order: 'asc' | 'desc') => IPageModel
  orderByAsc: (column: keyof PagesTable) => IPageModel
  orderByDesc: (column: keyof PagesTable) => IPageModel
  groupBy: (column: keyof PagesTable) => IPageModel
  having: <V = string>(column: keyof PagesTable, operator: Operator, value: V) => IPageModel
  inRandomOrder: () => IPageModel
  whereColumn: (first: keyof PagesTable, operator: Operator, second: keyof PagesTable) => IPageModel
  max: (field: keyof PagesTable) => Promise<number>
  min: (field: keyof PagesTable) => Promise<number>
  avg: (field: keyof PagesTable) => Promise<number>
  sum: (field: keyof PagesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPageModel[]>
  pluck: <K extends keyof IPageModel>(field: K) => Promise<IPageModel[K][]>
  chunk: (size: number, callback: (models: IPageModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPageModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPage: NewPage) => Promise<IPageModel>
  firstOrCreate: (search: Partial<PagesTable>, values?: NewPage) => Promise<IPageModel>
  updateOrCreate: (search: Partial<PagesTable>, values?: NewPage) => Promise<IPageModel>
  createMany: (newPage: NewPage[]) => Promise<void>
  forceCreate: (newPage: NewPage) => Promise<IPageModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PagesTable, values: V[]) => IPageModel
  distinct: (column: keyof PageJsonResponse) => IPageModel
  join: (table: string, firstCol: string, secondCol: string) => IPageModel
}

export interface IPageModel {
  // Properties
  readonly id: number
  get title(): string
  set title(value: string)
  get template(): string
  set template(value: string)
  get views(): number | undefined
  set views(value: number)
  get published_at(): Date | string | undefined
  set published_at(value: Date | string)
  get conversions(): number | undefined
  set conversions(value: number)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PageJsonResponse) => IPageModel
  create: (newPage: NewPage) => Promise<IPageModel>
  update: (newPage: PageUpdate) => Promise<IPageModel | undefined>
  forceUpdate: (newPage: PageUpdate) => Promise<IPageModel | undefined>
  save: () => Promise<IPageModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PageJsonResponse>
  toJSON: () => PageJsonResponse
  parseResult: (model: IPageModel) => IPageModel
}

export type PageModelType = IPageModel & IPageModelStatic
