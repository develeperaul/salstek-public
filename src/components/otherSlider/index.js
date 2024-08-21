import './index.scss';
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination, FreeMode } from 'swiper/modules';
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.other-slider', {
    modules: [EffectFade, Navigation, Pagination, FreeMode],
    slidesPerView: 1.2,
    // freeMode: true,
    centeredSlides: true,
    loop: true,
    spaceBetween: 8,
    init: true,
    autoHeight: false,
    // fadeEffect: {
    //   crossFade: true,
    // },
    breakpoints: {
      1024: {
        spaceBetween: 16,
        slidesPerView: 1.4,
        autoHeight: false,
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
  console.log(swiper);
});
