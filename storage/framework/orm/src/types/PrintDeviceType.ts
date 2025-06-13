import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { Operator } from '@stacksjs/types'

export interface PrintDevicesTable {
  id: Generated<number>
  name: string
  mac_address: string
  location: string
  terminal: string
  status: string | string[]
  last_ping: number
  print_count: number
  uuid?: string
  created_at?: string
  updated_at?: string
}

export type PrintDeviceRead = PrintDevicesTable

export type PrintDeviceWrite = Omit<PrintDevicesTable, 'created_at'> & {
  created_at?: string
}

export interface PrintDeviceResponse {
  data: PrintDeviceJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PrintDeviceJsonResponse extends Omit<Selectable<PrintDeviceRead>, 'password'> {
  [key: string]: any
}

export type NewPrintDevice = Insertable<PrintDeviceWrite>
export type PrintDeviceUpdate = Updateable<PrintDeviceWrite>

export interface IPrintDeviceModelStatic {
  with: (relations: string[]) => IPrintDeviceModel
  select: (params: (keyof PrintDeviceJsonResponse)[] | RawBuilder<string> | string) => IPrintDeviceModel
  find: (id: number) => Promise<IPrintDeviceModel | undefined>
  first: () => Promise<IPrintDeviceModel | undefined>
  last: () => Promise<IPrintDeviceModel | undefined>
  firstOrFail: () => Promise<IPrintDeviceModel | undefined>
  all: () => Promise<IPrintDeviceModel[]>
  findOrFail: (id: number) => Promise<IPrintDeviceModel | undefined>
  findMany: (ids: number[]) => Promise<IPrintDeviceModel[]>
  latest: (column?: keyof PrintDevicesTable) => Promise<IPrintDeviceModel | undefined>
  oldest: (column?: keyof PrintDevicesTable) => Promise<IPrintDeviceModel | undefined>
  skip: (count: number) => IPrintDeviceModel
  take: (count: number) => IPrintDeviceModel
  where: <V = string>(column: keyof PrintDevicesTable, ...args: [V] | [Operator, V]) => IPrintDeviceModel
  orWhere: (...conditions: [string, any][]) => IPrintDeviceModel
  whereNotIn: <V = number>(column: keyof PrintDevicesTable, values: V[]) => IPrintDeviceModel
  whereBetween: <V = number>(column: keyof PrintDevicesTable, range: [V, V]) => IPrintDeviceModel
  whereRef: (column: keyof PrintDevicesTable, ...args: string[]) => IPrintDeviceModel
  when: (condition: boolean, callback: (query: IPrintDeviceModel) => IPrintDeviceModel) => IPrintDeviceModel
  whereNull: (column: keyof PrintDevicesTable) => IPrintDeviceModel
  whereNotNull: (column: keyof PrintDevicesTable) => IPrintDeviceModel
  whereLike: (column: keyof PrintDevicesTable, value: string) => IPrintDeviceModel
  orderBy: (column: keyof PrintDevicesTable, order: 'asc' | 'desc') => IPrintDeviceModel
  orderByAsc: (column: keyof PrintDevicesTable) => IPrintDeviceModel
  orderByDesc: (column: keyof PrintDevicesTable) => IPrintDeviceModel
  groupBy: (column: keyof PrintDevicesTable) => IPrintDeviceModel
  having: <V = string>(column: keyof PrintDevicesTable, operator: Operator, value: V) => IPrintDeviceModel
  inRandomOrder: () => IPrintDeviceModel
  whereColumn: (first: keyof PrintDevicesTable, operator: Operator, second: keyof PrintDevicesTable) => IPrintDeviceModel
  max: (field: keyof PrintDevicesTable) => Promise<number>
  min: (field: keyof PrintDevicesTable) => Promise<number>
  avg: (field: keyof PrintDevicesTable) => Promise<number>
  sum: (field: keyof PrintDevicesTable) => Promise<number>
  count: () => Promise<number>
  get: () => Promise<IPrintDeviceModel[]>
  pluck: <K extends keyof IPrintDeviceModel>(field: K) => Promise<IPrintDeviceModel[K][]>
  chunk: (size: number, callback: (models: IPrintDeviceModel[]) => Promise<void>) => Promise<void>
  paginate: (options?: { limit?: number, offset?: number, page?: number }) => Promise<{
    data: IPrintDeviceModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }>
  create: (newPrintDevice: NewPrintDevice) => Promise<IPrintDeviceModel>
  firstOrCreate: (search: Partial<PrintDevicesTable>, values?: NewPrintDevice) => Promise<IPrintDeviceModel>
  updateOrCreate: (search: Partial<PrintDevicesTable>, values?: NewPrintDevice) => Promise<IPrintDeviceModel>
  createMany: (newPrintDevice: NewPrintDevice[]) => Promise<void>
  forceCreate: (newPrintDevice: NewPrintDevice) => Promise<IPrintDeviceModel>
  remove: (id: number) => Promise<any>
  whereIn: <V = number>(column: keyof PrintDevicesTable, values: V[]) => IPrintDeviceModel
  distinct: (column: keyof PrintDeviceJsonResponse) => IPrintDeviceModel
  join: (table: string, firstCol: string, secondCol: string) => IPrintDeviceModel
}

export interface IPrintDeviceModel {
  // Properties
  readonly id: number
  get name(): string
  set name(value: string)
  get mac_address(): string
  set mac_address(value: string)
  get location(): string
  set location(value: string)
  get terminal(): string
  set terminal(value: string)
  get status(): string | string[]
  set status(value: string | string[])
  get last_ping(): number
  set last_ping(value: number)
  get print_count(): number
  set print_count(value: number)
  get uuid(): string | undefined
  set uuid(value: string)
  get created_at(): string | undefined
  get updated_at(): string | undefined
  set updated_at(value: string)

  // Instance methods
  createInstance: (data: PrintDeviceJsonResponse) => IPrintDeviceModel
  create: (newPrintDevice: NewPrintDevice) => Promise<IPrintDeviceModel>
  update: (newPrintDevice: PrintDeviceUpdate) => Promise<IPrintDeviceModel | undefined>
  forceUpdate: (newPrintDevice: PrintDeviceUpdate) => Promise<IPrintDeviceModel | undefined>
  save: () => Promise<IPrintDeviceModel>
  delete: () => Promise<number>
  toSearchableObject: () => Partial<PrintDeviceJsonResponse>
  toJSON: () => PrintDeviceJsonResponse
  parseResult: (model: IPrintDeviceModel) => IPrintDeviceModel
}

export type PrintDeviceModelType = IPrintDeviceModel & IPrintDeviceModelStatic
