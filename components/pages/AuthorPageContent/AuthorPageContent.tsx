import { Grid, GridItem, Stack, VStack, chakra } from '@chakra-ui/react';
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
      <Stack spacing={10}>
        <chakra.h1
          textStyle="h1"
          maxW="8xl"
          w="full"
          mx="auto"
          px={{ base: 4, '2xl': 0 }}
        >
          <chakra.span textStyle="gradient">Posts by {author.name}</chakra.span>
        </chakra.h1>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
          maxW="8xl"
          gap={8}
          w="full"
          mx="auto"
          px={{ base: 4, '2xl': 0 }}
          alignSelf="center"
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Stack spacing={10}>
              <AuthorPosts preview={preview} posts={posts} />
              <Pagination {...pagination} slug={`/author/${slug}`} />
            </Stack>
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
      </Stack>
    </PageLayout>
  );
};
export default AuthorPageContent;
