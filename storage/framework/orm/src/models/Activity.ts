import type { RawBuilder } from '@stacksjs/database'
import type { Operator } from '@stacksjs/orm'
import type { ActivitiesTable, ActivityJsonResponse, ActivityUpdate, NewActivity } from '../types/ActivityType'
import { sql } from '@stacksjs/database'
import { HttpError } from '@stacksjs/error-handling'
import { DB } from '@stacksjs/orm'

import { BaseOrm } from '../utils/base'

export class ActivityModel extends BaseOrm<ActivityModel, ActivitiesTable, ActivityJsonResponse> {
  private readonly hidden: Array<keyof ActivityJsonResponse> = []
  private readonly fillable: Array<keyof ActivityJsonResponse> = ['title', 'description', 'address', 'latlng', 'info_source', 'were_detained']
  private readonly guarded: Array<keyof ActivityJsonResponse> = []
  protected attributes = {} as ActivityJsonResponse
  protected originalAttributes = {} as ActivityJsonResponse
  private softDeletes = false
  protected selectFromQuery: any
  protected updateFromQuery: any
  protected deleteFromQuery: any
  protected hasSelect: boolean
  private customColumns: Record<string, unknown> = {}

  /**
   * This model inherits many query methods from BaseOrm:
   * - pluck, chunk, whereExists, has, doesntHave, whereHas, whereDoesntHave
   * - inRandomOrder, max, min, avg, paginate, get, and more
   *
   * See BaseOrm class for the full list of inherited methods.
   */

  constructor(activity: ActivityJsonResponse | undefined) {
    super('activities')
    if (activity) {
      this.attributes = { ...activity }
      this.originalAttributes = { ...activity }

      Object.keys(activity).forEach((key) => {
        if (!(key in this)) {
          this.customColumns[key] = (activity as ActivityJsonResponse)[key]
        }
      })
    }

    this.withRelations = []
    this.selectFromQuery = DB.instance.selectFrom('activities')
    this.updateFromQuery = DB.instance.updateTable('activities')
    this.deleteFromQuery = DB.instance.deleteFrom('activities')
    this.hasSelect = false
  }

  protected async loadRelations(models: ActivityJsonResponse | ActivityJsonResponse[]): Promise<void> {
    // Handle both single model and array of models
    const modelArray = Array.isArray(models) ? models : [models]
    if (!modelArray.length)
      return

    const modelIds = modelArray.map(model => model.id)

    for (const relation of this.withRelations) {
      const relatedRecords = await DB.instance
        .selectFrom(relation)
        .where('activity_id', 'in', modelIds)
        .selectAll()
        .execute()

      if (Array.isArray(models)) {
        models.map((model: ActivityJsonResponse) => {
          const records = relatedRecords.filter((record: { activity_id: number }) => {
            return record.activity_id === model.id
          })

          model[relation] = records.length === 1 ? records[0] : records
          return model
        })
      }
      else {
        const records = relatedRecords.filter((record: { activity_id: number }) => {
          return record.activity_id === models.id
        })

        models[relation] = records.length === 1 ? records[0] : records
      }
    }
  }

  static with(relations: string[]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWith(relations)
  }

  protected mapCustomGetters(models: ActivityJsonResponse | ActivityJsonResponse[]): void {
    const data = models

    if (Array.isArray(data)) {
      data.map((model: ActivityJsonResponse) => {
        const customGetter = {
          default: () => {
          },

        }

        for (const [key, fn] of Object.entries(customGetter)) {
          (model as any)[key] = fn()
        }

        return model
      })
    }
    else {
      const model = data

      const customGetter = {
        default: () => {
        },

      }

      for (const [key, fn] of Object.entries(customGetter)) {
        (model as any)[key] = fn()
      }
    }
  }

  async mapCustomSetters(model: NewActivity | ActivityUpdate): Promise<void> {
    const customSetter = {
      default: () => {
      },

    }

    for (const [key, fn] of Object.entries(customSetter)) {
      (model as any)[key] = await fn()
    }
  }

  get id(): number {
    return this.attributes.id
  }

  get title(): string | undefined {
    return this.attributes.title
  }

  get description(): string | undefined {
    return this.attributes.description
  }

  get address(): string | undefined {
    return this.attributes.address
  }

  get latlng(): string | undefined {
    return this.attributes.latlng
  }

  get info_source(): string | string[] | undefined {
    return this.attributes.info_source
  }

  get were_detained(): boolean | undefined {
    return this.attributes.were_detained
  }

  get created_at(): string | undefined {
    return this.attributes.created_at
  }

  get updated_at(): string | undefined {
    return this.attributes.updated_at
  }

  get deleted_at(): string | undefined {
    return this.attributes.deleted_at
  }

  set title(value: string) {
    this.attributes.title = value
  }

  set description(value: string) {
    this.attributes.description = value
  }

  set address(value: string) {
    this.attributes.address = value
  }

  set latlng(value: string) {
    this.attributes.latlng = value
  }

  set info_source(value: string | string[]) {
    this.attributes.info_source = value
  }

  set were_detained(value: boolean) {
    this.attributes.were_detained = value
  }

  set updated_at(value: string) {
    this.attributes.updated_at = value
  }

  set deleted_at(value: string) {
    this.attributes.deleted_at = value
  }

  static select(params: (keyof ActivityJsonResponse)[] | RawBuilder<string> | string): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applySelect(params)
  }

  // Method to find a Activity by ID
  static async find(id: number): Promise<ActivityModel | undefined> {
    const query = DB.instance.selectFrom('activities').where('id', '=', id).selectAll()

    const model = await query.executeTakeFirst()

    if (!model)
      return undefined

    const instance = new ActivityModel(undefined)
    return instance.createInstance(model)
  }

  static async first(): Promise<ActivityModel | undefined> {
    const instance = new ActivityModel(undefined)

    const model = await instance.applyFirst()

    const data = new ActivityModel(model)

    return data
  }

  static async last(): Promise<ActivityModel | undefined> {
    const instance = new ActivityModel(undefined)

    const model = await instance.applyLast()

    if (!model)
      return undefined

    return new ActivityModel(model)
  }

  static async firstOrFail(): Promise<ActivityModel | undefined> {
    const instance = new ActivityModel(undefined)

    return await instance.applyFirstOrFail()
  }

  static async all(): Promise<ActivityModel[]> {
    const instance = new ActivityModel(undefined)

    const models = await DB.instance.selectFrom('activities').selectAll().execute()

    instance.mapCustomGetters(models)

    const data = await Promise.all(models.map(async (model: ActivityJsonResponse) => {
      return new ActivityModel(model)
    }))

    return data
  }

  static async findOrFail(id: number): Promise<ActivityModel | undefined> {
    const instance = new ActivityModel(undefined)

    return await instance.applyFindOrFail(id)
  }

  static async findMany(ids: number[]): Promise<ActivityModel[]> {
    const instance = new ActivityModel(undefined)
    if (instance.softDeletes) {
      query = query.where('deleted_at', 'is', null)
    }
    const models = await instance.applyFindMany(ids)

    return models.map((modelItem: ActivityJsonResponse) => instance.parseResult(new ActivityModel(modelItem)))
  }

  static async latest(column: keyof ActivitiesTable = 'created_at'): Promise<ActivityModel | undefined> {
    const instance = new ActivityModel(undefined)

    const model = await instance.selectFromQuery
      .selectAll()
      .orderBy(column, 'desc')
      .limit(1)
      .executeTakeFirst()

    if (!model)
      return undefined

    return new ActivityModel(model)
  }

  static async oldest(column: keyof ActivitiesTable = 'created_at'): Promise<ActivityModel | undefined> {
    const instance = new ActivityModel(undefined)

    const model = await instance.selectFromQuery
      .selectAll()
      .orderBy(column, 'asc')
      .limit(1)
      .executeTakeFirst()

    if (!model)
      return undefined

    return new ActivityModel(model)
  }

  static skip(count: number): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applySkip(count)
  }

  static take(count: number): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyTake(count)
  }

  static where<V = string>(column: keyof ActivitiesTable, ...args: [V] | [Operator, V]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhere<V>(column, ...args)
  }

  static orWhere(...conditions: [string, any][]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyOrWhere(...conditions)
  }

  static whereNotIn<V = number>(column: keyof ActivitiesTable, values: V[]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereNotIn<V>(column, values)
  }

  static whereBetween<V = number>(column: keyof ActivitiesTable, range: [V, V]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereBetween<V>(column, range)
  }

  static whereRef(column: keyof ActivitiesTable, ...args: string[]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereRef(column, ...args)
  }

  static when(condition: boolean, callback: (query: ActivityModel) => ActivityModel): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhen(condition, callback as any)
  }

  static whereNull(column: keyof ActivitiesTable): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereNull(column)
  }

  static whereNotNull(column: keyof ActivitiesTable): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereNotNull(column)
  }

  static whereLike(column: keyof ActivitiesTable, value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereLike(column, value)
  }

  static orderBy(column: keyof ActivitiesTable, order: 'asc' | 'desc'): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyOrderBy(column, order)
  }

  static orderByAsc(column: keyof ActivitiesTable): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyOrderByAsc(column)
  }

  static orderByDesc(column: keyof ActivitiesTable): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyOrderByDesc(column)
  }

  static groupBy(column: keyof ActivitiesTable): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyGroupBy(column)
  }

  static having<V = string>(column: keyof ActivitiesTable, operator: Operator, value: V): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyHaving<V>(column, operator, value)
  }

  static inRandomOrder(): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyInRandomOrder()
  }

  static whereColumn(first: keyof ActivitiesTable, operator: Operator, second: keyof ActivitiesTable): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereColumn(first, operator, second)
  }

  static async max(field: keyof ActivitiesTable): Promise<number> {
    const instance = new ActivityModel(undefined)

    return await instance.applyMax(field)
  }

  static async min(field: keyof ActivitiesTable): Promise<number> {
    const instance = new ActivityModel(undefined)

    return await instance.applyMin(field)
  }

  static async avg(field: keyof ActivitiesTable): Promise<number> {
    const instance = new ActivityModel(undefined)

    return await instance.applyAvg(field)
  }

  static async sum(field: keyof ActivitiesTable): Promise<number> {
    const instance = new ActivityModel(undefined)

    return await instance.applySum(field)
  }

  static async count(): Promise<number> {
    const instance = new ActivityModel(undefined)

    return instance.applyCount()
  }

  static async get(): Promise<ActivityModel[]> {
    const instance = new ActivityModel(undefined)

    const results = await instance.applyGet()

    return results.map((item: ActivityJsonResponse) => instance.createInstance(item))
  }

  static async pluck<K extends keyof ActivityModel>(field: K): Promise<ActivityModel[K][]> {
    const instance = new ActivityModel(undefined)

    return await instance.applyPluck(field)
  }

  static async chunk(size: number, callback: (models: ActivityModel[]) => Promise<void>): Promise<void> {
    const instance = new ActivityModel(undefined)

    await instance.applyChunk(size, async (models) => {
      const modelInstances = models.map((item: ActivityJsonResponse) => instance.createInstance(item))
      await callback(modelInstances)
    })
  }

  static async paginate(options: { limit?: number, offset?: number, page?: number } = { limit: 10, offset: 0, page: 1 }): Promise<{
    data: ActivityModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }> {
    const instance = new ActivityModel(undefined)

    const result = await instance.applyPaginate(options)

    return {
      data: result.data.map((item: ActivityJsonResponse) => instance.createInstance(item)),
      paging: result.paging,
      next_cursor: result.next_cursor,
    }
  }

  // Instance method for creating model instances
  createInstance(data: ActivityJsonResponse): ActivityModel {
    return new ActivityModel(data)
  }

  async applyCreate(newActivity: NewActivity): Promise<ActivityModel> {
    const filteredValues = Object.fromEntries(
      Object.entries(newActivity).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewActivity

    await this.mapCustomSetters(filteredValues)

    const result = await DB.instance.insertInto('activities')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await DB.instance.selectFrom('activities')
      .where('id', '=', Number(result.insertId || result.numInsertedOrUpdatedRows))
      .selectAll()
      .executeTakeFirst()

    if (!model) {
      throw new HttpError(500, 'Failed to retrieve created Activity')
    }

    return this.createInstance(model)
  }

  async create(newActivity: NewActivity): Promise<ActivityModel> {
    return await this.applyCreate(newActivity)
  }

  static async create(newActivity: NewActivity): Promise<ActivityModel> {
    const instance = new ActivityModel(undefined)
    return await instance.applyCreate(newActivity)
  }

  static async firstOrCreate(search: Partial<ActivitiesTable>, values: NewActivity = {} as NewActivity): Promise<ActivityModel> {
    // First try to find a record matching the search criteria
    const instance = new ActivityModel(undefined)

    // Apply all search conditions
    for (const [key, value] of Object.entries(search)) {
      instance.selectFromQuery = instance.selectFromQuery.where(key, '=', value)
    }

    // Try to find the record
    const existingRecord = await instance.applyFirst()

    if (existingRecord) {
      return instance.createInstance(existingRecord)
    }

    // If no record exists, create a new one with combined search criteria and values
    const createData = { ...search, ...values } as NewActivity
    return await ActivityModel.create(createData)
  }

  static async updateOrCreate(search: Partial<ActivitiesTable>, values: NewActivity = {} as NewActivity): Promise<ActivityModel> {
    // First try to find a record matching the search criteria
    const instance = new ActivityModel(undefined)

    // Apply all search conditions
    for (const [key, value] of Object.entries(search)) {
      instance.selectFromQuery = instance.selectFromQuery.where(key, '=', value)
    }

    // Try to find the record
    const existingRecord = await instance.applyFirst()

    if (existingRecord) {
      // If record exists, update it with the new values
      const model = instance.createInstance(existingRecord)
      const updatedModel = await model.update(values as ActivityUpdate)

      // Return the updated model instance
      if (updatedModel) {
        return updatedModel
      }

      // If update didn't return a model, fetch it again to ensure we have latest data
      const refreshedModel = await instance.applyFirst()
      return instance.createInstance(refreshedModel!)
    }

    // If no record exists, create a new one with combined search criteria and values
    const createData = { ...search, ...values } as NewActivity
    return await ActivityModel.create(createData)
  }

  async update(newActivity: ActivityUpdate): Promise<ActivityModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(newActivity).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as ActivityUpdate

    await this.mapCustomSetters(filteredValues)

    filteredValues.updated_at = new Date().toISOString()

    await DB.instance.updateTable('activities')
      .set(filteredValues)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      // Get the updated data
      const model = await DB.instance.selectFrom('activities')
        .where('id', '=', this.id)
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve updated Activity')
      }

      return this.createInstance(model)
    }

    return undefined
  }

  async forceUpdate(newActivity: ActivityUpdate): Promise<ActivityModel | undefined> {
    await DB.instance.updateTable('activities')
      .set(newActivity)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      // Get the updated data
      const model = await DB.instance.selectFrom('activities')
        .where('id', '=', this.id)
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve updated Activity')
      }

      return this.createInstance(model)
    }

    return undefined
  }

  async save(): Promise<ActivityModel> {
    // If the model has an ID, update it; otherwise, create a new record
    if (this.id) {
      // Update existing record
      await DB.instance.updateTable('activities')
        .set(this.attributes as ActivityUpdate)
        .where('id', '=', this.id)
        .executeTakeFirst()

      // Get the updated data
      const model = await DB.instance.selectFrom('activities')
        .where('id', '=', this.id)
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve updated Activity')
      }

      return this.createInstance(model)
    }
    else {
      // Create new record
      const result = await DB.instance.insertInto('activities')
        .values(this.attributes as NewActivity)
        .executeTakeFirst()

      // Get the created data
      const model = await DB.instance.selectFrom('activities')
        .where('id', '=', Number(result.insertId || result.numInsertedOrUpdatedRows))
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve created Activity')
      }

      return this.createInstance(model)
    }
  }

  static async createMany(newActivity: NewActivity[]): Promise<void> {
    const instance = new ActivityModel(undefined)

    const valuesFiltered = newActivity.map((newActivity: NewActivity) => {
      const filteredValues = Object.fromEntries(
        Object.entries(newActivity).filter(([key]) =>
          !instance.guarded.includes(key) && instance.fillable.includes(key),
        ),
      ) as NewActivity

      return filteredValues
    })

    await DB.instance.insertInto('activities')
      .values(valuesFiltered)
      .executeTakeFirst()
  }

  static async forceCreate(newActivity: NewActivity): Promise<ActivityModel> {
    const result = await DB.instance.insertInto('activities')
      .values(newActivity)
      .executeTakeFirst()

    const instance = new ActivityModel(undefined)
    const model = await DB.instance.selectFrom('activities')
      .where('id', '=', Number(result.insertId || result.numInsertedOrUpdatedRows))
      .selectAll()
      .executeTakeFirst()

    if (!model) {
      throw new HttpError(500, 'Failed to retrieve created Activity')
    }

    return instance.createInstance(model)
  }

  // Method to remove a Activity
  async delete(): Promise<number> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    if (instance.softDeletes) {
      query = query.where('deleted_at', 'is', null)
    }

    const deleted = await DB.instance.deleteFrom('activities')
      .where('id', '=', this.id)
      .execute()

    return deleted.numDeletedRows
  }

  static async remove(id: number): Promise<any> {
    const instance = new ActivityModel(undefined)

    if (instance.softDeletes) {
      return await DB.instance.updateTable('activities')
        .set({
          deleted_at: sql.raw('CURRENT_TIMESTAMP'),
        })
        .where('id', '=', id)
        .execute()
    }

    return await DB.instance.deleteFrom('activities')
      .where('id', '=', id)
      .execute()
  }

  static whereTitle(value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('title', '=', value)

    return instance
  }

  static whereDescription(value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('description', '=', value)

    return instance
  }

  static whereAddress(value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('address', '=', value)

    return instance
  }

  static whereLatlng(value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('latlng', '=', value)

    return instance
  }

  static whereInfoSource(value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('info_source', '=', value)

    return instance
  }

  static whereWereDetained(value: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('were_detained', '=', value)

    return instance
  }

  static whereIn<V = number>(column: keyof ActivitiesTable, values: V[]): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyWhereIn<V>(column, values)
  }

  async getLikeCount(): Promise<number> {
    const result = await DB.instance
      .selectFrom('activities_likes')
      .select('count(*) as count')
      .where('activity_id', '=', this.id)
      .executeTakeFirst()

    return Number(result?.count) || 0
  }

  async likes(): Promise<number> {
    return this.getLikeCount()
  }

  async like(userId: number): Promise<void> {
    const authUserId = userId || 1

    await DB.instance
      .insertInto('activities_likes')
      .values({
        activity_id: this.id,
        user_id: authUserId,
      })
      .execute()
  }

  async unlike(userId: number): Promise<void> {
    const authUserId = userId || 1
    await DB.instance
      .deleteFrom('activities_likes')
      .where('activity_id', '=', this.id)
      .where('user_id', '=', authUserId)
      .execute()
  }

  async isLiked(userId: number): Promise<boolean> {
    const authUserId = userId || 1

    const like = await DB.instance
      .selectFrom('activities_likes')
      .select('id')
      .where('activity_id', '=', this.id)
      .where('user_id', '=', authUserId)
      .executeTakeFirst()

    return !!like
  }

  static distinct(column: keyof ActivityJsonResponse): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyDistinct(column)
  }

  static join(table: string, firstCol: string, secondCol: string): ActivityModel {
    const instance = new ActivityModel(undefined)

    return instance.applyJoin(table, firstCol, secondCol)
  }

  toJSON(): ActivityJsonResponse {
    const output = {

      id: this.id,
      title: this.title,
      description: this.description,
      address: this.address,
      latlng: this.latlng,
      info_source: this.info_source,
      were_detained: this.were_detained,

      created_at: this.created_at,

      updated_at: this.updated_at,

      deleted_at: this.deleted_at,

      ...this.customColumns,
    }

    return output
  }

  parseResult(model: ActivityModel): ActivityModel {
    for (const hiddenAttribute of this.hidden) {
      delete model[hiddenAttribute as keyof ActivityModel]
    }

    return model
  }

  // Add a protected applyFind implementation
  protected async applyFind(id: number): Promise<ActivityModel | undefined> {
    const model = await DB.instance.selectFrom(this.tableName)
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()

    if (!model)
      return undefined

    this.mapCustomGetters(model)

    await this.loadRelations(model)

    // Return a proper instance using the factory method
    return this.createInstance(model)
  }
}

export async function find(id: number): Promise<ActivityModel | undefined> {
  const query = DB.instance.selectFrom('activities').where('id', '=', id).selectAll()

  const model = await query.executeTakeFirst()

  if (!model)
    return undefined

  const instance = new ActivityModel(undefined)
  return instance.createInstance(model)
}

export async function count(): Promise<number> {
  const results = await ActivityModel.count()

  return results
}

export async function create(newActivity: NewActivity): Promise<ActivityModel> {
  const instance = new ActivityModel(undefined)
  return await instance.applyCreate(newActivity)
}

export async function rawQuery(rawQuery: string): Promise<any> {
  return await sql`${rawQuery}`.execute(DB.instance)
}

export async function remove(id: number): Promise<void> {
  await DB.instance.deleteFrom('activities')
    .where('id', '=', id)
    .execute()
}

export async function whereTitle(value: string): Promise<ActivityModel[]> {
  const query = DB.instance.selectFrom('activities').where('title', '=', value)
  const results: ActivityJsonResponse = await query.execute()

  return results.map((modelItem: ActivityJsonResponse) => new ActivityModel(modelItem))
}

export async function whereDescription(value: string): Promise<ActivityModel[]> {
  const query = DB.instance.selectFrom('activities').where('description', '=', value)
  const results: ActivityJsonResponse = await query.execute()

  return results.map((modelItem: ActivityJsonResponse) => new ActivityModel(modelItem))
}

export async function whereAddress(value: string): Promise<ActivityModel[]> {
  const query = DB.instance.selectFrom('activities').where('address', '=', value)
  const results: ActivityJsonResponse = await query.execute()

  return results.map((modelItem: ActivityJsonResponse) => new ActivityModel(modelItem))
}

export async function whereLatlng(value: string): Promise<ActivityModel[]> {
  const query = DB.instance.selectFrom('activities').where('latlng', '=', value)
  const results: ActivityJsonResponse = await query.execute()

  return results.map((modelItem: ActivityJsonResponse) => new ActivityModel(modelItem))
}

export async function whereInfoSource(value: string | string[]): Promise<ActivityModel[]> {
  const query = DB.instance.selectFrom('activities').where('info_source', '=', value)
  const results: ActivityJsonResponse = await query.execute()

  return results.map((modelItem: ActivityJsonResponse) => new ActivityModel(modelItem))
}

export async function whereWereDetained(value: boolean): Promise<ActivityModel[]> {
  const query = DB.instance.selectFrom('activities').where('were_detained', '=', value)
  const results: ActivityJsonResponse = await query.execute()

  return results.map((modelItem: ActivityJsonResponse) => new ActivityModel(modelItem))
}

export const Activity = ActivityModel

export default Activity
