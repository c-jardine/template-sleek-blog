import { Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import { FaLocationArrow } from '@react-icons/all-files/fa/FaLocationArrow';
import { FaPhone } from '@react-icons/all-files/fa/FaPhone';

const ContactColumn = () => {
  return (
    <Stack>
      <Text color='white' fontSize='2xl' fontWeight='bold'>
        Contact
      </Text>
      <Stack spacing={8}>
        <Grid
          templateColumns='auto 1fr'
          alignItems='center'
          columnGap={4}
          rowGap={2}
        >
          <GridItem w='max-content'>
            <FaLocationArrow size={24} color='white' />
          </GridItem>
          <GridItem>
            <Text color='white' lineHeight={1} fontWeight='semibold'>
              Location
            </Text>
          </GridItem>
          <GridItem colStart={2}>
            <Text color='whiteAlpha.600' letterSpacing={1} lineHeight={1}>
              123 Main St.
            </Text>
          </GridItem>
          <GridItem colStart={2}>
            <Text color='whiteAlpha.600' letterSpacing={1} lineHeight={1}>
              Toledo, OH 43604
            </Text>
          </GridItem>
        </Grid>

        <Grid
          templateColumns='auto 1fr'
          alignItems='center'
          columnGap={4}
          rowGap={2}
        >
          <GridItem w='max-content'>
            <FaEnvelope size={24} color='white' />
          </GridItem>
          <GridItem>
            <Text color='white' lineHeight={1} fontWeight='semibold'>
              Email
            </Text>
          </GridItem>
          <GridItem colStart={2}>
            <Text color='whiteAlpha.600' letterSpacing={1} lineHeight={1}>
              lorem@ipsum.com
            </Text>
          </GridItem>
        </Grid>

        <Grid
          templateColumns='auto 1fr'
          alignItems='center'
          columnGap={4}
          rowGap={2}
        >
          <GridItem w='max-content'>
            <FaPhone size={24} color='white' />
          </GridItem>
          <GridItem>
            <Text color='white' lineHeight={1} fontWeight='semibold'>
              Phone
            </Text>
          </GridItem>
          <GridItem colStart={2}>
            <Text color='whiteAlpha.600' letterSpacing={1} lineHeight={1}>
              (419) 555-5555
            </Text>
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ContactColumn;
