import {
  Box,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
  chakra,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { urlForImage } from '../../../lib/sanity';
import { PostProps } from '../../../types';
import { SectionSeparator } from '../../core';

const PostsByAuthorCard = (props: { posts: PostProps[]; author: string }) => {
  return (
    <Stack bg="white" w="full" shadow="md" p={8} spacing={8}>
      <Text
        textTransform="uppercase"
        textAlign="center"
        fontWeight="bold"
        color="black"
        fontSize="sm"
        lineHeight={0}
      >
        More by {props.author}
      </Text>
      <SectionSeparator />
      {props.posts.map((post, index) => (
        <Stack key={index} direction={{ base: 'column', lg: 'row' }}>
          <Box
            as={ChakraLink}
            href={`/posts/post/${post.slug.current}`}
            maxW={{ base: 'full', lg: '33%' }}
            h={{ base: 48, lg: 16 }}
            overflow="hidden"
          >
            <Image
              src={urlForImage(post.coverImage).url()}
              alt="Post image"
              objectFit="cover"
            />
          </Box>
          <Box>
            <chakra.h3
              as={ChakraLink}
              href={`/posts/post/${post.slug.current}`}
              textStyle="link"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="md"
            >
              {post.title}
            </chakra.h3>
            <Text fontSize="xs">
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </Text>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default PostsByAuthorCard;
