import { Heading, Stack, VStack } from '@chakra-ui/react'
import { Pagination } from '../../components/core'
import Layout from '../../components/layout'
import { Posts } from '../../components/posts'
import {
  blogSettingsQuery,
  countAllPostsQuery,
  countPostsByCategory,
  postsQuery,
} from '../../lib/groq'
import { getClient } from '../../lib/sanity.server'

const RESULTS_PER_PAGE = 6

const PostsPage = (props) => {
  const { preview, allPosts, currentPage, totalPages } = props
  return (
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
          {allPosts.length > 0 && <Posts posts={allPosts} />}
        </Stack>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          slug={`/posts`}
        />
      </VStack>
    </Layout>
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
    fallback: true,
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  // Fetch requested post and the three most recent posts, excluding this one.
  const totalPosts = await getClient(false).fetch(countAllPostsQuery)
  const totalPages = Math.ceil(totalPosts / RESULTS_PER_PAGE)

  const start = (params.page - 1) * RESULTS_PER_PAGE
  const end = start + RESULTS_PER_PAGE

  const posts = await getClient(preview).fetch(postsQuery, {
    start,
    end,
  })

  // Fetch the blog settings for page metadata
  // TODO: Can this be moved into context so it doesn't need fetched on every page?
  const blogSettings = await getClient(preview).fetch(blogSettingsQuery)

  // Fetch the list of categories and count the number of articles under each.
  const numberOfPostsInCategory = await getClient(preview).fetch(
    countPostsByCategory
  )

  return {
    props: {
      preview,
      allPosts: posts,
      blogSettings,
      numberOfPostsInCategory,
      currentPage: params.page,
      totalPages,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default PostsPage
