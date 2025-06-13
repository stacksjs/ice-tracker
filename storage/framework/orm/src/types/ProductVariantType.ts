import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ProductVariantsTable {
  id: Generated<number>
  variant: string
  type: string
  description?: string
  options?: string
  status: string | string[]
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ProductVariantRead = ProductVariantsTable

export type ProductVariantWrite = Omit<ProductVariantsTable, 'created_at'> & {
  created_at?: string
}

export interface ProductVariantResponse {
  data: ProductVariantJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ProductVariantJsonResponse extends Omit<Selectable<ProductVariantRead>, 'password'> {
  [key: string]: any
}

export type NewProductVariant = Insertable<ProductVariantWrite>
export type ProductVariantUpdate = Updateable<ProductVariantWrite>

export interface IProductVariantModelStatic {
  with: (relations: string[]) => IProductVariantModel
  select: (params: (keyof ProductVariantJsonResponse)[] | RawBuilder<string> | string) => IProductVariantModel
  find: (id: number) => Promise<IProductVariantModel | undefined>
  first: () => Promise<IProductVariantModel | undefined>
  last: () => Promise<IProductVariantModel | undefined>
  firstOrFail: () => Promise<IProductVariantModel | undefined>
  all: () => Promise<IProductVariantModel[]>
  findOrFail: (id: number) => Promise<IProductVariantModel | undefined>
  findMany: (ids: number[]) => Promise<IProductVariantModel[]>
  latest: (column?: keyof ProductVariantsTable) => Promise<IProductVariantModel | undefined>
  oldest: (column?: keyof ProductVariantsTable) => Promise<IProductVariantModel | undefined>
  skip: (count: number) => IProductVariantModel
  take: (count: number) => IProductVariantModel
  where: <V = string>(column: keyof ProductVariantsTable, ...args: [V] | [Operator, V]) => IProductVariantModel
  orWhere: (...conditions: [string, any][]) => IProductVariantModel
  whereNotIn: <V = number>(column: keyof ProductVariantsTable, values: V[]) => IProductVariantModel
  whereBetween: <V = number>(column: keyof ProductVariantsTable, range: [V, V]) => IProductVariantModel
  whereRef: (column: keyof ProductVariantsTable, ...args: string[]) => IProductVariantModel
  when: (condition: boolean, callback: (query: IProductVariantModel) => IProductVariantModel) => IProductVariantModel
  whereNull: (column: keyof ProductVariantsTable) => IProductVariantModel
  whereNotNull: (column: keyof ProductVariantsTable) => IProductVariantModel
  whereLike: (column: keyof ProductVariantsTable, value: string) => IProductVariantModel
  orderBy: (column: keyof ProductVariantsTable, order: 'asc' | 'desc') => IProductVariantModel
  orderByAsc: (column: keyof ProductVariantsTable) => IProductVariantModel
  orderByDesc: (column: keyof ProductVariantsTable) => IProductVariantModel
  groupBy: (column: keyof ProductVariantsTable) => IProductVariantModel
  having: <V = string>(column: keyof ProductVariantsTable, operator: Operator, value: V) => IProductVariantModel
  inRandomOrder: () => IProductVariantModel
  whereColumn: (first: keyof ProductVariantsTable, operator: Operator, second: keyof ProductVariantsTable) => IProductVariantModel
  max: (field: keyof ProductVariantsTable) => Promise<number>
  min: (field: keyof ProductVariantsTable) => Promise<number>
  avg: (field: keyof ProductVariantsTable) => Promise<number>
  sum: (field: keyof ProductVariantsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IProductVariantModel[]>
  pluck: <K extends keyof IProductVariantModel>(field: K) => Promise<IProductVariantModel[K][]>
  chunk: (size: number, callback: (models: IProductVariantModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IProductVariantModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newProductVariant: NewProductVariant) => Promise<IProductVariantModel>
  firstOrCreate: (search: Partial<ProductVariantsTable>, values?: NewProductVariant) => Promise<IProductVariantModel>
  updateOrCreate: (search: Partial<ProductVariantsTable>, values?: NewProductVariant) => Promise<IProductVariantModel>
  createMany: (newProductVariant: NewProductVariant[]) => Promise<void>
  forceCreate: (newProductVariant: NewProductVariant) => Promise<IProductVariantModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ProductVariantsTable, values: V[]) => IProductVariantModel
  distinct: (column: keyof ProductVariantJsonResponse) => IProductVariantModel
  join: (table: string, firstCol: string, secondCol: string) => IProductVariantModel
}

export interface IProductVariantModel {
  // Properties
  readonly id: number
  get variant(): string
  set variant(value: string)
  get type(): string
  set type(value: string)
  get description(): string | undefined
  set description(value: string)
  get options(): string | undefined
  set options(value: string)
  get status(): string | string[]
  set status(value: string | string[])
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ProductVariantJsonResponse) => IProductVariantModel
  create: (newProductVariant: NewProductVariant) => Promise<IProductVariantModel>
  update: (newProductVariant: ProductVariantUpdate) => Promise<IProductVariantModel | undefined>
  forceUpdate: (newProductVariant: ProductVariantUpdate) => Promise<IProductVariantModel | undefined>
  save: () => Promise<IProductVariantModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ProductVariantJsonResponse>
  toJSON: () => ProductVariantJsonResponse
  parseResult: (model: IProductVariantModel) => IProductVariantModel
}

export type ProductVariantModelType = IProductVariantModel & IProductVariantModelStatic
