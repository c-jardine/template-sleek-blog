import { HStack, Link, Stack, Text } from '@chakra-ui/react';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { AuthorProps } from '../../../types';
import { SectionSeparator } from '../../core';

const AuthorCard = (props: AuthorProps) => {
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
        Stay Connected
      </Text>
      <SectionSeparator />
      <HStack spacing={4} justifyContent="center">
        {props.socials.facebook && (
          <Link
            href={props.socials.facebook}
            target="_blank"
            rel="noreferrer"
            bg="blackAlpha.100"
            p={3}
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <FaFacebookF />
          </Link>
        )}
        {props.socials.twitter && (
          <Link
            href={props.socials.twitter}
            target="_blank"
            rel="noreferrer"
            bg="blackAlpha.100"
            p={3}
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <FaTwitter />
          </Link>
        )}
        {props.socials.instagram && (
          <Link
            href={props.socials.instagram}
            target="_blank"
            rel="noreferrer"
            bg="blackAlpha.100"
            p={3}
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <FaInstagram />
          </Link>
        )}
        {props.socials.youtube && (
          <Link
            href={props.socials.youtube}
            target="_blank"
            rel="noreferrer"
            bg="blackAlpha.100"
            p={3}
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <FaYoutube />
          </Link>
        )}
      </HStack>
    </Stack>
  );
};

export default AuthorCard;
