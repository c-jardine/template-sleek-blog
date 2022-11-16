import { NextSeo } from 'next-seo';
import { CategoryPageContent } from '../../../components/pages';
import {
  COUNT_POSTS_BY_CATEGORY,
  GET_ALL_CATEGORY_SLUGS,
  GET_CATEGORY_PAGE,
} from '../../../lib/groq';
import { generatePages, pagination } from '../../../lib/helpers';
import { getClient } from '../../../lib/sanity';
import {
  CategoryPageProps,
  CategoryPageStaticPathsResponse,
  CategoryPageStaticPropsResponse,
} from '../../../types';

const RESULTS_PER_PAGE = 6;

const CategoryPage = (props: CategoryPageProps) => {
  const { blogSettings, category } = props;

  return (
    <>
      <NextSeo
        title={category.label}
        // description={author.bio}
        // canonical={`blogSettings.url/${author.slug}`}
        openGraph={{
          // url: blogSettings.url,
          title: `${category.label} | ${blogSettings.title}`,
          // description: author.bio,
          // images: [
          //   {
          //     url: urlForImage(author.picture)
          //       .width(1200)
          //       .height(627)
          //       .fit('crop')
          //       .url(),
          //     width: 900,
          //     height: 800,
          //     alt: 'Share image',
          //     type: 'image/jpeg',
          //   },
          // ],
          siteName: blogSettings.title,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <CategoryPageContent {...props} />
    </>
  );
};

/**
 * Match paths based on author's slug. It works by retrieving all author slugs,
 * and calculates the total number of pages of posts that author will have,
 * based on the results show per page.
 */
export const getStaticPaths =
  async (): Promise<CategoryPageStaticPathsResponse> => {
    const slugs = await getClient(false).fetch(GET_ALL_CATEGORY_SLUGS);
    const pathsData = await generatePages(
      slugs,
      COUNT_POSTS_BY_CATEGORY,
      RESULTS_PER_PAGE
    );

    // Flatten results as necessary to match required paths typing.
    const paths = [].concat.apply([], pathsData);

    return {
      paths,
      fallback: false,
    };
  };

/**
 * Retrieve the necessary data.
 */
export const getStaticProps = async ({
  params,
  preview = false,
}): Promise<CategoryPageStaticPropsResponse> => {
  const { start, end, totalPages } = await pagination(
    params.page,
    RESULTS_PER_PAGE,
    COUNT_POSTS_BY_CATEGORY,
    { slug: params.slug }
  );

  const { blogSettings, category, posts } = await getClient(preview).fetch(
    GET_CATEGORY_PAGE,
    {
      slug: params.slug,
      start,
      end,
    }
  );
  console.log(blogSettings);

  return {
    props: {
      preview,
      slug: params.slug,
      blogSettings,
      category,
      posts,
      pagination: {
        currentPage: params.page,
        totalPages,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export default CategoryPage;
