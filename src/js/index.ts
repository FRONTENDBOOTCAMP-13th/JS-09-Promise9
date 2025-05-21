import Swiper from 'swiper';
// import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
// import 'swiper/css/pagination';

const mySwiper = document.querySelector('.mySwiper') as HTMLElement | null;

if (mySwiper) {
  const swiper = new Swiper(mySwiper, {
    // modules: [Pagination, Autoplay],
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  });

  console.log(swiper);
}
