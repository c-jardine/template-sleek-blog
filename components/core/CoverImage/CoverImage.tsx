import { Box, Image, Link } from '@chakra-ui/react';

import { urlForImage } from '../../../lib/sanity';

interface CoverImageProps {
  title: string;
  slug?: string;
  image: any;
}

const CoverImage = (props: CoverImageProps) => {
  const { title, slug, image: source } = props || {};
  const image = source?.asset?._ref ? (
    <Box>
      <Image
        width={1920}
        height="auto"
        alt={`Cover Image for ${title}`}
        src={urlForImage(source).height(1000).width(2000).url()}
        objectFit="cover"
      />
    </Box>
  ) : (
    <Box style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  );

  return (
    <Box>
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </Box>
  );
};

export default CoverImage;
