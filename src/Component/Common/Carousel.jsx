// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Slide component
import Slide from './Slide';

export default function Carousel() {
  return (
    <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={"https://i.ibb.co/S0H5Qg0/valais-3562988-1280.jpg"}
            text="Explore the best services in your area, reviewed and rated by real customers. Your perfect service provider is just a click away!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={"https://i.ibb.co/18R2tnp/africa-4597486-1280.jpg"}
            text="Share your experiences with others and help them make informed decisions. Your feedback is valuable and helps improve services."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={"https://i.ibb.co/KqtQySb/pexels-reneterp-2544829.jpg"}
            text="Browse through a comprehensive list of verified service providers. Choose the one that fits your needs and enjoy quality service."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
