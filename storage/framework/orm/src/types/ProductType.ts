import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ProductsTable {
  id: Generated<number>
  name: string
  description?: string
  price: number
  image_url?: string
  is_available?: boolean
  inventory_count?: number
  preparation_time: number
  allergens?: string
  nutritional_info?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ProductRead = ProductsTable

export type ProductWrite = Omit<ProductsTable, 'created_at'> & {
  created_at?: string
}

export interface ProductResponse {
  data: ProductJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ProductJsonResponse extends Omit<Selectable<ProductRead>, 'password'> {
  [key: string]: any
}

export type NewProduct = Insertable<ProductWrite>
export type ProductUpdate = Updateable<ProductWrite>

export interface IProductModelStatic {
  with: (relations: string[]) => IProductModel
  select: (params: (keyof ProductJsonResponse)[] | RawBuilder<string> | string) => IProductModel
  find: (id: number) => Promise<IProductModel | undefined>
  first: () => Promise<IProductModel | undefined>
  last: () => Promise<IProductModel | undefined>
  firstOrFail: () => Promise<IProductModel | undefined>
  all: () => Promise<IProductModel[]>
  findOrFail: (id: number) => Promise<IProductModel | undefined>
  findMany: (ids: number[]) => Promise<IProductModel[]>
  latest: (column?: keyof ProductsTable) => Promise<IProductModel | undefined>
  oldest: (column?: keyof ProductsTable) => Promise<IProductModel | undefined>
  skip: (count: number) => IProductModel
  take: (count: number) => IProductModel
  where: <V = string>(column: keyof ProductsTable, ...args: [V] | [Operator, V]) => IProductModel
  orWhere: (...conditions: [string, any][]) => IProductModel
  whereNotIn: <V = number>(column: keyof ProductsTable, values: V[]) => IProductModel
  whereBetween: <V = number>(column: keyof ProductsTable, range: [V, V]) => IProductModel
  whereRef: (column: keyof ProductsTable, ...args: string[]) => IProductModel
  when: (condition: boolean, callback: (query: IProductModel) => IProductModel) => IProductModel
  whereNull: (column: keyof ProductsTable) => IProductModel
  whereNotNull: (column: keyof ProductsTable) => IProductModel
  whereLike: (column: keyof ProductsTable, value: string) => IProductModel
  orderBy: (column: keyof ProductsTable, order: 'asc' | 'desc') => IProductModel
  orderByAsc: (column: keyof ProductsTable) => IProductModel
  orderByDesc: (column: keyof ProductsTable) => IProductModel
  groupBy: (column: keyof ProductsTable) => IProductModel
  having: <V = string>(column: keyof ProductsTable, operator: Operator, value: V) => IProductModel
  inRandomOrder: () => IProductModel
  whereColumn: (first: keyof ProductsTable, operator: Operator, second: keyof ProductsTable) => IProductModel
  max: (field: keyof ProductsTable) => Promise<number>
  min: (field: keyof ProductsTable) => Promise<number>
  avg: (field: keyof ProductsTable) => Promise<number>
  sum: (field: keyof ProductsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IProductModel[]>
  pluck: <K extends keyof IProductModel>(field: K) => Promise<IProductModel[K][]>
  chunk: (size: number, callback: (models: IProductModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IProductModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newProduct: NewProduct) => Promise<IProductModel>
  firstOrCreate: (search: Partial<ProductsTable>, values?: NewProduct) => Promise<IProductModel>
  updateOrCreate: (search: Partial<ProductsTable>, values?: NewProduct) => Promise<IProductModel>
  createMany: (newProduct: NewProduct[]) => Promise<void>
  forceCreate: (newProduct: NewProduct) => Promise<IProductModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ProductsTable, values: V[]) => IProductModel
  distinct: (column: keyof ProductJsonResponse) => IProductModel
  join: (table: string, firstCol: string, secondCol: string) => IProductModel
}

export interface IProductModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get description(): string | undefined
  set description(value: string)
  get price(): number
  set price(value: number)
  get image_url(): string | undefined
  set image_url(value: string)
  get is_available(): boolean | undefined
  set is_available(value: boolean)
  get inventory_count(): number | undefined
  set inventory_count(value: number)
  get preparation_time(): number
  set preparation_time(value: number)
  get allergens(): string | undefined
  set allergens(value: string)
  get nutritional_info(): string | undefined
  set nutritional_info(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ProductJsonResponse) => IProductModel
  create: (newProduct: NewProduct) => Promise<IProductModel>
  update: (newProduct: ProductUpdate) => Promise<IProductModel | undefined>
  forceUpdate: (newProduct: ProductUpdate) => Promise<IProductModel | undefined>
  save: () => Promise<IProductModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ProductJsonResponse>
  toJSON: () => ProductJsonResponse
  parseResult: (model: IProductModel) => IProductModel
}

export type ProductModelType = IProductModel & IProductModelStatic
