import { Box, Container } from '@chakra-ui/react';
import Link from 'next/link';

const Alert = ({ preview }) => {
  return (
    <Box>
      <Container>
        <Box>
          {preview && (
            <>
              This page is a preview.{' '}
              <Link
                href="/api/exit-preview"
                className="underline transition-colors duration-200 hover:text-cyan"
              >
                Click here
              </Link>{' '}
              to exit preview mode.
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Alert;
