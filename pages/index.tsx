import {
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { NextSeo } from 'next-seo';
import { Carousel, FeaturedCard } from '../components/core';
import { Posts } from '../components/posts';
import { PageLayout } from '../layouts';
import { brandQuery, homePageQuery } from '../lib/groq';
import { getClient } from '../lib/sanity';
import { HomePageProps, HomePageStaticPropsResponse } from '../types';

const HomePage = (props: HomePageProps) => {
  const { preview, blogSettings, featuredPosts, recentPosts } = props;

  return (
    <>
      <NextSeo
        title="Home"
        // description={featuredPost.excerpt}
        canonical={blogSettings.url}
        openGraph={{
          url: blogSettings.url,
          title: `Home | ${blogSettings.title}`,
          // description: featuredPost.excerpt,
          // images: [
          //   {
          //     url: urlForImage(featuredPost.coverImage)
          //       .width(1200)
          //       .height(627)
          //       .fit('crop')
          //       .url(),
          //     width: 900,
          //     height: 800,
          //     alt: 'Share image',
          //     type: 'image/jpeg',
          //   },
          // ],
          siteName: blogSettings.title,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <PageLayout preview={preview}>
        <VStack
          mt={{ base: -8, lg: -10 }}
          spacing={28}
          w="full"
          maxW="100vw"
          mx="auto"
          justifyContent="center"
        >
          <Carousel>
            {featuredPosts.posts.map((post, index) => (
              <FeaturedCard
                key={index}
                {...post}
                coverImage={post.coverImage}
              />
            ))}
          </Carousel>

          <Stack spacing={10} maxW="8xl" mx="auto" px={{ base: 4, '2xl': 0 }}>
            <chakra.h2 textStyle="h1">
              <chakra.span textStyle="gradient">Recent posts</chakra.span>
            </chakra.h2>
            {recentPosts.length > 0 && <Posts posts={recentPosts} />}
            <Link
              aria-label="View all blog posts"
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
              w="fit-content"
              mt={{ base: 16 }}
              role="group"
              href="/posts"
            >
              <Text textStyle="link" variant="upperWide" color="headerText">
                View all posts
              </Text>
              <Icon as={BsArrowRight} h={5} w={5} color="headerText" />
            </Link>
          </Stack>
        </VStack>
      </PageLayout>
    </>
  );
};

export async function getStaticProps({
  preview = false,
}): Promise<HomePageStaticPropsResponse> {
  /* check if the project id has been defined by fetching the vercel envs */
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    // Get the home page data.
    const data = await getClient(preview).fetch(homePageQuery, {
      slug: '',
      start: 1,
      end: 4,
    });

    return {
      props: { ...data, preview },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    };
  }
}

export default HomePage;
