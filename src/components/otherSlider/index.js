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
    spaceBetween: 16,
    init: true,
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
  console.log(swiper);
});
