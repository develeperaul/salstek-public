import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.general-slider', {
    modules: [EffectFade, Navigation, Pagination, Autoplay],
    effect: 'fade',
    autoHeight: true,
    autoplay: {
      delay: 5000,
    },
    loop: true,
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
});
