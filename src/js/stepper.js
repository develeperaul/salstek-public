let currentSlide = 0;
let slideLength = 0;
const initial = () => {
  currentSlide = 0;
  const steppers = document.querySelectorAll('.stepper');
  [...steppers].forEach((stepper) => {
    const slides = stepper.querySelectorAll('.stepper__content-slide');
    const progressList = stepper.querySelectorAll('.progresses .progress');

    slideLength = slides.length;
    [...slides].forEach((slide, index) => {
      if (index !== 0) slide.classList.add('stepper__content-slide--hide');
    });
    const btnsContent = stepper.querySelectorAll('.stepper__btns');
    [...btnsContent].forEach((btnContent) => {
      if (btnContent.dataset.step !== 'first')
        btnContent.classList.add('stepper__btns-hidden');
      const btnBack = btnContent.querySelector('.btn-back');
      const btnNext = btnContent.querySelector('.btn-next');
      if (btnBack) {
        btnBack.onclick = back.bind(btnBack, btnsContent, slides, progressList);
      }
      if (btnNext) {
        btnNext.onclick = next.bind(btnNext, btnsContent, slides, progressList);
      }
    });
    console.log(slides);
  });
};
function back(btnsContent, slides, progressList, e) {
  if (slides[currentSlide - 1]) {
    slides[currentSlide].classList.add('stepper__content-slide--hide');
    if (progressList[currentSlide])
      progressList[currentSlide].classList.remove('active');
    currentSlide--;
    [...btnsContent].forEach((btnContent) => {
      console.log(currentSlide === 0);
      if (currentSlide === 0) {
        if (btnContent.dataset.step === 'first') {
          btnContent.classList.remove('stepper__btns-hidden');
        } else {
          if (!btnContent.classList.contains('stepper__btns-hidden'))
            btnContent.classList.add('stepper__btns-hidden');
        }
      }
      if (currentSlide > 0) {
        if (!btnContent.dataset.step) {
          btnContent.classList.remove('stepper__btns-hidden');
        } else {
          if (!btnContent.classList.contains('stepper__btns-hidden'))
            btnContent.classList.add('stepper__btns-hidden');
        }
      }
    });

    slides[currentSlide].classList.remove('stepper__content-slide--hide');
  }
}
function next(btnsContent, slides, progressList, e) {
  if (slides[currentSlide + 1]) {
    slides[currentSlide].classList.add('stepper__content-slide--hide');
    currentSlide++;
    console.log(progressList[currentSlide]);
    if (progressList[currentSlide])
      progressList[currentSlide].classList.add('active');
    if (currentSlide > 0) {
      [...btnsContent].forEach((btnContent) => {
        if (currentSlide === slideLength - 1) {
          if (btnContent.dataset.step === 'last') {
            btnContent.classList.remove('stepper__btns-hidden');
          } else btnContent.classList.add('stepper__btns-hidden');
        } else {
          if (btnContent.dataset.step === 'first') {
            btnContent.classList.add('stepper__btns-hidden');
          }
          if (!btnContent.dataset.step) {
            btnContent.classList.remove('stepper__btns-hidden');
          } else {
            btnContent.classList.add('stepper__btns-hidden');
          }
        }
      });
    }

    slides[currentSlide].classList.remove('stepper__content-slide--hide');
  }
}
initial();
