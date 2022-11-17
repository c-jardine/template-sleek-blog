import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { RiFlashlightFill } from '@react-icons/all-files/ri/RiFlashlightFill';

const navLinks = [
  { name: 'Home', path: 'https://sleek.keplux.com/' },
  { name: 'Work', path: 'https://sleek.keplux.com/work' },
  { name: 'Pricing', path: 'https://sleek.keplux.com/pricing' },
  { name: 'Blog', path: 'https://blog.keplux.com' },
  { name: 'About', path: 'https://sleek.keplux.com/about' },
  { name: 'Contact', path: 'https://sleek.keplux.com/contact' },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position={{ base: 'sticky', lg: 'fixed' }}
      top={0}
      zIndex={50}
      width="100vw"
      px={4}
      bg="white"
      borderBottom={'2px solid'}
      borderColor="blackAlpha.200"
      textTransform="uppercase"
      fontSize="sm"
      letterSpacing={4}
    >
      <Flex
        h={16}
        justifyContent="space-between"
        alignItems="center"
        maxW="8xl"
        marginX="auto"
      >
        <Icon as={RiFlashlightFill} h={8} w={8} />

        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={6}
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </HStack>
        </HStack>
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={{ base: 'inherit', md: 'none' }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

// NavLink Component
interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        color: 'brand.500',
      }}
      transition="150ms ease-in-out"
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

// Dropdown MenuLink Component
interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: 'blue.400',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};

export default Navbar;
