import type { Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import { cache } from '@stacksjs/cache'
import { sql } from '@stacksjs/database'
import { HttpError, ModelNotFoundException } from '@stacksjs/error-handling'
import { dispatch } from '@stacksjs/events'
import { DB, SubqueryBuilder } from '@stacksjs/orm'

export interface FailedJobsTable {
  id?: number
  connection?: string
  queue?: string
  payload?: string
  exception?: string
  failed_at?: Date | string

  created_at?: Date

  updated_at?: Date

}

interface FailedJobResponse {
  data: FailedJobJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface FailedJobJsonResponse extends Omit<FailedJobsTable, 'password'> {
  [key: string]: any
}

export type FailedJobType = Selectable<FailedJobsTable>
export type NewFailedJob = Partial<Insertable<FailedJobsTable>>
export type FailedJobUpdate = Updateable<FailedJobsTable>

      type SortDirection = 'asc' | 'desc'
interface SortOptions { column: FailedJobType, order: SortDirection }
// Define a type for the options parameter
interface QueryOptions {
  sort?: SortOptions
  limit?: number
  offset?: number
  page?: number
}

export class FailedJobModel {
  private readonly hidden: Array<keyof FailedJobJsonResponse> = []
  private readonly fillable: Array<keyof FailedJobJsonResponse> = ['connection', 'queue', 'payload', 'exception', 'failed_at', 'uuid']
  private readonly guarded: Array<keyof FailedJobJsonResponse> = []
  protected attributes: Partial<FailedJobType> = {}
  protected originalAttributes: Partial<FailedJobType> = {}

  protected selectFromQuery: any
  protected withRelations: string[]
  protected updateFromQuery: any
  protected deleteFromQuery: any
  protected hasSelect: boolean
  private hasSaved: boolean
  private customColumns: Record<string, unknown> = {}

  constructor(failedjob: Partial<FailedJobType> | null) {
    if (failedjob) {
      this.attributes = { ...failedjob }
      this.originalAttributes = { ...failedjob }

      Object.keys(failedjob).forEach((key) => {
        if (!(key in this)) {
          this.customColumns[key] = (failedjob as FailedJobJsonResponse)[key]
        }
      })
    }

    this.withRelations = []
    this.selectFromQuery = DB.instance.selectFrom('failed_jobs')
    this.updateFromQuery = DB.instance.updateTable('failed_jobs')
    this.deleteFromQuery = DB.instance.deleteFrom('failed_jobs')
    this.hasSelect = false
    this.hasSaved = false
  }

  get id(): number | undefined {
    return this.attributes.id
  }

  get connection(): string | undefined {
    return this.attributes.connection
  }

  get queue(): string | undefined {
    return this.attributes.queue
  }

  get payload(): string | undefined {
    return this.attributes.payload
  }

  get exception(): string | undefined {
    return this.attributes.exception
  }

  get failed_at(): Date | string | undefined {
    return this.attributes.failed_at
  }

  get created_at(): Date | undefined {
    return this.attributes.created_at
  }

  get updated_at(): Date | undefined {
    return this.attributes.updated_at
  }

  set connection(value: string) {
    this.attributes.connection = value
  }

  set queue(value: string) {
    this.attributes.queue = value
  }

  set payload(value: string) {
    this.attributes.payload = value
  }

  set exception(value: string) {
    this.attributes.exception = value
  }

  set failed_at(value: Date | string) {
    this.attributes.failed_at = value
  }

  set updated_at(value: Date) {
    this.attributes.updated_at = value
  }

  getOriginal(column?: keyof FailedJobType): Partial<FailedJobType> | any {
    if (column) {
      return this.originalAttributes[column]
    }

    return this.originalAttributes
  }

  getChanges(): Partial<FailedJobJsonResponse> {
    return this.fillable.reduce<Partial<FailedJobJsonResponse>>((changes, key) => {
      const currentValue = this.attributes[key as keyof FailedJobsTable]
      const originalValue = this.originalAttributes[key as keyof FailedJobsTable]

      if (currentValue !== originalValue) {
        changes[key] = currentValue
      }

      return changes
    }, {})
  }

  isDirty(column?: keyof FailedJobType): boolean {
    if (column) {
      return this.attributes[column] !== this.originalAttributes[column]
    }

    return Object.entries(this.originalAttributes).some(([key, originalValue]) => {
      const currentValue = (this.attributes as any)[key]

      return currentValue !== originalValue
    })
  }

  isClean(column?: keyof FailedJobType): boolean {
    return !this.isDirty(column)
  }

  wasChanged(column?: keyof FailedJobType): boolean {
    return this.hasSaved && this.isDirty(column)
  }

  select(params: (keyof FailedJobType)[] | RawBuilder<string> | string): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.select(params)

    this.hasSelect = true

    return this
  }

  static select(params: (keyof FailedJobType)[] | RawBuilder<string> | string): FailedJobModel {
    const instance = new FailedJobModel(null)

    // Initialize a query with the table name and selected fields
    instance.selectFromQuery = instance.selectFromQuery.select(params)

    instance.hasSelect = true

    return instance
  }

  async applyFind(id: number): Promise<FailedJobModel | undefined> {
    const model = await DB.instance.selectFrom('failed_jobs').where('id', '=', id).selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new FailedJobModel(result as FailedJobType)

    cache.getOrSet(`failedjob:${id}`, JSON.stringify(model))

    return data
  }

  async find(id: number): Promise<FailedJobModel | undefined> {
    return await this.applyFind(id)
  }

  // Method to find a FailedJob by ID
  static async find(id: number): Promise<FailedJobModel | undefined> {
    const instance = new FailedJobModel(null)

    return await instance.applyFind(id)
  }

  async first(): Promise<FailedJobModel | undefined> {
    return await FailedJobModel.first()
  }

  static async first(): Promise<FailedJobModel | undefined> {
    const model = await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new FailedJobModel(null)

    const result = await instance.mapWith(model)

    const data = new FailedJobModel(result as FailedJobType)

    return data
  }

  async firstOrFail(): Promise<FailedJobModel | undefined> {
    return await FailedJobModel.firstOrFail()
  }

  static async firstOrFail(): Promise<FailedJobModel | undefined> {
    const instance = new FailedJobModel(null)

    const model = await instance.selectFromQuery.executeTakeFirst()

    if (model === undefined)
      throw new ModelNotFoundException(404, 'No FailedJobModel results found for query')

    const result = await instance.mapWith(model)

    const data = new FailedJobModel(result as FailedJobType)

    return data
  }

  async mapWith(model: FailedJobType): Promise<FailedJobType> {
    return model
  }

  static async all(): Promise<FailedJobModel[]> {
    const models = await DB.instance.selectFrom('failed_jobs').selectAll().execute()

    const data = await Promise.all(models.map(async (model: FailedJobType) => {
      const instance = new FailedJobModel(model)

      const results = await instance.mapWith(model)

      return new FailedJobModel(results)
    }))

    return data
  }

  async findOrFail(id: number): Promise<FailedJobModel> {
    return await FailedJobModel.findOrFail(id)
  }

  static async findOrFail(id: number): Promise<FailedJobModel> {
    const model = await DB.instance.selectFrom('failed_jobs').where('id', '=', id).selectAll().executeTakeFirst()

    const instance = new FailedJobModel(null)

    if (model === undefined)
      throw new ModelNotFoundException(404, `No FailedJobModel results for ${id}`)

    cache.getOrSet(`failedjob:${id}`, JSON.stringify(model))

    const result = await instance.mapWith(model)

    const data = new FailedJobModel(result as FailedJobType)

    return data
  }

  static async findMany(ids: number[]): Promise<FailedJobModel[]> {
    let query = DB.instance.selectFrom('failed_jobs').where('id', 'in', ids)

    const instance = new FailedJobModel(null)

    query = query.selectAll()

    const model = await query.execute()

    return model.map((modelItem: FailedJobModel) => instance.parseResult(new FailedJobModel(modelItem)))
  }

  skip(count: number): FailedJobModel {
    return FailedJobModel.skip(count)
  }

  static skip(count: number): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.offset(count)

    return instance
  }

  async chunk(size: number, callback: (models: FailedJobModel[]) => Promise<void>): Promise<void> {
    await FailedJobModel.chunk(size, callback)
  }

  static async chunk(size: number, callback: (models: FailedJobModel[]) => Promise<void>): Promise<void> {
    let page = 1
    let hasMore = true

    while (hasMore) {
      const instance = new FailedJobModel(null)

      // Get one batch
      const models = await instance.selectFromQuery
        .limit(size)
        .offset((page - 1) * size)
        .execute()

      // If we got fewer results than chunk size, this is the last batch
      if (models.length < size) {
        hasMore = false
      }

      // Process this batch
      if (models.length > 0) {
        await callback(models)
      }

      page++
    }
  }

  take(count: number): FailedJobModel {
    return FailedJobModel.take(count)
  }

  static take(count: number): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.limit(count)

    return instance
  }

  static async pluck<K extends keyof FailedJobModel>(field: K): Promise<FailedJobModel[K][]> {
    const instance = new FailedJobModel(null)

    if (instance.hasSelect) {
      const model = await instance.selectFromQuery.execute()
      return model.map((modelItem: FailedJobModel) => modelItem[field])
    }

    const model = await instance.selectFromQuery.selectAll().execute()

    return model.map((modelItem: FailedJobModel) => modelItem[field])
  }

  async pluck<K extends keyof FailedJobModel>(field: K): Promise<FailedJobModel[K][]> {
    return FailedJobModel.pluck(field)
  }

  static async count(): Promise<number> {
    const instance = new FailedJobModel(null)

    const result = await instance.selectFromQuery
      .select(sql`COUNT(*) as count`)
      .executeTakeFirst()

    return result.count || 0
  }

  async count(): Promise<number> {
    const result = await this.selectFromQuery
      .select(sql`COUNT(*) as count`)
      .executeTakeFirst()

    return result.count || 0
  }

  async max(field: keyof FailedJobModel): Promise<number> {
    return await this.selectFromQuery
      .select(sql`MAX(${sql.raw(field as string)}) `)
      .executeTakeFirst()
  }

  async min(field: keyof FailedJobModel): Promise<number> {
    return await this.selectFromQuery
      .select(sql`MIN(${sql.raw(field as string)}) `)
      .executeTakeFirst()
  }

  async avg(field: keyof FailedJobModel): Promise<number> {
    return this.selectFromQuery
      .select(sql`AVG(${sql.raw(field as string)})`)
      .executeTakeFirst()
  }

  async sum(field: keyof FailedJobModel): Promise<number> {
    return this.selectFromQuery
      .select(sql`SUM(${sql.raw(field as string)})`)
      .executeTakeFirst()
  }

  async applyGet(): Promise<FailedJobModel[]> {
    let models

    if (this.hasSelect) {
      models = await this.selectFromQuery.execute()
    }
    else {
      models = await this.selectFromQuery.selectAll().execute()
    }

    const data = await Promise.all(models.map(async (model: FailedJobModel) => {
      const instance = new FailedJobModel(model)

      const results = await instance.mapWith(model)

      return new FailedJobModel(results)
    }))

    return data
  }

  async get(): Promise<FailedJobModel[]> {
    return await this.applyGet()
  }

  static async get(): Promise<FailedJobModel[]> {
    const instance = new FailedJobModel(null)

    return await instance.applyGet()
  }

  has(relation: string): FailedJobModel {
    return FailedJobModel.has(relation)
  }

  static has(relation: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(({ exists, selectFrom }: any) =>
      exists(
        selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.failedjob_id`, '=', 'failed_jobs.id'),
      ),
    )

    return instance
  }

  static whereExists(callback: (qb: any) => any): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(({ exists, selectFrom }: any) =>
      exists(callback({ exists, selectFrom })),
    )

    return instance
  }

  whereHas(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): FailedJobModel {
    return FailedJobModel.whereHas(relation, callback)
  }

  static whereHas(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): FailedJobModel {
    const instance = new FailedJobModel(null)
    const subqueryBuilder = new SubqueryBuilder()

    callback(subqueryBuilder)
    const conditions = subqueryBuilder.getConditions()

    instance.selectFromQuery = instance.selectFromQuery
      .where(({ exists, selectFrom }: any) => {
        let subquery = selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.failedjob_id`, '=', 'failed_jobs.id')

        conditions.forEach((condition) => {
          switch (condition.method) {
            case 'where':
              if (condition.type === 'and') {
                subquery = subquery.where(condition.column, condition.operator!, condition.value)
              }
              else {
                subquery = subquery.orWhere(condition.column, condition.operator!, condition.value)
              }
              break

            case 'whereIn':
              if (condition.operator === 'not') {
                subquery = subquery.whereNotIn(condition.column, condition.values!)
              }
              else {
                subquery = subquery.whereIn(condition.column, condition.values!)
              }

              break

            case 'whereNull':
              subquery = subquery.whereNull(condition.column)
              break

            case 'whereNotNull':
              subquery = subquery.whereNotNull(condition.column)
              break

            case 'whereBetween':
              subquery = subquery.whereBetween(condition.column, condition.values!)
              break

            case 'whereExists': {
              const nestedBuilder = new SubqueryBuilder()
              condition.callback!(nestedBuilder)
              break
            }
          }
        })

        return exists(subquery)
      })

    return instance
  }

  applyDoesntHave(relation: string): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.where(({ not, exists, selectFrom }: any) =>
      not(
        exists(
          selectFrom(relation)
            .select('1')
            .whereRef(`${relation}.failedjob_id`, '=', 'failed_jobs.id'),
        ),
      ),
    )

    return this
  }

  doesntHave(relation: string): FailedJobModel {
    return this.applyDoesntHave(relation)
  }

  static doesntHave(relation: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    return instance.doesntHave(relation)
  }

  applyWhereDoesntHave(relation: string, callback: (query: SubqueryBuilder) => void): FailedJobModel {
    const subqueryBuilder = new SubqueryBuilder()

    callback(subqueryBuilder)
    const conditions = subqueryBuilder.getConditions()

    this.selectFromQuery = this.selectFromQuery
      .where(({ exists, selectFrom, not }: any) => {
        let subquery = selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.failedjob_id`, '=', 'failed_jobs.id')

        conditions.forEach((condition) => {
          switch (condition.method) {
            case 'where':
              if (condition.type === 'and') {
                subquery = subquery.where(condition.column, condition.operator!, condition.value)
              }
              else {
                subquery = subquery.orWhere(condition.column, condition.operator!, condition.value)
              }
              break

            case 'whereIn':
              if (condition.operator === 'not') {
                subquery = subquery.whereNotIn(condition.column, condition.values!)
              }
              else {
                subquery = subquery.whereIn(condition.column, condition.values!)
              }

              break

            case 'whereNull':
              subquery = subquery.whereNull(condition.column)
              break

            case 'whereNotNull':
              subquery = subquery.whereNotNull(condition.column)
              break

            case 'whereBetween':
              subquery = subquery.whereBetween(condition.column, condition.values!)
              break

            case 'whereExists': {
              const nestedBuilder = new SubqueryBuilder()
              condition.callback!(nestedBuilder)
              break
            }
          }
        })

        return not(exists(subquery))
      })

    return this
  }

  whereDoesntHave(relation: string, callback: (query: SubqueryBuilder) => void): FailedJobModel {
    return this.applyWhereDoesntHave(relation, callback)
  }

  static whereDoesntHave(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): FailedJobModel {
    const instance = new FailedJobModel(null)

    return instance.applyWhereDoesntHave(relation, callback)
  }

  async applyPaginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<FailedJobResponse> {
    const totalRecordsResult = await DB.instance.selectFrom('failed_jobs')
      .select(DB.instance.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    const failed_jobsWithExtra = await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .orderBy('id', 'asc') // Assuming 'id' is used for cursor-based pagination
      .limit((options.limit ?? 10) + 1) // Fetch one extra record
      .offset(((options.page ?? 1) - 1) * (options.limit ?? 10)) // Ensure options.page is not undefined
      .execute()

    let nextCursor = null
    if (failed_jobsWithExtra.length > (options.limit ?? 10))
      nextCursor = failed_jobsWithExtra.pop()?.id ?? null

    return {
      data: failed_jobsWithExtra,
      paging: {
        total_records: totalRecords,
        page: options.page || 1,
        total_pages: totalPages,
      },
      next_cursor: nextCursor,
    }
  }

  async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<FailedJobResponse> {
    return await this.applyPaginate(options)
  }

  // Method to get all failed_jobs
  static async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<FailedJobResponse> {
    const instance = new FailedJobModel(null)

    return await instance.applyPaginate(options)
  }

  static async create(newFailedJob: NewFailedJob): Promise<FailedJobModel> {
    const instance = new FailedJobModel(null)

    const filteredValues = Object.fromEntries(
      Object.entries(newFailedJob).filter(([key]) =>
        !instance.guarded.includes(key) && instance.fillable.includes(key),
      ),
    ) as NewFailedJob

    const result = await DB.instance.insertInto('failed_jobs')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await instance.find(Number(result.numInsertedOrUpdatedRows)) as FailedJobModel

    if (model)
      dispatch('failedjob:created', model)

    return model
  }

  static async createMany(newFailedJob: NewFailedJob[]): Promise<void> {
    const instance = new FailedJobModel(null)

    const valuesFiltered = newFailedJob.map((newFailedJob: NewFailedJob) => {
      const filteredValues = Object.fromEntries(
        Object.entries(newFailedJob).filter(([key]) =>
          !instance.guarded.includes(key) && instance.fillable.includes(key),
        ),
      ) as NewFailedJob

      return filteredValues
    })

    await DB.instance.insertInto('failed_jobs')
      .values(valuesFiltered)
      .executeTakeFirst()
  }

  static async forceCreate(newFailedJob: NewFailedJob): Promise<FailedJobModel> {
    const result = await DB.instance.insertInto('failed_jobs')
      .values(newFailedJob)
      .executeTakeFirst()

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as FailedJobModel

    return model
  }

  // Method to remove a FailedJob
  static async remove(id: number): Promise<any> {
    return await DB.instance.deleteFrom('failed_jobs')
      .where('id', '=', id)
      .execute()
  }

  applyWhere(instance: FailedJobModel, column: string, ...args: any[]): FailedJobModel {
    const [operatorOrValue, value] = args
    const operator = value === undefined ? '=' : operatorOrValue
    const actualValue = value === undefined ? operatorOrValue : value

    instance.selectFromQuery = instance.selectFromQuery.where(column, operator, actualValue)
    instance.updateFromQuery = instance.updateFromQuery.where(column, operator, actualValue)
    instance.deleteFromQuery = instance.deleteFromQuery.where(column, operator, actualValue)

    return instance
  }

  where(column: string, ...args: any[]): FailedJobModel {
    return this.applyWhere(this, column, ...args)
  }

  static where(column: string, ...args: any[]): FailedJobModel {
    const instance = new FailedJobModel(null)

    return instance.applyWhere(instance, column, ...args)
  }

  whereColumn(first: string, operator: string, second: string): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.whereRef(first, operator, second)

    return this
  }

  static whereColumn(first: string, operator: string, second: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.whereRef(first, operator, second)

    return instance
  }

  whereRef(column: string, ...args: string[]): FailedJobModel {
    const [operatorOrValue, value] = args
    const operator = value === undefined ? '=' : operatorOrValue
    const actualValue = value === undefined ? operatorOrValue : value

    const instance = new FailedJobModel(null)
    instance.selectFromQuery = instance.selectFromQuery.whereRef(column, operator, actualValue)

    return instance
  }

  whereRef(column: string, ...args: string[]): FailedJobModel {
    return this.whereRef(column, ...args)
  }

  static whereRef(column: string, ...args: string[]): FailedJobModel {
    const instance = new FailedJobModel(null)

    return instance.whereRef(column, ...args)
  }

  whereRaw(sqlStatement: string): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.where(sql`${sqlStatement}`)

    return this
  }

  static whereRaw(sqlStatement: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(sql`${sqlStatement}`)

    return instance
  }

  orWhere(...conditions: [string, any][]): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.where((eb: any) => {
      return eb.or(
        conditions.map(([column, value]) => eb(column, '=', value)),
      )
    })

    this.updateFromQuery = this.updateFromQuery.where((eb: any) => {
      return eb.or(
        conditions.map(([column, value]) => eb(column, '=', value)),
      )
    })

    this.deleteFromQuery = this.deleteFromQuery.where((eb: any) => {
      return eb.or(
        conditions.map(([column, value]) => eb(column, '=', value)),
      )
    })

    return this
  }

  static orWhere(...conditions: [string, any][]): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where((eb: any) => {
      return eb.or(
        conditions.map(([column, value]) => eb(column, '=', value)),
      )
    })

    instance.updateFromQuery = instance.updateFromQuery.where((eb: any) => {
      return eb.or(
        conditions.map(([column, value]) => eb(column, '=', value)),
      )
    })

    instance.deleteFromQuery = instance.deleteFromQuery.where((eb: any) => {
      return eb.or(
        conditions.map(([column, value]) => eb(column, '=', value)),
      )
    })

    return instance
  }

  when(
    condition: boolean,
    callback: (query: FailedJobModel) => FailedJobModel,
  ): FailedJobModel {
    return FailedJobModel.when(condition, callback)
  }

  static when(
    condition: boolean,
    callback: (query: FailedJobModel) => FailedJobModel,
  ): FailedJobModel {
    let instance = new FailedJobModel(null)

    if (condition)
      instance = callback(instance)

    return instance
  }

  whereNull(column: string): FailedJobModel {
    return FailedJobModel.whereNull(column)
  }

  static whereNull(column: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    instance.updateFromQuery = instance.updateFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    return instance
  }

  static whereConnection(value: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('connection', '=', value)

    return instance
  }

  static whereQueue(value: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('queue', '=', value)

    return instance
  }

  static wherePayload(value: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('payload', '=', value)

    return instance
  }

  static whereException(value: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('exception', '=', value)

    return instance
  }

  static whereFailedAt(value: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('failed_at', '=', value)

    return instance
  }

  whereIn(column: keyof FailedJobType, values: any[]): FailedJobModel {
    return FailedJobModel.whereIn(column, values)
  }

  static whereIn(column: keyof FailedJobType, values: any[]): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'in', values)

    return instance
  }

  whereBetween(column: keyof FailedJobType, range: [any, any]): FailedJobModel {
    return FailedJobModel.whereBetween(column, range)
  }

  whereLike(column: keyof FailedJobType, value: string): FailedJobModel {
    return FailedJobModel.whereLike(column, value)
  }

  static whereLike(column: keyof FailedJobType, value: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    instance.updateFromQuery = instance.updateFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    instance.deleteFromQuery = instance.deleteFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    return instance
  }

  static whereBetween(column: keyof FailedJobType, range: [any, any]): FailedJobModel {
    if (range.length !== 2) {
      throw new HttpError(500, 'Range must have exactly two values: [min, max]')
    }

    const instance = new FailedJobModel(null)

    const query = sql` ${sql.raw(column as string)} between ${range[0]} and ${range[1]} `

    instance.selectFromQuery = instance.selectFromQuery.where(query)
    instance.updateFromQuery = instance.updateFromQuery.where(query)
    instance.deleteFromQuery = instance.deleteFromQuery.where(query)

    return instance
  }

  whereNotIn(column: keyof FailedJobType, values: any[]): FailedJobModel {
    return FailedJobModel.whereNotIn(column, values)
  }

  static whereNotIn(column: keyof FailedJobType, values: any[]): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'not in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'not in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'not in', values)

    return instance
  }

  async exists(): Promise<boolean> {
    const model = await this.selectFromQuery.executeTakeFirst()

    return model !== null || model !== undefined
  }

  static async latest(): Promise<FailedJobType | undefined> {
    const model = await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .orderBy('created_at', 'desc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new FailedJobModel(null)
    const result = await instance.mapWith(model)
    const data = new FailedJobModel(result as FailedJobType)

    return data
  }

  static async oldest(): Promise<FailedJobType | undefined> {
    const model = await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .orderBy('created_at', 'asc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new FailedJobModel(null)
    const result = await instance.mapWith(model)
    const data = new FailedJobModel(result as FailedJobType)

    return data
  }

  static async firstOrCreate(
    condition: Partial<FailedJobType>,
    newFailedJob: NewFailedJob,
  ): Promise<FailedJobModel> {
    // Get the key and value from the condition object
    const key = Object.keys(condition)[0] as keyof FailedJobType

    if (!key) {
      throw new HttpError(500, 'Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingFailedJob = await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingFailedJob) {
      const instance = new FailedJobModel(null)
      const result = await instance.mapWith(existingFailedJob)
      return new FailedJobModel(result as FailedJobType)
    }
    else {
      return await this.create(newFailedJob)
    }
  }

  static async updateOrCreate(
    condition: Partial<FailedJobType>,
    newFailedJob: NewFailedJob,
  ): Promise<FailedJobModel> {
    const instance = new FailedJobModel(null)

    const key = Object.keys(condition)[0] as keyof FailedJobType

    if (!key) {
      throw new HttpError(500, 'Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingFailedJob = await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingFailedJob) {
      // If found, update the existing record
      await DB.instance.updateTable('failed_jobs')
        .set(newFailedJob)
        .where(key, '=', value)
        .executeTakeFirstOrThrow()

      // Fetch and return the updated record
      const updatedFailedJob = await DB.instance.selectFrom('failed_jobs')
        .selectAll()
        .where(key, '=', value)
        .executeTakeFirst()

      if (!updatedFailedJob) {
        throw new HttpError(500, 'Failed to fetch updated record')
      }

      const result = await instance.mapWith(updatedFailedJob)

      instance.hasSaved = true

      return new FailedJobModel(result as FailedJobType)
    }
    else {
      // If not found, create a new record
      return await this.create(newFailedJob)
    }
  }

  with(relations: string[]): FailedJobModel {
    return FailedJobModel.with(relations)
  }

  static with(relations: string[]): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.withRelations = relations

    return instance
  }

  async last(): Promise<FailedJobType | undefined> {
    return await DB.instance.selectFrom('failed_jobs')
      .selectAll()
      .orderBy('id', 'desc')
      .executeTakeFirst()
  }

  static async last(): Promise<FailedJobType | undefined> {
    const model = await DB.instance.selectFrom('failed_jobs').selectAll().orderBy('id', 'desc').executeTakeFirst()

    if (!model)
      return undefined

    const instance = new FailedJobModel(null)

    const result = await instance.mapWith(model)

    const data = new FailedJobModel(result as FailedJobType)

    return data
  }

  orderBy(column: keyof FailedJobType, order: 'asc' | 'desc'): FailedJobModel {
    return FailedJobModel.orderBy(column, order)
  }

  static orderBy(column: keyof FailedJobType, order: 'asc' | 'desc'): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, order)

    return instance
  }

  groupBy(column: keyof FailedJobType): FailedJobModel {
    return FailedJobModel.groupBy(column)
  }

  static groupBy(column: keyof FailedJobType): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.groupBy(column)

    return instance
  }

  having(column: keyof FailedJobType, operator: string, value: any): FailedJobModel {
    return FailedJobModel.having(column, operator, value)
  }

  static having(column: keyof FailedJobType, operator: string, value: any): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.having(column, operator, value)

    return instance
  }

  inRandomOrder(): FailedJobModel {
    return FailedJobModel.inRandomOrder()
  }

  static inRandomOrder(): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(sql` ${sql.raw('RANDOM()')} `)

    return instance
  }

  orderByDesc(column: keyof FailedJobType): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, 'desc')

    return this
  }

  static orderByDesc(column: keyof FailedJobType): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'desc')

    return instance
  }

  orderByAsc(column: keyof FailedJobType): FailedJobModel {
    return FailedJobModel.orderByAsc(column)
  }

  static orderByAsc(column: keyof FailedJobType): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'asc')

    return instance
  }

  async update(newFailedJob: FailedJobUpdate): Promise<FailedJobModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(newFailedJob).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewFailedJob

    await DB.instance.updateTable('failed_jobs')
      .set(filteredValues)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      const model = await this.find(this.id)

      return model
    }

    this.hasSaved = true

    return undefined
  }

  async forceUpdate(failedjob: FailedJobUpdate): Promise<FailedJobModel | undefined> {
    if (this.id === undefined) {
      this.updateFromQuery.set(failedjob).execute()
    }

    await DB.instance.updateTable('failed_jobs')
      .set(failedjob)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      const model = await this.find(this.id)

      this.hasSaved = true

      return model
    }

    return undefined
  }

  async save(): Promise<void> {
    if (!this)
      throw new HttpError(500, 'FailedJob data is undefined')

    const filteredValues = Object.fromEntries(
      Object.entries(this).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewFailedJob

    if (this.id === undefined) {
      await DB.instance.insertInto('failed_jobs')
        .values(filteredValues)
        .executeTakeFirstOrThrow()
    }
    else {
      await this.update(this)
    }

    this.hasSaved = true
  }

  fill(data: Partial<FailedJobType>): FailedJobModel {
    const filteredValues = Object.fromEntries(
      Object.entries(data).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewFailedJob

    this.attributes = {
      ...this.attributes,
      ...filteredValues,
    }

    return this
  }

  forceFill(data: Partial<FailedJobType>): FailedJobModel {
    this.attributes = {
      ...this.attributes,
      ...data,
    }

    return this
  }

  // Method to delete (soft delete) the failedjob instance
  async delete(): Promise<any> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    return await DB.instance.deleteFrom('failed_jobs')
      .where('id', '=', this.id)
      .execute()
  }

  distinct(column: keyof FailedJobType): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.select(column).distinct()

    this.hasSelect = true

    return this
  }

  static distinct(column: keyof FailedJobType): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.select(column).distinct()

    instance.hasSelect = true

    return instance
  }

  join(table: string, firstCol: string, secondCol: string): FailedJobModel {
    this.selectFromQuery = this.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return this
  }

  static join(table: string, firstCol: string, secondCol: string): FailedJobModel {
    const instance = new FailedJobModel(null)

    instance.selectFromQuery = instance.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return instance
  }

  static async rawQuery(rawQuery: string): Promise<any> {
    return await sql`${rawQuery}`.execute(DB.instance)
  }

  toJSON(): Partial<FailedJobJsonResponse> {
    const output: Partial<FailedJobJsonResponse> = {

      id: this.id,
      connection: this.connection,
      queue: this.queue,
      payload: this.payload,
      exception: this.exception,
      failed_at: this.failed_at,

      created_at: this.created_at,

      updated_at: this.updated_at,

      ...this.customColumns,
    }

    return output
  }

  parseResult(model: FailedJobModel): FailedJobModel {
    for (const hiddenAttribute of this.hidden) {
      delete model[hiddenAttribute as keyof FailedJobModel]
    }

    return model
  }
}

async function find(id: number): Promise<FailedJobModel | undefined> {
  const query = DB.instance.selectFrom('failed_jobs').where('id', '=', id).selectAll()

  const model = await query.executeTakeFirst()

  if (!model)
    return undefined

  return new FailedJobModel(model)
}

export async function count(): Promise<number> {
  const results = await FailedJobModel.count()

  return results
}

export async function create(newFailedJob: NewFailedJob): Promise<FailedJobModel> {
  const result = await DB.instance.insertInto('failed_jobs')
    .values(newFailedJob)
    .executeTakeFirstOrThrow()

  return await find(Number(result.numInsertedOrUpdatedRows)) as FailedJobModel
}

export async function rawQuery(rawQuery: string): Promise<any> {
  return await sql`${rawQuery}`.execute(DB.instance)
}

export async function remove(id: number): Promise<void> {
  await DB.instance.deleteFrom('failed_jobs')
    .where('id', '=', id)
    .execute()
}

export async function whereConnection(value: string): Promise<FailedJobModel[]> {
  const query = DB.instance.selectFrom('failed_jobs').where('connection', '=', value)
  const results = await query.execute()

  return results.map((modelItem: FailedJobModel) => new FailedJobModel(modelItem))
}

export async function whereQueue(value: string): Promise<FailedJobModel[]> {
  const query = DB.instance.selectFrom('failed_jobs').where('queue', '=', value)
  const results = await query.execute()

  return results.map((modelItem: FailedJobModel) => new FailedJobModel(modelItem))
}

export async function wherePayload(value: string): Promise<FailedJobModel[]> {
  const query = DB.instance.selectFrom('failed_jobs').where('payload', '=', value)
  const results = await query.execute()

  return results.map((modelItem: FailedJobModel) => new FailedJobModel(modelItem))
}

export async function whereException(value: string): Promise<FailedJobModel[]> {
  const query = DB.instance.selectFrom('failed_jobs').where('exception', '=', value)
  const results = await query.execute()

  return results.map((modelItem: FailedJobModel) => new FailedJobModel(modelItem))
}

export async function whereFailedAt(value: Date | string): Promise<FailedJobModel[]> {
  const query = DB.instance.selectFrom('failed_jobs').where('failed_at', '=', value)
  const results = await query.execute()

  return results.map((modelItem: FailedJobModel) => new FailedJobModel(modelItem))
}

export const FailedJob = FailedJobModel

export default FailedJob
