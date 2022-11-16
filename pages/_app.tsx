import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { Navbar } from '../components/core/Navbar'
import '../styles/globals.css'
import theme from '../styles/theme/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo titleTemplate={`%s | Lorem Ipsum Blog`} />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
