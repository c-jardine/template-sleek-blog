import { Heading, Stack, VStack } from '@chakra-ui/react';
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
        px={4}
      >
        <Stack spacing={16}>
          <Heading textStyle={['h2', 'gradient']}>All posts</Heading>
          {posts.length > 0 && <Posts posts={posts} />}
        </Stack>
        <Pagination {...pagination} slug={`/posts`} />
      </VStack>
    </PageLayout>
  );
};
export default PostsPageContent;
