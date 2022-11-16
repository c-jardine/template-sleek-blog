import React from 'react';
import {
  Grid,
  GridItem,
  HStack,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SectionSeparator } from '../../core';

const AuthorHeaderCardSkeleton = () => {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
      w="full"
      maxW="4xl"
      mx="auto"
      bg="white"
      shadow="md"
    >
      <GridItem>
        <Skeleton w="full" h={{ base: '100vw', lg: 'full' }} />
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <Stack p={8} spacing={8}>
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
          <Stack>
            <Skeleton w="full" maxW={64} h={8} />
            <Skeleton w="full" h={6} />
            <Skeleton w="full" h={6} />
            <Skeleton w="full" h={6} />
          </Stack>
          <HStack spacing={4} justifyContent="flex-end">
            <SkeletonCircle p={5} rounded="full" />
            <SkeletonCircle p={5} rounded="full" />
            <SkeletonCircle p={5} rounded="full" />
            <SkeletonCircle p={5} rounded="full" />
          </HStack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default AuthorHeaderCardSkeleton;
