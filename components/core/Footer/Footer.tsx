import { Box, SimpleGrid, Stack } from '@chakra-ui/react';
import BrandColumn from './BrandColumn';
import ContactColumn from './ContactColumn';
import FeatureColumn from './FeatureColumn';

const Footer = () => {
  return (
    <Box w="100vw" bg="chalkboard" color="whiteAlpha.600">
      <Stack
        maxW="6xl"
        mx="auto"
        py={16}
        spacing={16}
        justify={'center'}
        align={'center'}
      >
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={16} w="full">
          <ContactColumn />
          <FeatureColumn />
          <BrandColumn />
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Footer;
