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
//general-sections
import '../sections/header/index';
import '../sections/footer/index';

//sections
import '../sections/writeToUs';
import '../sections/products';
import '../sections/structure';
import '../sections/about';
import '../sections/regions';
import '../sections/about-company';
import '../sections/projects';
import '../sections/mission';
import '../sections/awards';
import '../sections/standarts';
import '../sections/history';
import '../sections/delusion-system';
import '../sections/innovative-activity';
import '../sections/docs-download';
import '../sections/ecology';
import '../sections/not-found';
import '../sections/project-list';
import '../sections/project-item';
import '../sections/other-projects';
import '../sections/news';
import '../sections/news-item';
import '../sections/news-item-head';
import '../sections/other-news';
import '../sections/btns-section';
import '../sections/product-arh-head';
import '../sections/product-arh';
import '../sections/product-intr-head';
import '../sections/product-intr';
import '../sections/product-window-head';
import '../sections/product-window';
import '../sections/product-saveglass-head';
import '../sections/product-saveglass';
import '../sections/product-glassotar-head';
import '../sections/product-glassotar';
import '../sections/product-all';
import '../sections/product-section';

//pages
import '../index.pug';

//modules
import './validate-form-footer';
import './animation';
import './accordeon';
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
