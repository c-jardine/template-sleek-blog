import {
  Box,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { PageLayout } from '../../../layouts';
import { PostPageProps } from '../../../types';
import { chakra } from '@chakra-ui/react';
import {
  AuthorCard,
  AuthorSocials,
  CategoryPostsCard,
  PostBody,
  PostHeader,
  Posts,
  PostsByAuthorCard,
} from '../../posts';

const PostPageContent = (props: PostPageProps) => {
  const { post, slug, recentPosts, categories, preview, blogSettings } = props;

  return (
    <PageLayout preview={preview}>
      <Box>
        <VStack spacing={28} px={{ base: 4, '2xl': 0 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
            maxW="6xl"
            mx="auto"
            w="full"
            gap={8}
          >
            <GridItem
              colSpan={{ base: 1, lg: 2 }}
              maxW="4xl"
              mx="auto"
              bg="cardBackground"
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
              {post.author.socials && <AuthorSocials {...post.author} />}
              {props.postsByAuthor.length && (
                <PostsByAuthorCard
                  posts={props.postsByAuthor}
                  author={post.author.name}
                />
              )}
              <CategoryPostsCard data={categories} />
            </GridItem>
          </Grid>

          <Box
            maxW="66%"
            w="full"
            alignSelf="flex-start"
            bgGradient="linear(to-r, purple.700, brand.400)"
            style={{ height: 1 }}
          />

          <Stack spacing={10} maxW="8xl" w="full" mx="auto">
            <chakra.h2 textStyle="h1">
              <chakra.span textStyle="gradient">Recent posts</chakra.span>
            </chakra.h2>
            <Box>
              {recentPosts.length > 0 ? (
                <>
                  <Posts posts={recentPosts} />
                  <Link
                    aria-label="View all recent posts"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                    w="fit-content"
                    mt={{ base: 16 }}
                    role="group"
                    href="/posts"
                  >
                    <Text
                      textStyle="link"
                      variant="upperWide"
                      color="headerText"
                    >
                      View all posts
                    </Text>
                    <Icon as={BsArrowRight} h={5} w={5} color="headerText" />
                  </Link>
                </>
              ) : <Text>No posts found.</Text>}
            </Box>
          </Stack>
        </VStack>
      </Box>
    </PageLayout>
  );
};

export default PostPageContent;
