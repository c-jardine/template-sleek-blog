import { groq } from 'next-sanity'
import { postFields } from '../post'

export const countPostsByAuthor = groq`
count(*[_type == "post" && author._ref in *[_type=="author" && slug.current == $slug ]._id])
`

export const postsByAuthorQuery = groq`
*[_type == "post" && slug.current != $slug && author._ref in *[_type=="author" && name == $authorName ]._id][0...3] {
    date, title, slug, coverImage,
      "category": category->{label}
  }
`

export const authorPostsQuery = groq`
*[_type == "post" && author._ref in *[_type=="author" && slug.current == $slug ]._id] | order(date desc) [$start...$end] {
    ${postFields}
  }
`
