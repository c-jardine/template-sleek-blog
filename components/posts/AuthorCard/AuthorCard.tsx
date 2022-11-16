import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { urlForImage } from '../../../lib/sanity';
import { AuthorProps } from '../../../types';
import { SectionSeparator } from '../../core';

const AuthorCard = (props: AuthorProps) => {
  const { picture, name, bio } = props || {};
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
        About the Author
      </Text>
      <SectionSeparator />
      <Box h={52} overflow="hidden">
        <Image
          src={picture?.asset?._ref && urlForImage(picture).url()}
          alt="Author image"
          w="full"
          maxH={52}
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <Stack>
        <Text
          fontWeight="bold"
          color="brand.600"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing={2}
        >
          {name}
        </Text>
        <Text fontSize="sm" textAlign="center">
          {bio ||
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti minima recusandae facilis in provident molestiae. Minima amet consectetur elit.'}
        </Text>
      </Stack>
    </Stack>
  );
};

export default AuthorCard;
