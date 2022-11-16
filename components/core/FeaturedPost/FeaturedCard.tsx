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

const FeaturedCard = (props: PostProps) => {
  const { slug, title, excerpt, coverImage, isHero, category, date, author } =
    props || {};
  return (
    <VStack
      position="relative"
      spacing={0}
      bg="white"
      shadow="md"
      // maxW="4xl"
      w="full"
    >
      <Box w="full" maxH="lg" overflow="hidden">
        <Box
          position="absolute"
          w="full"
          h="full"
          bg="blackAlpha.700"
          zIndex={1}
        />
        <Image
          filter="saturate(0.5)"
          src={urlForImage(coverImage).width(1920).url()}
          width={1920}
          height="lg"
          alt=""
          objectFit="cover"
          transition="250ms ease-in-out"
          _hover={{ transform: { lg: 'scale(1.1)' } }}
        />
      </Box>

      <Flex
        position="absolute"
        zIndex={2}
        h="full"
        justifyContent="center"
        alignItems={{ base: 'center', lg: 'flex-end' }}
        pb={{ lg: 8 }}
      >
        <Stack
          maxW="2xl"
          p={8}
          spacing={4}
          w="full"
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            as={ChakraLink}
            href={`/category/${category.slug.current}/1`}
            color="white"
            borderBottom="1px solid"
            borderColor="white"
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="semibold"
            w="fit-content"
            letterSpacing={1}
            textStyle="link"
            _hover={{ color: 'brand.200' }}
          >
            {category.label}
          </Text>
          <chakra.h3
            as={ChakraLink}
            href={`/posts/post/${slug}`}
            color="white"
            textStyle="link"
            textAlign="center"
            fontSize={isHero ? '4xl' : '2xl'}
            fontWeight="black"
            letterSpacing="wider"
          >
            {title}
          </chakra.h3>
          <Text
            display="flex"
            gap={3}
            fontSize="sm"
            color="white"
            fontWeight="normal"
          >
            <chakra.span
              // as={ChakraLink}
              textStyle="link"
              _hover={{ color: 'brand.200' }}
            >
              {format(new Date(date), 'MMMM do, yyyy')}
            </chakra.span>
            <chakra.span>|</chakra.span>
            <chakra.span>
              by{' '}
              <chakra.span
                as={ChakraLink}
                href={`/author/${author.slug.current}`}
                textStyle="link"
                _hover={{ color: 'brand.200' }}
              >
                {author.name}
              </chakra.span>
            </chakra.span>
          </Text>

          {/* <Flex justifyContent="center" w="full" pt={8}>
            <Button
              href={`/posts/post/${slug}`}
              variant="light"
              ariaLabel={`View the post titled "${title}"`}
            >
              View post
            </Button>
          </Flex> */}
        </Stack>
      </Flex>
    </VStack>
  );
};

export default FeaturedCard;
