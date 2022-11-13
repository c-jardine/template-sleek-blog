import { Box, Grid, Heading, VStack } from '@chakra-ui/react'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { Card, CardSkeleton } from '../../components/core'
import Layout from '../../components/layout'
import {
  AuthorHeaderCard,
  AuthorHeaderCardSkeleton,
} from '../../components/posts'
import * as query from '../../lib/queries'
import { urlForImage } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { AuthorPageProps } from '../../types'

const AuthorPage = (props: AuthorPageProps) => {
  const router = useRouter()

  if (!router.isFallback && !props.data?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={props.preview}>
      <VStack spacing={28}>
        {!props.data?.author ? (
          <AuthorHeaderCardSkeleton />
        ) : (
          <AuthorHeaderCard {...props.data?.author} />
        )}
        <Box maxW="8xl" w="full" mx="auto">
          <Heading textStyle={['h2', 'gradient']} mb={16}>
            All posts
          </Heading>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16}>
            {!props.postsByAuthor ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              props.postsByAuthor?.map((post, index) => (
                <Card
                  key={index}
                  {...post}
                  coverImage={urlForImage(post.coverImage).url()}
                />
              ))
            )}
          </Grid>
        </Box>
      </VStack>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = await getClient(false).fetch(query.postSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  // Fetch the blog settings for page metadata
  // TODO: Can this be moved into context so it doesn't need fetched on every page?
  const blogSettings = await getClient(preview).fetch(query.settingsQuery)

  // Fetch the three most recent posts, excluding this one, by the author of this post.
  const postsByAuthor = await getClient(preview).fetch(query.authorPostsQuery, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: { slug: params.slug, author: postsByAuthor[0].author },
      blogSettings,
      postsByAuthor,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default AuthorPage
