import { DefaultSeo } from 'next-seo'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Navbar } from '../components/core/Navbar'
import theme from '../styles/theme/theme'
import { useRouter } from 'next/router'

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
