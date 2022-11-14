import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight'
import { chakra, Box, Heading, Stack, Text, Icon, Link } from '@chakra-ui/react'
import { urlForImage } from '../../../lib/sanity'
import { PostProps } from '../../../types'
import { Card } from '../../core'

const RecentPosts = ({ posts }: { posts: PostProps[] }) => {
  return (
    <Box maxW="8xl" w="full" mx="auto" px={4}>
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
      <Link
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
        w="fit-content"
        mt={{ base: 16 }}
        role="group"
      >
        <Text textStyle="link" variant="upperWide" color="black">
          View all
        </Text>
        <Icon as={BsArrowRight} h={5} w={5} />
      </Link>
    </Box>
  )
}

export default RecentPosts
