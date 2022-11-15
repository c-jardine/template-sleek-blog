import { Box, Image, Stack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { urlForImage } from '../../../lib/sanity'
import { PostProps } from '../../../types'
import { SectionSeparator } from '../../core'

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
          <Box maxW={{ base: 'full', lg: '33%' }} h={16} overflow="hidden">
            <Image
              src={urlForImage(post.coverImage).url()}
              alt="Post image"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Text
              fontWeight="bold"
              color="black"
              letterSpacing={1}
              lineHeight={1.5}
            >
              {post.title}
            </Text>
            <Text fontSize="xs">
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </Text>
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

export default PostsByAuthorCard
