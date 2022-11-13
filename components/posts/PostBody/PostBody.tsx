import {
  Box,
  chakra,
  Container,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { FaQuoteRight } from '@react-icons/all-files/fa/FaQuoteRight'

import style from './PostBody.module.css'

const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <chakra.h2 textStyle="h2" color="chalkboard">
        {children}
      </chakra.h2>
    ),
    blockquote: ({ children }) => (
      <Box my={16}>
        <Container
          style={{ padding: 1 }}
          bgGradient="linear(to-br, purple.400, brand.400)"
        >
          <VStack spacing={3} p={4} bg="white" pos="relative">
            <Icon
              as={FaQuoteRight}
              w={8}
              h={8}
              color="brand.500"
              position="absolute"
              top={-5}
              left={-4}
            />
            <Text variant="details" px={4}>
              {children}
            </Text>
          </VStack>
        </Container>
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => <chakra.ul marginLeft={12}>{children}</chakra.ul>,
  },
}

const PostBody = ({ content }) => {
  return (
    <Box
      className={style.portableText}
      px={8}
      fontSize="md"
      color="blackAlpha.600"
    >
      <PortableText value={content} components={components} />
    </Box>
  )
}

export default PostBody
