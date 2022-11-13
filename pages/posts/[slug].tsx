import { Box, Flex, Grid, GridItem, Stack, VStack } from '@chakra-ui/react'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../../components/layout'
import {
  AuthorCard,
  RecentPosts,
  PostBody,
  PostHeader,
  PostTitle,
} from '../../components/posts'
import { AuthorSocials } from '../../components/posts/AuthorSocials'
import { postQuery, postSlugsQuery, settingsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { PostProps } from '../../types'

interface Props {
  data: { post: PostProps; recentPosts: any }
  preview: any
  blogSettings: any
}

export default function Post(props: Props) {
  const { data: initialData, preview, blogSettings } = props
  const router = useRouter()

  const slug = initialData?.post?.slug
  const { data } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: initialData,
    enabled: preview && !!slug,
  })
  const { post, recentPosts } = data || {}
  const { title = 'Blog.' } = blogSettings || {}

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`${post.title} | ${title}`}</title>
        {post.coverImage?.asset?._ref && (
          <meta
            key="ogImage"
            property="og:image"
            content={urlForImage(post.coverImage)
              .width(1200)
              .height(627)
              .fit('crop')
              .url()}
          />
        )}
      </Head>
      <Box>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <VStack spacing={28}>
            <Grid
              templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
              maxW="6xl"
              gap={8}
              w="full"
              mx="auto"
            >
              <GridItem
                colSpan={{ base: 1, lg: 2 }}
                maxW="4xl"
                mx="auto"
                bg="white"
                py={16}
                shadow="md"
              >
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  category={post.category}
                />
                <PostBody content={post.content} />
              </GridItem>
              <GridItem as={Stack} spacing={16}>
                <AuthorCard {...post.author} />
                <AuthorSocials {...post.author} />
              </GridItem>
            </Grid>
            <Box>
              {recentPosts.length > 0 && <RecentPosts posts={recentPosts} />}
            </Box>
          </VStack>
        )}
      </Box>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { post, recentPosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  })
  const blogSettings = await getClient(preview).fetch(settingsQuery)
  console.log(post)

  return {
    props: {
      preview,
      data: {
        post,
        recentPosts: overlayDrafts(recentPosts),
      },
      blogSettings,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
