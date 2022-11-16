import { groq } from 'next-sanity';
import { blogSettingsQuery } from '../blog';
import { postFields, postsQuery } from '../post';

export const homePageQuery = groq`
{
  "blogSettings": ${blogSettingsQuery},
  "featuredPost": *[_type == "post"] | order(date desc, _updatedAt desc) [0] {
    ${postFields}
  },
  "recentPosts": ${postsQuery}
}
`;
