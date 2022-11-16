import { groq } from 'next-sanity';
import { postFields } from '../post';

export const GET_ALL_CATEGORY_SLUGS = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;

/**
 * Get an category by its slug.
 */
export const GET_CATEGORY_BY_SLUG = groq`
*[_type == "category" && slug.current == $slug][0]
`;

export const COUNT_POSTS_BY_CATEGORY = groq`
count(*[_type == "post" && category._ref in *[_type == "category" && slug.current == $slug ]._id])
`;

export const GET_ALL_CATEGORIES_WITH_POST_COUNT = groq`
*[_type == "category"] {
    label, slug,
      "posts": count(*[_type == "post" && category._ref == ^._id])
  }
`;

export const GET_POSTS_BY_CATEGORY_PAGINATED = groq`
*[_type == "post" && category._ref in *[_type=="category" && slug.current == $slug ]._id] | order(date desc) [$start...$end] {
    ${postFields}
  }
`;
