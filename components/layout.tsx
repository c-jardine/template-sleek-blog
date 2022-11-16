import { Box, Stack } from '@chakra-ui/react'
import { Alert } from './core/Alert'

export default function Layout({ preview, children }) {
  return (
    <>
      <Box bg="blackAlpha.50">
        {preview && <Alert preview={preview} />}
        <Stack py={28} spacing={28}>
          {children}
        </Stack>
      </Box>
    </>
  )
}
