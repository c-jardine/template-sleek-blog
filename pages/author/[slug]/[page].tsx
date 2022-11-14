import { Grid, GridItem, Stack, VStack } from '@chakra-ui/react'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { Pagination } from '../../../components/core'
import Layout from '../../../components/layout'
import {
  AuthorCard,
  AuthorPosts,
  AuthorSocials,
  CategoryPostsCard,
} from '../../../components/posts'
import * as query from '../../../lib/queries'
import { getClient } from '../../../lib/sanity.server'
import { AuthorPageProps } from '../../../types'

const RESULTS_PER_PAGE = 4

const AuthorPage = (props: AuthorPageProps) => {
  const router = useRouter()

  const { preview, slug, author, posts, categories, currentPage, totalPages } =
    props

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <VStack spacing={28}>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
          maxW="8xl"
          gap={8}
          w="full"
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <VStack spacing={28}>
              {/* {!author ? (
                <AuthorHeaderCardSkeleton />
              ) : (
                <AuthorHeaderCard {...author} />
              )} */}
              <Stack spacing={8}>
                <AuthorPosts preview={preview} slug={slug} posts={posts} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  slug={`/author/${slug}`}
                />
              </Stack>
            </VStack>
          </GridItem>
          <GridItem as={Stack} spacing={16}>
            {author && (
              <>
                <AuthorCard {...author} />
                <AuthorSocials {...author} />
                <CategoryPostsCard posts={categories} />
              </>
            )}
          </GridItem>
        </Grid>
      </VStack>
    </Layout>
  )
}

/**
 * Match paths based on author's slug.
 */
export const getStaticPaths = async () => {
  const slugs = await getClient(false).fetch(query.authorSlugsQuery)
  // const paths = slugs.map((slug: string) => ({ params: { slug } }))
  const pathsData = await Promise.all(
    slugs.map(async (slug: string) => {
      // Get the total number of posts by the author and divide by the
      // number shown per page to get the total number of pages.
      const totalPages =
        (await getClient(false).fetch(query.countPostsByAuthor, {
          slug,
        })) / RESULTS_PER_PAGE
      const totalPagesArray = [...Array(Math.ceil(totalPages)).keys()]
      const params = totalPagesArray.map((page) => {
        // Set page to page + 1 to make them 1-indexed.
        return { params: { slug, page: (page + 1).toString() } }
      })
      return params
    })
  )

  // Flatten results as necessary to match required paths typing.
  const paths = [].concat.apply([], pathsData)

  return {
    paths,
    fallback: true,
  }
}

/**
 * Retrieve the necessary data.
 */
export const getStaticProps = async ({ params, preview = false }) => {
  // Fetch the blog settings for page metadata
  // TODO: Can this be moved into context so it doesn't need fetched on every page?
  const blogSettings = await getClient(preview).fetch(query.settingsQuery)

  const totalPosts = await getClient(false).fetch(query.countPostsByAuthor, {
    slug: params.slug,
  })
  const totalPages = Math.ceil(totalPosts / RESULTS_PER_PAGE)

  const start = (params.page - 1) * RESULTS_PER_PAGE
  const end = start + RESULTS_PER_PAGE

  const posts = await getClient(preview).fetch(query.authorPostsQuery, {
    slug: params.slug,
    start,
    end,
  })

  // Fetch the list of categories and count the number of articles under each.
  const categories = await getClient(preview).fetch(query.countPostsByCategory)

  return {
    props: {
      preview,
      slug: params.slug,
      author: posts[0].author,
      posts,
      blog: blogSettings,
      categories,
      currentPage: params.page,
      totalPages,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default AuthorPage
