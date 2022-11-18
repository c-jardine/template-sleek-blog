import { HStack, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { AuthorProps } from '../../../types';
import { SectionSeparator } from '../../core';

const AuthorCard = (props: AuthorProps) => {
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
        Stay Connected
      </Text>
      <SectionSeparator />
      <HStack spacing={4} justifyContent="center">
        {props.socials.facebook && (
          <Link
            aria-label="Link to Facebook profile"
            href={props.socials.facebook}
            target="_blank"
            rel="noreferrer"
            bg="background"
            w={12}
            h={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <Icon as={FaFacebookF} color="headerText" w={5} h={5} />
          </Link>
        )}
        {props.socials.twitter && (
          <Link
            aria-label="Link to Twitter profile"
            href={props.socials.twitter}
            target="_blank"
            rel="noreferrer"
            bg="background"
            w={12}
            h={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <Icon as={FaTwitter} color="headerText" w={5} h={5} />
          </Link>
        )}
        {props.socials.instagram && (
          <Link
            aria-label="Link to Instagram profile"
            href={props.socials.instagram}
            target="_blank"
            rel="noreferrer"
            bg="background"
            w={12}
            h={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <Icon as={FaInstagram} color="headerText" w={5} h={5} />
          </Link>
        )}
        {props.socials.youtube && (
          <Link
            aria-label="Link to YouTube profile"
            href={props.socials.youtube}
            target="_blank"
            rel="noreferrer"
            bg="background"
            w={12}
            h={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            role="group"
            transition="200ms ease-in-out"
            _hover={{ bg: 'brand.500' }}
          >
            <Icon as={FaYoutube} color="headerText" w={5} h={5} />
          </Link>
        )}
      </HStack>
    </Stack>
  );
};

export default AuthorCard;
