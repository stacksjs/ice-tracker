import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface OrdersTable {
  id: Generated<number>
  status: string
  total_amount: number
  tax_amount?: number
  discount_amount?: number
  delivery_fee?: number
  tip_amount?: number
  order_type: string
  delivery_address?: string
  special_instructions?: string
  estimated_delivery_time?: string
  applied_coupon_id?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type OrderRead = OrdersTable

export type OrderWrite = Omit<OrdersTable, 'created_at'> & {
  created_at?: string
}

export interface OrderResponse {
  data: OrderJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface OrderJsonResponse extends Omit<Selectable<OrderRead>, 'password'> {
  [key: string]: any
}

export type NewOrder = Insertable<OrderWrite>
export type OrderUpdate = Updateable<OrderWrite>

export interface IOrderModelStatic {
  with: (relations: string[]) => IOrderModel
  select: (params: (keyof OrderJsonResponse)[] | RawBuilder<string> | string) => IOrderModel
  find: (id: number) => Promise<IOrderModel | undefined>
  first: () => Promise<IOrderModel | undefined>
  last: () => Promise<IOrderModel | undefined>
  firstOrFail: () => Promise<IOrderModel | undefined>
  all: () => Promise<IOrderModel[]>
  findOrFail: (id: number) => Promise<IOrderModel | undefined>
  findMany: (ids: number[]) => Promise<IOrderModel[]>
  latest: (column?: keyof OrdersTable) => Promise<IOrderModel | undefined>
  oldest: (column?: keyof OrdersTable) => Promise<IOrderModel | undefined>
  skip: (count: number) => IOrderModel
  take: (count: number) => IOrderModel
  where: <V = string>(column: keyof OrdersTable, ...args: [V] | [Operator, V]) => IOrderModel
  orWhere: (...conditions: [string, any][]) => IOrderModel
  whereNotIn: <V = number>(column: keyof OrdersTable, values: V[]) => IOrderModel
  whereBetween: <V = number>(column: keyof OrdersTable, range: [V, V]) => IOrderModel
  whereRef: (column: keyof OrdersTable, ...args: string[]) => IOrderModel
  when: (condition: boolean, callback: (query: IOrderModel) => IOrderModel) => IOrderModel
  whereNull: (column: keyof OrdersTable) => IOrderModel
  whereNotNull: (column: keyof OrdersTable) => IOrderModel
  whereLike: (column: keyof OrdersTable, value: string) => IOrderModel
  orderBy: (column: keyof OrdersTable, order: 'asc' | 'desc') => IOrderModel
  orderByAsc: (column: keyof OrdersTable) => IOrderModel
  orderByDesc: (column: keyof OrdersTable) => IOrderModel
  groupBy: (column: keyof OrdersTable) => IOrderModel
  having: <V = string>(column: keyof OrdersTable, operator: Operator, value: V) => IOrderModel
  inRandomOrder: () => IOrderModel
  whereColumn: (first: keyof OrdersTable, operator: Operator, second: keyof OrdersTable) => IOrderModel
  max: (field: keyof OrdersTable) => Promise<number>
  min: (field: keyof OrdersTable) => Promise<number>
  avg: (field: keyof OrdersTable) => Promise<number>
  sum: (field: keyof OrdersTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IOrderModel[]>
  pluck: <K extends keyof IOrderModel>(field: K) => Promise<IOrderModel[K][]>
  chunk: (size: number, callback: (models: IOrderModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IOrderModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newOrder: NewOrder) => Promise<IOrderModel>
  firstOrCreate: (search: Partial<OrdersTable>, values?: NewOrder) => Promise<IOrderModel>
  updateOrCreate: (search: Partial<OrdersTable>, values?: NewOrder) => Promise<IOrderModel>
  createMany: (newOrder: NewOrder[]) => Promise<void>
  forceCreate: (newOrder: NewOrder) => Promise<IOrderModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof OrdersTable, values: V[]) => IOrderModel
  distinct: (column: keyof OrderJsonResponse) => IOrderModel
  join: (table: string, firstCol: string, secondCol: string) => IOrderModel
}

export interface IOrderModel {
  // Properties
  readonly id: number
  get status(): string
  set status(value: string)
  get total_amount(): number
  set total_amount(value: number)
  get tax_amount(): number | undefined
  set tax_amount(value: number)
  get discount_amount(): number | undefined
  set discount_amount(value: number)
  get delivery_fee(): number | undefined
  set delivery_fee(value: number)
  get tip_amount(): number | undefined
  set tip_amount(value: number)
  get order_type(): string
  set order_type(value: string)
  get delivery_address(): string | undefined
  set delivery_address(value: string)
  get special_instructions(): string | undefined
  set special_instructions(value: string)
  get estimated_delivery_time(): string | undefined
  set estimated_delivery_time(value: string)
  get applied_coupon_id(): string | undefined
  set applied_coupon_id(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: OrderJsonResponse) => IOrderModel
  create: (newOrder: NewOrder) => Promise<IOrderModel>
  update: (newOrder: OrderUpdate) => Promise<IOrderModel | undefined>
  forceUpdate: (newOrder: OrderUpdate) => Promise<IOrderModel | undefined>
  save: () => Promise<IOrderModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<OrderJsonResponse>
  toJSON: () => OrderJsonResponse
  parseResult: (model: IOrderModel) => IOrderModel
}

export type OrderModelType = IOrderModel & IOrderModelStatic
