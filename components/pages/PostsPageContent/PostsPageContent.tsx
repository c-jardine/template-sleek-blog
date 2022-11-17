import { Heading, Stack, VStack, chakra, Text } from '@chakra-ui/react';
import { PageLayout } from '../../../layouts';
import { PostsPageProps } from '../../../types';
import { Pagination } from '../../core';
import { Posts } from '../../posts';

const PostsPageContent = (props: PostsPageProps) => {
  const { preview, posts, pagination } = props;
  return (
    <PageLayout preview={preview}>
      <VStack
        spacing={28}
        w="full"
        maxW="8xl"
        mx="auto"
        justifyContent="center"
        px={{ base: 4, '2xl': 0 }}
      >
        <Stack spacing={10}>
          <chakra.h1 textStyle="h1">
            <chakra.span textStyle="gradient">All posts</chakra.span>
          </chakra.h1>
          {posts.length > 0 && <Posts posts={posts} />}
        </Stack>
        <Pagination {...pagination} slug={`/posts`} />
      </VStack>
    </PageLayout>
  );
};
export default PostsPageContent;
