import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface CustomersTable {
  id: Generated<number>
  name: string
  email: string
  phone: string
  total_spent?: number
  last_order?: string
  status: string | string[]
  avatar?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type CustomerRead = CustomersTable

export type CustomerWrite = Omit<CustomersTable, 'created_at'> & {
  created_at?: string
}

export interface CustomerResponse {
  data: CustomerJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface CustomerJsonResponse extends Omit<Selectable<CustomerRead>, 'password'> {
  [key: string]: any
}

export type NewCustomer = Insertable<CustomerWrite>
export type CustomerUpdate = Updateable<CustomerWrite>

export interface ICustomerModelStatic {
  with: (relations: string[]) => ICustomerModel
  select: (params: (keyof CustomerJsonResponse)[] | RawBuilder<string> | string) => ICustomerModel
  find: (id: number) => Promise<ICustomerModel | undefined>
  first: () => Promise<ICustomerModel | undefined>
  last: () => Promise<ICustomerModel | undefined>
  firstOrFail: () => Promise<ICustomerModel | undefined>
  all: () => Promise<ICustomerModel[]>
  findOrFail: (id: number) => Promise<ICustomerModel | undefined>
  findMany: (ids: number[]) => Promise<ICustomerModel[]>
  latest: (column?: keyof CustomersTable) => Promise<ICustomerModel | undefined>
  oldest: (column?: keyof CustomersTable) => Promise<ICustomerModel | undefined>
  skip: (count: number) => ICustomerModel
  take: (count: number) => ICustomerModel
  where: <V = string>(column: keyof CustomersTable, ...args: [V] | [Operator, V]) => ICustomerModel
  orWhere: (...conditions: [string, any][]) => ICustomerModel
  whereNotIn: <V = number>(column: keyof CustomersTable, values: V[]) => ICustomerModel
  whereBetween: <V = number>(column: keyof CustomersTable, range: [V, V]) => ICustomerModel
  whereRef: (column: keyof CustomersTable, ...args: string[]) => ICustomerModel
  when: (condition: boolean, callback: (query: ICustomerModel) => ICustomerModel) => ICustomerModel
  whereNull: (column: keyof CustomersTable) => ICustomerModel
  whereNotNull: (column: keyof CustomersTable) => ICustomerModel
  whereLike: (column: keyof CustomersTable, value: string) => ICustomerModel
  orderBy: (column: keyof CustomersTable, order: 'asc' | 'desc') => ICustomerModel
  orderByAsc: (column: keyof CustomersTable) => ICustomerModel
  orderByDesc: (column: keyof CustomersTable) => ICustomerModel
  groupBy: (column: keyof CustomersTable) => ICustomerModel
  having: <V = string>(column: keyof CustomersTable, operator: Operator, value: V) => ICustomerModel
  inRandomOrder: () => ICustomerModel
  whereColumn: (first: keyof CustomersTable, operator: Operator, second: keyof CustomersTable) => ICustomerModel
  max: (field: keyof CustomersTable) => Promise<number>
  min: (field: keyof CustomersTable) => Promise<number>
  avg: (field: keyof CustomersTable) => Promise<number>
  sum: (field: keyof CustomersTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ICustomerModel[]>
  pluck: <K extends keyof ICustomerModel>(field: K) => Promise<ICustomerModel[K][]>
  chunk: (size: number, callback: (models: ICustomerModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ICustomerModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newCustomer: NewCustomer) => Promise<ICustomerModel>
  firstOrCreate: (search: Partial<CustomersTable>, values?: NewCustomer) => Promise<ICustomerModel>
  updateOrCreate: (search: Partial<CustomersTable>, values?: NewCustomer) => Promise<ICustomerModel>
  createMany: (newCustomer: NewCustomer[]) => Promise<void>
  forceCreate: (newCustomer: NewCustomer) => Promise<ICustomerModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof CustomersTable, values: V[]) => ICustomerModel
  distinct: (column: keyof CustomerJsonResponse) => ICustomerModel
  join: (table: string, firstCol: string, secondCol: string) => ICustomerModel
}

export interface ICustomerModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get email(): string
  set email(value: string)
  get phone(): string
  set phone(value: string)
  get total_spent(): number | undefined
  set total_spent(value: number)
  get last_order(): string | undefined
  set last_order(value: string)
  get status(): string | string[]
  set status(value: string | string[])
  get avatar(): string | undefined
  set avatar(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: CustomerJsonResponse) => ICustomerModel
  create: (newCustomer: NewCustomer) => Promise<ICustomerModel>
  update: (newCustomer: CustomerUpdate) => Promise<ICustomerModel | undefined>
  forceUpdate: (newCustomer: CustomerUpdate) => Promise<ICustomerModel | undefined>
  save: () => Promise<ICustomerModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<CustomerJsonResponse>
  toJSON: () => CustomerJsonResponse
  parseResult: (model: ICustomerModel) => ICustomerModel
}

export type CustomerModelType = ICustomerModel & ICustomerModelStatic
