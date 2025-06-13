import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface GiftCardsTable {
  id: Generated<number>
  code: string
  initial_balance: number
  current_balance: number
  currency?: string
  status: string
  purchaser_id?: string
  recipient_email?: string
  recipient_name?: string
  personal_message?: string
  is_digital?: boolean
  is_reloadable?: boolean
  is_active?: boolean
  expiry_date?: Date | string
  last_used_date?: Date | string
  template_id?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type GiftCardRead = GiftCardsTable

export type GiftCardWrite = Omit<GiftCardsTable, 'created_at'> & {
  created_at?: string
}

export interface GiftCardResponse {
  data: GiftCardJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface GiftCardJsonResponse extends Omit<Selectable<GiftCardRead>, 'password'> {
  [key: string]: any
}

export type NewGiftCard = Insertable<GiftCardWrite>
export type GiftCardUpdate = Updateable<GiftCardWrite>

export interface IGiftCardModelStatic {
  with: (relations: string[]) => IGiftCardModel
  select: (params: (keyof GiftCardJsonResponse)[] | RawBuilder<string> | string) => IGiftCardModel
  find: (id: number) => Promise<IGiftCardModel | undefined>
  first: () => Promise<IGiftCardModel | undefined>
  last: () => Promise<IGiftCardModel | undefined>
  firstOrFail: () => Promise<IGiftCardModel | undefined>
  all: () => Promise<IGiftCardModel[]>
  findOrFail: (id: number) => Promise<IGiftCardModel | undefined>
  findMany: (ids: number[]) => Promise<IGiftCardModel[]>
  latest: (column?: keyof GiftCardsTable) => Promise<IGiftCardModel | undefined>
  oldest: (column?: keyof GiftCardsTable) => Promise<IGiftCardModel | undefined>
  skip: (count: number) => IGiftCardModel
  take: (count: number) => IGiftCardModel
  where: <V = string>(column: keyof GiftCardsTable, ...args: [V] | [Operator, V]) => IGiftCardModel
  orWhere: (...conditions: [string, any][]) => IGiftCardModel
  whereNotIn: <V = number>(column: keyof GiftCardsTable, values: V[]) => IGiftCardModel
  whereBetween: <V = number>(column: keyof GiftCardsTable, range: [V, V]) => IGiftCardModel
  whereRef: (column: keyof GiftCardsTable, ...args: string[]) => IGiftCardModel
  when: (condition: boolean, callback: (query: IGiftCardModel) => IGiftCardModel) => IGiftCardModel
  whereNull: (column: keyof GiftCardsTable) => IGiftCardModel
  whereNotNull: (column: keyof GiftCardsTable) => IGiftCardModel
  whereLike: (column: keyof GiftCardsTable, value: string) => IGiftCardModel
  orderBy: (column: keyof GiftCardsTable, order: 'asc' | 'desc') => IGiftCardModel
  orderByAsc: (column: keyof GiftCardsTable) => IGiftCardModel
  orderByDesc: (column: keyof GiftCardsTable) => IGiftCardModel
  groupBy: (column: keyof GiftCardsTable) => IGiftCardModel
  having: <V = string>(column: keyof GiftCardsTable, operator: Operator, value: V) => IGiftCardModel
  inRandomOrder: () => IGiftCardModel
  whereColumn: (first: keyof GiftCardsTable, operator: Operator, second: keyof GiftCardsTable) => IGiftCardModel
  max: (field: keyof GiftCardsTable) => Promise<number>
  min: (field: keyof GiftCardsTable) => Promise<number>
  avg: (field: keyof GiftCardsTable) => Promise<number>
  sum: (field: keyof GiftCardsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IGiftCardModel[]>
  pluck: <K extends keyof IGiftCardModel>(field: K) => Promise<IGiftCardModel[K][]>
  chunk: (size: number, callback: (models: IGiftCardModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IGiftCardModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newGiftCard: NewGiftCard) => Promise<IGiftCardModel>
  firstOrCreate: (search: Partial<GiftCardsTable>, values?: NewGiftCard) => Promise<IGiftCardModel>
  updateOrCreate: (search: Partial<GiftCardsTable>, values?: NewGiftCard) => Promise<IGiftCardModel>
  createMany: (newGiftCard: NewGiftCard[]) => Promise<void>
  forceCreate: (newGiftCard: NewGiftCard) => Promise<IGiftCardModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof GiftCardsTable, values: V[]) => IGiftCardModel
  distinct: (column: keyof GiftCardJsonResponse) => IGiftCardModel
  join: (table: string, firstCol: string, secondCol: string) => IGiftCardModel
}

export interface IGiftCardModel {
  // Properties
  readonly id: number
  get code(): string
  set code(value: string)
  get initial_balance(): number
  set initial_balance(value: number)
  get current_balance(): number
  set current_balance(value: number)
  get currency(): string | undefined
  set currency(value: string)
  get status(): string
  set status(value: string)
  get purchaser_id(): string | undefined
  set purchaser_id(value: string)
  get recipient_email(): string | undefined
  set recipient_email(value: string)
  get recipient_name(): string | undefined
  set recipient_name(value: string)
  get personal_message(): string | undefined
  set personal_message(value: string)
  get is_digital(): boolean | undefined
  set is_digital(value: boolean)
  get is_reloadable(): boolean | undefined
  set is_reloadable(value: boolean)
  get is_active(): boolean | undefined
  set is_active(value: boolean)
  get expiry_date(): Date | string | undefined
  set expiry_date(value: Date | string)
  get last_used_date(): Date | string | undefined
  set last_used_date(value: Date | string)
  get template_id(): string | undefined
  set template_id(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: GiftCardJsonResponse) => IGiftCardModel
  create: (newGiftCard: NewGiftCard) => Promise<IGiftCardModel>
  update: (newGiftCard: GiftCardUpdate) => Promise<IGiftCardModel | undefined>
  forceUpdate: (newGiftCard: GiftCardUpdate) => Promise<IGiftCardModel | undefined>
  save: () => Promise<IGiftCardModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<GiftCardJsonResponse>
  toJSON: () => GiftCardJsonResponse
  parseResult: (model: IGiftCardModel) => IGiftCardModel
}

export type GiftCardModelType = IGiftCardModel & IGiftCardModelStatic
