import { Box, Stack } from '@chakra-ui/react';
import { Alert } from '../../components/core/Alert';

const PageLayout = ({ preview, children }) => {
  return (
    <>
      <Box bg="background" mt={{ base: -20, lg: 0 }}>
        {preview && <Alert preview={preview} />}
        <Stack py={28} spacing={28}>
          {children}
        </Stack>
      </Box>
    </>
  );
};

export default PageLayout;
