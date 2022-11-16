import { PaginationHelperProps } from '../../types';
import { getClient } from '../sanity';

export const pagination = async (
  pageNumber: number,
  resultsPerPage: number,
  query: string,
  params?: {}
): Promise<PaginationHelperProps> => {
  const totalPosts = await getClient(false).fetch(query, params);
  const totalPages = Math.ceil(totalPosts / resultsPerPage);

  const start = (pageNumber - 1) * resultsPerPage;
  const end = start + resultsPerPage;

  return { start, end, totalPages };
};

export const generatePages = async (slugs, query, resultsPerPage) => {
  const pathsData = await Promise.all(
    slugs.map(async (slug: string) => {
      // Get the total number of posts by the author and divide by the
      // number shown per page to get the total number of pages.
      const totalPages =
        (await getClient(false).fetch(query, {
          slug,
        })) / resultsPerPage;

      const totalPagesArray = [...Array(Math.ceil(totalPages)).keys()];
      const params = totalPagesArray.map((page) => {
        // Set page to page + 1 to make them 1-indexed.
        return { params: { slug, page: (page + 1).toString() } };
      });
      return params;
    })
  );
  return pathsData;
};
