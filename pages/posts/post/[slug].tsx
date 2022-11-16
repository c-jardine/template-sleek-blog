import { Text } from '@chakra-ui/react';
import { ArticleJsonLd, NextSeo, SocialProfileJsonLd } from 'next-seo';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { PostPageContent } from '../../../components/pages';
import {
  postPageQuery,
  postsByAuthorQuery,
  postSlugsQuery,
} from '../../../lib/groq';
import { getClient, overlayDrafts, urlForImage } from '../../../lib/sanity';
import {
  PostPageProps,
  PostPageStaticPathsProps,
  PostPageStaticPropsResponse,
} from '../../../types';

const PostPage = (props: PostPageProps) => {
  const router = useRouter();
  const { slug, post, blogSettings } = props || {};
  const { socials } = post?.author || {};

  if (!props) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <NextSeo
        title={post?.title}
        description={post?.excerpt}
        canonical={`${blogSettings?.url}/posts/post/${slug}`}
        openGraph={{
          type: 'article',
          url: `${blogSettings?.url}/posts/post/${slug}`,
          title: post?.title,
          description: post?.excerpt,
          article: {
            publishedTime: post?.date,
            authors: [post?.author?.name],
            section: post?.category?.label,
          },
          images: [
            {
              url: urlForImage(post?.coverImage)
                .width(1200)
                .height(627)
                .fit('crop')
                .url(),
              width: 900,
              height: 800,
              alt: 'Share image',
              type: 'image/jpeg',
            },
          ],
          siteName: blogSettings?.title,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <ArticleJsonLd
        url={`${blogSettings?.url}/posts/post/${slug}`}
        title={post?.title}
        images={[urlForImage(post?.coverImage).url()]}
        datePublished={post?.date}
        authorName={[
          {
            name: post?.author?.name,
          },
        ]}
        description={post?.excerpt}
        isAccessibleForFree={true}
      />
      <SocialProfileJsonLd
        type="Person"
        name={post?.author?.name}
        url={blogSettings?.url}
        sameAs={[
          socials?.facebook,
          socials?.instagram,
          socials?.twitter,
          socials?.youtube,
        ]}
      />
      <PostPageContent {...props} />
    </>
  );
};

export const getStaticPaths = async (): Promise<PostPageStaticPathsProps> => {
  const paths = await getClient(false).fetch(postSlugsQuery);
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
  preview = false,
}): Promise<PostPageStaticPropsResponse> => {
  // Fetch requested post and the three most recent posts, excluding this one.
  const { blogSettings, post, categories, recentPosts } = await getClient(
    preview
  ).fetch(postPageQuery, {
    slug: params.slug,
  });

  // Fetch the three most recent posts, excluding this one, by the author of this post?.
  // TODO: Move this into main query.
  const postsByAuthor = await getClient(preview).fetch(postsByAuthorQuery, {
    slug: params.slug,
    authorName: post?.author?.name,
  });

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
  };
};

export default PostPage;
