import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ProductItemsTable {
  id: Generated<number>
  name: string
  size?: string
  color?: string
  price: number
  image_url?: string
  is_available?: boolean
  inventory_count?: number
  sku: string
  custom_options?: string
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ProductItemRead = ProductItemsTable

export type ProductItemWrite = Omit<ProductItemsTable, 'created_at'> & {
  created_at?: string
}

export interface ProductItemResponse {
  data: ProductItemJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ProductItemJsonResponse extends Omit<Selectable<ProductItemRead>, 'password'> {
  [key: string]: any
}

export type NewProductItem = Insertable<ProductItemWrite>
export type ProductItemUpdate = Updateable<ProductItemWrite>

export interface IProductItemModelStatic {
  with: (relations: string[]) => IProductItemModel
  select: (params: (keyof ProductItemJsonResponse)[] | RawBuilder<string> | string) => IProductItemModel
  find: (id: number) => Promise<IProductItemModel | undefined>
  first: () => Promise<IProductItemModel | undefined>
  last: () => Promise<IProductItemModel | undefined>
  firstOrFail: () => Promise<IProductItemModel | undefined>
  all: () => Promise<IProductItemModel[]>
  findOrFail: (id: number) => Promise<IProductItemModel | undefined>
  findMany: (ids: number[]) => Promise<IProductItemModel[]>
  latest: (column?: keyof ProductItemsTable) => Promise<IProductItemModel | undefined>
  oldest: (column?: keyof ProductItemsTable) => Promise<IProductItemModel | undefined>
  skip: (count: number) => IProductItemModel
  take: (count: number) => IProductItemModel
  where: <V = string>(column: keyof ProductItemsTable, ...args: [V] | [Operator, V]) => IProductItemModel
  orWhere: (...conditions: [string, any][]) => IProductItemModel
  whereNotIn: <V = number>(column: keyof ProductItemsTable, values: V[]) => IProductItemModel
  whereBetween: <V = number>(column: keyof ProductItemsTable, range: [V, V]) => IProductItemModel
  whereRef: (column: keyof ProductItemsTable, ...args: string[]) => IProductItemModel
  when: (condition: boolean, callback: (query: IProductItemModel) => IProductItemModel) => IProductItemModel
  whereNull: (column: keyof ProductItemsTable) => IProductItemModel
  whereNotNull: (column: keyof ProductItemsTable) => IProductItemModel
  whereLike: (column: keyof ProductItemsTable, value: string) => IProductItemModel
  orderBy: (column: keyof ProductItemsTable, order: 'asc' | 'desc') => IProductItemModel
  orderByAsc: (column: keyof ProductItemsTable) => IProductItemModel
  orderByDesc: (column: keyof ProductItemsTable) => IProductItemModel
  groupBy: (column: keyof ProductItemsTable) => IProductItemModel
  having: <V = string>(column: keyof ProductItemsTable, operator: Operator, value: V) => IProductItemModel
  inRandomOrder: () => IProductItemModel
  whereColumn: (first: keyof ProductItemsTable, operator: Operator, second: keyof ProductItemsTable) => IProductItemModel
  max: (field: keyof ProductItemsTable) => Promise<number>
  min: (field: keyof ProductItemsTable) => Promise<number>
  avg: (field: keyof ProductItemsTable) => Promise<number>
  sum: (field: keyof ProductItemsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IProductItemModel[]>
  pluck: <K extends keyof IProductItemModel>(field: K) => Promise<IProductItemModel[K][]>
  chunk: (size: number, callback: (models: IProductItemModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IProductItemModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newProductItem: NewProductItem) => Promise<IProductItemModel>
  firstOrCreate: (search: Partial<ProductItemsTable>, values?: NewProductItem) => Promise<IProductItemModel>
  updateOrCreate: (search: Partial<ProductItemsTable>, values?: NewProductItem) => Promise<IProductItemModel>
  createMany: (newProductItem: NewProductItem[]) => Promise<void>
  forceCreate: (newProductItem: NewProductItem) => Promise<IProductItemModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ProductItemsTable, values: V[]) => IProductItemModel
  distinct: (column: keyof ProductItemJsonResponse) => IProductItemModel
  join: (table: string, firstCol: string, secondCol: string) => IProductItemModel
}

export interface IProductItemModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get size(): string | undefined
  set size(value: string)
  get color(): string | undefined
  set color(value: string)
  get price(): number
  set price(value: number)
  get image_url(): string | undefined
  set image_url(value: string)
  get is_available(): boolean | undefined
  set is_available(value: boolean)
  get inventory_count(): number | undefined
  set inventory_count(value: number)
  get sku(): string
  set sku(value: string)
  get custom_options(): string | undefined
  set custom_options(value: string)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ProductItemJsonResponse) => IProductItemModel
  create: (newProductItem: NewProductItem) => Promise<IProductItemModel>
  update: (newProductItem: ProductItemUpdate) => Promise<IProductItemModel | undefined>
  forceUpdate: (newProductItem: ProductItemUpdate) => Promise<IProductItemModel | undefined>
  save: () => Promise<IProductItemModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ProductItemJsonResponse>
  toJSON: () => ProductItemJsonResponse
  parseResult: (model: IProductItemModel) => IProductItemModel
}

export type ProductItemModelType = IProductItemModel & IProductItemModelStatic
