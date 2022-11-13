import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#EDFDFD',
      100: '#C4F1F9',
      200: '#9DECF9',
      300: '#76E4F7',
      400: '#0BC5EA',
      500: '#00B5D8',
      600: '#00A3C4',
      700: '#0987A0',
      800: '#086F83',
      900: '#065666',
    },
    chalkboard: '#18191d',
  },
  textStyles: {
    h1: {
      fontSize: '5xl',
      color: 'chalkboard',
      fontWeight: 'bold',
      lineHeight: 1,
    },
    h2: {
      fontSize: ['3xl', , '5xl'],
      fontWeight: 'bold',
    },
    gradient: {
      bgGradient: 'linear(to-br, purple.400, brand.400)',
      bgClip: 'text',
    },
    link: {
      transition: '200ms ease-in-out',
      _hover: { color: 'brand.500' },
      _groupHover: { color: 'brand.500' },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: 'blackAlpha.600',
        fontWeight: 'light',
        letterSpacing: 'wide',
        lineHeight: 'taller',
      },
      variants: {
        feature: { color: 'chalkboard', fontWeight: 'bold' },
        details: { color: 'blackAlpha.600' },
        upperWide: { textTransform: 'uppercase', letterSpacing: 6 },
      },
    },
  },
})

export default theme
