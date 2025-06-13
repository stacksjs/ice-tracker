import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface ReceiptsTable {
  id: Generated<number>
  printer: string
  document: string
  timestamp: number
  status: string | string[]
  size?: number
  pages?: number
  duration?: number
  metadata?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ReceiptRead = ReceiptsTable

export type ReceiptWrite = Omit<ReceiptsTable, 'created_at'> & {
  created_at?: string
}

export interface ReceiptResponse {
  data: ReceiptJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ReceiptJsonResponse extends Omit<Selectable<ReceiptRead>, 'password'> {
  [key: string]: any
}

export type NewReceipt = Insertable<ReceiptWrite>
export type ReceiptUpdate = Updateable<ReceiptWrite>

export interface IReceiptModelStatic {
  with: (relations: string[]) => IReceiptModel
  select: (params: (keyof ReceiptJsonResponse)[] | RawBuilder<string> | string) => IReceiptModel
  find: (id: number) => Promise<IReceiptModel | undefined>
  first: () => Promise<IReceiptModel | undefined>
  last: () => Promise<IReceiptModel | undefined>
  firstOrFail: () => Promise<IReceiptModel | undefined>
  all: () => Promise<IReceiptModel[]>
  findOrFail: (id: number) => Promise<IReceiptModel | undefined>
  findMany: (ids: number[]) => Promise<IReceiptModel[]>
  latest: (column?: keyof ReceiptsTable) => Promise<IReceiptModel | undefined>
  oldest: (column?: keyof ReceiptsTable) => Promise<IReceiptModel | undefined>
  skip: (count: number) => IReceiptModel
  take: (count: number) => IReceiptModel
  where: <V = string>(column: keyof ReceiptsTable, ...args: [V] | [Operator, V]) => IReceiptModel
  orWhere: (...conditions: [string, any][]) => IReceiptModel
  whereNotIn: <V = number>(column: keyof ReceiptsTable, values: V[]) => IReceiptModel
  whereBetween: <V = number>(column: keyof ReceiptsTable, range: [V, V]) => IReceiptModel
  whereRef: (column: keyof ReceiptsTable, ...args: string[]) => IReceiptModel
  when: (condition: boolean, callback: (query: IReceiptModel) => IReceiptModel) => IReceiptModel
  whereNull: (column: keyof ReceiptsTable) => IReceiptModel
  whereNotNull: (column: keyof ReceiptsTable) => IReceiptModel
  whereLike: (column: keyof ReceiptsTable, value: string) => IReceiptModel
  orderBy: (column: keyof ReceiptsTable, order: 'asc' | 'desc') => IReceiptModel
  orderByAsc: (column: keyof ReceiptsTable) => IReceiptModel
  orderByDesc: (column: keyof ReceiptsTable) => IReceiptModel
  groupBy: (column: keyof ReceiptsTable) => IReceiptModel
  having: <V = string>(column: keyof ReceiptsTable, operator: Operator, value: V) => IReceiptModel
  inRandomOrder: () => IReceiptModel
  whereColumn: (first: keyof ReceiptsTable, operator: Operator, second: keyof ReceiptsTable) => IReceiptModel
  max: (field: keyof ReceiptsTable) => Promise<number>
  min: (field: keyof ReceiptsTable) => Promise<number>
  avg: (field: keyof ReceiptsTable) => Promise<number>
  sum: (field: keyof ReceiptsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IReceiptModel[]>
  pluck: <K extends keyof IReceiptModel>(field: K) => Promise<IReceiptModel[K][]>
  chunk: (size: number, callback: (models: IReceiptModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IReceiptModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newReceipt: NewReceipt) => Promise<IReceiptModel>
  firstOrCreate: (search: Partial<ReceiptsTable>, values?: NewReceipt) => Promise<IReceiptModel>
  updateOrCreate: (search: Partial<ReceiptsTable>, values?: NewReceipt) => Promise<IReceiptModel>
  createMany: (newReceipt: NewReceipt[]) => Promise<void>
  forceCreate: (newReceipt: NewReceipt) => Promise<IReceiptModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ReceiptsTable, values: V[]) => IReceiptModel
  distinct: (column: keyof ReceiptJsonResponse) => IReceiptModel
  join: (table: string, firstCol: string, secondCol: string) => IReceiptModel
}

export interface IReceiptModel {
  // Properties
  readonly id: number
  get printer(): string
  set printer(value: string)
  get document(): string
  set document(value: string)
  get timestamp(): number
  set timestamp(value: number)
  get status(): string | string[]
  set status(value: string | string[])
  get size(): number | undefined
  set size(value: number)
  get pages(): number | undefined
  set pages(value: number)
  get duration(): number | undefined
  set duration(value: number)
  get metadata(): string | undefined
  set metadata(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ReceiptJsonResponse) => IReceiptModel
  create: (newReceipt: NewReceipt) => Promise<IReceiptModel>
  update: (newReceipt: ReceiptUpdate) => Promise<IReceiptModel | undefined>
  forceUpdate: (newReceipt: ReceiptUpdate) => Promise<IReceiptModel | undefined>
  save: () => Promise<IReceiptModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ReceiptJsonResponse>
  toJSON: () => ReceiptJsonResponse
  parseResult: (model: IReceiptModel) => IReceiptModel
}

export type ReceiptModelType = IReceiptModel & IReceiptModelStatic
