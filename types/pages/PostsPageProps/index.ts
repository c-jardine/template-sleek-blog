import { PageProps } from '..';
import { PaginationProps, PostProps } from '../../primitives';

export interface PostsPageProps extends PageProps {
  posts: PostProps[];
  pagination: PaginationProps;
}

export interface PostsPageStaticPathsResponse {
  paths: { params: { page: string } }[];
  fallback: boolean;
}

export interface PostsPageStaticPropsResponse {
  props: PostsPageProps;
  revalidate: number;
}
