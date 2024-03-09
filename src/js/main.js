import '../scss/style.scss';
import 'animate.css';
import 'swiper/css/bundle';
import './globalObj';
//core
import '../components/select';
import '../components/inputFile';
//components
import '../components/locales';
import '../components/sidebar';
import '../components/project';
import '../components/newsCard';
import '../components/productCard';
import '../components/map';
import '../components/quantity';
//general-sections

//pages
import '../index.pug';
import '../pages/glass-configurator.pug';
import '../pages/test.pug';
//modules
import './validate-form-footer';
import './animation';
import './accordeon';
import './tabs';
import './orderingSamples';
import './domObserver';
import './stepper';
import './datepicker';
import './addel';
import './marguee';
import '../components/generalSlider';
import '../components/otherSlider';
import '../components/smallSlider';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';
var swiper = new Swiper('.mySwiper', {
  modules: [Scrollbar],
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (header) {
    const headerHeight = header?.offsetHeight;
    if (header && headerHeight) {
      if (window.scrollY > headerHeight) {
        if (!header.classList.contains('header-fixed'))
          header.classList.add('header-fixed');
      } else header.classList.remove('header-fixed');
      if (window.scrollY > headerHeight * 2) {
        if (!header.classList.contains('header-fixed-active'))
          header.classList.add('header-fixed-active');
      } else header.classList.remove('header-fixed-active');
    }
  }
});
