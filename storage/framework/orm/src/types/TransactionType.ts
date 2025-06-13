import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface TransactionsTable {
  id: Generated<number>
  amount: number
  status: string
  payment_method: string
  payment_details?: string
  transaction_reference?: string
  loyalty_points_earned?: number
  loyalty_points_redeemed?: number
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type TransactionRead = TransactionsTable

export type TransactionWrite = Omit<TransactionsTable, 'created_at'> & {
  created_at?: string
}

export interface TransactionResponse {
  data: TransactionJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface TransactionJsonResponse extends Omit<Selectable<TransactionRead>, 'password'> {
  [key: string]: any
}

export type NewTransaction = Insertable<TransactionWrite>
export type TransactionUpdate = Updateable<TransactionWrite>

export interface ITransactionModelStatic {
  with: (relations: string[]) => ITransactionModel
  select: (params: (keyof TransactionJsonResponse)[] | RawBuilder<string> | string) => ITransactionModel
  find: (id: number) => Promise<ITransactionModel | undefined>
  first: () => Promise<ITransactionModel | undefined>
  last: () => Promise<ITransactionModel | undefined>
  firstOrFail: () => Promise<ITransactionModel | undefined>
  all: () => Promise<ITransactionModel[]>
  findOrFail: (id: number) => Promise<ITransactionModel | undefined>
  findMany: (ids: number[]) => Promise<ITransactionModel[]>
  latest: (column?: keyof TransactionsTable) => Promise<ITransactionModel | undefined>
  oldest: (column?: keyof TransactionsTable) => Promise<ITransactionModel | undefined>
  skip: (count: number) => ITransactionModel
  take: (count: number) => ITransactionModel
  where: <V = string>(column: keyof TransactionsTable, ...args: [V] | [Operator, V]) => ITransactionModel
  orWhere: (...conditions: [string, any][]) => ITransactionModel
  whereNotIn: <V = number>(column: keyof TransactionsTable, values: V[]) => ITransactionModel
  whereBetween: <V = number>(column: keyof TransactionsTable, range: [V, V]) => ITransactionModel
  whereRef: (column: keyof TransactionsTable, ...args: string[]) => ITransactionModel
  when: (condition: boolean, callback: (query: ITransactionModel) => ITransactionModel) => ITransactionModel
  whereNull: (column: keyof TransactionsTable) => ITransactionModel
  whereNotNull: (column: keyof TransactionsTable) => ITransactionModel
  whereLike: (column: keyof TransactionsTable, value: string) => ITransactionModel
  orderBy: (column: keyof TransactionsTable, order: 'asc' | 'desc') => ITransactionModel
  orderByAsc: (column: keyof TransactionsTable) => ITransactionModel
  orderByDesc: (column: keyof TransactionsTable) => ITransactionModel
  groupBy: (column: keyof TransactionsTable) => ITransactionModel
  having: <V = string>(column: keyof TransactionsTable, operator: Operator, value: V) => ITransactionModel
  inRandomOrder: () => ITransactionModel
  whereColumn: (first: keyof TransactionsTable, operator: Operator, second: keyof TransactionsTable) => ITransactionModel
  max: (field: keyof TransactionsTable) => Promise<number>
  min: (field: keyof TransactionsTable) => Promise<number>
  avg: (field: keyof TransactionsTable) => Promise<number>
  sum: (field: keyof TransactionsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ITransactionModel[]>
  pluck: <K extends keyof ITransactionModel>(field: K) => Promise<ITransactionModel[K][]>
  chunk: (size: number, callback: (models: ITransactionModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ITransactionModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newTransaction: NewTransaction) => Promise<ITransactionModel>
  firstOrCreate: (search: Partial<TransactionsTable>, values?: NewTransaction) => Promise<ITransactionModel>
  updateOrCreate: (search: Partial<TransactionsTable>, values?: NewTransaction) => Promise<ITransactionModel>
  createMany: (newTransaction: NewTransaction[]) => Promise<void>
  forceCreate: (newTransaction: NewTransaction) => Promise<ITransactionModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof TransactionsTable, values: V[]) => ITransactionModel
  distinct: (column: keyof TransactionJsonResponse) => ITransactionModel
  join: (table: string, firstCol: string, secondCol: string) => ITransactionModel
}

export interface ITransactionModel {
  // Properties
  readonly id: number
  get amount(): number
  set amount(value: number)
  get status(): string
  set status(value: string)
  get payment_method(): string
  set payment_method(value: string)
  get payment_details(): string | undefined
  set payment_details(value: string)
  get transaction_reference(): string | undefined
  set transaction_reference(value: string)
  get loyalty_points_earned(): number | undefined
  set loyalty_points_earned(value: number)
  get loyalty_points_redeemed(): number | undefined
  set loyalty_points_redeemed(value: number)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: TransactionJsonResponse) => ITransactionModel
  create: (newTransaction: NewTransaction) => Promise<ITransactionModel>
  update: (newTransaction: TransactionUpdate) => Promise<ITransactionModel | undefined>
  forceUpdate: (newTransaction: TransactionUpdate) => Promise<ITransactionModel | undefined>
  save: () => Promise<ITransactionModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<TransactionJsonResponse>
  toJSON: () => TransactionJsonResponse
  parseResult: (model: ITransactionModel) => ITransactionModel
}

export type TransactionModelType = ITransactionModel & ITransactionModelStatic
