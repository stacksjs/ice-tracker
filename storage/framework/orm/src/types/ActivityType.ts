import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'

export interface ActivitiesTable {
  id: Generated<number>
  title?: string
  description?: string
  address?: string
  latlng?: string
  info_source?: string | string[]
  were_detained?: boolean
  uuid?: string
  created_at?: string
  updated_at?: string
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

export interface ActivityModelType {
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
  get infoSource(): string | string[] | undefined
  set infoSource(value: string | string[])
  get wereDetained(): boolean | undefined
  set wereDetained(value: boolean)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Static methods
  with: (relations: string[]) => ActivityModelType
  select: (params: (keyof ActivityJsonResponse)[] | RawBuilder<string> | string) => ActivityModelType
  find: (id: number) => Promise<ActivityModelType | undefined>
  first: () => Promise<ActivityModelType | undefined>
  last: () => Promise<ActivityModelType | undefined>
  firstOrFail: () => Promise<ActivityModelType | undefined>
  all: () => Promise<ActivityModelType[]>
  findOrFail: (id: number) => Promise<ActivityModelType | undefined>
  findMany: (ids: number[]) => Promise<ActivityModelType[]>
  latest: (column?: keyof ActivitiesTable) => Promise<ActivityModelType | undefined>
  oldest: (column?: keyof ActivitiesTable) => Promise<ActivityModelType | undefined>
  skip: (count: number) => ActivityModelType
  take: (count: number) => ActivityModelType
  where: <V = string>(column: keyof ActivitiesTable, ...args: [V] | [Operator, V]) => ActivityModelType
  orWhere: (...conditions: [string, any][]) => ActivityModelType
  whereNotIn: <V = number>(column: keyof ActivitiesTable, values: V[]) => ActivityModelType
  whereBetween: <V = number>(column: keyof ActivitiesTable, range: [V, V]) => ActivityModelType
  whereRef: (column: keyof ActivitiesTable, ...args: string[]) => ActivityModelType
  when: (condition: boolean, callback: (query: ActivityModelType) => ActivityModelType) => ActivityModelType
  whereNull: (column: keyof ActivitiesTable) => ActivityModelType
  whereNotNull: (column: keyof ActivitiesTable) => ActivityModelType
  whereLike: (column: keyof ActivitiesTable, value: string) => ActivityModelType
  orderBy: (column: keyof ActivitiesTable, order: 'asc' | 'desc') => ActivityModelType
  orderByAsc: (column: keyof ActivitiesTable) => ActivityModelType
  orderByDesc: (column: keyof ActivitiesTable) => ActivityModelType
  groupBy: (column: keyof ActivitiesTable) => ActivityModelType
  having: <V = string>(column: keyof ActivitiesTable, operator: Operator, value: V) => ActivityModelType
  inRandomOrder: () => ActivityModelType
  whereColumn: (first: keyof ActivitiesTable, operator: Operator, second: keyof ActivitiesTable) => ActivityModelType
  max: (field: keyof ActivitiesTable) => Promise<number>
  min: (field: keyof ActivitiesTable) => Promise<number>
  avg: (field: keyof ActivitiesTable) => Promise<number>
  sum: (field: keyof ActivitiesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<ActivityModelType[]>
  pluck: <K extends keyof ActivityModelType>(field: K) => Promise<ActivityModelType[K][]>
  chunk: (size: number, callback: (models: ActivityModelType[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: ActivityModelType[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newActivity: NewActivity) => Promise<ActivityModelType>
  firstOrCreate: (search: Partial<ActivitiesTable>, values?: NewActivity) => Promise<ActivityModelType>
  updateOrCreate: (search: Partial<ActivitiesTable>, values?: NewActivity) => Promise<ActivityModelType>
  createMany: (newActivity: NewActivity[]) => Promise<void>
  forceCreate: (newActivity: NewActivity) => Promise<ActivityModelType>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof ActivitiesTable, values: V[]) => ActivityModelType
  distinct: (column: keyof ActivityJsonResponse) => ActivityModelType
  join: (table: string, firstCol: string, secondCol: string) => ActivityModelType

  // Instance methods
  createInstance: (data: ActivityJsonResponse) => ActivityModelType
  update: (newActivity: ActivityUpdate) => Promise<ActivityModelType | undefined>
  forceUpdate: (newActivity: ActivityUpdate) => Promise<ActivityModelType | undefined>
  save: () => Promise<ActivityModelType>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<ActivityJsonResponse>
  toJSON: () => ActivityJsonResponse
  parseResult: (model: ActivityModelType) => ActivityModelType
}
