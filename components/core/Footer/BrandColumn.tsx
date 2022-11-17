import {
  Box,
  chakra,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { RiFlashlightFill } from '@react-icons/all-files/ri/RiFlashlightFill';
import React from 'react';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg='whiteAlpha.400'
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 200ms ease'}
      _hover={{
        bg: 'brand.500',
      }}
      color='white'
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const BrandColumn = () => {
  return (
    <Stack>
      <Flex
        flexDirection='column'
        alignItems={{ base: 'center', lg: 'flex-start' }}
        gap={8}
      >
        <Icon as={RiFlashlightFill} h={8} w={8} color='brand.500' />

        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
        <Text color='whiteAlpha.600' fontSize='sm' w='full'>
          Developed by Keplux Development
        </Text>
      </Flex>
    </Stack>
  );
};

export default BrandColumn;
