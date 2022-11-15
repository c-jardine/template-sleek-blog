import { CategoryPostsCardProps } from '../../components/posts'
import {
  AuthorProps,
  BlogSettingsProps,
  PostProps,
  SlugProps,
} from '../primitives'

export interface HomePageProps {
  preview: boolean
  blogSettings: BlogSettingsProps
  featuredPost: PostProps
  recentPosts: PostProps[]
}

export interface PostPageProps {
  slug: SlugProps
  post: PostProps
  recentPosts: PostProps[]
  preview: any
  blogSettings: BlogSettingsProps
  postsByAuthor: PostProps[]
  categories: CategoryPostsCardProps[]
}

export interface AuthorPageProps {
  preview: any
  slug: SlugProps
  blogSettings: BlogSettingsProps
  author: AuthorProps
  posts: PostProps[]
  categories: CategoryPostsCardProps[]
  currentPage: number
  totalPages: number
}
