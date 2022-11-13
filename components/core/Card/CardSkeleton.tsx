import {
  chakra,
  Box,
  Flex,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const CardSkeleton = () => {
  return (
    <VStack spacing={0} w="full" bg="white" shadow="md">
      <Skeleton h="xs" w="full" overflow="hidden" />

      <Stack p={8} spacing={4} w="full">
        <Flex>
          <Skeleton w={32} h={6} />
        </Flex>
        <Skeleton w="full" h={12} />
        <Flex gap={4} fontSize="sm" color="blackAlpha.500">
          <Skeleton w={64} h={4} />
        </Flex>
        <Skeleton w="full" h={5} />
        <Skeleton w="full" h={5} />
        <Skeleton w="full" h={5} />
        <Skeleton w={32} h={12} />
      </Stack>
    </VStack>
  )
}

export default CardSkeleton
