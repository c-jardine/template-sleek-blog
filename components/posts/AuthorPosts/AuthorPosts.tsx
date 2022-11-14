import { Button, Grid, HStack, Text } from '@chakra-ui/react'
import { urlForImage } from '../../../lib/sanity'
import { PostProps } from '../../../types'
import { Card, CardSkeleton } from '../../core'
import React from 'react'
import { getClient } from '../../../lib/sanity.server'
import * as query from '../../../lib/queries'
import useSWR from 'swr'

const AuthorPosts = (props: { preview: any; slug: string }) => {
  const [page, setPage] = React.useState(0)
  const { data, error } = useSWR(query.authorPostsQuery, (q) =>
    getClient(props.preview).fetch(q, {
      slug: props.slug,
      start: page * 1,
      end: page * 1 + 1,
    })
  )

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    page !== 0 && setPage(page - 1)
  }

  return (
    <>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={4}>
        {!data || error ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          data?.map((post, index) => (
            <Card
              key={index}
              {...post}
              coverImage={urlForImage(post.coverImage).url()}
            />
          ))
        )}
      </Grid>
      <HStack>
        <Button onClick={handlePrevPage}>
          <Text>Previous</Text>
        </Button>
        <Button onClick={handleNextPage}>
          <Text>Next</Text>
        </Button>
      </HStack>
    </>
  )
}
export default AuthorPosts
