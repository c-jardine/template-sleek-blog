import {
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'
import { urlForImage } from '../../../lib/sanity'
import { AuthorProps } from '../../../types'
import { SectionSeparator } from '../../core'

const AuthorHeaderCard = (props: AuthorProps) => {
  const { picture, name, bio, socials } = props || {}
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}
      maxW="4xl"
      mx="auto"
      bg="white"
      shadow="md"
    >
      <GridItem overflow="hidden">
        {picture && (
          <Image
            src={picture?.asset?._ref && urlForImage(picture).url()}
            alt={`Photo of the author, ${name}`}
            objectFit="cover"
          />
        )}
      </GridItem>
      <GridItem colSpan={{ base: 1, lg: 2 }}>
        <Stack p={8} spacing={8}>
          <Text
            textTransform="uppercase"
            textAlign="center"
            fontWeight="bold"
            color="black"
            fontSize="sm"
            lineHeight={0}
          >
            About the Author
          </Text>
          <SectionSeparator />
          <Stack>
            <Text
              lineHeight={1}
              color="brand.500"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing={2}
            >
              {name}
            </Text>
            <Text>{bio}</Text>
          </Stack>
          <HStack spacing={4} justifyContent="flex-end">
            {socials?.facebook && (
              <Link
                href={socials?.facebook}
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
            {socials?.twitter && (
              <Link
                href={socials?.twitter}
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
            {socials?.instagram && (
              <Link
                href={socials?.instagram}
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
            {socials?.youtube && (
              <Link
                href={socials?.youtube}
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
      </GridItem>
    </Grid>
  )
}

export default AuthorHeaderCard
