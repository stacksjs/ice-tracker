import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface CartsTable {
  id: Generated<number>
  status?: string | string[]
  total_items?: number
  subtotal?: number
  tax_amount?: number
  discount_amount?: number
  total?: number
  expires_at: Date | string
  currency?: string
  notes?: string
  applied_coupon_id?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type CartRead = CartsTable

export type CartWrite = Omit<CartsTable, 'created_at'> & {
  created_at?: string
}

export interface CartResponse {
  data: CartJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface CartJsonResponse extends Omit<Selectable<CartRead>, 'password'> {
  [key: string]: any
}

export type NewCart = Insertable<CartWrite>
export type CartUpdate = Updateable<CartWrite>

export interface ICartModelStatic {
  with: (relations: string[]) => ICartModel
  select: (params: (keyof CartJsonResponse)[] | RawBuilder<string> | string) => ICartModel
  find: (id: number) => Promise<ICartModel | undefined>
  first: () => Promise<ICartModel | undefined>
  last: () => Promise<ICartModel | undefined>
  firstOrFail: () => Promise<ICartModel | undefined>
  all: () => Promise<ICartModel[]>
  findOrFail: (id: number) => Promise<ICartModel | undefined>
  findMany: (ids: number[]) => Promise<ICartModel[]>
  latest: (column?: keyof CartsTable) => Promise<ICartModel | undefined>
  oldest: (column?: keyof CartsTable) => Promise<ICartModel | undefined>
  skip: (count: number) => ICartModel
  take: (count: number) => ICartModel
  where: <V = string>(column: keyof CartsTable, ...args: [V] | [Operator, V]) => ICartModel
  orWhere: (...conditions: [string, any][]) => ICartModel
  whereNotIn: <V = number>(column: keyof CartsTable, values: V[]) => ICartModel
  whereBetween: <V = number>(column: keyof CartsTable, range: [V, V]) => ICartModel
  whereRef: (column: keyof CartsTable, ...args: string[]) => ICartModel
  when: (condition: boolean, callback: (query: ICartModel) => ICartModel) => ICartModel
  whereNull: (column: keyof CartsTable) => ICartModel
  whereNotNull: (column: keyof CartsTable) => ICartModel
  whereLike: (column: keyof CartsTable, value: string) => ICartModel
  orderBy: (column: keyof CartsTable, order: 'asc' | 'desc') => ICartModel
  orderByAsc: (column: keyof CartsTable) => ICartModel
  orderByDesc: (column: keyof CartsTable) => ICartModel
  groupBy: (column: keyof CartsTable) => ICartModel
  having: <V = string>(column: keyof CartsTable, operator: Operator, value: V) => ICartModel
  inRandomOrder: () => ICartModel
  whereColumn: (first: keyof CartsTable, operator: Operator, second: keyof CartsTable) => ICartModel
  max: (field: keyof CartsTable) => Promise<number>
  min: (field: keyof CartsTable) => Promise<number>
  avg: (field: keyof CartsTable) => Promise<number>
  sum: (field: keyof CartsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ICartModel[]>
  pluck: <K extends keyof ICartModel>(field: K) => Promise<ICartModel[K][]>
  chunk: (size: number, callback: (models: ICartModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ICartModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newCart: NewCart) => Promise<ICartModel>
  firstOrCreate: (search: Partial<CartsTable>, values?: NewCart) => Promise<ICartModel>
  updateOrCreate: (search: Partial<CartsTable>, values?: NewCart) => Promise<ICartModel>
  createMany: (newCart: NewCart[]) => Promise<void>
  forceCreate: (newCart: NewCart) => Promise<ICartModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof CartsTable, values: V[]) => ICartModel
  distinct: (column: keyof CartJsonResponse) => ICartModel
  join: (table: string, firstCol: string, secondCol: string) => ICartModel
}

export interface ICartModel {
  // Properties
  readonly id: number
  get status(): string | string[] | undefined
  set status(value: string | string[])
  get total_items(): number | undefined
  set total_items(value: number)
  get subtotal(): number | undefined
  set subtotal(value: number)
  get tax_amount(): number | undefined
  set tax_amount(value: number)
  get discount_amount(): number | undefined
  set discount_amount(value: number)
  get total(): number | undefined
  set total(value: number)
  get expires_at(): Date | string
  set expires_at(value: Date | string)
  get currency(): string | undefined
  set currency(value: string)
  get notes(): string | undefined
  set notes(value: string)
  get applied_coupon_id(): string | undefined
  set applied_coupon_id(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: CartJsonResponse) => ICartModel
  create: (newCart: NewCart) => Promise<ICartModel>
  update: (newCart: CartUpdate) => Promise<ICartModel | undefined>
  forceUpdate: (newCart: CartUpdate) => Promise<ICartModel | undefined>
  save: () => Promise<ICartModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<CartJsonResponse>
  toJSON: () => CartJsonResponse
  parseResult: (model: ICartModel) => ICartModel
}

export type CartModelType = ICartModel & ICartModelStatic
