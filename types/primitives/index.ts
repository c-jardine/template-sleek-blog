import { PortableTextProps } from '@portabletext/react';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface BlogSettingsProps {
  title: string;
  url: string;
  type: string;
}

export interface PostProps {
  title: string;
  coverImage: SanityImageObject;
  date: string;
  excerpt?: string;
  author: AuthorProps;
  slug?: SlugProps;
  content?: PortableTextProps;
  category: CategoryProps;
  isHero?: boolean;
}

export interface AuthorProps {
  slug: SlugProps;
  name: string;
  bio: string;
  picture: SanityImageObject;
  socials: SocialsProps;
}

export interface CategoryProps {
  slug: SlugProps;
  label: string;
}

export interface SlugProps {
  current: string;
}

export interface SocialsProps {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
