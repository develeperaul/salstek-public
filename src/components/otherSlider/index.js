import './index.scss';

import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const swiper = new Swiper('.other-slider', {
  modules: [EffectFade, Navigation, Pagination],
  slidesPerView: 1.2,
  centeredSlides: true,
  loop: true,
  spaceBetween: 16,
  // autoHeight: true,
  // fadeEffect: {
  //   crossFade: true,
  // },
  breakpoints: {
    1024: {
      slidesPerView: 1.4,
    },
  },
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});
