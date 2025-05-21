// swiper.d.ts
declare module 'swiper' {
  import { Component } from 'swiper/types';

  export interface SwiperOptions {
    slidesPerView?: number;
    loop?: boolean;
    autoplay?: {
      delay?: number;
      disableOnInteraction?: boolean;
    };
    speed: number;
    pagination?: {
      el: string;
      clickable?: boolean;
      dynamicBullets?: boolean;
    };
  }

  export default class Swiper {
    constructor(element: Element | string, options?: SwiperOptions);
    autoplay: {
      start: () => void;
      stop: () => void;
      running: boolean;
    };
  }
}
