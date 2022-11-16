import {
  chakra,
  Link,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { SectionSeparator } from '../../core';
import { CategoryPostsCardProps } from './CategoryPostsCard.types';

const CategoryPostsCard = (props: { data: CategoryPostsCardProps[] }) => {
  return (
    <Stack bg="white" w="full" shadow="md" p={8} spacing={8}>
      <Text
        textTransform="uppercase"
        textAlign="center"
        fontWeight="bold"
        color="black"
        fontSize="sm"
        lineHeight={0}
      >
        Browse More Posts
      </Text>
      <SectionSeparator />
      <Stack divider={<SectionSeparator />} gap={2}>
        {props.data.map((category) => (
          <Text
            key={category.label}
            display="flex"
            alignItems="center"
            gap={2}
            fontSize="sm"
            letterSpacing={1}
          >
            <chakra.span color="blackAlpha.400">
              <FaChevronRight size={10} />
            </chakra.span>
            <chakra.span
              as={ChakraLink}
              href={`/category/${category.slug.current}`}
              textStyle="link"
              fontWeight="semibold"
              color="chalkboard"
            >
              {category.label}
            </chakra.span>
            ({category.posts})
          </Text>
        ))}
      </Stack>
    </Stack>
  );
};

export default CategoryPostsCard;
