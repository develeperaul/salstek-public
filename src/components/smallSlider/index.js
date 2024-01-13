import './index.scss';

import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const swiper = new Swiper('.small-slider', {
  modules: [EffectFade, Navigation, Pagination],
  spaceBetween: 16,
  // autoHeight: true,
  // fadeEffect: {
  //   crossFade: true,
  // },

  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});
