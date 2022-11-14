import groq from 'groq'

const postFields = groq`
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, slug, picture, bio, socials->{...}},
  "category": category->{label}
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc)[0...4] {
  ${postFields}
}`

export const allPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) [$start...$end] {
  content,
  ${postFields}
}`

export const countAllPostsQuery = groq`
count(*[_type == "post"])
`

export const postQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "recentPosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...3] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const authorSlugsQuery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`

export const countPostsByAuthor = groq`
count(*[_type == "post" && author._ref in *[_type=="author" && slug.current == $slug ]._id])
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
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

export const countPostsByCategory = groq`
*[_type == "category"] {
    label,
      "posts": count(*[_type == "post" && category._ref == ^._id])
  }
`
