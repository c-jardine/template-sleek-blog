import { chakra, Link, Stack, Text } from '@chakra-ui/react'
import { SectionSeparator } from '../../core'
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight'

const CategoryPostsCard = (props: { posts: any[] }) => {
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
        {props.posts.map((p, index) => (
          <Text
            key={index}
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
                {p.label}
              </chakra.span>
            </Link>{' '}
            ({p.posts})
          </Text>
        ))}
      </Stack>
    </Stack>
  )
}

export default CategoryPostsCard
