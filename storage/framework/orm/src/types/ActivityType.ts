import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface ActivitiesTable {
  id: Generated<number>
  title?: string
  description?: string
  address?: string
  latlng?: string
  info_source?: string | string[]
  were_detained?: boolean
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export type ActivityRead = ActivitiesTable

export type ActivityWrite = Omit<ActivitiesTable, 'created_at'> & {
  created_at?: string
}

export interface ActivityResponse {
  data: ActivityJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ActivityJsonResponse extends Omit<Selectable<ActivityRead>, 'password'> {
  [key: string]: any
}

export type NewActivity = Insertable<ActivityWrite>
export type ActivityUpdate = Updateable<ActivityWrite>

export interface IActivityModelStatic {
  with: (relations: string[]) => IActivityModel
  select: (params: (keyof ActivityJsonResponse)[] | RawBuilder<string> | string) => IActivityModel
  find: (id: number) => Promise<IActivityModel | undefined>
  first: () => Promise<IActivityModel | undefined>
  last: () => Promise<IActivityModel | undefined>
  firstOrFail: () => Promise<IActivityModel | undefined>
  all: () => Promise<IActivityModel[]>
  findOrFail: (id: number) => Promise<IActivityModel | undefined>
  findMany: (ids: number[]) => Promise<IActivityModel[]>
  latest: (column?: keyof ActivitiesTable) => Promise<IActivityModel | undefined>
  oldest: (column?: keyof ActivitiesTable) => Promise<IActivityModel | undefined>
  skip: (count: number) => IActivityModel
  take: (count: number) => IActivityModel
  where: <V = string>(column: keyof ActivitiesTable, ...args: [V] | [Operator, V]) => IActivityModel
  orWhere: (...conditions: [string, any][]) => IActivityModel
  whereNotIn: <V = number>(column: keyof ActivitiesTable, values: V[]) => IActivityModel
  whereBetween: <V = number>(column: keyof ActivitiesTable, range: [V, V]) => IActivityModel
  whereRef: (column: keyof ActivitiesTable, ...args: string[]) => IActivityModel
  when: (condition: boolean, callback: (query: IActivityModel) => IActivityModel) => IActivityModel
  whereNull: (column: keyof ActivitiesTable) => IActivityModel
  whereNotNull: (column: keyof ActivitiesTable) => IActivityModel
  whereLike: (column: keyof ActivitiesTable, value: string) => IActivityModel
  orderBy: (column: keyof ActivitiesTable, order: 'asc' | 'desc') => IActivityModel
  orderByAsc: (column: keyof ActivitiesTable) => IActivityModel
  orderByDesc: (column: keyof ActivitiesTable) => IActivityModel
  groupBy: (column: keyof ActivitiesTable) => IActivityModel
  having: <V = string>(column: keyof ActivitiesTable, operator: Operator, value: V) => IActivityModel
  inRandomOrder: () => IActivityModel
  whereColumn: (first: keyof ActivitiesTable, operator: Operator, second: keyof ActivitiesTable) => IActivityModel
  max: (field: keyof ActivitiesTable) => Promise<number>
  min: (field: keyof ActivitiesTable) => Promise<number>
  avg: (field: keyof ActivitiesTable) => Promise<number>
  sum: (field: keyof ActivitiesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IActivityModel[]>
  pluck: <K extends keyof IActivityModel>(field: K) => Promise<IActivityModel[K][]>
  chunk: (size: number, callback: (models: IActivityModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IActivityModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newActivity: NewActivity) => Promise<IActivityModel>
  firstOrCreate: (search: Partial<ActivitiesTable>, values?: NewActivity) => Promise<IActivityModel>
  updateOrCreate: (search: Partial<ActivitiesTable>, values?: NewActivity) => Promise<IActivityModel>
  createMany: (newActivity: NewActivity[]) => Promise<void>
  forceCreate: (newActivity: NewActivity) => Promise<IActivityModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ActivitiesTable, values: V[]) => IActivityModel
  distinct: (column: keyof ActivityJsonResponse) => IActivityModel
  join: (table: string, firstCol: string, secondCol: string) => IActivityModel
}

export interface IActivityModel {
  // Properties
  readonly id: number
  get title(): string | undefined
  set title(value: string)
  get description(): string | undefined
  set description(value: string)
  get address(): string | undefined
  set address(value: string)
  get latlng(): string | undefined
  set latlng(value: string)
  get info_source(): string | string[] | undefined
  set info_source(value: string | string[])
  get were_detained(): boolean | undefined
  set were_detained(value: boolean)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: ActivityJsonResponse) => IActivityModel
  create: (newActivity: NewActivity) => Promise<IActivityModel>
  update: (newActivity: ActivityUpdate) => Promise<IActivityModel | undefined>
  forceUpdate: (newActivity: ActivityUpdate) => Promise<IActivityModel | undefined>
  save: () => Promise<IActivityModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ActivityJsonResponse>
  toJSON: () => ActivityJsonResponse
  parseResult: (model: IActivityModel) => IActivityModel
}

export type ActivityModelType = IActivityModel & IActivityModelStatic
