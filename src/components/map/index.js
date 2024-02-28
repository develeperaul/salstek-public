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
    // target.onmouseleave = leave;
    // target.onmouseenter = enter;
    target.ontouchstart = enter;
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
  mapContainer.style.top = e.clientY - parentCoords.top + 'px';
}

function enter(e) {
  console.log(e);
  const parentCoords = document
    .querySelector('.map-container')
    ?.getBoundingClientRect();
  const flag = this.querySelector('.flag');
  const mapContinerFlag = mapContainer.querySelector('.card-map__flag');
  const mapContainerCountry = mapContainer.querySelector('.card-map__country');
  const mapContainerBtnClose = mapContainer.querySelector('.card-map__close');
  if (mapContainerBtnClose)
    mapContainerBtnClose.addEventListener('click', closeModal);
  if (mapContinerFlag.firstChild) mapContinerFlag.firstChild.remove();
  if (mapContainerCountry.firstChild) mapContinerFlag.textContent = '';
  if (flag.dataset.name)
    mapContinerFlag.insertAdjacentHTML(
      'afterbegin',
      `<svg width="24" height='24'><use xlink:href="./svg/sprite.svg#${flag.dataset.name}"></use></svg>`
    );
  if (flag.dataset.country)
    mapContainerCountry.textContent = flag.dataset.country;
  if (!flag) return;

  if (!mapContainer.classList.contains('active')) {
  }
  mapContainer.style.display = 'block';
  animateCSS(mapContainer, 'fadeIn').then(() => {
    mapContainer.classList.add('active');
  });
  const flagCoords = flag.getBoundingClientRect();
  let topPos = 0;
  let leftPos = 0;
  setTimeout(() => {
    topPos = flagCoords.bottom - parentCoords.top;
    leftPos = flagCoords.left - parentCoords.left;
    const popupHeight = mapContainer.getBoundingClientRect().height;
    const popupWidth = mapContainer.getBoundingClientRect().width;
    if (innerWidth >= 1200) {
      mapContainer.style.left = leftPos + 'px';
      if (topPos + popupHeight > parentCoords.height) {
        mapContainer.style.top =
          topPos - (topPos + popupHeight - parentCoords.height) + 'px';
      } else {
        mapContainer.style.top = topPos + 'px';
      }
    } else {
      leftPos = flagCoords.left;
      if (e.type === 'touchstart') {
        console.log(e.touches[0].clientX);
        console.log(document.querySelector('.map-container').scrollLeft);
        leftPos =
          document.querySelector('.map-container').scrollLeft +
          e.touches[0].clientX -
          popupWidth / 2;
      }
      topPos = parentCoords.height / 2;
      mapContainer.style.left = leftPos + 'px';

      mapContainer.style.top = topPos - popupHeight / 2 + 'px';
    }
  });

  swiper.init();
  // console.log([...slider]);
  swiper.appendSlide([...slider]);
  swiper.update();
}

function leave(e) {
  let currentEl = e.relatedTarget;
  while (currentEl) {
    if (currentEl === mapContainer) break;
    else if (currentEl == document.querySelector('.regions')) break;
    else currentEl = currentEl.parentElement;
  }
  if (currentEl === mapContainer) {
    // currentEl.onmouseleave = leave;
    return;
  }
  closeModal();
}

function closeModal() {
  mapContainer.classList.remove('active');
  mapContainer.style.display = 'none';
  mapContainer.top = 0;
  mapContainer.left = 0;
  mapContainer.removeAddEventListener = ('mouseenter', enter);
}
