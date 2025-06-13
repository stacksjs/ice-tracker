import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface LoyaltyPointsTable {
  id: Generated<number>
  wallet_id: string
  points: number
  source: string
  source_reference_id?: string
  description?: string
  expiry_date?: Date | string
  is_used?: boolean
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type LoyaltyPointRead = LoyaltyPointsTable

export type LoyaltyPointWrite = Omit<LoyaltyPointsTable, 'created_at'> & {
  created_at?: string
}

export interface LoyaltyPointResponse {
  data: LoyaltyPointJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface LoyaltyPointJsonResponse extends Omit<Selectable<LoyaltyPointRead>, 'password'> {
  [key: string]: any
}

export type NewLoyaltyPoint = Insertable<LoyaltyPointWrite>
export type LoyaltyPointUpdate = Updateable<LoyaltyPointWrite>

export interface ILoyaltyPointModelStatic {
  with: (relations: string[]) => ILoyaltyPointModel
  select: (params: (keyof LoyaltyPointJsonResponse)[] | RawBuilder<string> | string) => ILoyaltyPointModel
  find: (id: number) => Promise<ILoyaltyPointModel | undefined>
  first: () => Promise<ILoyaltyPointModel | undefined>
  last: () => Promise<ILoyaltyPointModel | undefined>
  firstOrFail: () => Promise<ILoyaltyPointModel | undefined>
  all: () => Promise<ILoyaltyPointModel[]>
  findOrFail: (id: number) => Promise<ILoyaltyPointModel | undefined>
  findMany: (ids: number[]) => Promise<ILoyaltyPointModel[]>
  latest: (column?: keyof LoyaltyPointsTable) => Promise<ILoyaltyPointModel | undefined>
  oldest: (column?: keyof LoyaltyPointsTable) => Promise<ILoyaltyPointModel | undefined>
  skip: (count: number) => ILoyaltyPointModel
  take: (count: number) => ILoyaltyPointModel
  where: <V = string>(column: keyof LoyaltyPointsTable, ...args: [V] | [Operator, V]) => ILoyaltyPointModel
  orWhere: (...conditions: [string, any][]) => ILoyaltyPointModel
  whereNotIn: <V = number>(column: keyof LoyaltyPointsTable, values: V[]) => ILoyaltyPointModel
  whereBetween: <V = number>(column: keyof LoyaltyPointsTable, range: [V, V]) => ILoyaltyPointModel
  whereRef: (column: keyof LoyaltyPointsTable, ...args: string[]) => ILoyaltyPointModel
  when: (condition: boolean, callback: (query: ILoyaltyPointModel) => ILoyaltyPointModel) => ILoyaltyPointModel
  whereNull: (column: keyof LoyaltyPointsTable) => ILoyaltyPointModel
  whereNotNull: (column: keyof LoyaltyPointsTable) => ILoyaltyPointModel
  whereLike: (column: keyof LoyaltyPointsTable, value: string) => ILoyaltyPointModel
  orderBy: (column: keyof LoyaltyPointsTable, order: 'asc' | 'desc') => ILoyaltyPointModel
  orderByAsc: (column: keyof LoyaltyPointsTable) => ILoyaltyPointModel
  orderByDesc: (column: keyof LoyaltyPointsTable) => ILoyaltyPointModel
  groupBy: (column: keyof LoyaltyPointsTable) => ILoyaltyPointModel
  having: <V = string>(column: keyof LoyaltyPointsTable, operator: Operator, value: V) => ILoyaltyPointModel
  inRandomOrder: () => ILoyaltyPointModel
  whereColumn: (first: keyof LoyaltyPointsTable, operator: Operator, second: keyof LoyaltyPointsTable) => ILoyaltyPointModel
  max: (field: keyof LoyaltyPointsTable) => Promise<number>
  min: (field: keyof LoyaltyPointsTable) => Promise<number>
  avg: (field: keyof LoyaltyPointsTable) => Promise<number>
  sum: (field: keyof LoyaltyPointsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ILoyaltyPointModel[]>
  pluck: <K extends keyof ILoyaltyPointModel>(field: K) => Promise<ILoyaltyPointModel[K][]>
  chunk: (size: number, callback: (models: ILoyaltyPointModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ILoyaltyPointModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newLoyaltyPoint: NewLoyaltyPoint) => Promise<ILoyaltyPointModel>
  firstOrCreate: (search: Partial<LoyaltyPointsTable>, values?: NewLoyaltyPoint) => Promise<ILoyaltyPointModel>
  updateOrCreate: (search: Partial<LoyaltyPointsTable>, values?: NewLoyaltyPoint) => Promise<ILoyaltyPointModel>
  createMany: (newLoyaltyPoint: NewLoyaltyPoint[]) => Promise<void>
  forceCreate: (newLoyaltyPoint: NewLoyaltyPoint) => Promise<ILoyaltyPointModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof LoyaltyPointsTable, values: V[]) => ILoyaltyPointModel
  distinct: (column: keyof LoyaltyPointJsonResponse) => ILoyaltyPointModel
  join: (table: string, firstCol: string, secondCol: string) => ILoyaltyPointModel
}

export interface ILoyaltyPointModel {
  // Properties
  readonly id: number
  get wallet_id(): string
  set wallet_id(value: string)
  get points(): number
  set points(value: number)
  get source(): string
  set source(value: string)
  get source_reference_id(): string | undefined
  set source_reference_id(value: string)
  get description(): string | undefined
  set description(value: string)
  get expiry_date(): Date | string | undefined
  set expiry_date(value: Date | string)
  get is_used(): boolean | undefined
  set is_used(value: boolean)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: LoyaltyPointJsonResponse) => ILoyaltyPointModel
  create: (newLoyaltyPoint: NewLoyaltyPoint) => Promise<ILoyaltyPointModel>
  update: (newLoyaltyPoint: LoyaltyPointUpdate) => Promise<ILoyaltyPointModel | undefined>
  forceUpdate: (newLoyaltyPoint: LoyaltyPointUpdate) => Promise<ILoyaltyPointModel | undefined>
  save: () => Promise<ILoyaltyPointModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<LoyaltyPointJsonResponse>
  toJSON: () => LoyaltyPointJsonResponse
  parseResult: (model: ILoyaltyPointModel) => ILoyaltyPointModel
}

export type LoyaltyPointModelType = ILoyaltyPointModel & ILoyaltyPointModelStatic
