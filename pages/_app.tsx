import {
  Box,
  Button as ChakraButton,
  ChakraProvider,
  Icon,
} from '@chakra-ui/react';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Footer } from '../components/core';
import '../styles/globals.css';
import chakraTheme from '../styles/theme/theme';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, setTheme] = React.useState(chakraTheme.lightTheme);
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo titleTemplate={`%s | Lorem Ipsum Blog`} />
      {/* Don't add theme picker to Sanity Studio */}
      {!router.pathname.startsWith('/studio') && (
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
      )}
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
