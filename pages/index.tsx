import { Box, VStack } from '@chakra-ui/react'
import Head from 'next/head'

import { Card } from '../components/core'
import Layout from '../components/layout'
import { RecentPosts } from '../components/posts'
import { indexQuery, settingsQuery } from '../lib/queries'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { getClient, overlayDrafts } from '../lib/sanity.server'

const Index = ({ allPosts: initialAllPosts, preview, blogSettings }) => {
  const { data: allPosts } = usePreviewSubscription(indexQuery, {
    initialData: initialAllPosts,
    enabled: preview,
  })
  const [heroPost, ...recentPosts] = allPosts || []
  const { title = 'Blog.' } = blogSettings || {}

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{title}</title>
        </Head>
        <VStack spacing={28} w="full" justifyContent="center">
          {heroPost && (
            <Box maxW="6xl" w="full" px={4}>
              <Card
                {...heroPost}
                isHero
                coverImage={urlForImage(heroPost.coverImage)}
              />
            </Box>
            // <HeroPost
            //   title={heroPost.title}
            //   coverImage={heroPost.coverImage}
            //   date={heroPost.date}
            //   author={heroPost.author}
            //   slug={heroPost.slug}
            //   excerpt={heroPost.excerpt}
            // />
          )}

          {recentPosts.length > 0 && <RecentPosts posts={recentPosts} />}
        </VStack>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
    const blogSettings = await getClient(preview).fetch(settingsQuery)

    return {
      props: { allPosts, preview, blogSettings },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    }
  }

  /* when the client isn't set up */
  return {
    props: {},
    revalidate: undefined,
  }
}

export default Index
