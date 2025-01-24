import type { Insertable, RawBuilder, Selectable, Updateable } from '@stacksjs/database'
import { cache } from '@stacksjs/cache'
import { db, sql } from '@stacksjs/database'
import { HttpError, ModelNotFoundException } from '@stacksjs/error-handling'

export interface ErrorsTable {
  id?: number
  type?: string
  message?: string
  stack?: string
  status?: number
  additional_info?: string

  created_at?: Date

  updated_at?: Date

}

interface ErrorResponse {
  data: ErrorJsonResponse[]
  paging: {
    total_records: number
    page: number
    total_pages: number
  }
  next_cursor: number | null
}

export interface ErrorJsonResponse extends Omit<ErrorsTable, 'password'> {
  [key: string]: any
}

export type ErrorType = Selectable<ErrorsTable>
export type NewError = Partial<Insertable<ErrorsTable>>
export type ErrorUpdate = Updateable<ErrorsTable>

      type SortDirection = 'asc' | 'desc'
interface SortOptions { column: ErrorType, order: SortDirection }
// Define a type for the options parameter
interface QueryOptions {
  sort?: SortOptions
  limit?: number
  offset?: number
  page?: number
}

export class ErrorModel {
  private readonly hidden: Array<keyof ErrorJsonResponse> = []
  private readonly fillable: Array<keyof ErrorJsonResponse> = ['type', 'message', 'stack', 'status', 'additional_info', 'uuid']

  protected selectFromQuery: any
  protected withRelations: string[]
  protected updateFromQuery: any
  protected deleteFromQuery: any
  protected hasSelect: boolean
  private customColumns: Record<string, unknown> = {}
  public id: number | undefined
  public type: string | undefined
  public message: string | undefined
  public stack: string | undefined
  public status: number | undefined
  public additional_info: string | undefined

  public created_at: Date | undefined
  public updated_at: Date | undefined

  constructor(error: Partial<ErrorType> | null) {
    if (error) {
      this.id = error?.id || 1
      this.type = error?.type
      this.message = error?.message
      this.stack = error?.stack
      this.status = error?.status
      this.additional_info = error?.additional_info

      this.created_at = error?.created_at

      this.updated_at = error?.updated_at

      Object.keys(error).forEach((key) => {
        if (!(key in this)) {
          this.customColumns[key] = (error as ErrorJsonResponse)[key]
        }
      })
    }

    this.withRelations = []
    this.selectFromQuery = db.selectFrom('errors')
    this.updateFromQuery = db.updateTable('errors')
    this.deleteFromQuery = db.deleteFrom('errors')
    this.hasSelect = false
  }

  static select(params: (keyof ErrorType)[] | RawBuilder<string>): ErrorModel {
    const instance = new ErrorModel(null)

    // Initialize a query with the table name and selected fields
    instance.selectFromQuery = instance.selectFromQuery.select(params)

    instance.hasSelect = true

    return instance
  }

  // Method to find a Error by ID
  async find(id: number): Promise<ErrorModel | undefined> {
    const query = db.selectFrom('errors').where('id', '=', id).selectAll()

    const model = await query.executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    cache.getOrSet(`error:${id}`, JSON.stringify(model))

    return data
  }

  // Method to find a Error by ID
  static async find(id: number): Promise<ErrorModel | undefined> {
    const model = await db.selectFrom('errors').where('id', '=', id).selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const instance = new ErrorModel(null)

    const result = await instance.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    cache.getOrSet(`error:${id}`, JSON.stringify(model))

    return data
  }

  async mapWith(model: ErrorType): Promise<ErrorType> {
    return model
  }

  static async all(): Promise<ErrorModel[]> {
    const models = await db.selectFrom('errors').selectAll().execute()

    const data = await Promise.all(models.map(async (model: ErrorType) => {
      const instance = new ErrorModel(model)

      const results = await instance.mapWith(model)

      return new ErrorModel(results)
    }))

    return data
  }

  static async findOrFail(id: number): Promise<ErrorModel> {
    const model = await db.selectFrom('errors').where('id', '=', id).selectAll().executeTakeFirst()

    const instance = new ErrorModel(null)

    if (model === undefined)
      throw new ModelNotFoundException(404, `No ErrorModel results for ${id}`)

    cache.getOrSet(`error:${id}`, JSON.stringify(model))

    const result = await instance.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    return data
  }

  async findOrFail(id: number): Promise<ErrorModel> {
    const model = await db.selectFrom('errors').where('id', '=', id).selectAll().executeTakeFirst()

    if (model === undefined)
      throw new ModelNotFoundException(404, `No ErrorModel results for ${id}`)

    cache.getOrSet(`error:${id}`, JSON.stringify(model))

    const result = await this.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    return data
  }

  static async findMany(ids: number[]): Promise<ErrorModel[]> {
    let query = db.selectFrom('errors').where('id', 'in', ids)

    const instance = new ErrorModel(null)

    query = query.selectAll()

    const model = await query.execute()

    return model.map(modelItem => instance.parseResult(new ErrorModel(modelItem)))
  }

  static async get(): Promise<ErrorModel[]> {
    const instance = new ErrorModel(null)

    let models

    if (instance.hasSelect) {
      models = await instance.selectFromQuery.execute()
    }
    else {
      models = await instance.selectFromQuery.selectAll().execute()
    }

    const data = await Promise.all(models.map(async (model: ErrorModel) => {
      const instance = new ErrorModel(model)

      const results = await instance.mapWith(model)

      return new ErrorModel(results)
    }))

    return data
  }

  // Method to get a Error by criteria
  async get(): Promise<ErrorModel[]> {
    if (this.hasSelect) {
      const model = await this.selectFromQuery.execute()

      return model.map((modelItem: ErrorModel) => new ErrorModel(modelItem))
    }

    const model = await this.selectFromQuery.selectAll().execute()

    return model.map((modelItem: ErrorModel) => new ErrorModel(modelItem))
  }

  static async count(): Promise<number> {
    const instance = new ErrorModel(null)

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

  async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<ErrorResponse> {
    const totalRecordsResult = await db.selectFrom('errors')
      .select(db.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    if (this.hasSelect) {
      const errorsWithExtra = await this.selectFromQuery.orderBy('id', 'asc')
        .limit((options.limit ?? 10) + 1)
        .offset(((options.page ?? 1) - 1) * (options.limit ?? 10)) // Ensure options.page is not undefined
        .execute()

      let nextCursor = null
      if (errorsWithExtra.length > (options.limit ?? 10))
        nextCursor = errorsWithExtra.pop()?.id ?? null

      return {
        data: errorsWithExtra,
        paging: {
          total_records: totalRecords,
          page: options.page || 1,
          total_pages: totalPages,
        },
        next_cursor: nextCursor,
      }
    }

    const errorsWithExtra = await this.selectFromQuery.orderBy('id', 'asc')
      .limit((options.limit ?? 10) + 1)
      .offset(((options.page ?? 1) - 1) * (options.limit ?? 10)) // Ensure options.page is not undefined
      .execute()

    let nextCursor = null
    if (errorsWithExtra.length > (options.limit ?? 10))
      nextCursor = errorsWithExtra.pop()?.id ?? null

    return {
      data: errorsWithExtra,
      paging: {
        total_records: totalRecords,
        page: options.page || 1,
        total_pages: totalPages,
      },
      next_cursor: nextCursor,
    }
  }

  // Method to get all errors
  static async paginate(options: QueryOptions = { limit: 10, offset: 0, page: 1 }): Promise<ErrorResponse> {
    const totalRecordsResult = await db.selectFrom('errors')
      .select(db.fn.count('id').as('total')) // Use 'id' or another actual column name
      .executeTakeFirst()

    const totalRecords = Number(totalRecordsResult?.total) || 0
    const totalPages = Math.ceil(totalRecords / (options.limit ?? 10))

    const errorsWithExtra = await db.selectFrom('errors')
      .selectAll()
      .orderBy('id', 'asc') // Assuming 'id' is used for cursor-based pagination
      .limit((options.limit ?? 10) + 1) // Fetch one extra record
      .offset(((options.page ?? 1) - 1) * (options.limit ?? 10)) // Ensure options.page is not undefined
      .execute()

    let nextCursor = null
    if (errorsWithExtra.length > (options.limit ?? 10))
      nextCursor = errorsWithExtra.pop()?.id ?? null

    return {
      data: errorsWithExtra,
      paging: {
        total_records: totalRecords,
        page: options.page || 1,
        total_pages: totalPages,
      },
      next_cursor: nextCursor,
    }
  }

  // Method to create a new error
  static async create(newError: NewError): Promise<ErrorModel> {
    const instance = new ErrorModel(null)

    const filteredValues = Object.fromEntries(
      Object.entries(newError).filter(([key]) => instance.fillable.includes(key)),
    ) as NewError

    const result = await db.insertInto('errors')
      .values(filteredValues)
      .executeTakeFirst()

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as ErrorModel

    return model
  }

  static async createMany(newErrors: NewError[]): Promise<void> {
    const instance = new ErrorModel(null)

    const filteredValues = newErrors.map(newUser =>
      Object.fromEntries(
        Object.entries(newUser).filter(([key]) => instance.fillable.includes(key)),
      ) as NewError,
    )

    await db.insertInto('errors')
      .values(filteredValues)
      .executeTakeFirst()
  }

  static async forceCreate(newError: NewError): Promise<ErrorModel> {
    const result = await db.insertInto('errors')
      .values(newError)
      .executeTakeFirst()

    const model = await find(Number(result.numInsertedOrUpdatedRows)) as ErrorModel

    return model
  }

  // Method to remove a Error
  static async remove(id: number): Promise<any> {
    return await db.deleteFrom('errors')
      .where('id', '=', id)
      .execute()
  }

  where(...args: (string | number | boolean | undefined | null)[]): ErrorModel {
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

  orWhere(...args: Array<[string, string, any]>): ErrorModel {
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

  static orWhere(...args: Array<[string, string, any]>): ErrorModel {
    const instance = new ErrorModel(null)

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

  static where(...args: (string | number | boolean | undefined | null)[]): ErrorModel {
    let column: any
    let operator: any
    let value: any

    const instance = new ErrorModel(null)

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
    callback: (query: ErrorModel) => ErrorModel,
  ): ErrorModel {
    let instance = new ErrorModel(null)

    if (condition)
      instance = callback(instance)

    return instance
  }

  when(
    condition: boolean,
    callback: (query: ErrorModel) => ErrorModel,
  ): ErrorModel {
    if (condition)
      callback(this.selectFromQuery)

    return this
  }

  static whereNull(column: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    instance.updateFromQuery = instance.updateFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    return instance
  }

  whereNull(column: string): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    this.updateFromQuery = this.updateFromQuery.where((eb: any) =>
      eb(column, '=', '').or(column, 'is', null),
    )

    return this
  }

  static whereType(value: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('type', '=', value)

    return instance
  }

  static whereMessage(value: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('message', '=', value)

    return instance
  }

  static whereStack(value: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('stack', '=', value)

    return instance
  }

  static whereStatus(value: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('status', '=', value)

    return instance
  }

  static whereAdditionalInfo(value: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where('additional_info', '=', value)

    return instance
  }

  whereIn(column: keyof ErrorType, values: any[]): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.where(column, 'in', values)

    this.updateFromQuery = this.updateFromQuery.where(column, 'in', values)

    this.deleteFromQuery = this.deleteFromQuery.where(column, 'in', values)

    return this
  }

  static whereIn(column: keyof ErrorType, values: any[]): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'in', values)

    return instance
  }

  static whereBetween(column: keyof ErrorType, range: [any, any]): ErrorModel {
    if (range.length !== 2) {
      throw new Error('Range must have exactly two values: [min, max]')
    }

    const instance = new ErrorModel(null)

    const query = sql` ${sql.raw(column as string)} between ${range[0]} and ${range[1]} `

    instance.selectFromQuery = instance.selectFromQuery.where(query)
    instance.updateFromQuery = instance.updateFromQuery.where(query)
    instance.deleteFromQuery = instance.deleteFromQuery.where(query)

    return instance
  }

  static whereNotIn(column: keyof ErrorType, values: any[]): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.where(column, 'not in', values)

    instance.updateFromQuery = instance.updateFromQuery.where(column, 'not in', values)

    instance.deleteFromQuery = instance.deleteFromQuery.where(column, 'not in', values)

    return instance
  }

  whereNotIn(column: keyof ErrorType, values: any[]): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.where(column, 'not in', values)

    this.updateFromQuery = this.updateFromQuery.where(column, 'not in', values)

    this.deleteFromQuery = this.deleteFromQuery.where(column, 'not in', values)

    return this
  }

  async first(): Promise<ErrorModel | undefined> {
    const model = await this.selectFromQuery.selectAll().executeTakeFirst()

    if (!model)
      return undefined

    const result = await this.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    return data
  }

  async firstOrFail(): Promise<ErrorModel | undefined> {
    const model = await this.selectFromQuery.executeTakeFirst()

    if (model === undefined)
      throw new ModelNotFoundException(404, 'No ErrorModel results found for query')

    const instance = new ErrorModel(null)

    const result = await instance.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    return data
  }

  async exists(): Promise<boolean> {
    const model = await this.selectFromQuery.executeTakeFirst()

    return model !== null || model !== undefined
  }

  static async first(): Promise<ErrorType | undefined> {
    const model = await db.selectFrom('errors')
      .selectAll()
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new ErrorModel(null)

    const result = await instance.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    return data
  }

  static async latest(): Promise<ErrorType | undefined> {
    const model = await db.selectFrom('errors')
      .selectAll()
      .orderBy('created_at', 'desc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new ErrorModel(null)
    const result = await instance.mapWith(model)
    const data = new ErrorModel(result as ErrorType)

    return data
  }

  static async oldest(): Promise<ErrorType | undefined> {
    const model = await db.selectFrom('errors')
      .selectAll()
      .orderBy('created_at', 'asc')
      .executeTakeFirst()

    if (!model)
      return undefined

    const instance = new ErrorModel(null)
    const result = await instance.mapWith(model)
    const data = new ErrorModel(result as ErrorType)

    return data
  }

  static async firstOrCreate(
    condition: Partial<ErrorType>,
    newError: NewError,
  ): Promise<ErrorModel> {
    // Get the key and value from the condition object
    const key = Object.keys(condition)[0] as keyof ErrorType

    if (!key) {
      throw new Error('Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingError = await db.selectFrom('errors')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingError) {
      const instance = new ErrorModel(null)
      const result = await instance.mapWith(existingError)
      return new ErrorModel(result as ErrorType)
    }
    else {
      // If not found, create a new user
      return await this.create(newError)
    }
  }

  static async updateOrCreate(
    condition: Partial<ErrorType>,
    newError: NewError,
  ): Promise<ErrorModel> {
    const key = Object.keys(condition)[0] as keyof ErrorType

    if (!key) {
      throw new Error('Condition must contain at least one key-value pair')
    }

    const value = condition[key]

    // Attempt to find the first record matching the condition
    const existingError = await db.selectFrom('errors')
      .selectAll()
      .where(key, '=', value)
      .executeTakeFirst()

    if (existingError) {
      // If found, update the existing record
      await db.updateTable('errors')
        .set(newError)
        .where(key, '=', value)
        .executeTakeFirstOrThrow()

      // Fetch and return the updated record
      const updatedError = await db.selectFrom('errors')
        .selectAll()
        .where(key, '=', value)
        .executeTakeFirst()

      if (!updatedError) {
        throw new Error('Failed to fetch updated record')
      }

      const instance = new ErrorModel(null)
      const result = await instance.mapWith(updatedError)
      return new ErrorModel(result as ErrorType)
    }
    else {
      // If not found, create a new record
      return await this.create(newError)
    }
  }

  with(relations: string[]): ErrorModel {
    this.withRelations = relations

    return this
  }

  static with(relations: string[]): ErrorModel {
    const instance = new ErrorModel(null)

    instance.withRelations = relations

    return instance
  }

  async last(): Promise<ErrorType | undefined> {
    return await db.selectFrom('errors')
      .selectAll()
      .orderBy('id', 'desc')
      .executeTakeFirst()
  }

  static async last(): Promise<ErrorType | undefined> {
    const model = await db.selectFrom('errors').selectAll().orderBy('id', 'desc').executeTakeFirst()

    if (!model)
      return undefined

    const instance = new ErrorModel(null)

    const result = await instance.mapWith(model)

    const data = new ErrorModel(result as ErrorType)

    return data
  }

  static orderBy(column: keyof ErrorType, order: 'asc' | 'desc'): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, order)

    return instance
  }

  static groupBy(column: keyof ErrorType): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.groupBy(column)

    return instance
  }

  static having(column: keyof PaymentMethodType, operator: string, value: any): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.having(column, operator, value)

    return instance
  }

  orderBy(column: keyof ErrorType, order: 'asc' | 'desc'): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, order)

    return this
  }

  having(column: keyof ErrorType, operator: string, value: any): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.having(column, operator, value)

    return this
  }

  groupBy(column: keyof ErrorType): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.groupBy(column)

    return this
  }

  static orderByDesc(column: keyof ErrorType): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'desc')

    return instance
  }

  orderByDesc(column: keyof ErrorType): ErrorModel {
    this.selectFromQuery = this.orderBy(column, 'desc')

    return this
  }

  static orderByAsc(column: keyof ErrorType): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.orderBy(column, 'asc')

    return instance
  }

  orderByAsc(column: keyof ErrorType): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.orderBy(column, 'desc')

    return this
  }

  async update(error: ErrorUpdate): Promise<ErrorModel | undefined> {
    const filteredValues = Object.fromEntries(
      Object.entries(error).filter(([key]) => this.fillable.includes(key)),
    ) as NewError

    await db.updateTable('errors')
      .set(filteredValues)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      const model = await this.find(this.id)

      return model
    }

    return undefined
  }

  async forceUpdate(error: ErrorUpdate): Promise<ErrorModel | undefined> {
    if (this.id === undefined) {
      this.updateFromQuery.set(error).execute()
    }

    await db.updateTable('errors')
      .set(error)
      .where('id', '=', this.id)
      .executeTakeFirst()

    if (this.id) {
      const model = await this.find(this.id)

      return model
    }

    return undefined
  }

  async save(): Promise<void> {
    if (!this)
      throw new HttpError(500, 'Error data is undefined')

    if (this.id === undefined) {
      await db.insertInto('errors')
        .values(this as NewError)
        .executeTakeFirstOrThrow()
    }
    else {
      await this.update(this)
    }
  }

  // Method to delete (soft delete) the error instance
  async delete(): Promise<any> {
    if (this.id === undefined)
      this.deleteFromQuery.execute()

    return await db.deleteFrom('errors')
      .where('id', '=', this.id)
      .execute()
  }

  distinct(column: keyof ErrorType): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.select(column).distinct()

    this.hasSelect = true

    return this
  }

  static distinct(column: keyof ErrorType): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.select(column).distinct()

    instance.hasSelect = true

    return instance
  }

  join(table: string, firstCol: string, secondCol: string): ErrorModel {
    this.selectFromQuery = this.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return this
  }

  static join(table: string, firstCol: string, secondCol: string): ErrorModel {
    const instance = new ErrorModel(null)

    instance.selectFromQuery = instance.selectFromQuery.innerJoin(table, firstCol, secondCol)

    return instance
  }

  static async rawQuery(rawQuery: string): Promise<any> {
    return await sql`${rawQuery}`.execute(db)
  }

  toJSON(): Partial<ErrorJsonResponse> {
    const output: Partial<ErrorJsonResponse> = {

      id: this.id,
      type: this.type,
      message: this.message,
      stack: this.stack,
      status: this.status,
      additional_info: this.additional_info,

      created_at: this.created_at,

      updated_at: this.updated_at,

      ...this.customColumns,
    }

    return output
  }

  parseResult(model: ErrorModel): ErrorModel {
    for (const hiddenAttribute of this.hidden) {
      delete model[hiddenAttribute as keyof ErrorModel]
    }

    return model
  }
}

async function find(id: number): Promise<ErrorModel | undefined> {
  const query = db.selectFrom('errors').where('id', '=', id).selectAll()

  const model = await query.executeTakeFirst()

  if (!model)
    return undefined

  return new ErrorModel(model)
}

export async function count(): Promise<number> {
  const results = await ErrorModel.count()

  return results
}

export async function create(newError: NewError): Promise<ErrorModel> {
  const result = await db.insertInto('errors')
    .values(newError)
    .executeTakeFirstOrThrow()

  return await find(Number(result.numInsertedOrUpdatedRows)) as ErrorModel
}

export async function rawQuery(rawQuery: string): Promise<any> {
  return await sql`${rawQuery}`.execute(db)
}

export async function remove(id: number): Promise<void> {
  await db.deleteFrom('errors')
    .where('id', '=', id)
    .execute()
}

export async function whereType(value: string): Promise<ErrorModel[]> {
  const query = db.selectFrom('errors').where('type', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new ErrorModel(modelItem))
}

export async function whereMessage(value: string): Promise<ErrorModel[]> {
  const query = db.selectFrom('errors').where('message', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new ErrorModel(modelItem))
}

export async function whereStack(value: string): Promise<ErrorModel[]> {
  const query = db.selectFrom('errors').where('stack', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new ErrorModel(modelItem))
}

export async function whereStatus(value: number): Promise<ErrorModel[]> {
  const query = db.selectFrom('errors').where('status', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new ErrorModel(modelItem))
}

export async function whereAdditionalInfo(value: string): Promise<ErrorModel[]> {
  const query = db.selectFrom('errors').where('additional_info', '=', value)
  const results = await query.execute()

  return results.map(modelItem => new ErrorModel(modelItem))
}

export const Error = ErrorModel

export default Error
