import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface CartItemsTable {
  id: Generated<number>
  quantity: number
  unit_price: number
  total_price: number
  tax_rate?: number
  tax_amount?: number
  discount_percentage?: number
  discount_amount?: number
  product_name: string
  product_sku?: string
  product_image?: string
  notes?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type CartItemRead = CartItemsTable

export type CartItemWrite = Omit<CartItemsTable, 'created_at'> & {
  created_at?: string
}

export interface CartItemResponse {
  data: CartItemJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface CartItemJsonResponse extends Omit<Selectable<CartItemRead>, 'password'> {
  [key: string]: any
}

export type NewCartItem = Insertable<CartItemWrite>
export type CartItemUpdate = Updateable<CartItemWrite>

export interface ICartItemModelStatic {
  with: (relations: string[]) => ICartItemModel
  select: (params: (keyof CartItemJsonResponse)[] | RawBuilder<string> | string) => ICartItemModel
  find: (id: number) => Promise<ICartItemModel | undefined>
  first: () => Promise<ICartItemModel | undefined>
  last: () => Promise<ICartItemModel | undefined>
  firstOrFail: () => Promise<ICartItemModel | undefined>
  all: () => Promise<ICartItemModel[]>
  findOrFail: (id: number) => Promise<ICartItemModel | undefined>
  findMany: (ids: number[]) => Promise<ICartItemModel[]>
  latest: (column?: keyof CartItemsTable) => Promise<ICartItemModel | undefined>
  oldest: (column?: keyof CartItemsTable) => Promise<ICartItemModel | undefined>
  skip: (count: number) => ICartItemModel
  take: (count: number) => ICartItemModel
  where: <V = string>(column: keyof CartItemsTable, ...args: [V] | [Operator, V]) => ICartItemModel
  orWhere: (...conditions: [string, any][]) => ICartItemModel
  whereNotIn: <V = number>(column: keyof CartItemsTable, values: V[]) => ICartItemModel
  whereBetween: <V = number>(column: keyof CartItemsTable, range: [V, V]) => ICartItemModel
  whereRef: (column: keyof CartItemsTable, ...args: string[]) => ICartItemModel
  when: (condition: boolean, callback: (query: ICartItemModel) => ICartItemModel) => ICartItemModel
  whereNull: (column: keyof CartItemsTable) => ICartItemModel
  whereNotNull: (column: keyof CartItemsTable) => ICartItemModel
  whereLike: (column: keyof CartItemsTable, value: string) => ICartItemModel
  orderBy: (column: keyof CartItemsTable, order: 'asc' | 'desc') => ICartItemModel
  orderByAsc: (column: keyof CartItemsTable) => ICartItemModel
  orderByDesc: (column: keyof CartItemsTable) => ICartItemModel
  groupBy: (column: keyof CartItemsTable) => ICartItemModel
  having: <V = string>(column: keyof CartItemsTable, operator: Operator, value: V) => ICartItemModel
  inRandomOrder: () => ICartItemModel
  whereColumn: (first: keyof CartItemsTable, operator: Operator, second: keyof CartItemsTable) => ICartItemModel
  max: (field: keyof CartItemsTable) => Promise<number>
  min: (field: keyof CartItemsTable) => Promise<number>
  avg: (field: keyof CartItemsTable) => Promise<number>
  sum: (field: keyof CartItemsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ICartItemModel[]>
  pluck: <K extends keyof ICartItemModel>(field: K) => Promise<ICartItemModel[K][]>
  chunk: (size: number, callback: (models: ICartItemModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ICartItemModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newCartItem: NewCartItem) => Promise<ICartItemModel>
  firstOrCreate: (search: Partial<CartItemsTable>, values?: NewCartItem) => Promise<ICartItemModel>
  updateOrCreate: (search: Partial<CartItemsTable>, values?: NewCartItem) => Promise<ICartItemModel>
  createMany: (newCartItem: NewCartItem[]) => Promise<void>
  forceCreate: (newCartItem: NewCartItem) => Promise<ICartItemModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof CartItemsTable, values: V[]) => ICartItemModel
  distinct: (column: keyof CartItemJsonResponse) => ICartItemModel
  join: (table: string, firstCol: string, secondCol: string) => ICartItemModel
}

export interface ICartItemModel {
  // Properties
  readonly id: number
  get quantity(): number
  set quantity(value: number)
  get unit_price(): number
  set unit_price(value: number)
  get total_price(): number
  set total_price(value: number)
  get tax_rate(): number | undefined
  set tax_rate(value: number)
  get tax_amount(): number | undefined
  set tax_amount(value: number)
  get discount_percentage(): number | undefined
  set discount_percentage(value: number)
  get discount_amount(): number | undefined
  set discount_amount(value: number)
  get product_name(): string
  set product_name(value: string)
  get product_sku(): string | undefined
  set product_sku(value: string)
  get product_image(): string | undefined
  set product_image(value: string)
  get notes(): string | undefined
  set notes(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: CartItemJsonResponse) => ICartItemModel
  create: (newCartItem: NewCartItem) => Promise<ICartItemModel>
  update: (newCartItem: CartItemUpdate) => Promise<ICartItemModel | undefined>
  forceUpdate: (newCartItem: CartItemUpdate) => Promise<ICartItemModel | undefined>
  save: () => Promise<ICartItemModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<CartItemJsonResponse>
  toJSON: () => CartItemJsonResponse
  parseResult: (model: ICartItemModel) => ICartItemModel
}

export type CartItemModelType = ICartItemModel & ICartItemModelStatic
