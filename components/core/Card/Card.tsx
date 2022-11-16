import {
  Box,
  chakra,
  Flex,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { PostProps } from '../../../types';

import { urlForImage } from '../../../lib/sanity';
import { Button } from '../Button';

const Card = (props: PostProps) => {
  const { slug, title, excerpt, coverImage, isHero, category, date, author } =
    props || {};
  return (
    <VStack spacing={0} w="full" bg="white" shadow="md">
      <Box
        as={ChakraLink}
        href={`/posts/post/${slug}`}
        w="full"
        maxH={isHero ? 'xl' : 'lg'}
        overflow="hidden"
        aria-label={`View the post titled "${title}"`}
      >
        <Image
          src={
            isHero
              ? urlForImage(coverImage).width(1920).url()
              : urlForImage(coverImage).width(992).url()
          }
          width={isHero ? 1920 : 992}
          height="auto"
          alt=""
          objectFit="cover"
          transition="250ms ease-in-out"
          _hover={{ transform: { lg: 'scale(1.1)' } }}
        />
      </Box>

      <Stack
        p={8}
        spacing={4}
        w="full"
        alignItems={isHero ? 'center' : 'flex-start'}
        flex={1}
        justifyContent="space-between"
      >
        <Stack>
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
          <chakra.h3
            as={ChakraLink}
            href={`/posts/post/${slug}`}
            textStyle="link"
            fontSize={isHero ? '4xl' : '2xl'}
            fontWeight="semibold"
            letterSpacing="wider"
          >
            {title}
          </chakra.h3>
          <Text display="flex" gap={3} fontSize="sm" color="blackAlpha.500">
            <chakra.span
              // as={ChakraLink}
              textStyle="link"
              _hover={{ color: 'black' }}
            >
              {format(new Date(date), 'MMMM do, yyyy')}
            </chakra.span>
            <chakra.span color="black">|</chakra.span>
            <chakra.span>
              by{' '}
              <chakra.span
                as={ChakraLink}
                href={`/author/${author.slug.current}`}
                textStyle="link"
                _hover={{ color: 'black' }}
              >
                {author.name}
              </chakra.span>
            </chakra.span>
          </Text>
          <Text color="blackAlpha.700" letterSpacing={0.5}>
            {excerpt}
          </Text>
        </Stack>
        <Flex justifyContent={isHero ? 'center' : 'flex-start'} w="full" pt={8}>
          <Button
            href={`/posts/post/${slug}`}
            variant="light"
            ariaLabel={`View the post titled "${title}"`}
          >
            View post
          </Button>
        </Flex>
      </Stack>
    </VStack>
  );
};

export default Card;
