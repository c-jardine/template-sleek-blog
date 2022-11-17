import { groq } from 'next-sanity';
import { blogSettingsQuery } from '../blog';
import { postsQuery } from '../post';

export const homePageQuery = groq`
{
  "blogSettings": ${blogSettingsQuery},
  "featuredPosts": *[_type == 'homePageSettings'][0]
  {
    "posts": featuredPosts[]->
      {
        slug, title, date, coverImage,
        author->{slug, name},
        category->{slug, label}
      }
  },
  "recentPosts": ${postsQuery}
}
`;
