import '../scss/style.scss';
import 'animate.css';
import 'swiper/css/bundle';

//core
import '../components/select';

//components
import '../components/locales';
import '../components/sidebar';
import '../components/project';
import '../components/newsCard';
import '../components/productCard';
import '../components/map';
//general-sections

//pages
import '../index.pug';
import '../pages/glass-configurator.pug';
//modules
import './validate-form-footer';
import './animation';
import './accordeon';
import './tabs';
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
