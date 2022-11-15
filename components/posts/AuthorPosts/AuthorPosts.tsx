import { Grid, HStack } from '@chakra-ui/react'
import { urlForImage } from '../../../lib/sanity'
import { PostProps } from '../../../types'
import { Card, CardSkeleton } from '../../core'

const AuthorPosts = (props: { preview: any; posts: PostProps[] }) => {
  const { preview, posts } = props || {}
  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        columnGap={4}
        rowGap={16}
      >
        {!posts ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          props.posts?.map((post, index) => (
            <Card key={index} {...post} coverImage={post.coverImage} />
          ))
        )}
      </Grid>
      <HStack></HStack>
    </>
  )
}
export default AuthorPosts
