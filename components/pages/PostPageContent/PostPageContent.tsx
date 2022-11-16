import { Box, Grid, GridItem, Stack, VStack } from '@chakra-ui/react';
import { PageLayout } from '../../../layouts';
import { PostPageProps } from '../../../types';
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
              <CategoryPostsCard data={categories} />
            </GridItem>
          </Grid>
          <Box>{recentPosts.length > 0 && <Posts posts={recentPosts} />}</Box>
        </VStack>
      </Box>
    </PageLayout>
  );
};

export default PostPageContent;
