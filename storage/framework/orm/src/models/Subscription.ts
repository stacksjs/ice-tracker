import type { Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { UserModel } from './User'
import { randomUUIDv7 } from 'bun'
import { cache } from '@stacksjs/cache'
import { sql } from '@stacksjs/database'
import { HttpError, ModelNotFoundException } from '@stacksjs/error-handling'
import { dispatch } from '@stacksjs/events'
import { DB, SubqueryBuilder } from '@stacksjs/orm'

import User from './User'

export interface SubscriptionsTable {
  id?: number
  user_id?: number
  user?: UserModel
  type?: string
  provider_id?: string
  provider_status?: string
  unit_price?: number
  provider_type?: string
  provider_price_id?: string
  quantity?: number
  trial_ends_at?: string
  ends_at?: string
  last_used_at?: string
  uuid?: string

  created_at?: Date

  updated_at?: Date

}

interface SubscriptionResponse {
  data: SubscriptionJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface SubscriptionJsonResponse extends Omit<SubscriptionsTable, 'password'> {
  [key: string]: any
}

export type SubscriptionType = Selectable<SubscriptionsTable>
export type NewSubscription = Partial<Insertable<SubscriptionsTable>>
export type SubscriptionUpdate = Updateable<SubscriptionsTable>

      type SortDirection = 'asc' | 'desc'
interface SortOptions { column: SubscriptionType, order: SortDirection }
// Define a type for the options parameter
interface QueryOptions {
  sort?: SortOptions
  limit?: number
  offset?: number
  page?: number
}

export class SubscriptionModel {
  private readonly hidden: Array<keyof SubscriptionJsonResponse> = []
  private readonly fillable: Array<keyof SubscriptionJsonResponse> = ['type', 'provider_id', 'provider_status', 'unit_price', 'provider_type', 'provider_price_id', 'quantity', 'trial_ends_at', 'ends_at', 'last_used_at', 'uuid', 'user_id']
  private readonly guarded: Array<keyof SubscriptionJsonResponse> = []
  protected attributes: Partial<SubscriptionType> = {}
  protected originalAttributes: Partial<SubscriptionType> = {}

  protected selectFromQuery: any
  protected withRelations: string[]
  protected updateFromQuery: any
  protected deleteFromQuery: any
  protected hasSelect: boolean
  private hasSaved: boolean
  private customColumns: Record<string, unknown> = {}

  constructor(subscription: Partial<SubscriptionType> | null) {
    if (subscription) {
      this.attributes = { ...subscription }
      this.originalAttributes = { ...subscription }

      Object.keys(subscription).forEach((key) => {
        if (!(key in this)) {
          this.customColumns[key] = (subscription as SubscriptionJsonResponse)[key]
        }
      })
    }

    this.withRelations = []
    this.selectFromQuery = DB.instance.selectFrom('subscriptions')
    this.updateFromQuery = DB.instance.updateTable('subscriptions')
    this.deleteFromQuery = DB.instance.deleteFrom('subscriptions')
    this.hasSelect = false
    this.hasSaved = false
  }

  get user_id(): number | undefined {
    return this.attributes.user_id
  }

  get user(): UserModel | undefined {
    return this.attributes.user
  }

  get id(): number | undefined {
    return this.attributes.id
  }

  get uuid(): string | undefined {
    return this.attributes.uuid
  }

  get type(): string | undefined {
    return this.attributes.type
  }

  get provider_id(): string | undefined {
    return this.attributes.provider_id
  }

  get provider_status(): string | undefined {
    return this.attributes.provider_status
  }

  get unit_price(): number | undefined {
    return this.attributes.unit_price
  }

  get provider_type(): string | undefined {
    return this.attributes.provider_type
  }

  get provider_price_id(): string | undefined {
    return this.attributes.provider_price_id
  }

  get quantity(): number | undefined {
    return this.attributes.quantity
  }

  get trial_ends_at(): string | undefined {
    return this.attributes.trial_ends_at
  }

  get ends_at(): string | undefined {
    return this.attributes.ends_at
  }

  get last_used_at(): string | undefined {
    return this.attributes.last_used_at
  }

  get created_at(): Date | undefined {
    return this.attributes.created_at
  }

  get updated_at(): Date | undefined {
    return this.attributes.updated_at
  }

  set uuid(value: string) {
    this.attributes.uuid = value
  }

  set type(value: string) {
    this.attributes.type = value
  }

  set provider_id(value: string) {
    this.attributes.provider_id = value
  }

  set provider_status(value: string) {
    this.attributes.provider_status = value
  }

  set unit_price(value: number) {
    this.attributes.unit_price = value
  }

  set provider_type(value: string) {
    this.attributes.provider_type = value
  }

  set provider_price_id(value: string) {
    this.attributes.provider_price_id = value
  }

  set quantity(value: number) {
    this.attributes.quantity = value
  }

  set trial_ends_at(value: string) {
    this.attributes.trial_ends_at = value
  }

  set ends_at(value: string) {
    this.attributes.ends_at = value
  }

  set last_used_at(value: string) {
    this.attributes.last_used_at = value
  }

  set updated_at(value: Date) {
    this.attributes.updated_at = value
  }

  getOriginal(column?: keyof SubscriptionType): Partial<SubscriptionType> | any {
    if (column) {
      return this.originalAttributes[column]
    }

    return this.originalAttributes
  }

  getChanges(): Partial<SubscriptionJsonResponse> {
    return this.fillable.reduce<Partial<SubscriptionJsonResponse>>((changes, key) => {
      const currentValue = this.attributes[key as keyof SubscriptionsTable]
      const originalValue = this.originalAttributes[key as keyof SubscriptionsTable]

      if (currentValue !== originalValue) {
        changes[key] = currentValue
      }

      return changes
    }, {})
  }

  isDirty(column?: keyof SubscriptionType): boolean {
    if (column) {
      return this.attributes[column] !== this.originalAttributes[column]
    }

    return Object.entries(this.originalAttributes).some(([key, originalValue]) => {
      const currentValue = (this.attributes as any)[key]

      return currentValue !== originalValue
    })
  }

  isClean(column?: keyof SubscriptionType): boolean {
    return !this.isDirty(column)
  }

  wasChanged(column?: keyof SubscriptionType): boolean {
    return this.hasSaved && this.isDirty(column)
  }

  select(params: (keyof SubscriptionType)[] | RawBuilder<string> | string): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.select(params)

    this.hasSelect = true

    return this
  }

  static select(params: (keyof SubscriptionType)[] | RawBuilder<string> | string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    // Initialize a query with the table name and selected fields
    instance.selectFromQuery = instance.selectFromQuery.select(params)

    instance.hasSelect = true

    return instance
  }

  async applyFind(id: number): Promise<SubscriptionModel | undefined> {
    const model = await DB.instance.selectFrom('subscriptions').where('id', '=', id).selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    cache.getOrSet(`subscription:${id}`, JSON.stringify(model))

    return data
  }

  async find(id: number): Promise<SubscriptionModel | undefined> {
    return await this.applyFind(id)
  }

  // Method to find a Subscription by ID
  static async find(id: number): Promise<SubscriptionModel | undefined> {
    const instance = new SubscriptionModel(null)

    return await instance.applyFind(id)
  }

  async first(): Promise<SubscriptionModel | undefined> {
    return await SubscriptionModel.first()
  }

  static async first(): Promise<SubscriptionModel | undefined> {
    const model = await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new SubscriptionModel(null)

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  async firstOrFail(): Promise<SubscriptionModel | undefined> {
    return await SubscriptionModel.firstOrFail()
  }

  static async firstOrFail(): Promise<SubscriptionModel | undefined> {
    const instance = new SubscriptionModel(null)

    const model = await instance.selectFromQuery.executeTakeFirst()

    if (model === undefined)
      throw new ModelNotFoundException(404, 'No SubscriptionModel results found for query')

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  async mapWith(model: SubscriptionType): Promise<SubscriptionType> {
    if (this.withRelations.includes('user')) {
      model.user = await this.userBelong()
    }

    return model
  }

  static async all(): Promise<SubscriptionModel[]> {
    const models = await DB.instance.selectFrom('subscriptions').selectAll().execute()

    const data = await Promise.all(models.map(async (model: SubscriptionType) => {
      const instance = new SubscriptionModel(model)

      const results = await instance.mapWith(model)

      return new SubscriptionModel(results)
    }))

    return data
  }

  async findOrFail(id: number): Promise<SubscriptionModel> {
    return await SubscriptionModel.findOrFail(id)
  }

  static async findOrFail(id: number): Promise<SubscriptionModel> {
    const model = await DB.instance.selectFrom('subscriptions').where('id', '=', id).selectAll().executeTakeFirst()

    const instance = new SubscriptionModel(null)

    if (model === undefined)
      throw new ModelNotFoundException(404, `No SubscriptionModel results for ${id}`)

    cache.getOrSet(`subscription:${id}`, JSON.stringify(model))

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  static async findMany(ids: number[]): Promise<SubscriptionModel[]> {
    let query = DB.instance.selectFrom('subscriptions').where('id', 'in', ids)

    const instance = new SubscriptionModel(null)

    query = query.selectAll()

    const model = await query.execute()

    return model.map((modelItem: SubscriptionModel) => instance.parseResult(new SubscriptionModel(modelItem)))
  }

  skip(count: number): SubscriptionModel {
    return SubscriptionModel.skip(count)
  }

  static skip(count: number): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.offset(count)

    return instance
  }

  async chunk(size: number, callback: (models: SubscriptionModel[]) => Promise<void>): Promise<void> {
    await SubscriptionModel.chunk(size, callback)
  }

  static async chunk(size: number, callback: (models: SubscriptionModel[]) => Promise<void>): Promise<void> {
    let page = 1
    let hasMore = true

    while (hasMore) {
      const instance = new SubscriptionModel(null)

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

  take(count: number): SubscriptionModel {
    return SubscriptionModel.take(count)
  }

  static take(count: number): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.limit(count)

    return instance
  }

  static async pluck<K extends keyof SubscriptionModel>(field: K): Promise<SubscriptionModel[K][]> {
    const instance = new SubscriptionModel(null)

    if (instance.hasSelect) {
      const model = await instance.selectFromQuery.execute()
      return model.map((modelItem: SubscriptionModel) => modelItem[field])
    }

    const model = await instance.selectFromQuery.selectAll().execute()

    return model.map((modelItem: SubscriptionModel) => modelItem[field])
  }

  async pluck<K extends keyof SubscriptionModel>(field: K): Promise<SubscriptionModel[K][]> {
    return SubscriptionModel.pluck(field)
  }

  static async count(): Promise<number> {
    const instance = new SubscriptionModel(null)

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

  async max(field: keyof SubscriptionModel): Promise<number> {
    return await this.selectFromQuery
      .select(sql`MAX(${sql.raw(field as string)}) `)
      .executeTakeFirst()
  }

  async min(field: keyof SubscriptionModel): Promise<number> {
    return await this.selectFromQuery
      .select(sql`MIN(${sql.raw(field as string)}) `)
      .executeTakeFirst()
  }

  async avg(field: keyof SubscriptionModel): Promise<number> {
    return this.selectFromQuery
      .select(sql`AVG(${sql.raw(field as string)})`)
      .executeTakeFirst()
  }

  async sum(field: keyof SubscriptionModel): Promise<number> {
    return this.selectFromQuery
      .select(sql`SUM(${sql.raw(field as string)})`)
      .executeTakeFirst()
  }

  async applyGet(): Promise<SubscriptionModel[]> {
    let models

    if (this.hasSelect) {
      models = await this.selectFromQuery.execute()
    }
    else {
      models = await this.selectFromQuery.selectAll().execute()
    }

    const data = await Promise.all(models.map(async (model: SubscriptionModel) => {
      const instance = new SubscriptionModel(model)

      const results = await instance.mapWith(model)

      return new SubscriptionModel(results)
    }))

    return data
  }

  async get(): Promise<SubscriptionModel[]> {
    return await this.applyGet()
  }

  static async get(): Promise<SubscriptionModel[]> {
    const instance = new SubscriptionModel(null)

    return await instance.applyGet()
  }

  has(relation: string): SubscriptionModel {
    return SubscriptionModel.has(relation)
  }

  static has(relation: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(({ exists, selectFrom }: any) =>
      exists(
        selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.subscription_id`, '=', 'subscriptions.id'),
      ),
    )

    return instance
  }

  static whereExists(callback: (qb: any) => any): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(({ exists, selectFrom }: any) =>
      exists(callback({ exists, selectFrom })),
    )

    return instance
  }

  whereHas(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): SubscriptionModel {
    return SubscriptionModel.whereHas(relation, callback)
  }

  static whereHas(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): SubscriptionModel {
    const instance = new SubscriptionModel(null)
    const subqueryBuilder = new SubqueryBuilder()

    callback(subqueryBuilder)
    const conditions = subqueryBuilder.getConditions()

    instance.selectFromQuery = instance.selectFromQuery
      .where(({ exists, selectFrom }: any) => {
        let subquery = selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.subscription_id`, '=', 'subscriptions.id')

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

  applyDoesntHave(relation: string): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.where(({ not, exists, selectFrom }: any) =>
      not(
        exists(
          selectFrom(relation)
            .select('1')
            .whereRef(`${relation}.subscription_id`, '=', 'subscriptions.id'),
        ),
      ),
    )

    return this
  }

  doesntHave(relation: string): SubscriptionModel {
    return this.applyDoesntHave(relation)
  }

  static doesntHave(relation: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    return instance.doesntHave(relation)
  }

  applyWhereDoesntHave(relation: string, callback: (query: SubqueryBuilder) => void): SubscriptionModel {
    const subqueryBuilder = new SubqueryBuilder()

    callback(subqueryBuilder)
    const conditions = subqueryBuilder.getConditions()

    this.selectFromQuery = this.selectFromQuery
      .where(({ exists, selectFrom, not }: any) => {
        let subquery = selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.subscription_id`, '=', 'subscriptions.id')

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

  whereDoesntHave(relation: string, callback: (query: SubqueryBuilder) => void): SubscriptionModel {
    return this.applyWhereDoesntHave(relation, callback)
  }

  static whereDoesntHave(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    return instance.applyWhereDoesntHave(relation, callback)
  }

  async applyPaginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<SubscriptionResponse> {
    const totalRecordsResult = await DB.instance.selectFrom('subscriptions')
      .select(DB.instance.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    const subscriptionsWithExtra = await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .orderBy('id', 'asc') // Assuming 'id' is used for cursor-based pagination
      .limit((options.limit ?? 10) + 1) // Fetch one extra record
      .offset(((options.page ?? 1) - 1) * (options.limit ?? 10)) // Ensure options.page is not undefined
      .execute()

    let nextCursor = null
    if (subscriptionsWithExtra.length > (options.limit ?? 10))
      nextCursor = subscriptionsWithExtra.pop()?.id ?? null

    return {
      data: subscriptionsWithExtra,
      paging: {
        total_records: totalRecords,
        page: options.page || 1,
        total_pages: totalPages,
      },
      next_cursor: nextCursor,
    }
  }

  async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<SubscriptionResponse> {
    return await this.applyPaginate(options)
  }

  // Method to get all subscriptions
  static async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<SubscriptionResponse> {
    const instance = new SubscriptionModel(null)

    return await instance.applyPaginate(options)
  }

  static async create(newSubscription: NewSubscription): Promise<SubscriptionModel> {
    const instance = new SubscriptionModel(null)

    const filteredValues = Object.fromEntries(
      Object.entries(newSubscription).filter(([key]) =>
        !instance.guarded.includes(key) && instance.fillable.includes(key),
      ),
    ) as NewSubscription

    filteredValues.uuid = randomUUIDv7()

    const result = await DB.instance.insertInto('subscriptions')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await instance.find(Number(result.numInsertedOrUpdatedRows)) as SubscriptionModel

    if (model)
      dispatch('subscription:created', model)

    return model
  }

  static async createMany(newSubscription: NewSubscription[]): Promise<void> {
    const instance = new SubscriptionModel(null)

    const valuesFiltered = newSubscription.map((newSubscription: NewSubscription) => {
      const filteredValues = Object.fromEntries(
        Object.entries(newSubscription).filter(([key]) =>
          !instance.guarded.includes(key) && instance.fillable.includes(key),
        ),
      ) as NewSubscription

      filteredValues.uuid = randomUUIDv7()

      return filteredValues
    })

    await DB.instance.insertInto('subscriptions')
      .values(valuesFiltered)
      .executeTakeFirst()
  }

  static async forceCreate(newSubscription: NewSubscription): Promise<SubscriptionModel> {
    const result = await DB.instance.insertInto('subscriptions')
      .values(newSubscription)
      .executeTakeFirst()

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as SubscriptionModel

    return model
  }

  // Method to remove a Subscription
  static async remove(id: number): Promise<any> {
    return await DB.instance.deleteFrom('subscriptions')
      .where('id', '=', id)
      .execute()
  }

  applyWhere(instance: SubscriptionModel, column: string, ...args: any[]): SubscriptionModel {
    const [operatorOrValue, value] = args
    const operator = value === undefined ? '=' : operatorOrValue
    const actualValue = value === undefined ? operatorOrValue : value

    instance.selectFromQuery = instance.selectFromQuery.where(column, operator, actualValue)
    instance.updateFromQuery = instance.updateFromQuery.where(column, operator, actualValue)
    instance.deleteFromQuery = instance.deleteFromQuery.where(column, operator, actualValue)

    return instance
  }

  where(column: string, ...args: any[]): SubscriptionModel {
    return this.applyWhere(this, column, ...args)
  }

  static where(column: string, ...args: any[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    return instance.applyWhere(instance, column, ...args)
  }

  whereColumn(first: string, operator: string, second: string): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.whereRef(first, operator, second)

    return this
  }

  static whereColumn(first: string, operator: string, second: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.whereRef(first, operator, second)

    return instance
  }

  whereRef(column: string, ...args: string[]): SubscriptionModel {
    const [operatorOrValue, value] = args
    const operator = value === undefined ? '=' : operatorOrValue
    const actualValue = value === undefined ? operatorOrValue : value

    const instance = new SubscriptionModel(null)
    instance.selectFromQuery = instance.selectFromQuery.whereRef(column, operator, actualValue)

    return instance
  }

  whereRef(column: string, ...args: string[]): SubscriptionModel {
    return this.whereRef(column, ...args)
  }

  static whereRef(column: string, ...args: string[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    return instance.whereRef(column, ...args)
  }

  whereRaw(sqlStatement: string): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.where(sql`${sqlStatement}`)

    return this
  }

  static whereRaw(sqlStatement: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(sql`${sqlStatement}`)

    return instance
  }

  orWhere(...conditions: [string, any][]): SubscriptionModel {
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

  static orWhere(...conditions: [string, any][]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

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
    callback: (query: SubscriptionModel) => SubscriptionModel,
  ): SubscriptionModel {
    return SubscriptionModel.when(condition, callback)
  }

  static when(
    condition: boolean,
    callback: (query: SubscriptionModel) => SubscriptionModel,
  ): SubscriptionModel {
    let instance = new SubscriptionModel(null)

    if (condition)
      instance = callback(instance)

    return instance
  }

  whereNull(column: string): SubscriptionModel {
    return SubscriptionModel.whereNull(column)
  }

  static whereNull(column: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    instance.updateFromQuery = instance.updateFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    return instance
  }

  static whereType(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('type', '=', value)

    return instance
  }

  static whereProviderId(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('providerId', '=', value)

    return instance
  }

  static whereProviderStatus(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('providerStatus', '=', value)

    return instance
  }

  static whereUnitPrice(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('unitPrice', '=', value)

    return instance
  }

  static whereProviderType(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('providerType', '=', value)

    return instance
  }

  static whereProviderPriceId(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('providerPriceId', '=', value)

    return instance
  }

  static whereQuantity(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('quantity', '=', value)

    return instance
  }

  static whereTrialEndsAt(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('trialEndsAt', '=', value)

    return instance
  }

  static whereEndsAt(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('endsAt', '=', value)

    return instance
  }

  static whereLastUsedAt(value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('lastUsedAt', '=', value)

    return instance
  }

  whereIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    return SubscriptionModel.whereIn(column, values)
  }

  static whereIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'in', values)

    return instance
  }

  whereBetween(column: keyof SubscriptionType, range: [any, any]): SubscriptionModel {
    return SubscriptionModel.whereBetween(column, range)
  }

  whereLike(column: keyof SubscriptionType, value: string): SubscriptionModel {
    return SubscriptionModel.whereLike(column, value)
  }

  static whereLike(column: keyof SubscriptionType, value: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    instance.updateFromQuery = instance.updateFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    instance.deleteFromQuery = instance.deleteFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    return instance
  }

  static whereBetween(column: keyof SubscriptionType, range: [any, any]): SubscriptionModel {
    if (range.length !== 2) {
      throw new HttpError(500, 'Range must have exactly two values: [min, max]')
    }

    const instance = new SubscriptionModel(null)

    const query = sql` ${sql.raw(column as string)} between ${range[0]} and ${range[1]} `

    instance.selectFromQuery = instance.selectFromQuery.where(query)
    instance.updateFromQuery = instance.updateFromQuery.where(query)
    instance.deleteFromQuery = instance.deleteFromQuery.where(query)

    return instance
  }

  whereNotIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    return SubscriptionModel.whereNotIn(column, values)
  }

  static whereNotIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'not in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'not in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'not in', values)

    return instance
  }

  async exists(): Promise<boolean> {
    const model = await this.selectFromQuery.executeTakeFirst()

    return model !== null || model !== undefined
  }

  static async latest(): Promise<SubscriptionType | undefined> {
    const model = await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .orderBy('created_at', 'desc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new SubscriptionModel(null)
    const result = await instance.mapWith(model)
    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  static async oldest(): Promise<SubscriptionType | undefined> {
    const model = await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .orderBy('created_at', 'asc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new SubscriptionModel(null)
    const result = await instance.mapWith(model)
    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  static async firstOrCreate(
    condition: Partial<SubscriptionType>,
    newSubscription: NewSubscription,
  ): Promise<SubscriptionModel> {
    // Get the key and value from the condition object
    const key = Object.keys(condition)[0] as keyof SubscriptionType

    if (!key) {
      throw new HttpError(500, 'Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingSubscription = await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingSubscription) {
      const instance = new SubscriptionModel(null)
      const result = await instance.mapWith(existingSubscription)
      return new SubscriptionModel(result as SubscriptionType)
    }
    else {
      return await this.create(newSubscription)
    }
  }

  static async updateOrCreate(
    condition: Partial<SubscriptionType>,
    newSubscription: NewSubscription,
  ): Promise<SubscriptionModel> {
    const instance = new SubscriptionModel(null)

    const key = Object.keys(condition)[0] as keyof SubscriptionType

    if (!key) {
      throw new HttpError(500, 'Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingSubscription = await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingSubscription) {
      // If found, update the existing record
      await DB.instance.updateTable('subscriptions')
        .set(newSubscription)
        .where(key, '=', value)
        .executeTakeFirstOrThrow()

      // Fetch and return the updated record
      const updatedSubscription = await DB.instance.selectFrom('subscriptions')
        .selectAll()
        .where(key, '=', value)
        .executeTakeFirst()

      if (!updatedSubscription) {
        throw new HttpError(500, 'Failed to fetch updated record')
      }

      const result = await instance.mapWith(updatedSubscription)

      instance.hasSaved = true

      return new SubscriptionModel(result as SubscriptionType)
    }
    else {
      // If not found, create a new record
      return await this.create(newSubscription)
    }
  }

  with(relations: string[]): SubscriptionModel {
    return SubscriptionModel.with(relations)
  }

  static with(relations: string[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.withRelations = relations

    return instance
  }

  async last(): Promise<SubscriptionType | undefined> {
    return await DB.instance.selectFrom('subscriptions')
      .selectAll()
      .orderBy('id', 'desc')
      .executeTakeFirst()
  }

  static async last(): Promise<SubscriptionType | undefined> {
    const model = await DB.instance.selectFrom('subscriptions').selectAll().orderBy('id', 'desc').executeTakeFirst()

    if (!model)
      return undefined

    const instance = new SubscriptionModel(null)

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  orderBy(column: keyof SubscriptionType, order: 'asc' | 'desc'): SubscriptionModel {
    return SubscriptionModel.orderBy(column, order)
  }

  static orderBy(column: keyof SubscriptionType, order: 'asc' | 'desc'): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, order)

    return instance
  }

  groupBy(column: keyof SubscriptionType): SubscriptionModel {
    return SubscriptionModel.groupBy(column)
  }

  static groupBy(column: keyof SubscriptionType): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.groupBy(column)

    return instance
  }

  having(column: keyof SubscriptionType, operator: string, value: any): SubscriptionModel {
    return SubscriptionModel.having(column, operator, value)
  }

  static having(column: keyof SubscriptionType, operator: string, value: any): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.having(column, operator, value)

    return instance
  }

  inRandomOrder(): SubscriptionModel {
    return SubscriptionModel.inRandomOrder()
  }

  static inRandomOrder(): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(sql` ${sql.raw('RANDOM()')} `)

    return instance
  }

  orderByDesc(column: keyof SubscriptionType): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, 'desc')

    return this
  }

  static orderByDesc(column: keyof SubscriptionType): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'desc')

    return instance
  }

  orderByAsc(column: keyof SubscriptionType): SubscriptionModel {
    return SubscriptionModel.orderByAsc(column)
  }

  static orderByAsc(column: keyof SubscriptionType): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'asc')

    return instance
  }

  async update(newSubscription: SubscriptionUpdate): Promise<SubscriptionModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(newSubscription).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewSubscription

    await DB.instance.updateTable('subscriptions')
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

  async forceUpdate(subscription: SubscriptionUpdate): Promise<SubscriptionModel | undefined> {
    if (this.id === undefined) {
      this.updateFromQuery.set(subscription).execute()
    }

    await DB.instance.updateTable('subscriptions')
      .set(subscription)
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
      throw new HttpError(500, 'Subscription data is undefined')

    const filteredValues = Object.fromEntries(
      Object.entries(this).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewSubscription

    if (this.id === undefined) {
      await DB.instance.insertInto('subscriptions')
        .values(filteredValues)
        .executeTakeFirstOrThrow()
    }
    else {
      await this.update(this)
    }

    this.hasSaved = true
  }

  fill(data: Partial<SubscriptionType>): SubscriptionModel {
    const filteredValues = Object.fromEntries(
      Object.entries(data).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewSubscription

    this.attributes = {
      ...this.attributes,
      ...filteredValues,
    }

    return this
  }

  forceFill(data: Partial<SubscriptionType>): SubscriptionModel {
    this.attributes = {
      ...this.attributes,
      ...data,
    }

    return this
  }

  // Method to delete (soft delete) the subscription instance
  async delete(): Promise<any> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    return await DB.instance.deleteFrom('subscriptions')
      .where('id', '=', this.id)
      .execute()
  }

  async userBelong(): Promise<UserModel> {
    if (this.user_id === undefined)
      throw new HttpError(500, 'Relation Error!')

    const model = await User
      .where('id', '=', this.user_id)
      .first()

    if (!model)
      throw new HttpError(500, 'Model Relation Not Found!')

    return model
  }

  distinct(column: keyof SubscriptionType): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.select(column).distinct()

    this.hasSelect = true

    return this
  }

  static distinct(column: keyof SubscriptionType): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.select(column).distinct()

    instance.hasSelect = true

    return instance
  }

  join(table: string, firstCol: string, secondCol: string): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return this
  }

  static join(table: string, firstCol: string, secondCol: string): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return instance
  }

  static async rawQuery(rawQuery: string): Promise<any> {
    return await sql`${rawQuery}`.execute(DB.instance)
  }

  toJSON(): Partial<SubscriptionJsonResponse> {
    const output: Partial<SubscriptionJsonResponse> = {

      id: this.id,
      type: this.type,
      provider_id: this.provider_id,
      provider_status: this.provider_status,
      unit_price: this.unit_price,
      provider_type: this.provider_type,
      provider_price_id: this.provider_price_id,
      quantity: this.quantity,
      trial_ends_at: this.trial_ends_at,
      ends_at: this.ends_at,
      last_used_at: this.last_used_at,

      created_at: this.created_at,

      updated_at: this.updated_at,

      user_id: this.user_id,
      user: this.user,
      ...this.customColumns,
    }

    return output
  }

  parseResult(model: SubscriptionModel): SubscriptionModel {
    for (const hiddenAttribute of this.hidden) {
      delete model[hiddenAttribute as keyof SubscriptionModel]
    }

    return model
  }
}

async function find(id: number): Promise<SubscriptionModel | undefined> {
  const query = DB.instance.selectFrom('subscriptions').where('id', '=', id).selectAll()

  const model = await query.executeTakeFirst()

  if (!model)
    return undefined

  return new SubscriptionModel(model)
}

export async function count(): Promise<number> {
  const results = await SubscriptionModel.count()

  return results
}

export async function create(newSubscription: NewSubscription): Promise<SubscriptionModel> {
  const result = await DB.instance.insertInto('subscriptions')
    .values(newSubscription)
    .executeTakeFirstOrThrow()

  return await find(Number(result.numInsertedOrUpdatedRows)) as SubscriptionModel
}

export async function rawQuery(rawQuery: string): Promise<any> {
  return await sql`${rawQuery}`.execute(DB.instance)
}

export async function remove(id: number): Promise<void> {
  await DB.instance.deleteFrom('subscriptions')
    .where('id', '=', id)
    .execute()
}

export async function whereType(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('type', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereProviderId(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('provider_id', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereProviderStatus(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('provider_status', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereUnitPrice(value: number): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('unit_price', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereProviderType(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('provider_type', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereProviderPriceId(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('provider_price_id', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereQuantity(value: number): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('quantity', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereTrialEndsAt(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('trial_ends_at', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereEndsAt(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('ends_at', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export async function whereLastUsedAt(value: string): Promise<SubscriptionModel[]> {
  const query = DB.instance.selectFrom('subscriptions').where('last_used_at', '=', value)
  const results = await query.execute()

  return results.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
}

export const Subscription = SubscriptionModel

export default Subscription
