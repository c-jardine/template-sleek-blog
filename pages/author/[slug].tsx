import { Grid, GridItem, Stack, VStack } from '@chakra-ui/react'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import {
  AuthorCard,
  AuthorHeaderCard,
  AuthorHeaderCardSkeleton,
  AuthorPosts,
  AuthorSocials,
  CategoryPostsCard,
} from '../../components/posts'
import * as query from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import { AuthorPageProps } from '../../types'

const AuthorPage = (props: AuthorPageProps) => {
  const router = useRouter()

  const { preview, slug, author, posts, categories } = props

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
              {!author ? (
                <AuthorHeaderCardSkeleton />
              ) : (
                <AuthorHeaderCard {...author} />
              )}
              <AuthorPosts preview={preview} slug={slug} />
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
        {/* <Box>
          {recentPosts.length > 0 && <RecentPosts posts={recentPosts} />}
        </Box> */}
      </VStack>
    </Layout>
  )
}

/**
 * Match paths based on author's slug.
 */
export const getStaticPaths = async () => {
  const paths = await getClient(false).fetch(query.postSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
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

  // Fetch the three most recent posts, excluding this one, by the author of this post.
  const posts = await getClient(preview).fetch(query.authorPostsQuery, {
    slug: params.slug,
    start: 0,
    end: 1,
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
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default AuthorPage
