import type { NewPost, PostJsonResponse } from '@stacksjs/orm'
import { db } from '@stacksjs/database'
import { formatDate } from '@stacksjs/orm'

/**
 * Create a new post
 *
 * @param data The post data to create
 * @returns The created post record
 */
export async function store(data: NewPost): Promise<PostJsonResponse> {
  try {
    const postData = {
      author_id: data.author_id,
      title: data.title,
      category: data.category,
      poster: data.poster,
      body: data.body,
      views: data.views || 0,
      published_at: data.published_at || Date.now(),
      status: data.status || 'draft',
      created_at: formatDate(new Date()),
      updated_at: formatDate(new Date()),
    }

    const result = await db
      .insertInto('posts')
      .values(postData)
      .returningAll()
      .executeTakeFirst()

    if (!result)
      throw new Error('Failed to create post')

    // Handle tags if they exist in the data
    // if (data.tags && Array.isArray(data.tags)) {
    //   for (const tag of data.tags) {
    //     await storeTag({
    //       name: tag,
    //       taggable_id: result.id,
    //       taggable_type: 'posts',
    //       is_active: true,
    //     })
    //   }
    // }

    return result
  }
  catch (error) {
    if (error instanceof Error)
      throw new TypeError(`Failed to create post: ${error.message}`)

    throw error
  }
}
