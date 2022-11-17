import {
  Box,
  chakra,
  Container,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { PortableTextReactComponents } from '@portabletext/react';
import { FaQuoteLeft } from '@react-icons/all-files/fa/FaQuoteLeft';
import { FaQuoteRight } from '@react-icons/all-files/fa/FaQuoteRight';

const PortableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <Link
          href={value?.href}
          target={target}
          rel={target === '_blank' && 'noindex nofollow'}
        >
          <chakra.span textStyle="link" color="brand.700">
            {children}
          </chakra.span>
        </Link>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <chakra.h2
        color="headerText"
        mt={12}
        mb={4}
        fontSize="4xl"
        fontWeight="semibold"
        lineHeight={1.25}
      >
        {children}
      </chakra.h2>
    ),
    blockquote: ({ children }) => (
      <Box my={16}>
        <Container
          position="relative"
          style={{ padding: 1 }}
          bgGradient="linear(to-br, purple.400, brand.400)"
        >
          <Icon
            as={FaQuoteLeft}
            w={8}
            h={8}
            bg="cardBackground"
            px={1}
            color="brand.500"
            position="absolute"
            zIndex={1}
            top={-4}
            left={4}
          />
          <Icon
            as={FaQuoteRight}
            w={8}
            h={8}
            bg="cardBackground"
            px={1}
            color="brand.500"
            position="absolute"
            zIndex={1}
            bottom={-4}
            right={4}
          />
          <VStack spacing={3} p={4} bg="cardBackground" pos="relative">
            <Text variant="details" color="bodyText">
              {children}
            </Text>
          </VStack>
        </Container>
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <chakra.ul marginLeft={8} my={6}>
        {children}
      </chakra.ul>
    ),
    number: ({ children }) => (
      <chakra.ol marginLeft={8} my={6}>
        {children}
      </chakra.ol>
    ),
  },
};

export default PortableTextComponents;
