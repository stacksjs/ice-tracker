import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface OrderItemsTable {
  id: Generated<number>
  quantity: number
  price: number
  special_instructions?: string
  created_at?: string
  updated_at?: string
}

export type OrderItemRead = OrderItemsTable

export type OrderItemWrite = Omit<OrderItemsTable, 'created_at'> & {
  created_at?: string
}

export interface OrderItemResponse {
  data: OrderItemJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface OrderItemJsonResponse extends Omit<Selectable<OrderItemRead>, 'password'> {
  [key: string]: any
}

export type NewOrderItem = Insertable<OrderItemWrite>
export type OrderItemUpdate = Updateable<OrderItemWrite>

export interface IOrderItemModelStatic {
  with: (relations: string[]) => IOrderItemModel
  select: (params: (keyof OrderItemJsonResponse)[] | RawBuilder<string> | string) => IOrderItemModel
  find: (id: number) => Promise<IOrderItemModel | undefined>
  first: () => Promise<IOrderItemModel | undefined>
  last: () => Promise<IOrderItemModel | undefined>
  firstOrFail: () => Promise<IOrderItemModel | undefined>
  all: () => Promise<IOrderItemModel[]>
  findOrFail: (id: number) => Promise<IOrderItemModel | undefined>
  findMany: (ids: number[]) => Promise<IOrderItemModel[]>
  latest: (column?: keyof OrderItemsTable) => Promise<IOrderItemModel | undefined>
  oldest: (column?: keyof OrderItemsTable) => Promise<IOrderItemModel | undefined>
  skip: (count: number) => IOrderItemModel
  take: (count: number) => IOrderItemModel
  where: <V = string>(column: keyof OrderItemsTable, ...args: [V] | [Operator, V]) => IOrderItemModel
  orWhere: (...conditions: [string, any][]) => IOrderItemModel
  whereNotIn: <V = number>(column: keyof OrderItemsTable, values: V[]) => IOrderItemModel
  whereBetween: <V = number>(column: keyof OrderItemsTable, range: [V, V]) => IOrderItemModel
  whereRef: (column: keyof OrderItemsTable, ...args: string[]) => IOrderItemModel
  when: (condition: boolean, callback: (query: IOrderItemModel) => IOrderItemModel) => IOrderItemModel
  whereNull: (column: keyof OrderItemsTable) => IOrderItemModel
  whereNotNull: (column: keyof OrderItemsTable) => IOrderItemModel
  whereLike: (column: keyof OrderItemsTable, value: string) => IOrderItemModel
  orderBy: (column: keyof OrderItemsTable, order: 'asc' | 'desc') => IOrderItemModel
  orderByAsc: (column: keyof OrderItemsTable) => IOrderItemModel
  orderByDesc: (column: keyof OrderItemsTable) => IOrderItemModel
  groupBy: (column: keyof OrderItemsTable) => IOrderItemModel
  having: <V = string>(column: keyof OrderItemsTable, operator: Operator, value: V) => IOrderItemModel
  inRandomOrder: () => IOrderItemModel
  whereColumn: (first: keyof OrderItemsTable, operator: Operator, second: keyof OrderItemsTable) => IOrderItemModel
  max: (field: keyof OrderItemsTable) => Promise<number>
  min: (field: keyof OrderItemsTable) => Promise<number>
  avg: (field: keyof OrderItemsTable) => Promise<number>
  sum: (field: keyof OrderItemsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IOrderItemModel[]>
  pluck: <K extends keyof IOrderItemModel>(field: K) => Promise<IOrderItemModel[K][]>
  chunk: (size: number, callback: (models: IOrderItemModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IOrderItemModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newOrderItem: NewOrderItem) => Promise<IOrderItemModel>
  firstOrCreate: (search: Partial<OrderItemsTable>, values?: NewOrderItem) => Promise<IOrderItemModel>
  updateOrCreate: (search: Partial<OrderItemsTable>, values?: NewOrderItem) => Promise<IOrderItemModel>
  createMany: (newOrderItem: NewOrderItem[]) => Promise<void>
  forceCreate: (newOrderItem: NewOrderItem) => Promise<IOrderItemModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof OrderItemsTable, values: V[]) => IOrderItemModel
  distinct: (column: keyof OrderItemJsonResponse) => IOrderItemModel
  join: (table: string, firstCol: string, secondCol: string) => IOrderItemModel
}

export interface IOrderItemModel {
  // Properties
  readonly id: number
  get quantity(): number
  set quantity(value: number)
  get price(): number
  set price(value: number)
  get special_instructions(): string | undefined
  set special_instructions(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: OrderItemJsonResponse) => IOrderItemModel
  create: (newOrderItem: NewOrderItem) => Promise<IOrderItemModel>
  update: (newOrderItem: OrderItemUpdate) => Promise<IOrderItemModel | undefined>
  forceUpdate: (newOrderItem: OrderItemUpdate) => Promise<IOrderItemModel | undefined>
  save: () => Promise<IOrderItemModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<OrderItemJsonResponse>
  toJSON: () => OrderItemJsonResponse
  parseResult: (model: IOrderItemModel) => IOrderItemModel
}

export type OrderItemModelType = IOrderItemModel & IOrderItemModelStatic
