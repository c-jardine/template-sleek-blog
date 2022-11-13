import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
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
        <Link>
          <Text textStyle="link">{format(parseISO(date), 'LLLL	d, yyyy')}</Text>
        </Link>
        <Text>/</Text>
        <Link href={`/author/${author.slug.current}`}>
          <Text textStyle="link">by {author.name}</Text>
        </Link>
      </Flex>
      <Box mt={12}>
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </Box>
    </>
  )
}

export default PostHeader
