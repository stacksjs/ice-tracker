import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface PostsTable {
  id: Generated<number>
  title: string
  poster?: string
  content: string
  excerpt?: string
  views?: number
  published_at?: Date | string
  status: string | string[]
  is_featured?: number
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PostRead = PostsTable

export type PostWrite = Omit<PostsTable, 'created_at'> & {
  created_at?: string
}

export interface PostResponse {
  data: PostJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PostJsonResponse extends Omit<Selectable<PostRead>, 'password'> {
  [key: string]: any
}

export type NewPost = Insertable<PostWrite>
export type PostUpdate = Updateable<PostWrite>

export interface IPostModelStatic {
  with: (relations: string[]) => IPostModel
  select: (params: (keyof PostJsonResponse)[] | RawBuilder<string> | string) => IPostModel
  find: (id: number) => Promise<IPostModel | undefined>
  first: () => Promise<IPostModel | undefined>
  last: () => Promise<IPostModel | undefined>
  firstOrFail: () => Promise<IPostModel | undefined>
  all: () => Promise<IPostModel[]>
  findOrFail: (id: number) => Promise<IPostModel | undefined>
  findMany: (ids: number[]) => Promise<IPostModel[]>
  latest: (column?: keyof PostsTable) => Promise<IPostModel | undefined>
  oldest: (column?: keyof PostsTable) => Promise<IPostModel | undefined>
  skip: (count: number) => IPostModel
  take: (count: number) => IPostModel
  where: <V = string>(column: keyof PostsTable, ...args: [V] | [Operator, V]) => IPostModel
  orWhere: (...conditions: [string, any][]) => IPostModel
  whereNotIn: <V = number>(column: keyof PostsTable, values: V[]) => IPostModel
  whereBetween: <V = number>(column: keyof PostsTable, range: [V, V]) => IPostModel
  whereRef: (column: keyof PostsTable, ...args: string[]) => IPostModel
  when: (condition: boolean, callback: (query: IPostModel) => IPostModel) => IPostModel
  whereNull: (column: keyof PostsTable) => IPostModel
  whereNotNull: (column: keyof PostsTable) => IPostModel
  whereLike: (column: keyof PostsTable, value: string) => IPostModel
  orderBy: (column: keyof PostsTable, order: 'asc' | 'desc') => IPostModel
  orderByAsc: (column: keyof PostsTable) => IPostModel
  orderByDesc: (column: keyof PostsTable) => IPostModel
  groupBy: (column: keyof PostsTable) => IPostModel
  having: <V = string>(column: keyof PostsTable, operator: Operator, value: V) => IPostModel
  inRandomOrder: () => IPostModel
  whereColumn: (first: keyof PostsTable, operator: Operator, second: keyof PostsTable) => IPostModel
  max: (field: keyof PostsTable) => Promise<number>
  min: (field: keyof PostsTable) => Promise<number>
  avg: (field: keyof PostsTable) => Promise<number>
  sum: (field: keyof PostsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPostModel[]>
  pluck: <K extends keyof IPostModel>(field: K) => Promise<IPostModel[K][]>
  chunk: (size: number, callback: (models: IPostModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPostModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPost: NewPost) => Promise<IPostModel>
  firstOrCreate: (search: Partial<PostsTable>, values?: NewPost) => Promise<IPostModel>
  updateOrCreate: (search: Partial<PostsTable>, values?: NewPost) => Promise<IPostModel>
  createMany: (newPost: NewPost[]) => Promise<void>
  forceCreate: (newPost: NewPost) => Promise<IPostModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PostsTable, values: V[]) => IPostModel
  distinct: (column: keyof PostJsonResponse) => IPostModel
  join: (table: string, firstCol: string, secondCol: string) => IPostModel
}

export interface IPostModel {
  // Properties
  readonly id: number
  get title(): string
  set title(value: string)
  get poster(): string | undefined
  set poster(value: string)
  get content(): string
  set content(value: string)
  get excerpt(): string | undefined
  set excerpt(value: string)
  get views(): number | undefined
  set views(value: number)
  get published_at(): Date | string | undefined
  set published_at(value: Date | string)
  get status(): string | string[]
  set status(value: string | string[])
  get is_featured(): number | undefined
  set is_featured(value: number)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PostJsonResponse) => IPostModel
  create: (newPost: NewPost) => Promise<IPostModel>
  update: (newPost: PostUpdate) => Promise<IPostModel | undefined>
  forceUpdate: (newPost: PostUpdate) => Promise<IPostModel | undefined>
  save: () => Promise<IPostModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PostJsonResponse>
  toJSON: () => PostJsonResponse
  parseResult: (model: IPostModel) => IPostModel
}

export type PostModelType = IPostModel & IPostModelStatic
