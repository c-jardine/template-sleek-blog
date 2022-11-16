import { Box, Container, Link } from '@chakra-ui/react';

const Alert = ({ preview }) => {
  return (
    <Box>
      <Container>
        <Box>
          {preview && (
            <>
              This page is a preview.{' '}
              <Link href="/api/exit-preview">Click here</Link> to exit preview
              mode.
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Alert;
