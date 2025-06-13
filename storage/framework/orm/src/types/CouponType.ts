import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface CouponsTable {
  id: Generated<number>
  code: string
  description?: string
  discount_type: string
  discount_value: number
  min_order_amount?: number
  max_discount_amount?: number
  free_product_id?: string
  is_active?: boolean
  usage_limit?: number
  usage_count?: number
  start_date: Date | string
  end_date: Date | string
  applicable_products?: string
  applicable_categories?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type CouponRead = CouponsTable

export type CouponWrite = Omit<CouponsTable, 'created_at'> & {
  created_at?: string
}

export interface CouponResponse {
  data: CouponJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface CouponJsonResponse extends Omit<Selectable<CouponRead>, 'password'> {
  [key: string]: any
}

export type NewCoupon = Insertable<CouponWrite>
export type CouponUpdate = Updateable<CouponWrite>

export interface ICouponModelStatic {
  with: (relations: string[]) => ICouponModel
  select: (params: (keyof CouponJsonResponse)[] | RawBuilder<string> | string) => ICouponModel
  find: (id: number) => Promise<ICouponModel | undefined>
  first: () => Promise<ICouponModel | undefined>
  last: () => Promise<ICouponModel | undefined>
  firstOrFail: () => Promise<ICouponModel | undefined>
  all: () => Promise<ICouponModel[]>
  findOrFail: (id: number) => Promise<ICouponModel | undefined>
  findMany: (ids: number[]) => Promise<ICouponModel[]>
  latest: (column?: keyof CouponsTable) => Promise<ICouponModel | undefined>
  oldest: (column?: keyof CouponsTable) => Promise<ICouponModel | undefined>
  skip: (count: number) => ICouponModel
  take: (count: number) => ICouponModel
  where: <V = string>(column: keyof CouponsTable, ...args: [V] | [Operator, V]) => ICouponModel
  orWhere: (...conditions: [string, any][]) => ICouponModel
  whereNotIn: <V = number>(column: keyof CouponsTable, values: V[]) => ICouponModel
  whereBetween: <V = number>(column: keyof CouponsTable, range: [V, V]) => ICouponModel
  whereRef: (column: keyof CouponsTable, ...args: string[]) => ICouponModel
  when: (condition: boolean, callback: (query: ICouponModel) => ICouponModel) => ICouponModel
  whereNull: (column: keyof CouponsTable) => ICouponModel
  whereNotNull: (column: keyof CouponsTable) => ICouponModel
  whereLike: (column: keyof CouponsTable, value: string) => ICouponModel
  orderBy: (column: keyof CouponsTable, order: 'asc' | 'desc') => ICouponModel
  orderByAsc: (column: keyof CouponsTable) => ICouponModel
  orderByDesc: (column: keyof CouponsTable) => ICouponModel
  groupBy: (column: keyof CouponsTable) => ICouponModel
  having: <V = string>(column: keyof CouponsTable, operator: Operator, value: V) => ICouponModel
  inRandomOrder: () => ICouponModel
  whereColumn: (first: keyof CouponsTable, operator: Operator, second: keyof CouponsTable) => ICouponModel
  max: (field: keyof CouponsTable) => Promise<number>
  min: (field: keyof CouponsTable) => Promise<number>
  avg: (field: keyof CouponsTable) => Promise<number>
  sum: (field: keyof CouponsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ICouponModel[]>
  pluck: <K extends keyof ICouponModel>(field: K) => Promise<ICouponModel[K][]>
  chunk: (size: number, callback: (models: ICouponModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ICouponModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newCoupon: NewCoupon) => Promise<ICouponModel>
  firstOrCreate: (search: Partial<CouponsTable>, values?: NewCoupon) => Promise<ICouponModel>
  updateOrCreate: (search: Partial<CouponsTable>, values?: NewCoupon) => Promise<ICouponModel>
  createMany: (newCoupon: NewCoupon[]) => Promise<void>
  forceCreate: (newCoupon: NewCoupon) => Promise<ICouponModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof CouponsTable, values: V[]) => ICouponModel
  distinct: (column: keyof CouponJsonResponse) => ICouponModel
  join: (table: string, firstCol: string, secondCol: string) => ICouponModel
}

export interface ICouponModel {
  // Properties
  readonly id: number
  get code(): string
  set code(value: string)
  get description(): string | undefined
  set description(value: string)
  get discount_type(): string
  set discount_type(value: string)
  get discount_value(): number
  set discount_value(value: number)
  get min_order_amount(): number | undefined
  set min_order_amount(value: number)
  get max_discount_amount(): number | undefined
  set max_discount_amount(value: number)
  get free_product_id(): string | undefined
  set free_product_id(value: string)
  get is_active(): boolean | undefined
  set is_active(value: boolean)
  get usage_limit(): number | undefined
  set usage_limit(value: number)
  get usage_count(): number | undefined
  set usage_count(value: number)
  get start_date(): Date | string
  set start_date(value: Date | string)
  get end_date(): Date | string
  set end_date(value: Date | string)
  get applicable_products(): string | undefined
  set applicable_products(value: string)
  get applicable_categories(): string | undefined
  set applicable_categories(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: CouponJsonResponse) => ICouponModel
  create: (newCoupon: NewCoupon) => Promise<ICouponModel>
  update: (newCoupon: CouponUpdate) => Promise<ICouponModel | undefined>
  forceUpdate: (newCoupon: CouponUpdate) => Promise<ICouponModel | undefined>
  save: () => Promise<ICouponModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<CouponJsonResponse>
  toJSON: () => CouponJsonResponse
  parseResult: (model: ICouponModel) => ICouponModel
}

export type CouponModelType = ICouponModel & ICouponModelStatic
