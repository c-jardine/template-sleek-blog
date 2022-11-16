import { Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Date = ({ dateString }: { dateString: string }) => {
  if (!dateString) return null;

  const date = parseISO(dateString);
  return <Text>{format(date, 'LLLL	d, yyyy')}</Text>;
};

export default Date;
