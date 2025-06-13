import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface WaitlistProductsTable {
  id: Generated<number>
  name: string
  email: string
  phone?: string
  quantity: number
  notification_preference: string | string[]
  source: string
  notes?: string
  status: string | string[]
  notified_at?: Date | string
  purchased_at?: Date | string
  cancelled_at?: Date | string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type WaitlistProductRead = WaitlistProductsTable

export type WaitlistProductWrite = Omit<WaitlistProductsTable, 'created_at'> & {
  created_at?: string
}

export interface WaitlistProductResponse {
  data: WaitlistProductJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface WaitlistProductJsonResponse extends Omit<Selectable<WaitlistProductRead>, 'password'> {
  [key: string]: any
}

export type NewWaitlistProduct = Insertable<WaitlistProductWrite>
export type WaitlistProductUpdate = Updateable<WaitlistProductWrite>

export interface IWaitlistProductModelStatic {
  with: (relations: string[]) => IWaitlistProductModel
  select: (params: (keyof WaitlistProductJsonResponse)[] | RawBuilder<string> | string) => IWaitlistProductModel
  find: (id: number) => Promise<IWaitlistProductModel | undefined>
  first: () => Promise<IWaitlistProductModel | undefined>
  last: () => Promise<IWaitlistProductModel | undefined>
  firstOrFail: () => Promise<IWaitlistProductModel | undefined>
  all: () => Promise<IWaitlistProductModel[]>
  findOrFail: (id: number) => Promise<IWaitlistProductModel | undefined>
  findMany: (ids: number[]) => Promise<IWaitlistProductModel[]>
  latest: (column?: keyof WaitlistProductsTable) => Promise<IWaitlistProductModel | undefined>
  oldest: (column?: keyof WaitlistProductsTable) => Promise<IWaitlistProductModel | undefined>
  skip: (count: number) => IWaitlistProductModel
  take: (count: number) => IWaitlistProductModel
  where: <V = string>(column: keyof WaitlistProductsTable, ...args: [V] | [Operator, V]) => IWaitlistProductModel
  orWhere: (...conditions: [string, any][]) => IWaitlistProductModel
  whereNotIn: <V = number>(column: keyof WaitlistProductsTable, values: V[]) => IWaitlistProductModel
  whereBetween: <V = number>(column: keyof WaitlistProductsTable, range: [V, V]) => IWaitlistProductModel
  whereRef: (column: keyof WaitlistProductsTable, ...args: string[]) => IWaitlistProductModel
  when: (condition: boolean, callback: (query: IWaitlistProductModel) => IWaitlistProductModel) => IWaitlistProductModel
  whereNull: (column: keyof WaitlistProductsTable) => IWaitlistProductModel
  whereNotNull: (column: keyof WaitlistProductsTable) => IWaitlistProductModel
  whereLike: (column: keyof WaitlistProductsTable, value: string) => IWaitlistProductModel
  orderBy: (column: keyof WaitlistProductsTable, order: 'asc' | 'desc') => IWaitlistProductModel
  orderByAsc: (column: keyof WaitlistProductsTable) => IWaitlistProductModel
  orderByDesc: (column: keyof WaitlistProductsTable) => IWaitlistProductModel
  groupBy: (column: keyof WaitlistProductsTable) => IWaitlistProductModel
  having: <V = string>(column: keyof WaitlistProductsTable, operator: Operator, value: V) => IWaitlistProductModel
  inRandomOrder: () => IWaitlistProductModel
  whereColumn: (first: keyof WaitlistProductsTable, operator: Operator, second: keyof WaitlistProductsTable) => IWaitlistProductModel
  max: (field: keyof WaitlistProductsTable) => Promise<number>
  min: (field: keyof WaitlistProductsTable) => Promise<number>
  avg: (field: keyof WaitlistProductsTable) => Promise<number>
  sum: (field: keyof WaitlistProductsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IWaitlistProductModel[]>
  pluck: <K extends keyof IWaitlistProductModel>(field: K) => Promise<IWaitlistProductModel[K][]>
  chunk: (size: number, callback: (models: IWaitlistProductModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IWaitlistProductModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newWaitlistProduct: NewWaitlistProduct) => Promise<IWaitlistProductModel>
  firstOrCreate: (search: Partial<WaitlistProductsTable>, values?: NewWaitlistProduct) => Promise<IWaitlistProductModel>
  updateOrCreate: (search: Partial<WaitlistProductsTable>, values?: NewWaitlistProduct) => Promise<IWaitlistProductModel>
  createMany: (newWaitlistProduct: NewWaitlistProduct[]) => Promise<void>
  forceCreate: (newWaitlistProduct: NewWaitlistProduct) => Promise<IWaitlistProductModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof WaitlistProductsTable, values: V[]) => IWaitlistProductModel
  distinct: (column: keyof WaitlistProductJsonResponse) => IWaitlistProductModel
  join: (table: string, firstCol: string, secondCol: string) => IWaitlistProductModel
}

export interface IWaitlistProductModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get email(): string
  set email(value: string)
  get phone(): string | undefined
  set phone(value: string)
  get quantity(): number
  set quantity(value: number)
  get notification_preference(): string | string[]
  set notification_preference(value: string | string[])
  get source(): string
  set source(value: string)
  get notes(): string | undefined
  set notes(value: string)
  get status(): string | string[]
  set status(value: string | string[])
  get notified_at(): Date | string | undefined
  set notified_at(value: Date | string)
  get purchased_at(): Date | string | undefined
  set purchased_at(value: Date | string)
  get cancelled_at(): Date | string | undefined
  set cancelled_at(value: Date | string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: WaitlistProductJsonResponse) => IWaitlistProductModel
  create: (newWaitlistProduct: NewWaitlistProduct) => Promise<IWaitlistProductModel>
  update: (newWaitlistProduct: WaitlistProductUpdate) => Promise<IWaitlistProductModel | undefined>
  forceUpdate: (newWaitlistProduct: WaitlistProductUpdate) => Promise<IWaitlistProductModel | undefined>
  save: () => Promise<IWaitlistProductModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<WaitlistProductJsonResponse>
  toJSON: () => WaitlistProductJsonResponse
  parseResult: (model: IWaitlistProductModel) => IWaitlistProductModel
}

export type WaitlistProductModelType = IWaitlistProductModel & IWaitlistProductModelStatic
