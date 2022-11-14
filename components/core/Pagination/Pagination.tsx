import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PaginationButtonProps } from './Pagination.types'

const Pagination = () => {
  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <PaginationButton borderTopLeftRadius="md" borderBottomLeftRadius="md">
        Previous
      </PaginationButton>
      <PaginationButton>1</PaginationButton>
      <PaginationButton>2</PaginationButton>
      <PaginationButton isActive>3</PaginationButton>
      <PaginationButton>4</PaginationButton>
      <PaginationButton>5</PaginationButton>
      <PaginationButton borderTopRightRadius="md" borderBottomRightRadius="md">
        Next
      </PaginationButton>
    </Flex>
  )
}

const PaginationButton = ({
  children,
  isDisabled,
  isActive,
  ...props
}: PaginationButtonProps) => {
  const activeStyle = {
    bg: useColorModeValue('gray.300', 'gray.700'),
  }

  return (
    <Flex
      p={3}
      px={4}
      fontSize="md"
      fontWeight="500"
      lineHeight={0.8}
      opacity={isDisabled && 0.7}
      _hover={!isDisabled && activeStyle}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      border="1px solid"
      mr="-1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Pagination
