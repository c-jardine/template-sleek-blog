import { groq } from 'next-sanity';
import { blogSettingsQuery } from '../blog';
import { GET_ALL_CATEGORIES_WITH_POST_COUNT } from '../category';
import { postFields, recentPostsQuery } from '../post';

/**
 * Get list of slugs of all posts.
 */
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

/**
 * Get a post by its slug.
 */
export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  content, ${postFields}
}
`;

/**
 * Get data required for individual post pages. Gets the data for the post and the three most recent posts.
 */
export const postPageQuery = groq`
{
  "blogSettings": ${blogSettingsQuery},
  "post": ${postBySlugQuery},
  "categories": ${GET_ALL_CATEGORIES_WITH_POST_COUNT},
  "recentPosts": ${recentPostsQuery}
}`;
