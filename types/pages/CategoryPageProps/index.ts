import { PageProps } from '..';
import {
  CategoryProps,
  PaginationProps,
  PostProps,
  SlugProps,
} from '../../primitives';

export interface CategoryPageProps extends PageProps {
  slug: SlugProps;
  category: CategoryProps;
  posts: PostProps[];
  pagination: PaginationProps;
}

export interface CategoryPageStaticPathsResponse {
  paths: { params: { page: string } }[];
  fallback: boolean;
}

export interface CategoryPageStaticPropsResponse {
  props: CategoryPageProps;
  revalidate: number;
}
