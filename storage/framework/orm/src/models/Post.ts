import type { Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import type { UserModel } from './User'
import { cache } from '@stacksjs/cache'
import { sql } from '@stacksjs/database'
import { HttpError, ModelNotFoundException } from '@stacksjs/error-handling'
import { dispatch } from '@stacksjs/events'
import { DB, SubqueryBuilder } from '@stacksjs/orm'

import User from './User'

export interface PostsTable {
  id?: number
  user_id?: number
  user?: UserModel
  title?: string
  body?: string

  created_at?: Date

  updated_at?: Date

}

interface PostResponse {
  data: PostJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface PostJsonResponse extends Omit<PostsTable, 'password'> {
  [key: string]: any
}

export type PostType = Selectable<PostsTable>
export type NewPost = Partial<Insertable<PostsTable>>
export type PostUpdate = Updateable<PostsTable>

      type SortDirection = 'asc' | 'desc'
interface SortOptions { column: PostType, order: SortDirection }
// Define a type for the options parameter
interface QueryOptions {
  sort?: SortOptions
  limit?: number
  offset?: number
  page?: number
}

export class PostModel {
  private readonly hidden: Array<keyof PostJsonResponse> = []
  private readonly fillable: Array<keyof PostJsonResponse> = ['title', 'body', 'uuid', 'user_id']
  private readonly guarded: Array<keyof PostJsonResponse> = []
  protected attributes: Partial<PostType> = {}
  protected originalAttributes: Partial<PostType> = {}

  protected selectFromQuery: any
  protected withRelations: string[]
  protected updateFromQuery: any
  protected deleteFromQuery: any
  protected hasSelect: boolean
  private hasSaved: boolean
  private customColumns: Record<string, unknown> = {}

  constructor(post: Partial<PostType> | null) {
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

  get title(): string | undefined {
    return this.attributes.title
  }

  get body(): string | undefined {
    return this.attributes.body
  }

  get created_at(): Date | undefined {
    return this.attributes.created_at
  }

  get updated_at(): Date | undefined {
    return this.attributes.updated_at
  }

  set title(value: string) {
    this.attributes.title = value
  }

  set body(value: string) {
    this.attributes.body = value
  }

  set updated_at(value: Date) {
    this.attributes.updated_at = value
  }

  getOriginal(column?: keyof PostType): Partial<PostType> | any {
    if (column) {
      return this.originalAttributes[column]
    }

    return this.originalAttributes
  }

  getChanges(): Partial<PostJsonResponse> {
    return this.fillable.reduce<Partial<PostJsonResponse>>((changes, key) => {
      const currentValue = this.attributes[key as keyof PostsTable]
      const originalValue = this.originalAttributes[key as keyof PostsTable]

      if (currentValue !== originalValue) {
        changes[key] = currentValue
      }

      return changes
    }, {})
  }

  isDirty(column?: keyof PostType): boolean {
    if (column) {
      return this.attributes[column] !== this.originalAttributes[column]
    }

    return Object.entries(this.originalAttributes).some(([key, originalValue]) => {
      const currentValue = (this.attributes as any)[key]

      return currentValue !== originalValue
    })
  }

  isClean(column?: keyof PostType): boolean {
    return !this.isDirty(column)
  }

  wasChanged(column?: keyof PostType): boolean {
    return this.hasSaved && this.isDirty(column)
  }

  select(params: (keyof PostType)[] | RawBuilder<string> | string): PostModel {
    this.selectFromQuery = this.selectFromQuery.select(params)

    this.hasSelect = true

    return this
  }

  static select(params: (keyof PostType)[] | RawBuilder<string> | string): PostModel {
    const instance = new PostModel(null)

    // Initialize a query with the table name and selected fields
    instance.selectFromQuery = instance.selectFromQuery.select(params)

    instance.hasSelect = true

    return instance
  }

  async applyFind(id: number): Promise<PostModel | undefined> {
    const model = await DB.instance.selectFrom('posts').where('id', '=', id).selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new PostModel(result as PostType)

    cache.getOrSet(`post:${id}`, JSON.stringify(model))

    return data
  }

  async find(id: number): Promise<PostModel | undefined> {
    return await this.applyFind(id)
  }

  // Method to find a Post by ID
  static async find(id: number): Promise<PostModel | undefined> {
    const instance = new PostModel(null)

    return await instance.applyFind(id)
  }

  async first(): Promise<PostModel | undefined> {
    return await PostModel.first()
  }

  static async first(): Promise<PostModel | undefined> {
    const model = await DB.instance.selectFrom('posts')
      .selectAll()
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new PostModel(null)

    const result = await instance.mapWith(model)

    const data = new PostModel(result as PostType)

    return data
  }

  async firstOrFail(): Promise<PostModel | undefined> {
    return await PostModel.firstOrFail()
  }

  static async firstOrFail(): Promise<PostModel | undefined> {
    const instance = new PostModel(null)

    const model = await instance.selectFromQuery.executeTakeFirst()

    if (model === undefined)
      throw new ModelNotFoundException(404, 'No PostModel results found for query')

    const result = await instance.mapWith(model)

    const data = new PostModel(result as PostType)

    return data
  }

  async mapWith(model: PostType): Promise<PostType> {
    if (this.withRelations.includes('user')) {
      model.user = await this.userBelong()
    }

    return model
  }

  static async all(): Promise<PostModel[]> {
    const models = await DB.instance.selectFrom('posts').selectAll().execute()

    const data = await Promise.all(models.map(async (model: PostType) => {
      const instance = new PostModel(model)

      const results = await instance.mapWith(model)

      return new PostModel(results)
    }))

    return data
  }

  async findOrFail(id: number): Promise<PostModel> {
    return await PostModel.findOrFail(id)
  }

  static async findOrFail(id: number): Promise<PostModel> {
    const model = await DB.instance.selectFrom('posts').where('id', '=', id).selectAll().executeTakeFirst()

    const instance = new PostModel(null)

    if (model === undefined)
      throw new ModelNotFoundException(404, `No PostModel results for ${id}`)

    cache.getOrSet(`post:${id}`, JSON.stringify(model))

    const result = await instance.mapWith(model)

    const data = new PostModel(result as PostType)

    return data
  }

  static async findMany(ids: number[]): Promise<PostModel[]> {
    let query = DB.instance.selectFrom('posts').where('id', 'in', ids)

    const instance = new PostModel(null)

    query = query.selectAll()

    const model = await query.execute()

    return model.map((modelItem: PostModel) => instance.parseResult(new PostModel(modelItem)))
  }

  skip(count: number): PostModel {
    return PostModel.skip(count)
  }

  static skip(count: number): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.offset(count)

    return instance
  }

  async chunk(size: number, callback: (models: PostModel[]) => Promise<void>): Promise<void> {
    await PostModel.chunk(size, callback)
  }

  static async chunk(size: number, callback: (models: PostModel[]) => Promise<void>): Promise<void> {
    let page = 1
    let hasMore = true

    while (hasMore) {
      const instance = new PostModel(null)

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

  take(count: number): PostModel {
    return PostModel.take(count)
  }

  static take(count: number): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.limit(count)

    return instance
  }

  static async pluck<K extends keyof PostModel>(field: K): Promise<PostModel[K][]> {
    const instance = new PostModel(null)

    if (instance.hasSelect) {
      const model = await instance.selectFromQuery.execute()
      return model.map((modelItem: PostModel) => modelItem[field])
    }

    const model = await instance.selectFromQuery.selectAll().execute()

    return model.map((modelItem: PostModel) => modelItem[field])
  }

  async pluck<K extends keyof PostModel>(field: K): Promise<PostModel[K][]> {
    return PostModel.pluck(field)
  }

  static async count(): Promise<number> {
    const instance = new PostModel(null)

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

  async max(field: keyof PostModel): Promise<number> {
    return await this.selectFromQuery
      .select(sql`MAX(${sql.raw(field as string)}) `)
      .executeTakeFirst()
  }

  async min(field: keyof PostModel): Promise<number> {
    return await this.selectFromQuery
      .select(sql`MIN(${sql.raw(field as string)}) `)
      .executeTakeFirst()
  }

  async avg(field: keyof PostModel): Promise<number> {
    return this.selectFromQuery
      .select(sql`AVG(${sql.raw(field as string)})`)
      .executeTakeFirst()
  }

  async sum(field: keyof PostModel): Promise<number> {
    return this.selectFromQuery
      .select(sql`SUM(${sql.raw(field as string)})`)
      .executeTakeFirst()
  }

  async applyGet(): Promise<PostModel[]> {
    let models

    if (this.hasSelect) {
      models = await this.selectFromQuery.execute()
    }
    else {
      models = await this.selectFromQuery.selectAll().execute()
    }

    const data = await Promise.all(models.map(async (model: PostModel) => {
      const instance = new PostModel(model)

      const results = await instance.mapWith(model)

      return new PostModel(results)
    }))

    return data
  }

  async get(): Promise<PostModel[]> {
    return await this.applyGet()
  }

  static async get(): Promise<PostModel[]> {
    const instance = new PostModel(null)

    return await instance.applyGet()
  }

  has(relation: string): PostModel {
    return PostModel.has(relation)
  }

  static has(relation: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(({ exists, selectFrom }: any) =>
      exists(
        selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.post_id`, '=', 'posts.id'),
      ),
    )

    return instance
  }

  static whereExists(callback: (qb: any) => any): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(({ exists, selectFrom }: any) =>
      exists(callback({ exists, selectFrom })),
    )

    return instance
  }

  whereHas(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): PostModel {
    return PostModel.whereHas(relation, callback)
  }

  static whereHas(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): PostModel {
    const instance = new PostModel(null)
    const subqueryBuilder = new SubqueryBuilder()

    callback(subqueryBuilder)
    const conditions = subqueryBuilder.getConditions()

    instance.selectFromQuery = instance.selectFromQuery
      .where(({ exists, selectFrom }: any) => {
        let subquery = selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.post_id`, '=', 'posts.id')

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

  applyDoesntHave(relation: string): PostModel {
    this.selectFromQuery = this.selectFromQuery.where(({ not, exists, selectFrom }: any) =>
      not(
        exists(
          selectFrom(relation)
            .select('1')
            .whereRef(`${relation}.post_id`, '=', 'posts.id'),
        ),
      ),
    )

    return this
  }

  doesntHave(relation: string): PostModel {
    return this.applyDoesntHave(relation)
  }

  static doesntHave(relation: string): PostModel {
    const instance = new PostModel(null)

    return instance.doesntHave(relation)
  }

  applyWhereDoesntHave(relation: string, callback: (query: SubqueryBuilder) => void): PostModel {
    const subqueryBuilder = new SubqueryBuilder()

    callback(subqueryBuilder)
    const conditions = subqueryBuilder.getConditions()

    this.selectFromQuery = this.selectFromQuery
      .where(({ exists, selectFrom, not }: any) => {
        let subquery = selectFrom(relation)
          .select('1')
          .whereRef(`${relation}.post_id`, '=', 'posts.id')

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

  whereDoesntHave(relation: string, callback: (query: SubqueryBuilder) => void): PostModel {
    return this.applyWhereDoesntHave(relation, callback)
  }

  static whereDoesntHave(
    relation: string,
    callback: (query: SubqueryBuilder) => void,
  ): PostModel {
    const instance = new PostModel(null)

    return instance.applyWhereDoesntHave(relation, callback)
  }

  async applyPaginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<PostResponse> {
    const totalRecordsResult = await DB.instance.selectFrom('posts')
      .select(DB.instance.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    const postsWithExtra = await DB.instance.selectFrom('posts')
      .selectAll()
      .orderBy('id', 'asc') // Assuming 'id' is used for cursor-based pagination
      .limit((options.limit ?? 10) + 1) // Fetch one extra record
      .offset(((options.page ?? 1) - 1) * (options.limit ?? 10)) // Ensure options.page is not undefined
      .execute()

    let nextCursor = null
    if (postsWithExtra.length > (options.limit ?? 10))
      nextCursor = postsWithExtra.pop()?.id ?? null

    return {
      data: postsWithExtra,
      paging: {
        total_records: totalRecords,
        page: options.page || 1,
        total_pages: totalPages,
      },
      next_cursor: nextCursor,
    }
  }

  async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<PostResponse> {
    return await this.applyPaginate(options)
  }

  // Method to get all posts
  static async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<PostResponse> {
    const instance = new PostModel(null)

    return await instance.applyPaginate(options)
  }

  static async create(newPost: NewPost): Promise<PostModel> {
    const instance = new PostModel(null)

    const filteredValues = Object.fromEntries(
      Object.entries(newPost).filter(([key]) =>
        !instance.guarded.includes(key) && instance.fillable.includes(key),
      ),
    ) as NewPost

    const result = await DB.instance.insertInto('posts')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await instance.find(Number(result.numInsertedOrUpdatedRows)) as PostModel

    if (model)
      dispatch('post:created', model)

    return model
  }

  static async createMany(newPost: NewPost[]): Promise<void> {
    const instance = new PostModel(null)

    const valuesFiltered = newPost.map((newPost: NewPost) => {
      const filteredValues = Object.fromEntries(
        Object.entries(newPost).filter(([key]) =>
          !instance.guarded.includes(key) && instance.fillable.includes(key),
        ),
      ) as NewPost

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

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as PostModel

    return model
  }

  // Method to remove a Post
  static async remove(id: number): Promise<any> {
    return await DB.instance.deleteFrom('posts')
      .where('id', '=', id)
      .execute()
  }

  applyWhere(instance: PostModel, column: string, ...args: any[]): PostModel {
    const [operatorOrValue, value] = args
    const operator = value === undefined ? '=' : operatorOrValue
    const actualValue = value === undefined ? operatorOrValue : value

    instance.selectFromQuery = instance.selectFromQuery.where(column, operator, actualValue)
    instance.updateFromQuery = instance.updateFromQuery.where(column, operator, actualValue)
    instance.deleteFromQuery = instance.deleteFromQuery.where(column, operator, actualValue)

    return instance
  }

  where(column: string, ...args: any[]): PostModel {
    return this.applyWhere(this, column, ...args)
  }

  static where(column: string, ...args: any[]): PostModel {
    const instance = new PostModel(null)

    return instance.applyWhere(instance, column, ...args)
  }

  whereColumn(first: string, operator: string, second: string): PostModel {
    this.selectFromQuery = this.selectFromQuery.whereRef(first, operator, second)

    return this
  }

  static whereColumn(first: string, operator: string, second: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.whereRef(first, operator, second)

    return instance
  }

  whereRef(column: string, ...args: string[]): PostModel {
    const [operatorOrValue, value] = args
    const operator = value === undefined ? '=' : operatorOrValue
    const actualValue = value === undefined ? operatorOrValue : value

    const instance = new PostModel(null)
    instance.selectFromQuery = instance.selectFromQuery.whereRef(column, operator, actualValue)

    return instance
  }

  whereRef(column: string, ...args: string[]): PostModel {
    return this.whereRef(column, ...args)
  }

  static whereRef(column: string, ...args: string[]): PostModel {
    const instance = new PostModel(null)

    return instance.whereRef(column, ...args)
  }

  whereRaw(sqlStatement: string): PostModel {
    this.selectFromQuery = this.selectFromQuery.where(sql`${sqlStatement}`)

    return this
  }

  static whereRaw(sqlStatement: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(sql`${sqlStatement}`)

    return instance
  }

  orWhere(...conditions: [string, any][]): PostModel {
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

  static orWhere(...conditions: [string, any][]): PostModel {
    const instance = new PostModel(null)

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
    callback: (query: PostModel) => PostModel,
  ): PostModel {
    return PostModel.when(condition, callback)
  }

  static when(
    condition: boolean,
    callback: (query: PostModel) => PostModel,
  ): PostModel {
    let instance = new PostModel(null)

    if (condition)
      instance = callback(instance)

    return instance
  }

  whereNull(column: string): PostModel {
    return PostModel.whereNull(column)
  }

  static whereNull(column: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    instance.updateFromQuery = instance.updateFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    return instance
  }

  static whereTitle(value: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('title', '=', value)

    return instance
  }

  static whereBody(value: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('body', '=', value)

    return instance
  }

  whereIn(column: keyof PostType, values: any[]): PostModel {
    return PostModel.whereIn(column, values)
  }

  static whereIn(column: keyof PostType, values: any[]): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'in', values)

    return instance
  }

  whereBetween(column: keyof PostType, range: [any, any]): PostModel {
    return PostModel.whereBetween(column, range)
  }

  whereLike(column: keyof PostType, value: string): PostModel {
    return PostModel.whereLike(column, value)
  }

  static whereLike(column: keyof PostType, value: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    instance.updateFromQuery = instance.updateFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    instance.deleteFromQuery = instance.deleteFromQuery.where(sql` ${sql.raw(column as string)} LIKE ${value}`)

    return instance
  }

  static whereBetween(column: keyof PostType, range: [any, any]): PostModel {
    if (range.length !== 2) {
      throw new HttpError(500, 'Range must have exactly two values: [min, max]')
    }

    const instance = new PostModel(null)

    const query = sql` ${sql.raw(column as string)} between ${range[0]} and ${range[1]} `

    instance.selectFromQuery = instance.selectFromQuery.where(query)
    instance.updateFromQuery = instance.updateFromQuery.where(query)
    instance.deleteFromQuery = instance.deleteFromQuery.where(query)

    return instance
  }

  whereNotIn(column: keyof PostType, values: any[]): PostModel {
    return PostModel.whereNotIn(column, values)
  }

  static whereNotIn(column: keyof PostType, values: any[]): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'not in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'not in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'not in', values)

    return instance
  }

  async exists(): Promise<boolean> {
    const model = await this.selectFromQuery.executeTakeFirst()

    return model !== null || model !== undefined
  }

  static async latest(): Promise<PostType | undefined> {
    const model = await DB.instance.selectFrom('posts')
      .selectAll()
      .orderBy('created_at', 'desc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new PostModel(null)
    const result = await instance.mapWith(model)
    const data = new PostModel(result as PostType)

    return data
  }

  static async oldest(): Promise<PostType | undefined> {
    const model = await DB.instance.selectFrom('posts')
      .selectAll()
      .orderBy('created_at', 'asc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new PostModel(null)
    const result = await instance.mapWith(model)
    const data = new PostModel(result as PostType)

    return data
  }

  static async firstOrCreate(
    condition: Partial<PostType>,
    newPost: NewPost,
  ): Promise<PostModel> {
    // Get the key and value from the condition object
    const key = Object.keys(condition)[0] as keyof PostType

    if (!key) {
      throw new HttpError(500, 'Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingPost = await DB.instance.selectFrom('posts')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingPost) {
      const instance = new PostModel(null)
      const result = await instance.mapWith(existingPost)
      return new PostModel(result as PostType)
    }
    else {
      return await this.create(newPost)
    }
  }

  static async updateOrCreate(
    condition: Partial<PostType>,
    newPost: NewPost,
  ): Promise<PostModel> {
    const instance = new PostModel(null)

    const key = Object.keys(condition)[0] as keyof PostType

    if (!key) {
      throw new HttpError(500, 'Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingPost = await DB.instance.selectFrom('posts')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingPost) {
      // If found, update the existing record
      await DB.instance.updateTable('posts')
        .set(newPost)
        .where(key, '=', value)
        .executeTakeFirstOrThrow()

      // Fetch and return the updated record
      const updatedPost = await DB.instance.selectFrom('posts')
        .selectAll()
        .where(key, '=', value)
        .executeTakeFirst()

      if (!updatedPost) {
        throw new HttpError(500, 'Failed to fetch updated record')
      }

      const result = await instance.mapWith(updatedPost)

      instance.hasSaved = true

      return new PostModel(result as PostType)
    }
    else {
      // If not found, create a new record
      return await this.create(newPost)
    }
  }

  with(relations: string[]): PostModel {
    return PostModel.with(relations)
  }

  static with(relations: string[]): PostModel {
    const instance = new PostModel(null)

    instance.withRelations = relations

    return instance
  }

  async last(): Promise<PostType | undefined> {
    return await DB.instance.selectFrom('posts')
      .selectAll()
      .orderBy('id', 'desc')
      .executeTakeFirst()
  }

  static async last(): Promise<PostType | undefined> {
    const model = await DB.instance.selectFrom('posts').selectAll().orderBy('id', 'desc').executeTakeFirst()

    if (!model)
      return undefined

    const instance = new PostModel(null)

    const result = await instance.mapWith(model)

    const data = new PostModel(result as PostType)

    return data
  }

  orderBy(column: keyof PostType, order: 'asc' | 'desc'): PostModel {
    return PostModel.orderBy(column, order)
  }

  static orderBy(column: keyof PostType, order: 'asc' | 'desc'): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, order)

    return instance
  }

  groupBy(column: keyof PostType): PostModel {
    return PostModel.groupBy(column)
  }

  static groupBy(column: keyof PostType): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.groupBy(column)

    return instance
  }

  having(column: keyof PostType, operator: string, value: any): PostModel {
    return PostModel.having(column, operator, value)
  }

  static having(column: keyof PostType, operator: string, value: any): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.having(column, operator, value)

    return instance
  }

  inRandomOrder(): PostModel {
    return PostModel.inRandomOrder()
  }

  static inRandomOrder(): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(sql` ${sql.raw('RANDOM()')} `)

    return instance
  }

  orderByDesc(column: keyof PostType): PostModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, 'desc')

    return this
  }

  static orderByDesc(column: keyof PostType): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'desc')

    return instance
  }

  orderByAsc(column: keyof PostType): PostModel {
    return PostModel.orderByAsc(column)
  }

  static orderByAsc(column: keyof PostType): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'asc')

    return instance
  }

  async update(newPost: PostUpdate): Promise<PostModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(newPost).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewPost

    await DB.instance.updateTable('posts')
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

  async forceUpdate(post: PostUpdate): Promise<PostModel | undefined> {
    if (this.id === undefined) {
      this.updateFromQuery.set(post).execute()
    }

    await DB.instance.updateTable('posts')
      .set(post)
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
      throw new HttpError(500, 'Post data is undefined')

    const filteredValues = Object.fromEntries(
      Object.entries(this).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewPost

    if (this.id === undefined) {
      await DB.instance.insertInto('posts')
        .values(filteredValues)
        .executeTakeFirstOrThrow()
    }
    else {
      await this.update(this)
    }

    this.hasSaved = true
  }

  fill(data: Partial<PostType>): PostModel {
    const filteredValues = Object.fromEntries(
      Object.entries(data).filter(([key]) =>
        !this.guarded.includes(key) && this.fillable.includes(key),
      ),
    ) as NewPost

    this.attributes = {
      ...this.attributes,
      ...filteredValues,
    }

    return this
  }

  forceFill(data: Partial<PostType>): PostModel {
    this.attributes = {
      ...this.attributes,
      ...data,
    }

    return this
  }

  // Method to delete (soft delete) the post instance
  async delete(): Promise<any> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    return await DB.instance.deleteFrom('posts')
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

  distinct(column: keyof PostType): PostModel {
    this.selectFromQuery = this.selectFromQuery.select(column).distinct()

    this.hasSelect = true

    return this
  }

  static distinct(column: keyof PostType): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.select(column).distinct()

    instance.hasSelect = true

    return instance
  }

  join(table: string, firstCol: string, secondCol: string): PostModel {
    this.selectFromQuery = this.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return this
  }

  static join(table: string, firstCol: string, secondCol: string): PostModel {
    const instance = new PostModel(null)

    instance.selectFromQuery = instance.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return instance
  }

  static async rawQuery(rawQuery: string): Promise<any> {
    return await sql`${rawQuery}`.execute(DB.instance)
  }

  toJSON(): Partial<PostJsonResponse> {
    const output: Partial<PostJsonResponse> = {

      id: this.id,
      title: this.title,
      body: this.body,

      created_at: this.created_at,

      updated_at: this.updated_at,

      user_id: this.user_id,
      user: this.user,
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
}

async function find(id: number): Promise<PostModel | undefined> {
  const query = DB.instance.selectFrom('posts').where('id', '=', id).selectAll()

  const model = await query.executeTakeFirst()

  if (!model)
    return undefined

  return new PostModel(model)
}

export async function count(): Promise<number> {
  const results = await PostModel.count()

  return results
}

export async function create(newPost: NewPost): Promise<PostModel> {
  const result = await DB.instance.insertInto('posts')
    .values(newPost)
    .executeTakeFirstOrThrow()

  return await find(Number(result.numInsertedOrUpdatedRows)) as PostModel
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
  const results = await query.execute()

  return results.map((modelItem: PostModel) => new PostModel(modelItem))
}

export async function whereBody(value: string): Promise<PostModel[]> {
  const query = DB.instance.selectFrom('posts').where('body', '=', value)
  const results = await query.execute()

  return results.map((modelItem: PostModel) => new PostModel(modelItem))
}

export const Post = PostModel

export default Post
