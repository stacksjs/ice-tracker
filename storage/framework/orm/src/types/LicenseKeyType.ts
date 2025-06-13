import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface LicenseKeysTable {
  id: Generated<number>
  key: string
  template: string | string[]
  expiry_date: Date | string
  status?: string | string[]
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type LicenseKeyRead = LicenseKeysTable

export type LicenseKeyWrite = Omit<LicenseKeysTable, 'created_at'> & {
  created_at?: string
}

export interface LicenseKeyResponse {
  data: LicenseKeyJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface LicenseKeyJsonResponse extends Omit<Selectable<LicenseKeyRead>, 'password'> {
  [key: string]: any
}

export type NewLicenseKey = Insertable<LicenseKeyWrite>
export type LicenseKeyUpdate = Updateable<LicenseKeyWrite>

export interface ILicenseKeyModelStatic {
  with: (relations: string[]) => ILicenseKeyModel
  select: (params: (keyof LicenseKeyJsonResponse)[] | RawBuilder<string> | string) => ILicenseKeyModel
  find: (id: number) => Promise<ILicenseKeyModel | undefined>
  first: () => Promise<ILicenseKeyModel | undefined>
  last: () => Promise<ILicenseKeyModel | undefined>
  firstOrFail: () => Promise<ILicenseKeyModel | undefined>
  all: () => Promise<ILicenseKeyModel[]>
  findOrFail: (id: number) => Promise<ILicenseKeyModel | undefined>
  findMany: (ids: number[]) => Promise<ILicenseKeyModel[]>
  latest: (column?: keyof LicenseKeysTable) => Promise<ILicenseKeyModel | undefined>
  oldest: (column?: keyof LicenseKeysTable) => Promise<ILicenseKeyModel | undefined>
  skip: (count: number) => ILicenseKeyModel
  take: (count: number) => ILicenseKeyModel
  where: <V = string>(column: keyof LicenseKeysTable, ...args: [V] | [Operator, V]) => ILicenseKeyModel
  orWhere: (...conditions: [string, any][]) => ILicenseKeyModel
  whereNotIn: <V = number>(column: keyof LicenseKeysTable, values: V[]) => ILicenseKeyModel
  whereBetween: <V = number>(column: keyof LicenseKeysTable, range: [V, V]) => ILicenseKeyModel
  whereRef: (column: keyof LicenseKeysTable, ...args: string[]) => ILicenseKeyModel
  when: (condition: boolean, callback: (query: ILicenseKeyModel) => ILicenseKeyModel) => ILicenseKeyModel
  whereNull: (column: keyof LicenseKeysTable) => ILicenseKeyModel
  whereNotNull: (column: keyof LicenseKeysTable) => ILicenseKeyModel
  whereLike: (column: keyof LicenseKeysTable, value: string) => ILicenseKeyModel
  orderBy: (column: keyof LicenseKeysTable, order: 'asc' | 'desc') => ILicenseKeyModel
  orderByAsc: (column: keyof LicenseKeysTable) => ILicenseKeyModel
  orderByDesc: (column: keyof LicenseKeysTable) => ILicenseKeyModel
  groupBy: (column: keyof LicenseKeysTable) => ILicenseKeyModel
  having: <V = string>(column: keyof LicenseKeysTable, operator: Operator, value: V) => ILicenseKeyModel
  inRandomOrder: () => ILicenseKeyModel
  whereColumn: (first: keyof LicenseKeysTable, operator: Operator, second: keyof LicenseKeysTable) => ILicenseKeyModel
  max: (field: keyof LicenseKeysTable) => Promise<number>
  min: (field: keyof LicenseKeysTable) => Promise<number>
  avg: (field: keyof LicenseKeysTable) => Promise<number>
  sum: (field: keyof LicenseKeysTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ILicenseKeyModel[]>
  pluck: <K extends keyof ILicenseKeyModel>(field: K) => Promise<ILicenseKeyModel[K][]>
  chunk: (size: number, callback: (models: ILicenseKeyModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ILicenseKeyModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newLicenseKey: NewLicenseKey) => Promise<ILicenseKeyModel>
  firstOrCreate: (search: Partial<LicenseKeysTable>, values?: NewLicenseKey) => Promise<ILicenseKeyModel>
  updateOrCreate: (search: Partial<LicenseKeysTable>, values?: NewLicenseKey) => Promise<ILicenseKeyModel>
  createMany: (newLicenseKey: NewLicenseKey[]) => Promise<void>
  forceCreate: (newLicenseKey: NewLicenseKey) => Promise<ILicenseKeyModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof LicenseKeysTable, values: V[]) => ILicenseKeyModel
  distinct: (column: keyof LicenseKeyJsonResponse) => ILicenseKeyModel
  join: (table: string, firstCol: string, secondCol: string) => ILicenseKeyModel
}

export interface ILicenseKeyModel {
  // Properties
  readonly id: number
  get key(): string
  set key(value: string)
  get template(): string | string[]
  set template(value: string | string[])
  get expiry_date(): Date | string
  set expiry_date(value: Date | string)
  get status(): string | string[] | undefined
  set status(value: string | string[])
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: LicenseKeyJsonResponse) => ILicenseKeyModel
  create: (newLicenseKey: NewLicenseKey) => Promise<ILicenseKeyModel>
  update: (newLicenseKey: LicenseKeyUpdate) => Promise<ILicenseKeyModel | undefined>
  forceUpdate: (newLicenseKey: LicenseKeyUpdate) => Promise<ILicenseKeyModel | undefined>
  save: () => Promise<ILicenseKeyModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<LicenseKeyJsonResponse>
  toJSON: () => LicenseKeyJsonResponse
  parseResult: (model: ILicenseKeyModel) => ILicenseKeyModel
}

export type LicenseKeyModelType = ILicenseKeyModel & ILicenseKeyModelStatic
