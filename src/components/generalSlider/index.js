import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const swiper = new Swiper('.general-slider', {
  modules: [EffectFade, Navigation, Pagination],
  effect: 'fade',
  autoHeight: true,
  fadeEffect: {
    crossFade: true,
  },
  breakpoints: {
    1024: {
      autoHeight: false,
    },
  },
  navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});
