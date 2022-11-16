import { Grid, GridItem, Stack, VStack } from '@chakra-ui/react';
import { PageLayout } from '../../../layouts';
import { AuthorPageProps } from '../../../types';
import { Pagination } from '../../core';
import {
  AuthorCard,
  AuthorPosts,
  AuthorSocials,
  CategoryPostsCard,
} from '../../posts';

const AuthorPageContent = (props: AuthorPageProps) => {
  const { preview, posts, pagination, slug, author, categories } = props;
  return (
    <PageLayout preview={preview}>
      <VStack spacing={28}>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
          maxW="8xl"
          gap={8}
          w="full"
          mx="auto"
          px={4}
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <VStack spacing={28}>
              <Stack spacing={8}>
                <AuthorPosts preview={preview} posts={posts} />
                <Pagination {...pagination} slug={`/author/${slug}`} />
              </Stack>
            </VStack>
          </GridItem>
          <GridItem as={Stack} spacing={16}>
            {author && (
              <>
                <AuthorCard {...author} />
                <AuthorSocials {...author} />
                <CategoryPostsCard data={categories} />
              </>
            )}
          </GridItem>
        </Grid>
      </VStack>
    </PageLayout>
  );
};
export default AuthorPageContent;
