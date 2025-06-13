import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface ProductUnitsTable {
  id: Generated<number>
  name: string
  abbreviation: string
  type: string
  description?: string
  is_default?: boolean
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type ProductUnitRead = ProductUnitsTable

export type ProductUnitWrite = Omit<ProductUnitsTable, 'created_at'> & {
  created_at?: string
}

export interface ProductUnitResponse {
  data: ProductUnitJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ProductUnitJsonResponse extends Omit<Selectable<ProductUnitRead>, 'password'> {
  [key: string]: any
}

export type NewProductUnit = Insertable<ProductUnitWrite>
export type ProductUnitUpdate = Updateable<ProductUnitWrite>

export interface IProductUnitModelStatic {
  with: (relations: string[]) => IProductUnitModel
  select: (params: (keyof ProductUnitJsonResponse)[] | RawBuilder<string> | string) => IProductUnitModel
  find: (id: number) => Promise<IProductUnitModel | undefined>
  first: () => Promise<IProductUnitModel | undefined>
  last: () => Promise<IProductUnitModel | undefined>
  firstOrFail: () => Promise<IProductUnitModel | undefined>
  all: () => Promise<IProductUnitModel[]>
  findOrFail: (id: number) => Promise<IProductUnitModel | undefined>
  findMany: (ids: number[]) => Promise<IProductUnitModel[]>
  latest: (column?: keyof ProductUnitsTable) => Promise<IProductUnitModel | undefined>
  oldest: (column?: keyof ProductUnitsTable) => Promise<IProductUnitModel | undefined>
  skip: (count: number) => IProductUnitModel
  take: (count: number) => IProductUnitModel
  where: <V = string>(column: keyof ProductUnitsTable, ...args: [V] | [Operator, V]) => IProductUnitModel
  orWhere: (...conditions: [string, any][]) => IProductUnitModel
  whereNotIn: <V = number>(column: keyof ProductUnitsTable, values: V[]) => IProductUnitModel
  whereBetween: <V = number>(column: keyof ProductUnitsTable, range: [V, V]) => IProductUnitModel
  whereRef: (column: keyof ProductUnitsTable, ...args: string[]) => IProductUnitModel
  when: (condition: boolean, callback: (query: IProductUnitModel) => IProductUnitModel) => IProductUnitModel
  whereNull: (column: keyof ProductUnitsTable) => IProductUnitModel
  whereNotNull: (column: keyof ProductUnitsTable) => IProductUnitModel
  whereLike: (column: keyof ProductUnitsTable, value: string) => IProductUnitModel
  orderBy: (column: keyof ProductUnitsTable, order: 'asc' | 'desc') => IProductUnitModel
  orderByAsc: (column: keyof ProductUnitsTable) => IProductUnitModel
  orderByDesc: (column: keyof ProductUnitsTable) => IProductUnitModel
  groupBy: (column: keyof ProductUnitsTable) => IProductUnitModel
  having: <V = string>(column: keyof ProductUnitsTable, operator: Operator, value: V) => IProductUnitModel
  inRandomOrder: () => IProductUnitModel
  whereColumn: (first: keyof ProductUnitsTable, operator: Operator, second: keyof ProductUnitsTable) => IProductUnitModel
  max: (field: keyof ProductUnitsTable) => Promise<number>
  min: (field: keyof ProductUnitsTable) => Promise<number>
  avg: (field: keyof ProductUnitsTable) => Promise<number>
  sum: (field: keyof ProductUnitsTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IProductUnitModel[]>
  pluck: <K extends keyof IProductUnitModel>(field: K) => Promise<IProductUnitModel[K][]>
  chunk: (size: number, callback: (models: IProductUnitModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IProductUnitModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newProductUnit: NewProductUnit) => Promise<IProductUnitModel>
  firstOrCreate: (search: Partial<ProductUnitsTable>, values?: NewProductUnit) => Promise<IProductUnitModel>
  updateOrCreate: (search: Partial<ProductUnitsTable>, values?: NewProductUnit) => Promise<IProductUnitModel>
  createMany: (newProductUnit: NewProductUnit[]) => Promise<void>
  forceCreate: (newProductUnit: NewProductUnit) => Promise<IProductUnitModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ProductUnitsTable, values: V[]) => IProductUnitModel
  distinct: (column: keyof ProductUnitJsonResponse) => IProductUnitModel
  join: (table: string, firstCol: string, secondCol: string) => IProductUnitModel
}

export interface IProductUnitModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get abbreviation(): string
  set abbreviation(value: string)
  get type(): string
  set type(value: string)
  get description(): string | undefined
  set description(value: string)
  get is_default(): boolean | undefined
  set is_default(value: boolean)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ProductUnitJsonResponse) => IProductUnitModel
  create: (newProductUnit: NewProductUnit) => Promise<IProductUnitModel>
  update: (newProductUnit: ProductUnitUpdate) => Promise<IProductUnitModel | undefined>
  forceUpdate: (newProductUnit: ProductUnitUpdate) => Promise<IProductUnitModel | undefined>
  save: () => Promise<IProductUnitModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ProductUnitJsonResponse>
  toJSON: () => ProductUnitJsonResponse
  parseResult: (model: IProductUnitModel) => IProductUnitModel
}

export type ProductUnitModelType = IProductUnitModel & IProductUnitModelStatic
