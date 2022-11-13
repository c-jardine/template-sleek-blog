export interface AuthorProps {
  name: string
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
