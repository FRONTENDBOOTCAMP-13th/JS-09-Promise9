import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Feature 기능소개 관련 섹션 스와이퍼
const mySwiper = document.querySelector('.mySwiper') as HTMLElement | null;
if (mySwiper) {
  const swiper = new Swiper(mySwiper, {
    modules: [Pagination, Autoplay],
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 3000,
    freeMode: true,
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 'auto',
      },
    },
  });

  console.log(swiper);
}

// 스크롤 관련 헤더
window.addEventListener('scroll', function () {
  const indexHeader = document.querySelector('.index-header') as HTMLElement;
  const headerLogo = indexHeader.querySelector('.logo img') as HTMLImageElement;

  if (window.scrollY === 0) {
    indexHeader?.classList.remove('scroll');
    headerLogo?.setAttribute('src', '/public/assets/img/promise9.png');
  } else {
    indexHeader?.classList.add('scroll');
    headerLogo?.setAttribute('src', '/public/assets/img/promise9-gradient.png');
  }
});
