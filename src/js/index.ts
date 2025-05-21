import Swiper from 'swiper';

import { Pagination } from 'swiper/modules';

const mySwiper = document.querySelector('.mySwiper') as HTMLElement | null;

if (mySwiper) {
  const swiper = new Swiper(mySwiper, {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  });

  swiper.autoplay.start();
}
