import { PaginationHelperProps } from '../../types';
import { countAllPostsQuery } from '../groq';
import { getClient } from '../sanity';

export const pagination = async (
  pageNumber: number,
  resultsPerPage: number
): Promise<PaginationHelperProps> => {
  const totalPosts = await getClient(false).fetch(countAllPostsQuery);
  const totalPages = Math.ceil(totalPosts / resultsPerPage);

  const start = (pageNumber - 1) * resultsPerPage;
  const end = start + resultsPerPage;

  return { start, end, totalPages };
};
