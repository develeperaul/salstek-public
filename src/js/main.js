import '../scss/style.scss';
import 'animate.css';

import 'swiper/css/bundle';
import './globalObj';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//core
import '../components/select';
import '../components/select/index2.js';
import '../components/inputFile';

//components
import '../components/article';
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
import { toggle } from './animation.js';
import './accordeon';
import './tabs';
import './orderingSamples';
import './domObserver';
import './stepper';
import './datepicker';
import './addel';
import './marguee';
import './fields';
import './filter.js';
import './glightbox.js';
import '../components/generalSlider';
import '../components/otherSlider';
import '../components/smallSlider';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

{
  const yakor = document.querySelector('[data-yakor]');
  if (yakor) {
    yakor.scrollIntoView({ behavior: 'smooth' });
  }
}
document.addEventListener('DOMContentLoaded', () => {
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

  // copy href

  const btnsCopy = document.querySelectorAll('.copy');

  [...btnsCopy].forEach((btn) => {
    btn.onclick = copyHref;
  });

  function copyHref() {
    const href = location.href;
    if (navigator && navigator.clipboard != undefined) {
      navigator.clipboard.writeText(href);
      toggle('href', 'open');
      setTimeout(() => toggle('href', 'close'), 2000);
    }
  }
});

let mm = gsap.matchMedia();
if (document.querySelector('.characteristics')) {
  mm.add('(min-width: 1200px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.characteristics ',
        start: 'top bottom',
        end: `${
          document.querySelector('.header-second .header-second__top')
            ?.offsetHeight
        } bottom`,
        scrub: true,
        // markers: true,
      },
    });

    tl.to('.header-sticky.header-second .header-second__top ', {
      yPercent: -100,
      ease: 'none',
    });
    return () => {};
  });
}
