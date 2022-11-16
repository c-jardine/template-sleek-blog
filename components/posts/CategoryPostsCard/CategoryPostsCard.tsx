import { chakra, Link, Stack, Text } from '@chakra-ui/react';
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
            <Link
              color="black"
              fontWeight="normal"
              role="group"
              textStyle="link"
            >
              <chakra.span textStyle="link" fontWeight="semibold">
                {category.label}
              </chakra.span>
            </Link>{' '}
            ({category.posts})
          </Text>
        ))}
      </Stack>
    </Stack>
  );
};

export default CategoryPostsCard;
