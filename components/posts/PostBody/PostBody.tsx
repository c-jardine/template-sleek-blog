import { Box } from '@chakra-ui/react';
import { PortableText } from '@portabletext/react';
import { PortableTextComponents } from '../../../lib/portableText';
import style from './PostBody.module.css';

const PostBody = ({ content }) => {
  return (
    <Box
      px={{ base: 4, md: 8 }}
      fontSize="md"
      color="bodyText"
      className={style.portableText}
    >
      <PortableText value={content} components={PortableTextComponents} />
    </Box>
  );
};

export default PostBody;
