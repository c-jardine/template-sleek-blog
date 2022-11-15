import { groq } from 'next-sanity'
import { blogSettingsQuery } from '../blog'
import { postsQuery } from '../post'

/**
 * Get data required for individual post pages. Gets the data for the post and the three most recent posts.
 */
export const postsPageQuery = groq`
{
  "blogSettings": ${blogSettingsQuery},
  "posts": ${postsQuery},
}`
