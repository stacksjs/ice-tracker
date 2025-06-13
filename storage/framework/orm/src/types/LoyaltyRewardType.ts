import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface LoyaltyRewardsTable {
  id: Generated<number>
  name: string
  description?: string
  points_required: number
  reward_type: string
  discount_percentage?: number
  free_product_id?: string
  is_active?: boolean
  expiry_days?: number
  image_url?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type LoyaltyRewardRead = LoyaltyRewardsTable

export type LoyaltyRewardWrite = Omit<LoyaltyRewardsTable, 'created_at'> & {
  created_at?: string
}

export interface LoyaltyRewardResponse {
  data: LoyaltyRewardJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface LoyaltyRewardJsonResponse extends Omit<Selectable<LoyaltyRewardRead>, 'password'> {
  [key: string]: any
}

export type NewLoyaltyReward = Insertable<LoyaltyRewardWrite>
export type LoyaltyRewardUpdate = Updateable<LoyaltyRewardWrite>

export interface ILoyaltyRewardModelStatic {
  with: (relations: string[]) => ILoyaltyRewardModel
  select: (params: (keyof LoyaltyRewardJsonResponse)[] | RawBuilder<string> | string) => ILoyaltyRewardModel
  find: (id: number) => Promise<ILoyaltyRewardModel | undefined>
  first: () => Promise<ILoyaltyRewardModel | undefined>
  last: () => Promise<ILoyaltyRewardModel | undefined>
  firstOrFail: () => Promise<ILoyaltyRewardModel | undefined>
  all: () => Promise<ILoyaltyRewardModel[]>
  findOrFail: (id: number) => Promise<ILoyaltyRewardModel | undefined>
  findMany: (ids: number[]) => Promise<ILoyaltyRewardModel[]>
  latest: (column?: keyof LoyaltyRewardsTable) => Promise<ILoyaltyRewardModel | undefined>
  oldest: (column?: keyof LoyaltyRewardsTable) => Promise<ILoyaltyRewardModel | undefined>
  skip: (count: number) => ILoyaltyRewardModel
  take: (count: number) => ILoyaltyRewardModel
  where: <V = string>(column: keyof LoyaltyRewardsTable, ...args: [V] | [Operator, V]) => ILoyaltyRewardModel
  orWhere: (...conditions: [string, any][]) => ILoyaltyRewardModel
  whereNotIn: <V = number>(column: keyof LoyaltyRewardsTable, values: V[]) => ILoyaltyRewardModel
  whereBetween: <V = number>(column: keyof LoyaltyRewardsTable, range: [V, V]) => ILoyaltyRewardModel
  whereRef: (column: keyof LoyaltyRewardsTable, ...args: string[]) => ILoyaltyRewardModel
  when: (condition: boolean, callback: (query: ILoyaltyRewardModel) => ILoyaltyRewardModel) => ILoyaltyRewardModel
  whereNull: (column: keyof LoyaltyRewardsTable) => ILoyaltyRewardModel
  whereNotNull: (column: keyof LoyaltyRewardsTable) => ILoyaltyRewardModel
  whereLike: (column: keyof LoyaltyRewardsTable, value: string) => ILoyaltyRewardModel
  orderBy: (column: keyof LoyaltyRewardsTable, order: 'asc' | 'desc') => ILoyaltyRewardModel
  orderByAsc: (column: keyof LoyaltyRewardsTable) => ILoyaltyRewardModel
  orderByDesc: (column: keyof LoyaltyRewardsTable) => ILoyaltyRewardModel
  groupBy: (column: keyof LoyaltyRewardsTable) => ILoyaltyRewardModel
  having: <V = string>(column: keyof LoyaltyRewardsTable, operator: Operator, value: V) => ILoyaltyRewardModel
  inRandomOrder: () => ILoyaltyRewardModel
  whereColumn: (first: keyof LoyaltyRewardsTable, operator: Operator, second: keyof LoyaltyRewardsTable) => ILoyaltyRewardModel
  max: (field: keyof LoyaltyRewardsTable) => Promise<number>
  min: (field: keyof LoyaltyRewardsTable) => Promise<number>
  avg: (field: keyof LoyaltyRewardsTable) => Promise<number>
  sum: (field: keyof LoyaltyRewardsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ILoyaltyRewardModel[]>
  pluck: <K extends keyof ILoyaltyRewardModel>(field: K) => Promise<ILoyaltyRewardModel[K][]>
  chunk: (size: number, callback: (models: ILoyaltyRewardModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ILoyaltyRewardModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newLoyaltyReward: NewLoyaltyReward) => Promise<ILoyaltyRewardModel>
  firstOrCreate: (search: Partial<LoyaltyRewardsTable>, values?: NewLoyaltyReward) => Promise<ILoyaltyRewardModel>
  updateOrCreate: (search: Partial<LoyaltyRewardsTable>, values?: NewLoyaltyReward) => Promise<ILoyaltyRewardModel>
  createMany: (newLoyaltyReward: NewLoyaltyReward[]) => Promise<void>
  forceCreate: (newLoyaltyReward: NewLoyaltyReward) => Promise<ILoyaltyRewardModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof LoyaltyRewardsTable, values: V[]) => ILoyaltyRewardModel
  distinct: (column: keyof LoyaltyRewardJsonResponse) => ILoyaltyRewardModel
  join: (table: string, firstCol: string, secondCol: string) => ILoyaltyRewardModel
}

export interface ILoyaltyRewardModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): string | undefined
  set description(value: string)
  get points_required(): number
  set points_required(value: number)
  get reward_type(): string
  set reward_type(value: string)
  get discount_percentage(): number | undefined
  set discount_percentage(value: number)
  get free_product_id(): string | undefined
  set free_product_id(value: string)
  get is_active(): boolean | undefined
  set is_active(value: boolean)
  get expiry_days(): number | undefined
  set expiry_days(value: number)
  get image_url(): string | undefined
  set image_url(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: LoyaltyRewardJsonResponse) => ILoyaltyRewardModel
  create: (newLoyaltyReward: NewLoyaltyReward) => Promise<ILoyaltyRewardModel>
  update: (newLoyaltyReward: LoyaltyRewardUpdate) => Promise<ILoyaltyRewardModel | undefined>
  forceUpdate: (newLoyaltyReward: LoyaltyRewardUpdate) => Promise<ILoyaltyRewardModel | undefined>
  save: () => Promise<ILoyaltyRewardModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<LoyaltyRewardJsonResponse>
  toJSON: () => LoyaltyRewardJsonResponse
  parseResult: (model: ILoyaltyRewardModel) => ILoyaltyRewardModel
}

export type LoyaltyRewardModelType = ILoyaltyRewardModel & ILoyaltyRewardModelStatic
