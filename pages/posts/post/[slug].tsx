import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { PostPageContent } from '../../../components/pages'

import * as query from '../../../lib/queries'
import { getClient, overlayDrafts } from '../../../lib/sanity.server'
import { PostPageProps } from '../../../types'

const PostPage = (props: PostPageProps) => {
  const router = useRouter()
  const { data: initialData } = props

  const slug = initialData?.post?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return <PostPageContent {...props} />
}

export const getStaticPaths = async () => {
  const paths = await getClient(false).fetch(query.postSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  // Fetch requested post and the three most recent posts, excluding this one.
  const { post, recentPosts } = await getClient(preview).fetch(
    query.postQuery,
    {
      slug: params.slug,
    }
  )

  // Fetch the blog settings for page metadata
  // TODO: Can this be moved into context so it doesn't need fetched on every page?
  const blogSettings = await getClient(preview).fetch(query.settingsQuery)

  // Fetch the three most recent posts, excluding this one, by the author of this post.
  const postsByAuthor = await getClient(preview).fetch(
    query.postsByAuthorQuery,
    {
      slug: params.slug,
      authorName: post.author.name,
    }
  )

  // Fetch the list of categories and count the number of articles under each.
  const countPostsByCategory = await getClient(preview).fetch(
    query.countPostsByCategory
  )

  return {
    props: {
      preview,
      data: {
        post,
        recentPosts: overlayDrafts(recentPosts),
      },
      blogSettings,
      postsByAuthor,
      countPostsByCategory,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default PostPage
