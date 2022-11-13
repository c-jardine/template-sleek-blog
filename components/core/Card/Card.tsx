import {
  Box,
  chakra,
  Divider,
  Flex,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

import { PostProps } from '../../../types/index'
import { Button } from '../Button'

const Card = (props: PostProps) => {
  return (
    <VStack spacing={0} w="full" bg="white" shadow="md">
      <Box
        as={ChakraLink}
        href={`/posts/${props.slug}`}
        h="xs"
        w="full"
        overflow="hidden"
      >
        <Image
          src={props.coverImage}
          alt=""
          objectFit="cover"
          w="full"
          h="full"
          transition="250ms ease-in-out"
          _hover={{ transform: { lg: 'scale(1.1)' } }}
        />
      </Box>

      <Stack p={8} spacing={4}>
        <Flex>
          <Text
            color="brand.600"
            borderBottom="1px solid"
            borderColor="brand.500"
            textTransform="uppercase"
            fontSize="sm"
            w="fit-content"
            letterSpacing={1}
          >
            {props.category.label}
          </Text>
        </Flex>
        <chakra.h3
          as={ChakraLink}
          textStyle="link"
          fontSize="2xl"
          fontWeight="semibold"
          letterSpacing="wider"
        >
          {props.title}
        </chakra.h3>
        <Text display="flex" gap={4} fontSize="sm" color="blackAlpha.500">
          <chakra.span
            as={ChakraLink}
            textStyle="link"
            _hover={{ color: 'black' }}
          >
            {format(new Date(props.date), 'MMMM do, yyyy')}
          </chakra.span>
          /
          <chakra.span>
            by{' '}
            <chakra.span
              as={ChakraLink}
              href={`/author/${props.author.slug}`}
              textStyle="link"
              _hover={{ color: 'black' }}
            >
              {props.author.name}
            </chakra.span>
          </chakra.span>
        </Text>
        <Text color="blackAlpha.700" fontSize="sm">
          {props.excerpt}
        </Text>
        <Flex justifyContent="flex-start" w="full">
          <Button variant="light">Read more</Button>
        </Flex>
      </Stack>
    </VStack>
  )
}

export default Card
