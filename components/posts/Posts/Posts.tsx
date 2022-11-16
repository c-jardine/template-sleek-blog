import { Box, SimpleGrid } from '@chakra-ui/react';
import { PostProps } from '../../../types';
import { Card } from '../../core';

const Posts = ({ posts }: { posts: PostProps[] }) => {
  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        w="full"
        rowGap={{ base: 16 }}
        columnGap={8}
      >
        {posts?.map((post, index) => (
          <Card
            {...post}
            // key={post?.slug?.current}
            key={index}
            coverImage={post?.coverImage}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Posts;
