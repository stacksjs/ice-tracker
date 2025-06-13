import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface PaymentsTable {
  id: Generated<number>
  amount: number
  method: string
  status: string
  currency?: string
  reference_number?: string
  card_last_four?: string
  card_brand?: string
  billing_email?: string
  transaction_id?: string
  payment_provider?: string
  refund_amount?: number
  notes?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PaymentRead = PaymentsTable

export type PaymentWrite = Omit<PaymentsTable, 'created_at'> & {
  created_at?: string
}

export interface PaymentResponse {
  data: PaymentJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PaymentJsonResponse extends Omit<Selectable<PaymentRead>, 'password'> {
  [key: string]: any
}

export type NewPayment = Insertable<PaymentWrite>
export type PaymentUpdate = Updateable<PaymentWrite>

export interface IPaymentModelStatic {
  with: (relations: string[]) => IPaymentModel
  select: (params: (keyof PaymentJsonResponse)[] | RawBuilder<string> | string) => IPaymentModel
  find: (id: number) => Promise<IPaymentModel | undefined>
  first: () => Promise<IPaymentModel | undefined>
  last: () => Promise<IPaymentModel | undefined>
  firstOrFail: () => Promise<IPaymentModel | undefined>
  all: () => Promise<IPaymentModel[]>
  findOrFail: (id: number) => Promise<IPaymentModel | undefined>
  findMany: (ids: number[]) => Promise<IPaymentModel[]>
  latest: (column?: keyof PaymentsTable) => Promise<IPaymentModel | undefined>
  oldest: (column?: keyof PaymentsTable) => Promise<IPaymentModel | undefined>
  skip: (count: number) => IPaymentModel
  take: (count: number) => IPaymentModel
  where: <V = string>(column: keyof PaymentsTable, ...args: [V] | [Operator, V]) => IPaymentModel
  orWhere: (...conditions: [string, any][]) => IPaymentModel
  whereNotIn: <V = number>(column: keyof PaymentsTable, values: V[]) => IPaymentModel
  whereBetween: <V = number>(column: keyof PaymentsTable, range: [V, V]) => IPaymentModel
  whereRef: (column: keyof PaymentsTable, ...args: string[]) => IPaymentModel
  when: (condition: boolean, callback: (query: IPaymentModel) => IPaymentModel) => IPaymentModel
  whereNull: (column: keyof PaymentsTable) => IPaymentModel
  whereNotNull: (column: keyof PaymentsTable) => IPaymentModel
  whereLike: (column: keyof PaymentsTable, value: string) => IPaymentModel
  orderBy: (column: keyof PaymentsTable, order: 'asc' | 'desc') => IPaymentModel
  orderByAsc: (column: keyof PaymentsTable) => IPaymentModel
  orderByDesc: (column: keyof PaymentsTable) => IPaymentModel
  groupBy: (column: keyof PaymentsTable) => IPaymentModel
  having: <V = string>(column: keyof PaymentsTable, operator: Operator, value: V) => IPaymentModel
  inRandomOrder: () => IPaymentModel
  whereColumn: (first: keyof PaymentsTable, operator: Operator, second: keyof PaymentsTable) => IPaymentModel
  max: (field: keyof PaymentsTable) => Promise<number>
  min: (field: keyof PaymentsTable) => Promise<number>
  avg: (field: keyof PaymentsTable) => Promise<number>
  sum: (field: keyof PaymentsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPaymentModel[]>
  pluck: <K extends keyof IPaymentModel>(field: K) => Promise<IPaymentModel[K][]>
  chunk: (size: number, callback: (models: IPaymentModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPaymentModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPayment: NewPayment) => Promise<IPaymentModel>
  firstOrCreate: (search: Partial<PaymentsTable>, values?: NewPayment) => Promise<IPaymentModel>
  updateOrCreate: (search: Partial<PaymentsTable>, values?: NewPayment) => Promise<IPaymentModel>
  createMany: (newPayment: NewPayment[]) => Promise<void>
  forceCreate: (newPayment: NewPayment) => Promise<IPaymentModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PaymentsTable, values: V[]) => IPaymentModel
  distinct: (column: keyof PaymentJsonResponse) => IPaymentModel
  join: (table: string, firstCol: string, secondCol: string) => IPaymentModel
}

export interface IPaymentModel {
  // Properties
  readonly id: number
  get amount(): number
  set amount(value: number)
  get method(): string
  set method(value: string)
  get status(): string
  set status(value: string)
  get currency(): string | undefined
  set currency(value: string)
  get reference_number(): string | undefined
  set reference_number(value: string)
  get card_last_four(): string | undefined
  set card_last_four(value: string)
  get card_brand(): string | undefined
  set card_brand(value: string)
  get billing_email(): string | undefined
  set billing_email(value: string)
  get transaction_id(): string | undefined
  set transaction_id(value: string)
  get payment_provider(): string | undefined
  set payment_provider(value: string)
  get refund_amount(): number | undefined
  set refund_amount(value: number)
  get notes(): string | undefined
  set notes(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PaymentJsonResponse) => IPaymentModel
  create: (newPayment: NewPayment) => Promise<IPaymentModel>
  update: (newPayment: PaymentUpdate) => Promise<IPaymentModel | undefined>
  forceUpdate: (newPayment: PaymentUpdate) => Promise<IPaymentModel | undefined>
  save: () => Promise<IPaymentModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PaymentJsonResponse>
  toJSON: () => PaymentJsonResponse
  parseResult: (model: IPaymentModel) => IPaymentModel
}

export type PaymentModelType = IPaymentModel & IPaymentModelStatic
