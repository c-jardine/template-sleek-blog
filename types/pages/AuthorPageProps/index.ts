import { PageProps } from '..';
import { CategoryPostsCardProps } from '../../../components/posts';
import {
  AuthorProps,
  PaginationProps,
  PostProps,
  SlugProps,
} from '../../primitives';

export interface AuthorPageProps extends PageProps {
  slug: SlugProps;
  author: AuthorProps;
  posts: PostProps[];
  categories: CategoryPostsCardProps[];
  pagination: PaginationProps;
}

export interface AuthorPageStaticPathsResponse {
  paths: { params: { page: string } }[];
  fallback: boolean;
}

export interface AuthorPageStaticPropsResponse {
  props: AuthorPageProps;
  revalidate: number;
}
