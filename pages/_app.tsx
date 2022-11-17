import {
  Box,
  ChakraProvider,
  Button as ChakraButton,
  Icon,
} from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { Footer } from '../components/core';
import { Navbar } from '../components/core/Navbar';
import '../styles/globals.css';
import chakraTheme from '../styles/theme/theme';
import React from 'react';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = React.useState(chakraTheme.lightTheme);
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo titleTemplate={`%s | Lorem Ipsum Blog`} />
      <Box position="absolute" maxW="8xl" w="full" h="100vh">
        <Box
          as={ChakraButton}
          position="fixed"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={100}
          bg={theme === chakraTheme.lightTheme ? 'yellow.400' : 'purple.900'}
          shadow="dark-lg"
          w={14}
          h={14}
          rounded="full"
          bottom={4}
          right={4}
          onClick={() => {
            theme === chakraTheme.lightTheme
              ? setTheme(chakraTheme.darkTheme)
              : setTheme(chakraTheme.lightTheme);
          }}
        >
          {theme === chakraTheme.lightTheme ? (
            <Icon as={FaSun} w={6} h={6} color="white" />
          ) : (
            <Icon as={FaMoon} w={6} h={6} color="white" />
          )}
        </Box>
      </Box>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
