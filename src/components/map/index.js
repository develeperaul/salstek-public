import './index.scss';
import { animateCSS } from '../../js/animation';
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

if (targets)
  [...targets].forEach((target) => {
    const sliderTemp = document.querySelector(
      `#${target.getAttribute('data-id')}`
    );
    if (sliderTemp) slider = sliderTemp.content.cloneNode(true).children;

    // target.onmousemove = move;
    target.onmouseleave = leave;
    target.onmouseenter = enter;
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

function enter(e) {
  // console.log(e);
  const parentCoords = document
    .querySelector('.map-container')
    ?.getBoundingClientRect();
  const flag = this.querySelector('.flag');
  if (!flag) return;

  const flagCoords = flag.getBoundingClientRect();
  // console.log(parentCoords);
  mapContainer.style.left = flagCoords.left - parentCoords.left + 'px';
  mapContainer.style.top =
    flagCoords.height + flagCoords.top - parentCoords.top + 8 + 'px';
  if (!mapContainer.classList.contains('active')) {
    mapContainer.style.display = 'block';
    animateCSS(mapContainer, 'fadeIn').then(() => {
      mapContainer.classList.add('active');
    });
    swiper.init();
    // console.log([...slider]);
    swiper.appendSlide([...slider]);
    swiper.update();
  }
}

function leave(e) {
  let currentEl = e.relatedTarget;
  while (currentEl) {
    if (currentEl === mapContainer) break;
    else if (currentEl == document.querySelector('.regions')) break;
    else currentEl = currentEl.parentElement;
  }
  if (currentEl === mapContainer) {
    currentEl.onmouseleave = leave.bind(this, e);
    return;
  }
  closeModal();
}

function closeModal() {
  mapContainer.classList.remove('active');
  console.log('leave');
  mapContainer.style.display = 'none';
}
