import { Heading, Text } from '@chakra-ui/react'

const PostTitle = ({ children }) => {
  return (
    <Heading textStyle="h1" textAlign="center">
      {children}
    </Heading>
  )
}

export default PostTitle
