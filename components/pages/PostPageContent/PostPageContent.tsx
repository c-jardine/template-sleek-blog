import { Box, Grid, GridItem, Stack, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import * as query from '../../../lib/queries'
import { useRouter } from 'next/router'
import { urlForImage, usePreviewSubscription } from '../../../lib/sanity'
import { PostPageProps } from '../../../types'
import Layout from '../../layout'
import {
  AuthorCard,
  AuthorSocials,
  CategoryPostsCard,
  PostBody,
  PostHeader,
  PostsByAuthorCard,
  PostTitle,
  Posts,
} from '../../posts'

const PostPageContent = (props: PostPageProps) => {
  const router = useRouter()

  const { data: initialData, preview, blogSettings } = props

  const slug = initialData?.post?.slug
  const { data } = usePreviewSubscription(query.postQuery, {
    params: { slug },
    initialData: initialData,
    enabled: preview && !!slug,
  })
  const { post, recentPosts } = data || {}
  const { title = 'Untitled Blog' } = blogSettings || {}

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
                <PostsByAuthorCard
                  posts={props.postsByAuthor}
                  author={post.author.name}
                />
                <CategoryPostsCard posts={props.countPostsByCategory} />
              </GridItem>
            </Grid>
            <Box>{recentPosts.length > 0 && <Posts posts={recentPosts} />}</Box>
          </VStack>
        )}
      </Box>
    </Layout>
  )
}

export default PostPageContent
