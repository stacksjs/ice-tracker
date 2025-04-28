import type { Generated, Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { CategorizableTable, commentablesTable, Operator, TaggableTable } from '@stacksjs/orm'
import type { AuthorModel } from './Author'
import { randomUUIDv7 } from 'bun'
import { sql } from '@stacksjs/database'
import { HttpError } from '@stacksjs/error-handling'
import { DB } from '@stacksjs/orm'

import { BaseOrm } from '../utils/base'

export interface PostsTable {
  id: Generated<number>
  author_id: number
  title: string
  category: string
  poster?: string
  body: string
  views?: number
  published_at: number
  status: string | string[]
  uuid?: string

  created_at?: string

  updated_at?: string

}

// Type for reading model data (created_at is required)
export type PostRead = PostsTable

// Type for creating/updating model data (created_at is optional)
export type PostWrite = Omit<PostsTable, 'created_at'> & {
  created_at?: string
}

export interface PostResponse {
  data: PostJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PostJsonResponse extends Omit<Selectable<PostRead>, 'password'> {
  [key: string]: any
}

export type NewPost = Insertable<PostWrite>
export type PostUpdate = Updateable<PostWrite>

export class PostModel extends BaseOrm<PostModel, PostsTable, PostJsonResponse> {
  private readonly hidden: Array<keyof PostJsonResponse> = []
  private readonly fillable: Array<keyof PostJsonResponse> = ['title', 'category', 'poster', 'body', 'views', 'published_at', 'status', 'uuid', 'user_id', 'author_id']
  private readonly guarded: Array<keyof PostJsonResponse> = []
  protected attributes = {} as PostJsonResponse
  protected originalAttributes = {} as PostJsonResponse

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

  constructor(post: PostJsonResponse | undefined) {
    super('posts')
    if (post) {
      this.attributes = { ...post }
      this.originalAttributes = { ...post }

      Object.keys(post).forEach((key) => {
        if (!(key in this)) {
          this.customColumns[key] = (post as PostJsonResponse)[key]
        }
      })
    }

    this.withRelations = []
    this.selectFromQuery = DB.instance.selectFrom('posts')
    this.updateFromQuery = DB.instance.updateTable('posts')
    this.deleteFromQuery = DB.instance.deleteFrom('posts')
    this.hasSelect = false
  }

  protected async loadRelations(models: PostJsonResponse | PostJsonResponse[]): Promise<void> {
    // Handle both single model and array of models
    const modelArray = Array.isArray(models) ? models : [models]
    if (!modelArray.length)
      return

    const modelIds = modelArray.map(model => model.id)

    for (const relation of this.withRelations) {
      const relatedRecords = await DB.instance
        .selectFrom(relation)
        .where('post_id', 'in', modelIds)
        .selectAll()
        .execute()

      if (Array.isArray(models)) {
        models.map((model: PostJsonResponse) => {
          const records = relatedRecords.filter((record: { post_id: number }) => {
            return record.post_id === model.id
          })

          model[relation] = records.length === 1 ? records[0] : records
          return model
        })
      }
      else {
        const records = relatedRecords.filter((record: { post_id: number }) => {
          return record.post_id === models.id
        })

        models[relation] = records.length === 1 ? records[0] : records
      }
    }
  }

  static with(relations: string[]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWith(relations)
  }

  protected mapCustomGetters(models: PostJsonResponse | PostJsonResponse[]): void {
    const data = models

    if (Array.isArray(data)) {
      data.map((model: PostJsonResponse) => {
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

  async mapCustomSetters(model: NewPost | PostUpdate): Promise<void> {
    const customSetter = {
      default: () => {
      },

    }

    for (const [key, fn] of Object.entries(customSetter)) {
      (model as any)[key] = await fn()
    }
  }

  get author_id(): number {
    return this.attributes.author_id
  }

  get author(): AuthorModel | undefined {
    return this.attributes.author
  }

  get id(): number {
    return this.attributes.id
  }

  get uuid(): string | undefined {
    return this.attributes.uuid
  }

  get title(): string {
    return this.attributes.title
  }

  get category(): string {
    return this.attributes.category
  }

  get poster(): string | undefined {
    return this.attributes.poster
  }

  get body(): string {
    return this.attributes.body
  }

  get views(): number | undefined {
    return this.attributes.views
  }

  get published_at(): number {
    return this.attributes.published_at
  }

  get status(): string | string[] {
    return this.attributes.status
  }

  get created_at(): string | undefined {
    return this.attributes.created_at
  }

  get updated_at(): string | undefined {
    return this.attributes.updated_at
  }

  set uuid(value: string) {
    this.attributes.uuid = value
  }

  set title(value: string) {
    this.attributes.title = value
  }

  set category(value: string) {
    this.attributes.category = value
  }

  set poster(value: string) {
    this.attributes.poster = value
  }

  set body(value: string) {
    this.attributes.body = value
  }

  set views(value: number) {
    this.attributes.views = value
  }

  set published_at(value: number) {
    this.attributes.published_at = value
  }

  set status(value: string | string[]) {
    this.attributes.status = value
  }

  set updated_at(value: string) {
    this.attributes.updated_at = value
  }

  static select(params: (keyof PostJsonResponse)[] | RawBuilder<string> | string): PostModel {
    const instance = new PostModel(undefined)

    return instance.applySelect(params)
  }

  // Method to find a Post by ID
  static async find(id: number): Promise<PostModel | undefined> {
    const query = DB.instance.selectFrom('posts').where('id', '=', id).selectAll()

    const model = await query.executeTakeFirst()

    if (!model)
      return undefined

    const instance = new PostModel(undefined)
    return instance.createInstance(model)
  }

  static async first(): Promise<PostModel | undefined> {
    const instance = new PostModel(undefined)

    const model = await instance.applyFirst()

    const data = new PostModel(model)

    return data
  }

  static async last(): Promise<PostModel | undefined> {
    const instance = new PostModel(undefined)

    const model = await instance.applyLast()

    if (!model)
      return undefined

    return new PostModel(model)
  }

  static async firstOrFail(): Promise<PostModel | undefined> {
    const instance = new PostModel(undefined)

    return await instance.applyFirstOrFail()
  }

  static async all(): Promise<PostModel[]> {
    const instance = new PostModel(undefined)

    const models = await DB.instance.selectFrom('posts').selectAll().execute()

    instance.mapCustomGetters(models)

    const data = await Promise.all(models.map(async (model: PostJsonResponse) => {
      return new PostModel(model)
    }))

    return data
  }

  static async findOrFail(id: number): Promise<PostModel | undefined> {
    const instance = new PostModel(undefined)

    return await instance.applyFindOrFail(id)
  }

  static async findMany(ids: number[]): Promise<PostModel[]> {
    const instance = new PostModel(undefined)

    const models = await instance.applyFindMany(ids)

    return models.map((modelItem: PostJsonResponse) => instance.parseResult(new PostModel(modelItem)))
  }

  static async latest(column: keyof PostsTable = 'created_at'): Promise<PostModel | undefined> {
    const instance = new PostModel(undefined)

    const model = await instance.selectFromQuery
      .selectAll()
      .orderBy(column, 'desc')
      .limit(1)
      .executeTakeFirst()

    if (!model)
      return undefined

    return new PostModel(model)
  }

  static async oldest(column: keyof PostsTable = 'created_at'): Promise<PostModel | undefined> {
    const instance = new PostModel(undefined)

    const model = await instance.selectFromQuery
      .selectAll()
      .orderBy(column, 'asc')
      .limit(1)
      .executeTakeFirst()

    if (!model)
      return undefined

    return new PostModel(model)
  }

  static skip(count: number): PostModel {
    const instance = new PostModel(undefined)

    return instance.applySkip(count)
  }

  static take(count: number): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyTake(count)
  }

  static where<V = string>(column: keyof PostsTable, ...args: [V] | [Operator, V]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhere<V>(column, ...args)
  }

  static orWhere(...conditions: [string, any][]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyOrWhere(...conditions)
  }

  static whereNotIn<V = number>(column: keyof PostsTable, values: V[]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereNotIn<V>(column, values)
  }

  static whereBetween<V = number>(column: keyof PostsTable, range: [V, V]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereBetween<V>(column, range)
  }

  static whereRef(column: keyof PostsTable, ...args: string[]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereRef(column, ...args)
  }

  static when(condition: boolean, callback: (query: PostModel) => PostModel): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhen(condition, callback as any)
  }

  static whereNull(column: keyof PostsTable): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereNull(column)
  }

  static whereNotNull(column: keyof PostsTable): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereNotNull(column)
  }

  static whereLike(column: keyof PostsTable, value: string): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereLike(column, value)
  }

  static orderBy(column: keyof PostsTable, order: 'asc' | 'desc'): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyOrderBy(column, order)
  }

  static orderByAsc(column: keyof PostsTable): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyOrderByAsc(column)
  }

  static orderByDesc(column: keyof PostsTable): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyOrderByDesc(column)
  }

  static groupBy(column: keyof PostsTable): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyGroupBy(column)
  }

  static having<V = string>(column: keyof PostsTable, operator: Operator, value: V): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyHaving<V>(column, operator, value)
  }

  static inRandomOrder(): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyInRandomOrder()
  }

  static whereColumn(first: keyof PostsTable, operator: Operator, second: keyof PostsTable): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereColumn(first, operator, second)
  }

  static async max(field: keyof PostsTable): Promise<number> {
    const instance = new PostModel(undefined)

    return await instance.applyMax(field)
  }

  static async min(field: keyof PostsTable): Promise<number> {
    const instance = new PostModel(undefined)

    return await instance.applyMin(field)
  }

  static async avg(field: keyof PostsTable): Promise<number> {
    const instance = new PostModel(undefined)

    return await instance.applyAvg(field)
  }

  static async sum(field: keyof PostsTable): Promise<number> {
    const instance = new PostModel(undefined)

    return await instance.applySum(field)
  }

  static async count(): Promise<number> {
    const instance = new PostModel(undefined)

    return instance.applyCount()
  }

  static async get(): Promise<PostModel[]> {
    const instance = new PostModel(undefined)

    const results = await instance.applyGet()

    return results.map((item: PostJsonResponse) => instance.createInstance(item))
  }

  static async pluck<K extends keyof PostModel>(field: K): Promise<PostModel[K][]> {
    const instance = new PostModel(undefined)

    return await instance.applyPluck(field)
  }

  static async chunk(size: number, callback: (models: PostModel[]) => Promise<void>): Promise<void> {
    const instance = new PostModel(undefined)

    await instance.applyChunk(size, async (models) => {
      const modelInstances = models.map((item: PostJsonResponse) => instance.createInstance(item))
      await callback(modelInstances)
    })
  }

  static async paginate(options: { limit?: number, offset?: number, page?: number } = { limit: 10, offset: 0, page: 1 }): Promise<{
    data: PostModel[]
    paging: {
      total_records: number
      page: number
      total_pages: number
    }
    next_cursor: number | null
  }> {
    const instance = new PostModel(undefined)

    const result = await instance.applyPaginate(options)

    return {
      data: result.data.map((item: PostJsonResponse) => instance.createInstance(item)),
      paging: result.paging,
      next_cursor: result.next_cursor,
    }
  }

  // Instance method for creating model instances
  createInstance(data: PostJsonResponse): PostModel {
    return new PostModel(data)
  }

  async applyCreate(newPost: NewPost): Promise<PostModel> {
    const filteredValues = Object.fromEntries(
      Object.entries(newPost).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewPost

    await this.mapCustomSetters(filteredValues)

    filteredValues.uuid = randomUUIDv7()

    const result = await DB.instance.insertInto('posts')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await DB.instance.selectFrom('posts')
      .where('id', '=', Number(result.insertId || result.numInsertedOrUpdatedRows))
      .selectAll()
      .executeTakeFirst()

    if (!model) {
      throw new HttpError(500, 'Failed to retrieve created Post')
    }

    return this.createInstance(model)
  }

  async create(newPost: NewPost): Promise<PostModel> {
    return await this.applyCreate(newPost)
  }

  static async create(newPost: NewPost): Promise<PostModel> {
    const instance = new PostModel(undefined)
    return await instance.applyCreate(newPost)
  }

  static async firstOrCreate(search: Partial<PostsTable>, values: NewPost = {} as NewPost): Promise<PostModel> {
    // First try to find a record matching the search criteria
    const instance = new PostModel(undefined)

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
    const createData = { ...search, ...values } as NewPost
    return await PostModel.create(createData)
  }

  static async updateOrCreate(search: Partial<PostsTable>, values: NewPost = {} as NewPost): Promise<PostModel> {
    // First try to find a record matching the search criteria
    const instance = new PostModel(undefined)

    // Apply all search conditions
    for (const [key, value] of Object.entries(search)) {
      instance.selectFromQuery = instance.selectFromQuery.where(key, '=', value)
    }

    // Try to find the record
    const existingRecord = await instance.applyFirst()

    if (existingRecord) {
      // If record exists, update it with the new values
      const model = instance.createInstance(existingRecord)
      const updatedModel = await model.update(values as PostUpdate)

      // Return the updated model instance
      if (updatedModel) {
        return updatedModel
      }

      // If update didn't return a model, fetch it again to ensure we have latest data
      const refreshedModel = await instance.applyFirst()
      return instance.createInstance(refreshedModel!)
    }

    // If no record exists, create a new one with combined search criteria and values
    const createData = { ...search, ...values } as NewPost
    return await PostModel.create(createData)
  }

  async update(newPost: PostUpdate): Promise<PostModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(newPost).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as PostUpdate

    await this.mapCustomSetters(filteredValues)

    filteredValues.updated_at = new Date().toISOString()

    await DB.instance.updateTable('posts')
      .set(filteredValues)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      // Get the updated data
      const model = await DB.instance.selectFrom('posts')
        .where('id', '=', this.id)
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve updated Post')
      }

      return this.createInstance(model)
    }

    return undefined
  }

  async forceUpdate(newPost: PostUpdate): Promise<PostModel | undefined> {
    await DB.instance.updateTable('posts')
      .set(newPost)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      // Get the updated data
      const model = await DB.instance.selectFrom('posts')
        .where('id', '=', this.id)
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve updated Post')
      }

      return this.createInstance(model)
    }

    return undefined
  }

  async save(): Promise<PostModel> {
    // If the model has an ID, update it; otherwise, create a new record
    if (this.id) {
      // Update existing record
      await DB.instance.updateTable('posts')
        .set(this.attributes as PostUpdate)
        .where('id', '=', this.id)
        .executeTakeFirst()

      // Get the updated data
      const model = await DB.instance.selectFrom('posts')
        .where('id', '=', this.id)
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve updated Post')
      }

      return this.createInstance(model)
    }
    else {
      // Create new record
      const result = await DB.instance.insertInto('posts')
        .values(this.attributes as NewPost)
        .executeTakeFirst()

      // Get the created data
      const model = await DB.instance.selectFrom('posts')
        .where('id', '=', Number(result.insertId || result.numInsertedOrUpdatedRows))
        .selectAll()
        .executeTakeFirst()

      if (!model) {
        throw new HttpError(500, 'Failed to retrieve created Post')
      }

      return this.createInstance(model)
    }
  }

  static async createMany(newPost: NewPost[]): Promise<void> {
    const instance = new PostModel(undefined)

    const valuesFiltered = newPost.map((newPost: NewPost) => {
      const filteredValues = Object.fromEntries(
        Object.entries(newPost).filter(([key]) =>
          !instance.guarded.includes(key) && instance.fillable.includes(key),
        ),
      ) as NewPost

      filteredValues.uuid = randomUUIDv7()

      return filteredValues
    })

    await DB.instance.insertInto('posts')
      .values(valuesFiltered)
      .executeTakeFirst()
  }

  static async forceCreate(newPost: NewPost): Promise<PostModel> {
    const result = await DB.instance.insertInto('posts')
      .values(newPost)
      .executeTakeFirst()

    const instance = new PostModel(undefined)
    const model = await DB.instance.selectFrom('posts')
      .where('id', '=', Number(result.insertId || result.numInsertedOrUpdatedRows))
      .selectAll()
      .executeTakeFirst()

    if (!model) {
      throw new HttpError(500, 'Failed to retrieve created Post')
    }

    return instance.createInstance(model)
  }

  // Method to remove a Post
  async delete(): Promise<number> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    const deleted = await DB.instance.deleteFrom('posts')
      .where('id', '=', this.id)
      .execute()

    return deleted.numDeletedRows
  }

  static async remove(id: number): Promise<any> {
    return await DB.instance.deleteFrom('posts')
      .where('id', '=', id)
      .execute()
  }

  static whereTitle(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('title', '=', value)

    return instance
  }

  static whereCategory(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('category', '=', value)

    return instance
  }

  static wherePoster(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('poster', '=', value)

    return instance
  }

  static whereBody(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('body', '=', value)

    return instance
  }

  static whereViews(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('views', '=', value)

    return instance
  }

  static wherePublishedAt(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('published_at', '=', value)

    return instance
  }

  static whereStatus(value: string): PostModel {
    const instance = new PostModel(undefined)

    instance.selectFromQuery = instance.selectFromQuery.where('status', '=', value)

    return instance
  }

  static whereIn<V = number>(column: keyof PostsTable, values: V[]): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyWhereIn<V>(column, values)
  }

  async comments(id: number): Promise<commentablesTable[]> {
    return await this.baseComments(id)
  }

  async commentCount(id: number): Promise<number> {
    return await this.baseCommentCount(id)
  }

  async addComment(id: number, comment: { title: string, body: string }): Promise<any> {
    return await this.baseAddComment(id, comment)
  }

  async approvedComments(id: number): Promise<commentablesTable[]> {
    return await this.baseApprovedComments(id)
  }

  async pendingComments(id: number): Promise<commentablesTable[]> {
    return await this.basePendingComments(id)
  }

  async rejectedComments(id: number): Promise<commentablesTable[]> {
    return await this.baseRejectedComments(id)
  }

  async tags(id: number): Promise<TaggableTable[]> {
    return await this.baseTags(id)
  }

  async tagCount(id: number): Promise<number> {
    return await this.baseTagCount(id)
  }

  async addTag(id: number, tag: { name: string, description?: string }): Promise<TaggableTable> {
    return await this.baseAddTag(id, tag)
  }

  async activeTags(id: number): Promise<TaggableTable[]> {
    return await this.baseActiveTags(id)
  }

  async inactiveTags(id: number): Promise<TaggableTable[]> {
    return await this.baseInactiveTags(id)
  }

  async removeTag(id: number, tagId: number): Promise<void> {
    await this.baseRemoveTag(id, tagId)
  }

  async categories(id: number): Promise<CategorizableTable[]> {
    return await this.baseCategories(id)
  }

  async categoryCount(id: number): Promise<number> {
    return await this.baseCategoryCount(id)
  }

  async addCategory(id: number, category: { name: string, description?: string, parent_id?: number }): Promise<CategorizableTable> {
    return await this.baseAddCategory(id, category)
  }

  async activeCategories(id: number): Promise<CategorizableTable[]> {
    return await this.baseActiveCategories(id)
  }

  async inactiveCategories(id: number): Promise<CategorizableTable[]> {
    return await this.baseInactiveCategories(id)
  }

  async removeCategory(id: number, categoryId: number): Promise<void> {
    await this.baseRemoveCategory(id, categoryId)
  }

  async parentCategories(id: number): Promise<CategorizableTable[]> {
    return await this.baseParentCategories(id)
  }

  async childCategories(id: number, parentId: number): Promise<CategorizableTable[]> {
    return await this.baseChildCategories(id, parentId)
  }

  async authorBelong(): Promise<AuthorModel> {
    if (this.author_id === undefined)
      throw new HttpError(500, 'Relation Error!')

    const model = await Author
      .where('id', '=', this.author_id)
      .first()

    if (!model)
      throw new HttpError(500, 'Model Relation Not Found!')

    return model
  }

  toSearchableObject(): Partial<PostJsonResponse> {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      category: this.category,
      views: this.views,
      status: this.status,
      poster: this.poster,
    }
  }

  static distinct(column: keyof PostJsonResponse): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyDistinct(column)
  }

  static join(table: string, firstCol: string, secondCol: string): PostModel {
    const instance = new PostModel(undefined)

    return instance.applyJoin(table, firstCol, secondCol)
  }

  toJSON(): PostJsonResponse {
    const output = {

      uuid: this.uuid,

      id: this.id,
      title: this.title,
      category: this.category,
      poster: this.poster,
      body: this.body,
      views: this.views,
      published_at: this.published_at,
      status: this.status,

      created_at: this.created_at,

      updated_at: this.updated_at,

      author_id: this.author_id,
      author: this.author,
      ...this.customColumns,
    }

    return output
  }

  parseResult(model: PostModel): PostModel {
    for (const hiddenAttribute of this.hidden) {
      delete model[hiddenAttribute as keyof PostModel]
    }

    return model
  }

  // Add a protected applyFind implementation
  protected async applyFind(id: number): Promise<PostModel | undefined> {
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

export async function find(id: number): Promise<PostModel | undefined> {
  const query = DB.instance.selectFrom('posts').where('id', '=', id).selectAll()

  const model = await query.executeTakeFirst()

  if (!model)
    return undefined

  const instance = new PostModel(undefined)
  return instance.createInstance(model)
}

export async function count(): Promise<number> {
  const results = await PostModel.count()

  return results
}

export async function create(newPost: NewPost): Promise<PostModel> {
  const instance = new PostModel(undefined)
  return await instance.applyCreate(newPost)
}

export async function rawQuery(rawQuery: string): Promise<any> {
  return await sql`${rawQuery}`.execute(DB.instance)
}

export async function remove(id: number): Promise<void> {
  await DB.instance.deleteFrom('posts')
    .where('id', '=', id)
    .execute()
}

export async function whereTitle(value: string): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('title', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export async function whereCategory(value: string): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('category', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export async function wherePoster(value: string): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('poster', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export async function whereBody(value: string): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('body', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export async function whereViews(value: number): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('views', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export async function wherePublishedAt(value: number): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('published_at', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export async function whereStatus(value: string | string[]): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('status', '=', value)
  const results: PostJsonResponse = await query.execute()

  return results.map((modelItem: PostJsonResponse) => new PostModel(modelItem))
}

export const Post = PostModel

export default Post
