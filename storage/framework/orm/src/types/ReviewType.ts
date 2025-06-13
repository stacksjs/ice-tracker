import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ReviewsTable {
  id: Generated<number>
  rating: number
  title: string
  content: string
  is_verified_purchase?: boolean
  is_approved?: boolean
  is_featured?: boolean
  helpful_votes?: number
  unhelpful_votes?: number
  purchase_date?: string
  images?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ReviewRead = ReviewsTable

export type ReviewWrite = Omit<ReviewsTable, 'created_at'> & {
  created_at?: string
}

export interface ReviewResponse {
  data: ReviewJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ReviewJsonResponse extends Omit<Selectable<ReviewRead>, 'password'> {
  [key: string]: any
}

export type NewReview = Insertable<ReviewWrite>
export type ReviewUpdate = Updateable<ReviewWrite>

export interface IReviewModelStatic {
  with: (relations: string[]) => IReviewModel
  select: (params: (keyof ReviewJsonResponse)[] | RawBuilder<string> | string) => IReviewModel
  find: (id: number) => Promise<IReviewModel | undefined>
  first: () => Promise<IReviewModel | undefined>
  last: () => Promise<IReviewModel | undefined>
  firstOrFail: () => Promise<IReviewModel | undefined>
  all: () => Promise<IReviewModel[]>
  findOrFail: (id: number) => Promise<IReviewModel | undefined>
  findMany: (ids: number[]) => Promise<IReviewModel[]>
  latest: (column?: keyof ReviewsTable) => Promise<IReviewModel | undefined>
  oldest: (column?: keyof ReviewsTable) => Promise<IReviewModel | undefined>
  skip: (count: number) => IReviewModel
  take: (count: number) => IReviewModel
  where: <V = string>(column: keyof ReviewsTable, ...args: [V] | [Operator, V]) => IReviewModel
  orWhere: (...conditions: [string, any][]) => IReviewModel
  whereNotIn: <V = number>(column: keyof ReviewsTable, values: V[]) => IReviewModel
  whereBetween: <V = number>(column: keyof ReviewsTable, range: [V, V]) => IReviewModel
  whereRef: (column: keyof ReviewsTable, ...args: string[]) => IReviewModel
  when: (condition: boolean, callback: (query: IReviewModel) => IReviewModel) => IReviewModel
  whereNull: (column: keyof ReviewsTable) => IReviewModel
  whereNotNull: (column: keyof ReviewsTable) => IReviewModel
  whereLike: (column: keyof ReviewsTable, value: string) => IReviewModel
  orderBy: (column: keyof ReviewsTable, order: 'asc' | 'desc') => IReviewModel
  orderByAsc: (column: keyof ReviewsTable) => IReviewModel
  orderByDesc: (column: keyof ReviewsTable) => IReviewModel
  groupBy: (column: keyof ReviewsTable) => IReviewModel
  having: <V = string>(column: keyof ReviewsTable, operator: Operator, value: V) => IReviewModel
  inRandomOrder: () => IReviewModel
  whereColumn: (first: keyof ReviewsTable, operator: Operator, second: keyof ReviewsTable) => IReviewModel
  max: (field: keyof ReviewsTable) => Promise<number>
  min: (field: keyof ReviewsTable) => Promise<number>
  avg: (field: keyof ReviewsTable) => Promise<number>
  sum: (field: keyof ReviewsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IReviewModel[]>
  pluck: <K extends keyof IReviewModel>(field: K) => Promise<IReviewModel[K][]>
  chunk: (size: number, callback: (models: IReviewModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IReviewModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newReview: NewReview) => Promise<IReviewModel>
  firstOrCreate: (search: Partial<ReviewsTable>, values?: NewReview) => Promise<IReviewModel>
  updateOrCreate: (search: Partial<ReviewsTable>, values?: NewReview) => Promise<IReviewModel>
  createMany: (newReview: NewReview[]) => Promise<void>
  forceCreate: (newReview: NewReview) => Promise<IReviewModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ReviewsTable, values: V[]) => IReviewModel
  distinct: (column: keyof ReviewJsonResponse) => IReviewModel
  join: (table: string, firstCol: string, secondCol: string) => IReviewModel
}

export interface IReviewModel {
  // Properties
  readonly id: number
  get rating(): number
  set rating(value: number)
  get title(): string
  set title(value: string)
  get content(): string
  set content(value: string)
  get is_verified_purchase(): boolean | undefined
  set is_verified_purchase(value: boolean)
  get is_approved(): boolean | undefined
  set is_approved(value: boolean)
  get is_featured(): boolean | undefined
  set is_featured(value: boolean)
  get helpful_votes(): number | undefined
  set helpful_votes(value: number)
  get unhelpful_votes(): number | undefined
  set unhelpful_votes(value: number)
  get purchase_date(): string | undefined
  set purchase_date(value: string)
  get images(): string | undefined
  set images(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ReviewJsonResponse) => IReviewModel
  create: (newReview: NewReview) => Promise<IReviewModel>
  update: (newReview: ReviewUpdate) => Promise<IReviewModel | undefined>
  forceUpdate: (newReview: ReviewUpdate) => Promise<IReviewModel | undefined>
  save: () => Promise<IReviewModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ReviewJsonResponse>
  toJSON: () => ReviewJsonResponse
  parseResult: (model: IReviewModel) => IReviewModel
}

export type ReviewModelType = IReviewModel & IReviewModelStatic
