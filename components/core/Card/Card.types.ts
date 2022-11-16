import { AuthorProps } from '../../../types';

export interface CardProps {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  date: string;
  author: AuthorProps;
  excerpt: string;
}
