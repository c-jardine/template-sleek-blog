import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { PostPageContent } from '../../../components/pages'
import {
  postPageQuery,
  postsByAuthorQuery,
  postSlugsQuery,
} from '../../../lib/groq'
import { getClient, overlayDrafts } from '../../../lib/sanity.server'
import { PostPageProps } from '../../../types'

const PostPage = (props: PostPageProps) => {
  const router = useRouter()
  const { slug, post } = props

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return <PostPageContent {...props} />
}

export const getStaticPaths = async () => {
  const paths = await getClient(false).fetch(postSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  // Fetch requested post and the three most recent posts, excluding this one.
  const { blogSettings, post, categories, recentPosts } = await getClient(
    preview
  ).fetch(postPageQuery, {
    slug: params.slug,
  })

  // Fetch the three most recent posts, excluding this one, by the author of this post.
  // TODO: Move this into main query.
  const postsByAuthor = await getClient(preview).fetch(postsByAuthorQuery, {
    slug: params.slug,
    authorName: post.author.name,
  })

  return {
    props: {
      slug: params.slug,
      preview,
      post,
      recentPosts: overlayDrafts(recentPosts),
      blogSettings,
      postsByAuthor,
      categories,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  }
}

export default PostPage
