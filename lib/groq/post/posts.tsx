import { groq } from 'next-sanity';

export const postFields = groq`
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, slug, picture, bio, socials->{...}},
  "category": category->{label}
`;

export const recentPostsQuery = groq`
*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...3] {
    content,
    ${postFields}
  }
`;

/**
 * Get posts in given range (between $start and $end). Order by date.
 */
export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) [$start...$end] {
  content,
  ${postFields}
}`;

/**
 * Get the total number of blog posts.
 */
export const countAllPostsQuery = groq`
count(*[_type == "post"])
`;
