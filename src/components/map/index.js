import './index.scss';

import Swiper from 'swiper';
import { Manipulation, Navigation } from 'swiper/modules';
const swiper = new Swiper('.map-slider', {
  modules: [Navigation, Manipulation],

  spaceBetween: 8,
  // autoHeight: true,
  // fadeEffect: {
  //   crossFade: true,
  // },

  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
});

let slider;
const targets = document.querySelectorAll('.map .target');
const mapContainer = document.querySelector('.card-map');
const parentCoords = document
  .querySelector('.map-container')
  ?.getBoundingClientRect();
if (targets)
  [...targets].forEach((target) => {
    const sliderTemp = document.querySelector(
      `#${target.getAttribute('data-id')}`
    );
    if (sliderTemp) slider = sliderTemp.content.cloneNode(true).children;

    target.onmousemove = move;
    target.onmouseleave = function () {
      console.log('leave');
    };
    target.onmouseenter = function () {
      console.log('enter');
    };
  });

function move(e) {
  console.log(this);
  const middleEl = mapContainer.querySelector(
    '.card-map__middle .swiper.map-slider .swiper-wrapper'
  );
  // middleEl.append(slider);
  swiper.init();
  console.log([...slider]);
  swiper.appendSlide([...slider]);
  swiper.update();
  // mapContainer.append(slider)
  mapContainer.style.left = e.clientX - parentCoords.left + 'px';
  (mapContainer.style.top = e.clientY - parentCoords.top + 'px'),
    console.log(e.pageX);
}

function enter() {}

function leave() {}
