import { groq } from 'next-sanity';
import { blogSettingsQuery } from '../blog';
import {
  GET_CATEGORY_BY_SLUG,
  GET_POSTS_BY_CATEGORY_PAGINATED,
} from '../category';

/**
 * Get data required for individual post pages. Gets the data for the post and the three most recent posts.
 */
export const GET_CATEGORY_PAGE = groq`
{
  "blogSettings": ${blogSettingsQuery},
  "category": ${GET_CATEGORY_BY_SLUG},
  "posts": ${GET_POSTS_BY_CATEGORY_PAGINATED},
}`;
