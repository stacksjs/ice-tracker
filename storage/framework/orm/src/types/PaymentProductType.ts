import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface PaymentProductsTable {
  id: Generated<number>
  name: string
  description?: number
  key: number
  unit_price?: number
  status?: string
  image?: string
  provider_id?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PaymentProductRead = PaymentProductsTable

export type PaymentProductWrite = Omit<PaymentProductsTable, 'created_at'> & {
  created_at?: string
}

export interface PaymentProductResponse {
  data: PaymentProductJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PaymentProductJsonResponse extends Omit<Selectable<PaymentProductRead>, 'password'> {
  [key: string]: any
}

export type NewPaymentProduct = Insertable<PaymentProductWrite>
export type PaymentProductUpdate = Updateable<PaymentProductWrite>

export interface IPaymentProductModelStatic {
  with: (relations: string[]) => IPaymentProductModel
  select: (params: (keyof PaymentProductJsonResponse)[] | RawBuilder<string> | string) => IPaymentProductModel
  find: (id: number) => Promise<IPaymentProductModel | undefined>
  first: () => Promise<IPaymentProductModel | undefined>
  last: () => Promise<IPaymentProductModel | undefined>
  firstOrFail: () => Promise<IPaymentProductModel | undefined>
  all: () => Promise<IPaymentProductModel[]>
  findOrFail: (id: number) => Promise<IPaymentProductModel | undefined>
  findMany: (ids: number[]) => Promise<IPaymentProductModel[]>
  latest: (column?: keyof PaymentProductsTable) => Promise<IPaymentProductModel | undefined>
  oldest: (column?: keyof PaymentProductsTable) => Promise<IPaymentProductModel | undefined>
  skip: (count: number) => IPaymentProductModel
  take: (count: number) => IPaymentProductModel
  where: <V = string>(column: keyof PaymentProductsTable, ...args: [V] | [Operator, V]) => IPaymentProductModel
  orWhere: (...conditions: [string, any][]) => IPaymentProductModel
  whereNotIn: <V = number>(column: keyof PaymentProductsTable, values: V[]) => IPaymentProductModel
  whereBetween: <V = number>(column: keyof PaymentProductsTable, range: [V, V]) => IPaymentProductModel
  whereRef: (column: keyof PaymentProductsTable, ...args: string[]) => IPaymentProductModel
  when: (condition: boolean, callback: (query: IPaymentProductModel) => IPaymentProductModel) => IPaymentProductModel
  whereNull: (column: keyof PaymentProductsTable) => IPaymentProductModel
  whereNotNull: (column: keyof PaymentProductsTable) => IPaymentProductModel
  whereLike: (column: keyof PaymentProductsTable, value: string) => IPaymentProductModel
  orderBy: (column: keyof PaymentProductsTable, order: 'asc' | 'desc') => IPaymentProductModel
  orderByAsc: (column: keyof PaymentProductsTable) => IPaymentProductModel
  orderByDesc: (column: keyof PaymentProductsTable) => IPaymentProductModel
  groupBy: (column: keyof PaymentProductsTable) => IPaymentProductModel
  having: <V = string>(column: keyof PaymentProductsTable, operator: Operator, value: V) => IPaymentProductModel
  inRandomOrder: () => IPaymentProductModel
  whereColumn: (first: keyof PaymentProductsTable, operator: Operator, second: keyof PaymentProductsTable) => IPaymentProductModel
  max: (field: keyof PaymentProductsTable) => Promise<number>
  min: (field: keyof PaymentProductsTable) => Promise<number>
  avg: (field: keyof PaymentProductsTable) => Promise<number>
  sum: (field: keyof PaymentProductsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPaymentProductModel[]>
  pluck: <K extends keyof IPaymentProductModel>(field: K) => Promise<IPaymentProductModel[K][]>
  chunk: (size: number, callback: (models: IPaymentProductModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPaymentProductModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPaymentProduct: NewPaymentProduct) => Promise<IPaymentProductModel>
  firstOrCreate: (search: Partial<PaymentProductsTable>, values?: NewPaymentProduct) => Promise<IPaymentProductModel>
  updateOrCreate: (search: Partial<PaymentProductsTable>, values?: NewPaymentProduct) => Promise<IPaymentProductModel>
  createMany: (newPaymentProduct: NewPaymentProduct[]) => Promise<void>
  forceCreate: (newPaymentProduct: NewPaymentProduct) => Promise<IPaymentProductModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PaymentProductsTable, values: V[]) => IPaymentProductModel
  distinct: (column: keyof PaymentProductJsonResponse) => IPaymentProductModel
  join: (table: string, firstCol: string, secondCol: string) => IPaymentProductModel
}

export interface IPaymentProductModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): number | undefined
  set description(value: number)
  get key(): number
  set key(value: number)
  get unit_price(): number | undefined
  set unit_price(value: number)
  get status(): string | undefined
  set status(value: string)
  get image(): string | undefined
  set image(value: string)
  get provider_id(): string | undefined
  set provider_id(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PaymentProductJsonResponse) => IPaymentProductModel
  create: (newPaymentProduct: NewPaymentProduct) => Promise<IPaymentProductModel>
  update: (newPaymentProduct: PaymentProductUpdate) => Promise<IPaymentProductModel | undefined>
  forceUpdate: (newPaymentProduct: PaymentProductUpdate) => Promise<IPaymentProductModel | undefined>
  save: () => Promise<IPaymentProductModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PaymentProductJsonResponse>
  toJSON: () => PaymentProductJsonResponse
  parseResult: (model: IPaymentProductModel) => IPaymentProductModel
}

export type PaymentProductModelType = IPaymentProductModel & IPaymentProductModelStatic
