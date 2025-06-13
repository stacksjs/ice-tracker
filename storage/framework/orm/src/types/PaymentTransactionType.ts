import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface PaymentTransactionsTable {
  id: Generated<number>
  name: string
  description?: string
  amount: number
  type: string
  provider_id?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PaymentTransactionRead = PaymentTransactionsTable

export type PaymentTransactionWrite = Omit<PaymentTransactionsTable, 'created_at'> & {
  created_at?: string
}

export interface PaymentTransactionResponse {
  data: PaymentTransactionJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PaymentTransactionJsonResponse extends Omit<Selectable<PaymentTransactionRead>, 'password'> {
  [key: string]: any
}

export type NewPaymentTransaction = Insertable<PaymentTransactionWrite>
export type PaymentTransactionUpdate = Updateable<PaymentTransactionWrite>

export interface IPaymentTransactionModelStatic {
  with: (relations: string[]) => IPaymentTransactionModel
  select: (params: (keyof PaymentTransactionJsonResponse)[] | RawBuilder<string> | string) => IPaymentTransactionModel
  find: (id: number) => Promise<IPaymentTransactionModel | undefined>
  first: () => Promise<IPaymentTransactionModel | undefined>
  last: () => Promise<IPaymentTransactionModel | undefined>
  firstOrFail: () => Promise<IPaymentTransactionModel | undefined>
  all: () => Promise<IPaymentTransactionModel[]>
  findOrFail: (id: number) => Promise<IPaymentTransactionModel | undefined>
  findMany: (ids: number[]) => Promise<IPaymentTransactionModel[]>
  latest: (column?: keyof PaymentTransactionsTable) => Promise<IPaymentTransactionModel | undefined>
  oldest: (column?: keyof PaymentTransactionsTable) => Promise<IPaymentTransactionModel | undefined>
  skip: (count: number) => IPaymentTransactionModel
  take: (count: number) => IPaymentTransactionModel
  where: <V = string>(column: keyof PaymentTransactionsTable, ...args: [V] | [Operator, V]) => IPaymentTransactionModel
  orWhere: (...conditions: [string, any][]) => IPaymentTransactionModel
  whereNotIn: <V = number>(column: keyof PaymentTransactionsTable, values: V[]) => IPaymentTransactionModel
  whereBetween: <V = number>(column: keyof PaymentTransactionsTable, range: [V, V]) => IPaymentTransactionModel
  whereRef: (column: keyof PaymentTransactionsTable, ...args: string[]) => IPaymentTransactionModel
  when: (condition: boolean, callback: (query: IPaymentTransactionModel) => IPaymentTransactionModel) => IPaymentTransactionModel
  whereNull: (column: keyof PaymentTransactionsTable) => IPaymentTransactionModel
  whereNotNull: (column: keyof PaymentTransactionsTable) => IPaymentTransactionModel
  whereLike: (column: keyof PaymentTransactionsTable, value: string) => IPaymentTransactionModel
  orderBy: (column: keyof PaymentTransactionsTable, order: 'asc' | 'desc') => IPaymentTransactionModel
  orderByAsc: (column: keyof PaymentTransactionsTable) => IPaymentTransactionModel
  orderByDesc: (column: keyof PaymentTransactionsTable) => IPaymentTransactionModel
  groupBy: (column: keyof PaymentTransactionsTable) => IPaymentTransactionModel
  having: <V = string>(column: keyof PaymentTransactionsTable, operator: Operator, value: V) => IPaymentTransactionModel
  inRandomOrder: () => IPaymentTransactionModel
  whereColumn: (first: keyof PaymentTransactionsTable, operator: Operator, second: keyof PaymentTransactionsTable) => IPaymentTransactionModel
  max: (field: keyof PaymentTransactionsTable) => Promise<number>
  min: (field: keyof PaymentTransactionsTable) => Promise<number>
  avg: (field: keyof PaymentTransactionsTable) => Promise<number>
  sum: (field: keyof PaymentTransactionsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPaymentTransactionModel[]>
  pluck: <K extends keyof IPaymentTransactionModel>(field: K) => Promise<IPaymentTransactionModel[K][]>
  chunk: (size: number, callback: (models: IPaymentTransactionModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPaymentTransactionModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPaymentTransaction: NewPaymentTransaction) => Promise<IPaymentTransactionModel>
  firstOrCreate: (search: Partial<PaymentTransactionsTable>, values?: NewPaymentTransaction) => Promise<IPaymentTransactionModel>
  updateOrCreate: (search: Partial<PaymentTransactionsTable>, values?: NewPaymentTransaction) => Promise<IPaymentTransactionModel>
  createMany: (newPaymentTransaction: NewPaymentTransaction[]) => Promise<void>
  forceCreate: (newPaymentTransaction: NewPaymentTransaction) => Promise<IPaymentTransactionModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PaymentTransactionsTable, values: V[]) => IPaymentTransactionModel
  distinct: (column: keyof PaymentTransactionJsonResponse) => IPaymentTransactionModel
  join: (table: string, firstCol: string, secondCol: string) => IPaymentTransactionModel
}

export interface IPaymentTransactionModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): string | undefined
  set description(value: string)
  get amount(): number
  set amount(value: number)
  get type(): string
  set type(value: string)
  get provider_id(): string | undefined
  set provider_id(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PaymentTransactionJsonResponse) => IPaymentTransactionModel
  create: (newPaymentTransaction: NewPaymentTransaction) => Promise<IPaymentTransactionModel>
  update: (newPaymentTransaction: PaymentTransactionUpdate) => Promise<IPaymentTransactionModel | undefined>
  forceUpdate: (newPaymentTransaction: PaymentTransactionUpdate) => Promise<IPaymentTransactionModel | undefined>
  save: () => Promise<IPaymentTransactionModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PaymentTransactionJsonResponse>
  toJSON: () => PaymentTransactionJsonResponse
  parseResult: (model: IPaymentTransactionModel) => IPaymentTransactionModel
}

export type PaymentTransactionModelType = IPaymentTransactionModel & IPaymentTransactionModelStatic
