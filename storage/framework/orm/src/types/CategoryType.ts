import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface CategoriesTable {
  id: Generated<number>
  name: string
  description?: string
  image_url?: string
  is_active?: boolean
  parent_category_id?: string
  display_order: number
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type CategoryRead = CategoriesTable

export type CategoryWrite = Omit<CategoriesTable, 'created_at'> & {
  created_at?: string
}

export interface CategoryResponse {
  data: CategoryJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface CategoryJsonResponse extends Omit<Selectable<CategoryRead>, 'password'> {
  [key: string]: any
}

export type NewCategory = Insertable<CategoryWrite>
export type CategoryUpdate = Updateable<CategoryWrite>

export interface ICategoryModelStatic {
  with: (relations: string[]) => ICategoryModel
  select: (params: (keyof CategoryJsonResponse)[] | RawBuilder<string> | string) => ICategoryModel
  find: (id: number) => Promise<ICategoryModel | undefined>
  first: () => Promise<ICategoryModel | undefined>
  last: () => Promise<ICategoryModel | undefined>
  firstOrFail: () => Promise<ICategoryModel | undefined>
  all: () => Promise<ICategoryModel[]>
  findOrFail: (id: number) => Promise<ICategoryModel | undefined>
  findMany: (ids: number[]) => Promise<ICategoryModel[]>
  latest: (column?: keyof CategoriesTable) => Promise<ICategoryModel | undefined>
  oldest: (column?: keyof CategoriesTable) => Promise<ICategoryModel | undefined>
  skip: (count: number) => ICategoryModel
  take: (count: number) => ICategoryModel
  where: <V = string>(column: keyof CategoriesTable, ...args: [V] | [Operator, V]) => ICategoryModel
  orWhere: (...conditions: [string, any][]) => ICategoryModel
  whereNotIn: <V = number>(column: keyof CategoriesTable, values: V[]) => ICategoryModel
  whereBetween: <V = number>(column: keyof CategoriesTable, range: [V, V]) => ICategoryModel
  whereRef: (column: keyof CategoriesTable, ...args: string[]) => ICategoryModel
  when: (condition: boolean, callback: (query: ICategoryModel) => ICategoryModel) => ICategoryModel
  whereNull: (column: keyof CategoriesTable) => ICategoryModel
  whereNotNull: (column: keyof CategoriesTable) => ICategoryModel
  whereLike: (column: keyof CategoriesTable, value: string) => ICategoryModel
  orderBy: (column: keyof CategoriesTable, order: 'asc' | 'desc') => ICategoryModel
  orderByAsc: (column: keyof CategoriesTable) => ICategoryModel
  orderByDesc: (column: keyof CategoriesTable) => ICategoryModel
  groupBy: (column: keyof CategoriesTable) => ICategoryModel
  having: <V = string>(column: keyof CategoriesTable, operator: Operator, value: V) => ICategoryModel
  inRandomOrder: () => ICategoryModel
  whereColumn: (first: keyof CategoriesTable, operator: Operator, second: keyof CategoriesTable) => ICategoryModel
  max: (field: keyof CategoriesTable) => Promise<number>
  min: (field: keyof CategoriesTable) => Promise<number>
  avg: (field: keyof CategoriesTable) => Promise<number>
  sum: (field: keyof CategoriesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ICategoryModel[]>
  pluck: <K extends keyof ICategoryModel>(field: K) => Promise<ICategoryModel[K][]>
  chunk: (size: number, callback: (models: ICategoryModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ICategoryModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newCategory: NewCategory) => Promise<ICategoryModel>
  firstOrCreate: (search: Partial<CategoriesTable>, values?: NewCategory) => Promise<ICategoryModel>
  updateOrCreate: (search: Partial<CategoriesTable>, values?: NewCategory) => Promise<ICategoryModel>
  createMany: (newCategory: NewCategory[]) => Promise<void>
  forceCreate: (newCategory: NewCategory) => Promise<ICategoryModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof CategoriesTable, values: V[]) => ICategoryModel
  distinct: (column: keyof CategoryJsonResponse) => ICategoryModel
  join: (table: string, firstCol: string, secondCol: string) => ICategoryModel
}

export interface ICategoryModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): string | undefined
  set description(value: string)
  get image_url(): string | undefined
  set image_url(value: string)
  get is_active(): boolean | undefined
  set is_active(value: boolean)
  get parent_category_id(): string | undefined
  set parent_category_id(value: string)
  get display_order(): number
  set display_order(value: number)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: CategoryJsonResponse) => ICategoryModel
  create: (newCategory: NewCategory) => Promise<ICategoryModel>
  update: (newCategory: CategoryUpdate) => Promise<ICategoryModel | undefined>
  forceUpdate: (newCategory: CategoryUpdate) => Promise<ICategoryModel | undefined>
  save: () => Promise<ICategoryModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<CategoryJsonResponse>
  toJSON: () => CategoryJsonResponse
  parseResult: (model: ICategoryModel) => ICategoryModel
}

export type CategoryModelType = ICategoryModel & ICategoryModelStatic
