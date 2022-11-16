import { PageProps } from '..'
import { PostProps } from '../../primitives'
import { PostPageProps } from '../PostPageProps'

export interface HomePageProps extends PageProps {
  featuredPost: PostProps
  recentPosts: PostProps[]
}

export interface HomePageStaticPropsResponse {
  props: PostPageProps
  revalidate: number
}
