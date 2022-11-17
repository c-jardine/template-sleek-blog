import {
  chakra,
  Flex,
  Icon,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { SectionSeparator } from '../../core';
import { CategoryPostsCardProps } from './CategoryPostsCard.types';

const CategoryPostsCard = (props: { data: CategoryPostsCardProps[] }) => {
  return (
    <Stack bg="cardBackground" w="full" shadow="md" p={8} spacing={8}>
      <Text
        textTransform="uppercase"
        textAlign="center"
        fontWeight="bold"
        color="headerText"
        fontSize="sm"
        lineHeight={0}
      >
        Browse More Posts
      </Text>
      <SectionSeparator />
      <Stack divider={<SectionSeparator />} gap={2}>
        {props.data.map((category) => (
          <Flex
            key={category.label}
            alignItems="center"
            gap={2}
            fontSize="sm"
            letterSpacing={1}
            lineHeight={0}
            py={3}
          >
            <Icon as={FaChevronRight} w={3} h={3} color="subtleText" />
            <chakra.span
              as={ChakraLink}
              href={`/category/${category.slug.current}`}
              textStyle="link"
              fontWeight="semibold"
              color="headerText"
            >
              {category.label}
            </chakra.span>
            <chakra.span color="bodyText">({category.posts})</chakra.span>
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
};

export default CategoryPostsCard;
