import { Button, Grid, HStack, Text } from '@chakra-ui/react'
import { urlForImage } from '../../../lib/sanity'
import { PostProps } from '../../../types'
import { Card, CardSkeleton } from '../../core'
import React from 'react'
import { getClient } from '../../../lib/sanity.server'
import * as query from '../../../lib/queries'
import useSWR from 'swr'

const AuthorPosts = (props: {
  preview: any
  slug: string
  posts: PostProps[]
}) => {
  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        columnGap={4}
        rowGap={16}
      >
        {!props.posts ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          props.posts?.map((post, index) => (
            <Card
              key={index}
              {...post}
              coverImage={urlForImage(post.coverImage).url()}
            />
          ))
        )}
      </Grid>
      <HStack>
        {/* <Button onClick={handlePrevPage}>
          <Text>Previous</Text>
        </Button> */}
        {/* <Button onClick={handleNextPage}>
          <Text>Next</Text>
        </Button> */}
      </HStack>
    </>
  )
}
export default AuthorPosts
