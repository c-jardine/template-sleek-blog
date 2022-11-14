import { Box, Heading, Stack } from '@chakra-ui/react'
import { urlForImage } from '../../../lib/sanity'
import { PostProps } from '../../../types'
import { Card } from '../../core'

const RecentPosts = ({ posts }: { posts: PostProps[] }) => {
  return (
    <Box maxW="8xl" w="full" mx="auto" px={{ base: 4, md: 8 }}>
      <Heading textStyle={['h2', 'gradient']} mb={16}>
        Recent posts
      </Heading>
      <Stack direction={{ base: 'column', lg: 'row' }} w="full" spacing={16}>
        {posts.map((post) => (
          <Card
            {...post}
            key={post.slug}
            coverImage={urlForImage(post.coverImage)}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default RecentPosts
