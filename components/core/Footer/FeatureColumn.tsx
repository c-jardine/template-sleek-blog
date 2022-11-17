import { Box, Flex, Icon, Image, Link, Stack, Text } from '@chakra-ui/react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';

const FeatureColumn = () => {
  return (
    <Stack>
      <Text color="white" fontSize="2xl" fontWeight="bold">
        Popular
      </Text>
      <Stack spacing={8}>
        <Flex columnGap={4} rowGap={2}>
          <Box w={24} h={16} overflow="hidden">
            <Image
              src="https://images.unsplash.com/photo-1576613109753-27804de2cba8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Text
              color="whiteAlpha.600"
              fontSize="xs"
              letterSpacing={1}
              lineHeight={1.5}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
            <Text color="brand.400" fontSize="xs">
              October 31, 2022
            </Text>
          </Box>
        </Flex>

        <Flex columnGap={4} rowGap={2}>
          <Box w={24} h={16} overflow="hidden">
            <Image
              src="https://images.unsplash.com/photo-1597424216809-3ba9864aeb18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Text
              color="whiteAlpha.600"
              fontSize="xs"
              letterSpacing={1}
              lineHeight={1.5}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Text>
            <Text color="brand.400" fontSize="xs">
              October 31, 2022
            </Text>
          </Box>
        </Flex>

        <Link
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          w="fit-content"
          mt={{ base: 16, lg: -6 }}
          role="group"
          href="https://blog.keplux.com/posts"
        >
          <Text textStyle="link" variant="upperWide" color="white">
            View all
          </Text>
          <Icon as={BsArrowRight} h={5} w={5} />
        </Link>
      </Stack>
    </Stack>
  );
};

export default FeatureColumn;
