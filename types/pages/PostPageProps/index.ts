import { PageProps } from '..'
import { CategoryPostsCardProps } from '../../../components/posts'
import { PostProps, SlugProps } from '../../primitives'

export interface PostPageProps extends PageProps {
  slug: SlugProps
  post: PostProps
  recentPosts: PostProps[]
  postsByAuthor: PostProps[]
  categories: CategoryPostsCardProps[]
}

export interface PostPageStaticPathsProps {
  paths: { params: { slug: string } }
  fallback: boolean
}

export interface PostPageStaticPropsResponse {
  props: PostPageProps
  revalidate: number
}
