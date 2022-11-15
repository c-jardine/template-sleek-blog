import { Heading, Stack, VStack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { Pagination } from '../../components/core'
import Layout from '../../components/layout'
import { Posts } from '../../components/posts'
import {
  countAllPostsQuery,
  countPostsByCategory,
  postsPageQuery,
} from '../../lib/groq'
import { getClient } from '../../lib/sanity.server'

const RESULTS_PER_PAGE = 6

const PostsPage = (props) => {
  const { slug, preview, blogSettings, posts, currentPage, totalPages } = props

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
      <Layout preview={preview}>
        <VStack
          spacing={28}
          w="full"
          maxW="8xl"
          mx="auto"
          justifyContent="center"
          px={4}
        >
          <Stack spacing={16}>
            <Heading textStyle={['h2', 'gradient']}>All posts</Heading>
            {posts.length > 0 && <Posts posts={posts} />}
          </Stack>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            slug={`/posts`}
          />
        </VStack>
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const totalPages = Math.ceil(
    (await getClient(false).fetch(countAllPostsQuery)) / RESULTS_PER_PAGE
  )
  const totalPagesArray = [...Array(Math.ceil(totalPages)).keys()].map(
    (page) => {
      return {
        params: {
          page: (page + 1).toString(),
        },
      }
    }
  )

  return {
    paths: totalPagesArray,
    fallback: false,
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  // Fetch requested post and the three most recent posts, excluding this one.
  const totalPosts = await getClient(false).fetch(countAllPostsQuery)
  const totalPages = Math.ceil(totalPosts / RESULTS_PER_PAGE)

  const start = (params.page - 1) * RESULTS_PER_PAGE
  const end = start + RESULTS_PER_PAGE

  const { blogSettings, posts } = await getClient(preview).fetch(
    postsPageQuery,
    {
      start,
      end,
    }
  )

  // Fetch the list of categories and count the number of articles under each.
  const numberOfPostsInCategory = await getClient(preview).fetch(
    countPostsByCategory
  )

  return {
    props: {
      preview,
      blogSettings,
      posts,
      numberOfPostsInCategory,
      currentPage: params.page,
      totalPages,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default PostsPage
