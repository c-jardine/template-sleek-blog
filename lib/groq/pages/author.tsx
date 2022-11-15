import { groq } from 'next-sanity'
import { authorPostsQuery, countPostsByAuthor } from '../author'
import { blogSettingsQuery } from '../blog'
import { countPostsByCategory } from '../category'

export const authorSlugsQuery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`

/**
 * Get an author by its slug.
 */
export const authorBySlugQuery = groq`
*[_type == "author" && slug.current == $slug][0]
{
  slug, name, bio, picture, socials->{...}
}
`

/**
 * Get data required for individual post pages. Gets the data for the post and the three most recent posts.
 */
export const authorPageQuery = groq`
{
  "blogSettings": ${blogSettingsQuery},
  "author": ${authorBySlugQuery},
  "totalPosts": ${countPostsByAuthor},
  "posts": ${authorPostsQuery},
  "categories": ${countPostsByCategory}
}`
