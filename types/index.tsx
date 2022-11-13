export interface AuthorProps {
  name: string
  slug: { current: string }
  picture: any
  bio: string
  socials: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
  }
}

export interface PostProps {
  title: string
  coverImage: any
  date: string
  excerpt?: string
  author: AuthorProps
  slug?: string
  content?: any
  category: CategoryProps
}

export interface CategoryProps {
  label: string
}

export interface PostPageProps {
  data: { post: PostProps; recentPosts: any }
  preview: any
  blogSettings: any
  postsByAuthor: any
  countPostsByCategory: any
}

export interface AuthorPageProps {
  data: { slug: string; author: AuthorProps }
  preview: any
  postsByAuthor: PostProps[]
}
