import { Swiper } from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const mySwiper = document.querySelector('.mySwiper') as HTMLElement | null;

if (mySwiper) {
  const swiper = new Swiper(mySwiper, {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    speed: 2000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
  });

  console.log(swiper);
}
