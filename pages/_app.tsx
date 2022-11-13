import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'

import { Navbar } from '../components/core/Navbar'
import theme from '../styles/theme/theme'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
