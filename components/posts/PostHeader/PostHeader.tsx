import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  chakra,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { PostProps } from '../../../types';
import { CoverImage } from '../../core';

const PostHeader = (props: PostProps) => {
  const { title, coverImage, date, author, category, slug } = props;
  return (
    <>
      <Flex justifyContent="center">
        <Text
          as={ChakraLink}
          href={`/category/${category.slug.current}/1`}
          color="brand.600"
          borderBottom="1px solid"
          borderColor="brand.500"
          textTransform="uppercase"
          fontSize="sm"
          w="fit-content"
          letterSpacing={1}
          textStyle="link"
        >
          {category.label}
        </Text>
      </Flex>
      <Heading textStyle="h1" textAlign="center" color="headerText">
        {title}
      </Heading>
      <Text
        display="flex"
        gap={3}
        fontSize="sm"
        color="subtleText"
        justifyContent="center"
      >
        <chakra.span
          // as={ChakraLink}
          textStyle="link"
          _hover={{ color: 'headerText' }}
        >
          {format(new Date(date), 'MMMM do, yyyy')}
        </chakra.span>
        <chakra.span color="bodyText">|</chakra.span>
        <chakra.span>
          by{' '}
          <chakra.span
            as={ChakraLink}
            href={`/author/${author.slug.current}`}
            textStyle="link"
            _hover={{ color: 'headerText' }}
          >
            {author.name}
          </chakra.span>
        </chakra.span>
      </Text>
      <Box mt={12}>
        <CoverImage title={title} image={coverImage} />
      </Box>
    </>
  );
};

export default PostHeader;
