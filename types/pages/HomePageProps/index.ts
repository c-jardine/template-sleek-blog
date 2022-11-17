import { PageProps } from '..';
import { PostProps } from '../../primitives';
import { PostPageProps } from '../PostPageProps';

export interface HomePageProps extends PageProps {
  featuredPosts: PostProps[];
  recentPosts: PostProps[];
}

export interface HomePageStaticPropsResponse {
  props: PostPageProps;
  revalidate: number;
}
