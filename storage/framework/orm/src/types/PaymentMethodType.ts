import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface PaymentMethodsTable {
  id: Generated<number>
  type: string
  last_four: number
  brand: string
  exp_month: number
  exp_year: number
  is_default?: boolean
  provider_id?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PaymentMethodRead = PaymentMethodsTable

export type PaymentMethodWrite = Omit<PaymentMethodsTable, 'created_at'> & {
  created_at?: string
}

export interface PaymentMethodResponse {
  data: PaymentMethodJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PaymentMethodJsonResponse extends Omit<Selectable<PaymentMethodRead>, 'password'> {
  [key: string]: any
}

export type NewPaymentMethod = Insertable<PaymentMethodWrite>
export type PaymentMethodUpdate = Updateable<PaymentMethodWrite>

export interface IPaymentMethodModelStatic {
  with: (relations: string[]) => IPaymentMethodModel
  select: (params: (keyof PaymentMethodJsonResponse)[] | RawBuilder<string> | string) => IPaymentMethodModel
  find: (id: number) => Promise<IPaymentMethodModel | undefined>
  first: () => Promise<IPaymentMethodModel | undefined>
  last: () => Promise<IPaymentMethodModel | undefined>
  firstOrFail: () => Promise<IPaymentMethodModel | undefined>
  all: () => Promise<IPaymentMethodModel[]>
  findOrFail: (id: number) => Promise<IPaymentMethodModel | undefined>
  findMany: (ids: number[]) => Promise<IPaymentMethodModel[]>
  latest: (column?: keyof PaymentMethodsTable) => Promise<IPaymentMethodModel | undefined>
  oldest: (column?: keyof PaymentMethodsTable) => Promise<IPaymentMethodModel | undefined>
  skip: (count: number) => IPaymentMethodModel
  take: (count: number) => IPaymentMethodModel
  where: <V = string>(column: keyof PaymentMethodsTable, ...args: [V] | [Operator, V]) => IPaymentMethodModel
  orWhere: (...conditions: [string, any][]) => IPaymentMethodModel
  whereNotIn: <V = number>(column: keyof PaymentMethodsTable, values: V[]) => IPaymentMethodModel
  whereBetween: <V = number>(column: keyof PaymentMethodsTable, range: [V, V]) => IPaymentMethodModel
  whereRef: (column: keyof PaymentMethodsTable, ...args: string[]) => IPaymentMethodModel
  when: (condition: boolean, callback: (query: IPaymentMethodModel) => IPaymentMethodModel) => IPaymentMethodModel
  whereNull: (column: keyof PaymentMethodsTable) => IPaymentMethodModel
  whereNotNull: (column: keyof PaymentMethodsTable) => IPaymentMethodModel
  whereLike: (column: keyof PaymentMethodsTable, value: string) => IPaymentMethodModel
  orderBy: (column: keyof PaymentMethodsTable, order: 'asc' | 'desc') => IPaymentMethodModel
  orderByAsc: (column: keyof PaymentMethodsTable) => IPaymentMethodModel
  orderByDesc: (column: keyof PaymentMethodsTable) => IPaymentMethodModel
  groupBy: (column: keyof PaymentMethodsTable) => IPaymentMethodModel
  having: <V = string>(column: keyof PaymentMethodsTable, operator: Operator, value: V) => IPaymentMethodModel
  inRandomOrder: () => IPaymentMethodModel
  whereColumn: (first: keyof PaymentMethodsTable, operator: Operator, second: keyof PaymentMethodsTable) => IPaymentMethodModel
  max: (field: keyof PaymentMethodsTable) => Promise<number>
  min: (field: keyof PaymentMethodsTable) => Promise<number>
  avg: (field: keyof PaymentMethodsTable) => Promise<number>
  sum: (field: keyof PaymentMethodsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPaymentMethodModel[]>
  pluck: <K extends keyof IPaymentMethodModel>(field: K) => Promise<IPaymentMethodModel[K][]>
  chunk: (size: number, callback: (models: IPaymentMethodModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPaymentMethodModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPaymentMethod: NewPaymentMethod) => Promise<IPaymentMethodModel>
  firstOrCreate: (search: Partial<PaymentMethodsTable>, values?: NewPaymentMethod) => Promise<IPaymentMethodModel>
  updateOrCreate: (search: Partial<PaymentMethodsTable>, values?: NewPaymentMethod) => Promise<IPaymentMethodModel>
  createMany: (newPaymentMethod: NewPaymentMethod[]) => Promise<void>
  forceCreate: (newPaymentMethod: NewPaymentMethod) => Promise<IPaymentMethodModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PaymentMethodsTable, values: V[]) => IPaymentMethodModel
  distinct: (column: keyof PaymentMethodJsonResponse) => IPaymentMethodModel
  join: (table: string, firstCol: string, secondCol: string) => IPaymentMethodModel
}

export interface IPaymentMethodModel {
  // Properties
  readonly id: number
  get type(): string
  set type(value: string)
  get last_four(): number
  set last_four(value: number)
  get brand(): string
  set brand(value: string)
  get exp_month(): number
  set exp_month(value: number)
  get exp_year(): number
  set exp_year(value: number)
  get is_default(): boolean | undefined
  set is_default(value: boolean)
  get provider_id(): string | undefined
  set provider_id(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PaymentMethodJsonResponse) => IPaymentMethodModel
  create: (newPaymentMethod: NewPaymentMethod) => Promise<IPaymentMethodModel>
  update: (newPaymentMethod: PaymentMethodUpdate) => Promise<IPaymentMethodModel | undefined>
  forceUpdate: (newPaymentMethod: PaymentMethodUpdate) => Promise<IPaymentMethodModel | undefined>
  save: () => Promise<IPaymentMethodModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PaymentMethodJsonResponse>
  toJSON: () => PaymentMethodJsonResponse
  parseResult: (model: IPaymentMethodModel) => IPaymentMethodModel
}

export type PaymentMethodModelType = IPaymentMethodModel & IPaymentMethodModelStatic
