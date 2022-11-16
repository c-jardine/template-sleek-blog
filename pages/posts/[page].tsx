import { NextSeo } from 'next-seo'
import { PostsPageContent } from '../../components/pages'
import { countAllPostsQuery, postsPageQuery } from '../../lib/groq'
import { pagination } from '../../lib/helpers'
import { getClient } from '../../lib/sanity'
import {
  PostsPageProps,
  PostsPageStaticPathsResponse,
  PostsPageStaticPropsResponse,
} from '../../types'

const RESULTS_PER_PAGE = 6

const PostsPage = (props: PostsPageProps) => {
  const { blogSettings } = props

  return (
    <>
      <NextSeo
        title="Posts"
        // description={featuredPost.excerpt}
        // canonical={blogSettings.url}
        openGraph={{
          // url: blogSettings.url,
          title: `Posts | ${blogSettings.title}`,
          // description: featuredPost.excerpt,
          // images: [
          //   {
          //     url: urlForImage(featuredPost.coverImage)
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
      <PostsPageContent {...props} />
    </>
  )
}

/**
 * Generate pagination routes for all posts.
 */
export const getStaticPaths =
  async (): Promise<PostsPageStaticPathsResponse> => {
    const totalPages = Math.ceil(
      (await getClient(false).fetch(countAllPostsQuery)) / RESULTS_PER_PAGE
    )

    // Build an array of numbers for 0 to totalPages.
    const pageNumbers = [...Array(Math.ceil(totalPages)).keys()]

    return {
      paths: pageNumbers.map((page) => {
        return {
          params: {
            page: (page + 1).toString(),
          },
        }
      }),
      fallback: false,
    }
  }

/**
 * Get static data.
 */
export const getStaticProps = async ({
  params,
  preview = false,
}): Promise<PostsPageStaticPropsResponse> => {
  const { start, end, totalPages } = await pagination(
    params.page,
    RESULTS_PER_PAGE
  )

  const { blogSettings, posts } = await getClient(preview).fetch(
    postsPageQuery,
    {
      start,
      end,
    }
  )

  return {
    props: {
      preview,
      blogSettings,
      posts,
      pagination: {
        currentPage: params.page,
        totalPages,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default PostsPage
