// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Box } from '@chakra-ui/react';
import { Pagination } from 'swiper';

const Carousel = (props) => {
  return (
    <Box w="full" maxW="2048px" mx="auto">
      <Swiper
        loop
        initialSlide={0}
        slidesPerView="auto"
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
        }}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="swiper"
      >
        {props.children.map((child, index) => (
          <SwiperSlide key={index} className="swiperSlide">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;
