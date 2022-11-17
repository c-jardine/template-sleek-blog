import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { Footer } from '../components/core';
import { Navbar } from '../components/core/Navbar';
import '../styles/globals.css';
import chakraTheme from '../styles/theme/theme';

function MyApp({ Component, pageProps }) {
  const theme = chakraTheme.lightTheme;
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo titleTemplate={`%s | Lorem Ipsum Blog`} />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
