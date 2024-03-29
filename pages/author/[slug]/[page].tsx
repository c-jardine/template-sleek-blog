import { NextSeo } from 'next-seo';
import { AuthorPageContent } from '../../../components/pages';
import {
  authorPageQuery,
  authorSlugsQuery,
  countPostsByAuthor,
} from '../../../lib/groq';
import { getClient, urlForImage } from '../../../lib/sanity';
import {
  AuthorPageProps,
  AuthorPageStaticPathsResponse,
  AuthorPageStaticPropsResponse,
} from '../../../types';

const RESULTS_PER_PAGE = 4;

const AuthorPage = (props: AuthorPageProps) => {
  const { blogSettings, author } = props;

  const [firstName, lastName] = author?.name.split(' ');

  return (
    <>
      <NextSeo
        title={author.name}
        description={author.bio}
        canonical={`blogSettings.url/${author.slug}`}
        openGraph={{
          url: blogSettings.url,
          title: `${author.name} | ${blogSettings.title}`,
          description: author.bio,
          profile: {
            firstName,
            lastName,
          },
          images: [
            {
              url: urlForImage(author.picture)
                .width(1200)
                .height(627)
                .fit('crop')
                .url(),
              width: 900,
              height: 800,
              alt: 'Share image',
              type: 'image/jpeg',
            },
          ],
          siteName: blogSettings.title,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <AuthorPageContent {...props} />
    </>
  );
};

/**
 * Match paths based on author's slug. It works by retrieving all author slugs,
 * and calculates the total number of pages of posts that author will have,
 * based on the results show per page.
 */
export const getStaticPaths =
  async (): Promise<AuthorPageStaticPathsResponse> => {
    const slugs = await getClient(false).fetch(authorSlugsQuery);
    const pathsData = await Promise.all(
      slugs.map(async (slug: string) => {
        // Get the total number of posts by the author and divide by the
        // number shown per page to get the total number of pages.
        const totalPages =
          (await getClient(false).fetch(countPostsByAuthor, {
            slug,
          })) / RESULTS_PER_PAGE;
        const totalPagesArray = [...Array(Math.ceil(totalPages)).keys()];
        const params = totalPagesArray.map((page) => {
          // Set page to page + 1 to make them 1-indexed.
          return { params: { slug, page: (page + 1).toString() } };
        });
        return params;
      })
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
}): Promise<AuthorPageStaticPropsResponse> => {
  const start = (params.page - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;

  const { blogSettings, author, totalPosts, posts, categories } =
    await getClient(preview).fetch(authorPageQuery, {
      slug: params.slug,
      start,
      end,
    });

  const totalPages = Math.ceil(totalPosts / RESULTS_PER_PAGE);

  return {
    props: {
      preview,
      slug: params.slug,
      blogSettings,
      author,
      posts,
      categories,
      pagination: {
        currentPage: params.page,
        totalPages,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export default AuthorPage;
