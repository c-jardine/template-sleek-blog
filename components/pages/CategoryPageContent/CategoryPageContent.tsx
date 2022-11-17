import { chakra, Stack, VStack } from '@chakra-ui/react';
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
        px={{ base: 4, '2xl': 0 }}
      >
        <Stack spacing={10}>
          <chakra.h1 textStyle="h1">
            <chakra.span textStyle="gradient">{category.label}</chakra.span>
          </chakra.h1>
          {posts.length > 0 && <Posts posts={posts} />}
        </Stack>
        <Pagination {...pagination} slug={`/category/${slug}`} />
      </VStack>
    </PageLayout>
  );
};
export default CategoryPageContent;
