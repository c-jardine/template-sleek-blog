import { Box, Flex, Link, SimpleGrid } from '@chakra-ui/react';
import { FaChevronLeft } from '@react-icons/all-files/fa/FaChevronLeft';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { PaginationButtonProps } from './Pagination.types';

const Pagination = (props) => {
  const currentPage = parseInt(props.currentPage);
  const totalPages = parseInt(props.totalPages);

  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
      bg="white"
      shadow="md"
      py={4}
      px={{ base: 4, md: 0 }}
      gap={4}
    >
      <StyledPageButton
        href={`${props.slug}/${currentPage - 1}`}
        isDisabled={currentPage <= 1}
      >
        <FaChevronLeft size={12} />
      </StyledPageButton>
      <SimpleGrid columns={5} gap={2}>
        <PageButton
          slug={props.slug}
          currentPage={currentPage}
          totalPages={totalPages}
          offset={2}
          prev
        />
        <PageButton
          slug={props.slug}
          currentPage={currentPage}
          totalPages={totalPages}
          offset={1}
          prev
        />

        <StyledPageButton href="#" isActive>
          {currentPage}
        </StyledPageButton>

        <PageButton
          slug={props.slug}
          currentPage={currentPage}
          totalPages={totalPages}
          offset={1}
        />
        <PageButton
          slug={props.slug}
          currentPage={currentPage}
          totalPages={totalPages}
          offset={2}
        />
      </SimpleGrid>
      <StyledPageButton
        href={`${props.slug}/${currentPage + 1}`}
        isDisabled={currentPage >= totalPages}
      >
        <FaChevronRight size={12} />
      </StyledPageButton>
    </Flex>
  );
};

const PageButton = (props) => {
  const hasPrevPage = props.currentPage > props.offset;
  const hasNextPage = props.currentPage + props.offset <= props.totalPages;

  const link = props.prev
    ? props.currentPage - props.offset
    : props.currentPage + props.offset;

  const content = props.prev
    ? props.currentPage - props.offset
    : props.currentPage + props.offset;

  return (
    <>
      {(props.prev && hasPrevPage) || (!props.prev && hasNextPage) ? (
        <StyledPageButton href={`${props.slug}/${link}`}>
          {content}
        </StyledPageButton>
      ) : (
        <Box />
      )}
    </>
  );
};

const StyledPageButton = ({
  children,
  isDisabled,
  isActive,
  ...props
}: PaginationButtonProps) => {
  const activeStyle = {
    bg: 'brand.500',
    color: 'white',
    rounded: 'full',
  };

  return (
    <Flex
      as={Link}
      fontSize={{ base: 'sm', md: 'md' }}
      fontWeight={isActive ? 'bold' : 'light'}
      rounded="full"
      w={{ base: 8, md: 10 }}
      h={{ base: 8, md: 10 }}
      justifyContent="center"
      alignItems="center"
      opacity={isDisabled && 0.25}
      transition="200ms ease-in-out"
      _hover={!isDisabled && { bg: !isActive && { lg: 'blackAlpha.200' } }}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Pagination;
