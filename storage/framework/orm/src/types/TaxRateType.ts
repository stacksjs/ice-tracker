import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface TaxRatesTable {
  id: Generated<number>
  name: string
  rate: number
  type: string
  country: string
  region: string | string[]
  status?: string | string[]
  is_default?: boolean
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type TaxRateRead = TaxRatesTable

export type TaxRateWrite = Omit<TaxRatesTable, 'created_at'> & {
  created_at?: string
}

export interface TaxRateResponse {
  data: TaxRateJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface TaxRateJsonResponse extends Omit<Selectable<TaxRateRead>, 'password'> {
  [key: string]: any
}

export type NewTaxRate = Insertable<TaxRateWrite>
export type TaxRateUpdate = Updateable<TaxRateWrite>

export interface ITaxRateModelStatic {
  with: (relations: string[]) => ITaxRateModel
  select: (params: (keyof TaxRateJsonResponse)[] | RawBuilder<string> | string) => ITaxRateModel
  find: (id: number) => Promise<ITaxRateModel | undefined>
  first: () => Promise<ITaxRateModel | undefined>
  last: () => Promise<ITaxRateModel | undefined>
  firstOrFail: () => Promise<ITaxRateModel | undefined>
  all: () => Promise<ITaxRateModel[]>
  findOrFail: (id: number) => Promise<ITaxRateModel | undefined>
  findMany: (ids: number[]) => Promise<ITaxRateModel[]>
  latest: (column?: keyof TaxRatesTable) => Promise<ITaxRateModel | undefined>
  oldest: (column?: keyof TaxRatesTable) => Promise<ITaxRateModel | undefined>
  skip: (count: number) => ITaxRateModel
  take: (count: number) => ITaxRateModel
  where: <V = string>(column: keyof TaxRatesTable, ...args: [V] | [Operator, V]) => ITaxRateModel
  orWhere: (...conditions: [string, any][]) => ITaxRateModel
  whereNotIn: <V = number>(column: keyof TaxRatesTable, values: V[]) => ITaxRateModel
  whereBetween: <V = number>(column: keyof TaxRatesTable, range: [V, V]) => ITaxRateModel
  whereRef: (column: keyof TaxRatesTable, ...args: string[]) => ITaxRateModel
  when: (condition: boolean, callback: (query: ITaxRateModel) => ITaxRateModel) => ITaxRateModel
  whereNull: (column: keyof TaxRatesTable) => ITaxRateModel
  whereNotNull: (column: keyof TaxRatesTable) => ITaxRateModel
  whereLike: (column: keyof TaxRatesTable, value: string) => ITaxRateModel
  orderBy: (column: keyof TaxRatesTable, order: 'asc' | 'desc') => ITaxRateModel
  orderByAsc: (column: keyof TaxRatesTable) => ITaxRateModel
  orderByDesc: (column: keyof TaxRatesTable) => ITaxRateModel
  groupBy: (column: keyof TaxRatesTable) => ITaxRateModel
  having: <V = string>(column: keyof TaxRatesTable, operator: Operator, value: V) => ITaxRateModel
  inRandomOrder: () => ITaxRateModel
  whereColumn: (first: keyof TaxRatesTable, operator: Operator, second: keyof TaxRatesTable) => ITaxRateModel
  max: (field: keyof TaxRatesTable) => Promise<number>
  min: (field: keyof TaxRatesTable) => Promise<number>
  avg: (field: keyof TaxRatesTable) => Promise<number>
  sum: (field: keyof TaxRatesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ITaxRateModel[]>
  pluck: <K extends keyof ITaxRateModel>(field: K) => Promise<ITaxRateModel[K][]>
  chunk: (size: number, callback: (models: ITaxRateModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ITaxRateModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newTaxRate: NewTaxRate) => Promise<ITaxRateModel>
  firstOrCreate: (search: Partial<TaxRatesTable>, values?: NewTaxRate) => Promise<ITaxRateModel>
  updateOrCreate: (search: Partial<TaxRatesTable>, values?: NewTaxRate) => Promise<ITaxRateModel>
  createMany: (newTaxRate: NewTaxRate[]) => Promise<void>
  forceCreate: (newTaxRate: NewTaxRate) => Promise<ITaxRateModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof TaxRatesTable, values: V[]) => ITaxRateModel
  distinct: (column: keyof TaxRateJsonResponse) => ITaxRateModel
  join: (table: string, firstCol: string, secondCol: string) => ITaxRateModel
}

export interface ITaxRateModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get rate(): number
  set rate(value: number)
  get type(): string
  set type(value: string)
  get country(): string
  set country(value: string)
  get region(): string | string[]
  set region(value: string | string[])
  get status(): string | string[] | undefined
  set status(value: string | string[])
  get is_default(): boolean | undefined
  set is_default(value: boolean)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: TaxRateJsonResponse) => ITaxRateModel
  create: (newTaxRate: NewTaxRate) => Promise<ITaxRateModel>
  update: (newTaxRate: TaxRateUpdate) => Promise<ITaxRateModel | undefined>
  forceUpdate: (newTaxRate: TaxRateUpdate) => Promise<ITaxRateModel | undefined>
  save: () => Promise<ITaxRateModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<TaxRateJsonResponse>
  toJSON: () => TaxRateJsonResponse
  parseResult: (model: ITaxRateModel) => ITaxRateModel
}

export type TaxRateModelType = ITaxRateModel & ITaxRateModelStatic
