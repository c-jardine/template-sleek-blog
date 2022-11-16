import { Heading, Stack, VStack } from '@chakra-ui/react';
import { PageLayout } from '../../../layouts';
import { CategoryPageProps } from '../../../types';
import { Pagination } from '../../core';
import { Posts } from '../../posts';

const CategoryPageContent = (props: CategoryPageProps) => {
  const { preview, posts, pagination, slug, category } = props;
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
          <Heading textStyle={['h2', 'gradient']}>{category.label}</Heading>
          {posts.length > 0 && <Posts posts={posts} />}
        </Stack>
        <Pagination {...pagination} slug={`/category/${slug}`} />
      </VStack>
    </PageLayout>
  );
};
export default CategoryPageContent;
