import type { Insertable, Selectable, Updateable } from 'kysely'
import type { UserModel } from './User'
import { randomUUIDv7 } from 'bun'
import { cache } from '@stacksjs/cache'
import { db, sql } from '@stacksjs/database'
import { HttpError } from '@stacksjs/error-handling'

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
  data: Subscriptions
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export type SubscriptionType = Selectable<SubscriptionsTable>
export type NewSubscription = Partial<Insertable<SubscriptionsTable>>
export type SubscriptionUpdate = Updateable<SubscriptionsTable>
export type Subscriptions = SubscriptionType[]

export type SubscriptionColumn = Subscriptions
export type SubscriptionColumns = Array<keyof Subscriptions>

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
  private hidden = []
  private fillable = ['type', 'provider_id', 'provider_status', 'unit_price', 'provider_type', 'provider_price_id', 'quantity', 'trial_ends_at', 'ends_at', 'last_used_at', 'uuid', 'user_id']
  private softDeletes = false
  protected selectFromQuery: any
  protected withRelations: string[]
  protected updateFromQuery: any
  protected deleteFromQuery: any
  protected hasSelect: boolean
  public user_id: number | undefined
  public user: UserModel | undefined
  public id: number
  public uuid: string | undefined
  public type: string | undefined
  public provider_id: string | undefined
  public provider_status: string | undefined
  public unit_price: number | undefined
  public provider_type: string | undefined
  public provider_price_id: string | undefined
  public quantity: number | undefined
  public trial_ends_at: string | undefined
  public ends_at: string | undefined
  public last_used_at: string | undefined

  public created_at: Date | undefined
  public updated_at: Date | undefined

  constructor(subscription: Partial<SubscriptionType> | null) {
    this.user_id = subscription?.user_id
    this.user = subscription?.user
    this.id = subscription?.id || 1
    this.uuid = subscription?.uuid
    this.type = subscription?.type
    this.provider_id = subscription?.provider_id
    this.provider_status = subscription?.provider_status
    this.unit_price = subscription?.unit_price
    this.provider_type = subscription?.provider_type
    this.provider_price_id = subscription?.provider_price_id
    this.quantity = subscription?.quantity
    this.trial_ends_at = subscription?.trial_ends_at
    this.ends_at = subscription?.ends_at
    this.last_used_at = subscription?.last_used_at

    this.created_at = subscription?.created_at

    this.updated_at = subscription?.updated_at

    this.withRelations = []
    this.selectFromQuery = db.selectFrom('subscriptions')
    this.updateFromQuery = db.updateTable('subscriptions')
    this.deleteFromQuery = db.deleteFrom('subscriptions')
    this.hasSelect = false
  }

  // Method to find a Subscription by ID
  async find(id: number): Promise<SubscriptionModel | undefined> {
    const query = db.selectFrom('subscriptions').where('id', '=', id).selectAll()

    const model = await query.executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    cache.getOrSet(`subscription:${id}`, JSON.stringify(model))

    return data
  }

  // Method to find a Subscription by ID
  static async find(id: number): Promise<SubscriptionModel | undefined> {
    const model = await db.selectFrom('subscriptions').where('id', '=', id).selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const instance = new SubscriptionModel(null)

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    cache.getOrSet(`subscription:${id}`, JSON.stringify(model))

    return data
  }

  async mapWith(model: SubscriptionType): Promise<SubscriptionType> {
    if (this.withRelations.includes('user')) {
      model.user = await this.userBelong()
    }

    return model
  }

  static async all(): Promise<SubscriptionModel[]> {
    const models = await db.selectFrom('subscriptions').selectAll().execute()

    const data = await Promise.all(models.map(async (model: SubscriptionType) => {
      const instance = new SubscriptionModel(model)

      const results = await instance.mapWith(model)

      return new SubscriptionModel(results)
    }))

    return data
  }

  static async findOrFail(id: number): Promise<SubscriptionModel> {
    const model = await db.selectFrom('subscriptions').where('id', '=', id).selectAll().executeTakeFirst()

    const instance = new SubscriptionModel(null)

    if (model === undefined)
      throw new HttpError(404, `No SubscriptionModel results for ${id}`)

    cache.getOrSet(`subscription:${id}`, JSON.stringify(model))

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  async findOrFail(id: number): Promise<SubscriptionModel> {
    const model = await db.selectFrom('subscriptions').where('id', '=', id).selectAll().executeTakeFirst()

    if (model === undefined)
      throw new HttpError(404, `No SubscriptionModel results for ${id}`)

    cache.getOrSet(`subscription:${id}`, JSON.stringify(model))

    const result = await this.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  static async findMany(ids: number[]): Promise<SubscriptionModel[]> {
    let query = db.selectFrom('subscriptions').where('id', 'in', ids)

    const instance = new SubscriptionModel(null)

    query = query.selectAll()

    const model = await query.execute()

    return model.map(modelItem => instance.parseResult(new SubscriptionModel(modelItem)))
  }

  static async get(): Promise<SubscriptionModel[]> {
    const instance = new SubscriptionModel(null)

    let models

    if (instance.hasSelect) {
      models = await instance.selectFromQuery.execute()
    }
    else {
      models = await instance.selectFromQuery.selectAll().execute()
    }

    const data = await Promise.all(models.map(async (model: SubscriptionModel) => {
      const instance = new SubscriptionModel(model)

      const results = await instance.mapWith(model)

      return new SubscriptionModel(results)
    }))

    return data
  }

  // Method to get a Subscription by criteria
  async get(): Promise<SubscriptionModel[]> {
    if (this.hasSelect) {
      const model = await this.selectFromQuery.execute()

      return model.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
    }

    const model = await this.selectFromQuery.selectAll().execute()

    return model.map((modelItem: SubscriptionModel) => new SubscriptionModel(modelItem))
  }

  static async count(): Promise<number> {
    const instance = new SubscriptionModel(null)

    const results = await instance.selectFromQuery.selectAll().execute()

    return results.length
  }

  async count(): Promise<number> {
    if (this.hasSelect) {
      const results = await this.selectFromQuery.execute()

      return results.length
    }

    const results = await this.selectFromQuery.execute()

    return results.length
  }

  async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<SubscriptionResponse> {
    const totalRecordsResult = await db.selectFrom('subscriptions')
      .select(db.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    if (this.hasSelect) {
      const subscriptionsWithExtra = await this.selectFromQuery.orderBy('id', 'asc')
        .limit((options.limit ?? 10) + 1)
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

    const subscriptionsWithExtra = await this.selectFromQuery.orderBy('id', 'asc')
      .limit((options.limit ?? 10) + 1)
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

  // Method to get all subscriptions
  static async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<SubscriptionResponse> {
    const totalRecordsResult = await db.selectFrom('subscriptions')
      .select(db.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    const subscriptionsWithExtra = await db.selectFrom('subscriptions')
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

  // Method to create a new subscription
  static async create(newSubscription: NewSubscription): Promise<SubscriptionModel> {
    const instance = new SubscriptionModel(null)

    const filteredValues = Object.fromEntries(
      Object.entries(newSubscription).filter(([key]) => instance.fillable.includes(key)),
    ) as NewSubscription

    filteredValues.uuid = randomUUIDv7()

    const result = await db.insertInto('subscriptions')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as SubscriptionModel

    return model
  }

  static async createMany(newSubscriptions: NewSubscription[]): Promise<void> {
    const instance = new SubscriptionModel(null)

    const filteredValues = newSubscriptions.map(newUser =>
      Object.fromEntries(
        Object.entries(newUser).filter(([key]) => instance.fillable.includes(key)),
      ) as NewSubscription,
    )

    filteredValues.forEach((model) => {
      model.uuid = randomUUIDv7()
    })

    await db.insertInto('subscriptions')
      .values(filteredValues)
      .executeTakeFirst()
  }

  static async forceCreate(newSubscription: NewSubscription): Promise<SubscriptionModel> {
    const result = await db.insertInto('subscriptions')
      .values(newSubscription)
      .executeTakeFirst()

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as SubscriptionModel

    return model
  }

  // Method to remove a Subscription
  static async remove(id: number): Promise<any> {
    return await db.deleteFrom('subscriptions')
      .where('id', '=', id)
      .execute()
  }

  where(...args: (string | number | boolean | undefined | null)[]): SubscriptionModel {
    let column: any
    let operator: any
    let value: any

    if (args.length === 2) {
      [column, value] = args
      operator = '='
    }
    else if (args.length === 3) {
      [column, operator, value] = args
    }
    else {
      throw new HttpError(500, 'Invalid number of arguments')
    }

    this.selectFromQuery = this.selectFromQuery.where(column, operator, value)

    this.updateFromQuery = this.updateFromQuery.where(column, operator, value)
    this.deleteFromQuery = this.deleteFromQuery.where(column, operator, value)

    return this
  }

  orWhere(...args: Array<[string, string, any]>): SubscriptionModel {
    if (args.length === 0) {
      throw new HttpError(500, 'At least one condition must be provided')
    }

    // Use the expression builder to append the OR conditions
    this.selectFromQuery = this.selectFromQuery.where((eb: any) =>
      eb.or(
        args.map(([column, operator, value]) => eb(column, operator, value)),
      ),
    )

    this.updateFromQuery = this.updateFromQuery.where((eb: any) =>
      eb.or(
        args.map(([column, operator, value]) => eb(column, operator, value)),
      ),
    )

    this.deleteFromQuery = this.deleteFromQuery.where((eb: any) =>
      eb.or(
        args.map(([column, operator, value]) => eb(column, operator, value)),
      ),
    )

    return this
  }

  static orWhere(...args: Array<[string, string, any]>): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    if (args.length === 0) {
      throw new HttpError(500, 'At least one condition must be provided')
    }

    // Use the expression builder to append the OR conditions
    instance.selectFromQuery = instance.selectFromQuery.where((eb: any) =>
      eb.or(
        args.map(([column, operator, value]) => eb(column, operator, value)),
      ),
    )

    instance.updateFromQuery = instance.updateFromQuery.where((eb: any) =>
      eb.or(
        args.map(([column, operator, value]) => eb(column, operator, value)),
      ),
    )

    instance.deleteFromQuery = instance.deleteFromQuery.where((eb: any) =>
      eb.or(
        args.map(([column, operator, value]) => eb(column, operator, value)),
      ),
    )

    return instance
  }

  static where(...args: (string | number | boolean | undefined | null)[]): SubscriptionModel {
    let column: any
    let operator: any
    let value: any

    const instance = new SubscriptionModel(null)

    if (args.length === 2) {
      [column, value] = args
      operator = '='
    }
    else if (args.length === 3) {
      [column, operator, value] = args
    }
    else {
      throw new HttpError(500, 'Invalid number of arguments')
    }

    instance.selectFromQuery = instance.selectFromQuery.where(column, operator, value)

    instance.updateFromQuery = instance.updateFromQuery.where(column, operator, value)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, operator, value)

    return instance
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

  when(
    condition: boolean,
    callback: (query: SubscriptionModel) => SubscriptionModel,
  ): SubscriptionModel {
    if (condition)
      callback(this.selectFromQuery)

    return this
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

  whereNull(column: string): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    this.updateFromQuery = this.updateFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    return this
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
    this.selectFromQuery = this.selectFromQuery.where(column, 'in', values)

    this.updateFromQuery = this.updateFromQuery.where(column, 'in', values)

    this.deleteFromQuery = this.deleteFromQuery.where(column, 'in', values)

    return this
  }

  static whereIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'in', values)

    return instance
  }

  static whereBetween(column: keyof SubscriptionType, range: [any, any]): SubscriptionModel {
    if (range.length !== 2) {
      throw new Error('Range must have exactly two values: [min, max]')
    }

    const instance = new SubscriptionModel(null)

    const query = sql` ${sql.raw(column as string)} between ${range[0]} and ${range[1]} `

    instance.selectFromQuery = instance.selectFromQuery.where(query)
    instance.updateFromQuery = instance.updateFromQuery.where(query)
    instance.deleteFromQuery = instance.deleteFromQuery.where(query)

    return instance
  }

  static whereNotIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'not in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'not in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'not in', values)

    return instance
  }

  whereNotIn(column: keyof SubscriptionType, values: any[]): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.where(column, 'not in', values)

    this.updateFromQuery = this.updateFromQuery.where(column, 'not in', values)

    this.deleteFromQuery = this.deleteFromQuery.where(column, 'not in', values)

    return this
  }

  async first(): Promise<SubscriptionModel | undefined> {
    const model = await this.selectFromQuery.selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  async firstOrFail(): Promise<SubscriptionModel | undefined> {
    const model = await this.selectFromQuery.executeTakeFirst()

    if (model === undefined)
      throw new HttpError(404, 'No SubscriptionModel results found for query')

    const instance = new SubscriptionModel(null)

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  async exists(): Promise<boolean> {
    const model = await this.selectFromQuery.executeTakeFirst()

    return model !== null || model !== undefined
  }

  static async first(): Promise<SubscriptionType | undefined> {
    const model = await db.selectFrom('subscriptions')
      .selectAll()
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
      throw new Error('Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingSubscription = await db.selectFrom('subscriptions')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingSubscription) {
      const instance = new SubscriptionModel(null)
      const result = await instance.mapWith(existingSubscription)
      return new SubscriptionModel(result as SubscriptionType)
    }
    else {
      // If not found, create a new user
      return await this.create(newSubscription)
    }
  }

  static async updateOrCreate(
    condition: Partial<SubscriptionType>,
    newSubscription: NewSubscription,
  ): Promise<SubscriptionModel> {
    const key = Object.keys(condition)[0] as keyof SubscriptionType

    if (!key) {
      throw new Error('Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingSubscription = await db.selectFrom('subscriptions')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingSubscription) {
      // If found, update the existing record
      await db.updateTable('subscriptions')
        .set(newSubscription)
        .where(key, '=', value)
        .executeTakeFirstOrThrow()

      // Fetch and return the updated record
      const updatedSubscription = await db.selectFrom('subscriptions')
        .selectAll()
        .where(key, '=', value)
        .executeTakeFirst()

      if (!updatedSubscription) {
        throw new Error('Failed to fetch updated record')
      }

      const instance = new SubscriptionModel(null)
      const result = await instance.mapWith(updatedSubscription)
      return new SubscriptionModel(result as SubscriptionType)
    }
    else {
      // If not found, create a new record
      return await this.create(newSubscription)
    }
  }

  with(relations: string[]): SubscriptionModel {
    this.withRelations = relations

    return this
  }

  static with(relations: string[]): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.withRelations = relations

    return instance
  }

  async last(): Promise<SubscriptionType | undefined> {
    return await db.selectFrom('subscriptions')
      .selectAll()
      .orderBy('id', 'desc')
      .executeTakeFirst()
  }

  static async last(): Promise<SubscriptionType | undefined> {
    const model = await db.selectFrom('subscriptions').selectAll().orderBy('id', 'desc').executeTakeFirst()

    if (!model)
      return undefined

    const instance = new SubscriptionModel(null)

    const result = await instance.mapWith(model)

    const data = new SubscriptionModel(result as SubscriptionType)

    return data
  }

  static orderBy(column: keyof SubscriptionType, order: 'asc' | 'desc'): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, order)

    return instance
  }

  orderBy(column: keyof SubscriptionType, order: 'asc' | 'desc'): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, order)

    return this
  }

  static orderByDesc(column: keyof SubscriptionType): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'desc')

    return instance
  }

  orderByDesc(column: keyof SubscriptionType): SubscriptionModel {
    this.selectFromQuery = this.orderBy(column, 'desc')

    return this
  }

  static orderByAsc(column: keyof SubscriptionType): SubscriptionModel {
    const instance = new SubscriptionModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'asc')

    return instance
  }

  orderByAsc(column: keyof SubscriptionType): SubscriptionModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, 'desc')

    return this
  }

  async update(subscription: SubscriptionUpdate): Promise<SubscriptionModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(subscription).filter(([key]) => this.fillable.includes(key)),
    ) as NewSubscription

    if (this.id === undefined) {
      this.updateFromQuery.set(filteredValues).execute()
    }

    await db.updateTable('subscriptions')
      .set(filteredValues)
      .where('id', '=', this.id)
      .executeTakeFirst()

    const model = await this.find(this.id)

    return model
  }

  async forceUpdate(subscription: SubscriptionUpdate): Promise<SubscriptionModel | undefined> {
    if (this.id === undefined) {
      this.updateFromQuery.set(subscription).execute()
    }

    await db.updateTable('subscriptions')
      .set(subscription)
      .where('id', '=', this.id)
      .executeTakeFirst()

    const model = await this.find(this.id)

    return model
  }

  async save(): Promise<void> {
    if (!this)
      throw new HttpError(500, 'Subscription data is undefined')

    if (this.id === undefined) {
      await db.insertInto('subscriptions')
        .values(this as NewSubscription)
        .executeTakeFirstOrThrow()
    }
    else {
      await this.update(this)
    }
  }

  // Method to delete (soft delete) the subscription instance
  async delete(): Promise<any> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    return await db.deleteFrom('subscriptions')
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
    return await sql`${rawQuery}`.execute(db)
  }

  toJSON() {
    const output: Partial<SubscriptionType> = {

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
    }

        type Subscription = Omit<SubscriptionType, 'password'>

        return output as Subscription
  }

  parseResult(model: SubscriptionModel): SubscriptionModel {
    for (const hiddenAttribute of this.hidden) {
      delete model[hiddenAttribute as keyof SubscriptionModel]
    }

    return model
  }
}

async function find(id: number): Promise<SubscriptionModel | undefined> {
  const query = db.selectFrom('subscriptions').where('id', '=', id).selectAll()

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
  const result = await db.insertInto('subscriptions')
    .values(newSubscription)
    .executeTakeFirstOrThrow()

  return await find(Number(result.numInsertedOrUpdatedRows)) as SubscriptionModel
}

export async function rawQuery(rawQuery: string): Promise<any> {
  return await sql`${rawQuery}`.execute(db)
}

export async function remove(id: number): Promise<void> {
  await db.deleteFrom('subscriptions')
    .where('id', '=', id)
    .execute()
}

export async function whereType(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('type', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereProviderId(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('provider_id', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereProviderStatus(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('provider_status', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereUnitPrice(value: number): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('unit_price', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereProviderType(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('provider_type', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereProviderPriceId(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('provider_price_id', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereQuantity(value: number): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('quantity', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereTrialEndsAt(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('trial_ends_at', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereEndsAt(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('ends_at', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export async function whereLastUsedAt(value: string): Promise<SubscriptionModel[]> {
  const query = db.selectFrom('subscriptions').where('last_used_at', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new SubscriptionModel(modelItem))
}

export const Subscription = SubscriptionModel

export default Subscription
