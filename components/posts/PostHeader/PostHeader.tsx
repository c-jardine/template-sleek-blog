import { Box, Flex, Text } from '@chakra-ui/react'

import { PostProps } from '../../../types'
import { CoverImage, Date } from '../../core'
import { PostTitle } from '../PostTitle'

const PostHeader = (props: PostProps) => {
  const { title, coverImage, date, author, category, slug } = props
  return (
    <>
      <Flex justifyContent="center">
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
      <PostTitle>{title}</PostTitle>
      <Flex fontSize="sm" gap={3} justifyContent="center" mt={4}>
        <Date dateString={date} />
        <Text>/</Text>
        <Text>by {author.name}</Text>
      </Flex>
      <Box mt={12}>
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </Box>
    </>
  )
}

export default PostHeader
