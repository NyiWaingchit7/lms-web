//@ts-nocheck
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Scrollbar,
  Pagination,
} from "swiper/modules";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export const SwiperWrapper = ({ children }: Props) => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        spaceBetween={10}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
        }}
        autoplay={{ delay: 5000 }}
        modules={[
          EffectCoverflow,
          Navigation,
          Scrollbar,
          Mousewheel,
          Pagination,
          Autoplay,
        ]}
        pagination={{ clickable: true }}
        navigation
        className="mx-auto  md:!pb-5"
        speed={1000}
      >
        {children}
      </Swiper>
    </div>
  );
};
