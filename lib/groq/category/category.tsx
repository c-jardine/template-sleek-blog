import { groq } from 'next-sanity'

export const countPostsByCategory = groq`
*[_type == "category"] {
    label,
      "posts": count(*[_type == "post" && category._ref == ^._id])
  }
`
