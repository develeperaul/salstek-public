export const animateCSS = (element, animation, prefix = 'animate__') => {
  let node;
  if (typeof element === 'string') {
    node = document.querySelector(element);
  } else {
    node = element;
  }
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });

    // We create a Promise and return it
  });
};

const btns = document.querySelectorAll('[data-action]');
[...btns].forEach((btn) => {
  btn.onclick = clickBtn;
});

export function toggle(target, action) {
  const el = document.querySelector(`#${target}`);
  const body = document.querySelector('body');

  if (target) {
    const el = document.querySelector(`#${target}`);

    if (el) {
      const isFull = el.hasAttribute('data-full');
      if (el.dataset?.animateOpen && el.dataset?.animateClose) {
        if (action === 'open') {
          if (isFull && body) body.style.overflow = 'hidden';
          el.classList.add('open');
          animateCSS(`#${target}`, el.dataset.animateOpen).then(() => {
            el.classList.remove('open');
            el.classList.add('active');
          });
        }
        if (action === 'close') {
          if (el.querySelector('form')?.hasAttribute('data-theme'))
            el.querySelector('form').removeAttribute('data-theme');
          if (isFull && body) body.style.overflow = 'auto';
          animateCSS(`#${target}`, el.dataset.animateClose).then(() =>
            el.classList.remove('active')
          );
        }
        if (action === 'toggle') {
          if (el.classList.contains('active')) {
            if (isFull && body) body.style.overflow = 'auto';
            animateCSS(`#${target}`, el.dataset.animateClose).then(() =>
              el.classList.remove('active')
            );
          } else {
            if (isFull && body) body.style.overflow = 'hidden';
            el.classList.add('open');
            animateCSS(`#${target}`, el.dataset.animateOpen).then(() => {
              el.classList.remove('open');
              el.classList.add('active');
            });
          }
        }
      } else {
        if (action === 'open') el.classList.add('active');
        if (action === 'close') el.classList.remove('active');
        if (action === 'toggle') {
          if (el.classList.contains('active')) el.classList.remove('active');
          else el.classList.add('active');
        }
      }
    }
  }
}

function clickBtn() {
  const target = this.getAttribute('data-target');
  const action = this.getAttribute('data-action');
  const body = document.querySelector('body');
  if (
    this.closest('.modal') &&
    this.closest('.modal').querySelector('form') &&
    action === 'close'
  ) {
    const modal = this.closest('.modal');
    const form = modal.querySelector('form#rezume');
    if (form) {
      const formData = new FormData(form);
      let isData = false;
      for (var pair of formData.entries()) {
        if (pair[1]) {
          isData = true;
          break;
        }
      }
      if (isData) {
        const el = document.querySelector(`#${target}`);

        el.classList.remove('active');
        open('exit');
      }
    } else {
      toggle(target, action);

      if (this.hasAttribute('data-stay')) {
        open(this.dataset.stay);
      }
      if (this.hasAttribute('data-exit')) {
        console.log('очистка полей');
      }
    }
  } else {
    if (this.hasAttribute('data-theme')) {
      const el = document.querySelector(`#${target} form`);
      if (el) {
        el.setAttribute('data-theme', this.getAttribute('data-theme'));
      }
    }
    toggle(target, action);
    if (this.hasAttribute('data-stay')) {
      open(this.dataset.stay);
    }
    if (this.hasAttribute('data-exit')) {
      const el = document.querySelector(`#${this.dataset.exit} form`);
      if (el && el?.hasAttribute('data-theme'))
        el.removeAttribute('data-theme');
      console.log('очистка полей');
    }
  }
}

function open(target) {
  const el = document.querySelector(`#${target}`);
  if (el.dataset?.animateOpen && el.dataset?.animateClose) {
    const isFull = el.hasAttribute('data-full');
    if (isFull && body) body.style.overflow = 'hidden';
    el.classList.add('open');
    animateCSS(`#${target}`, el.dataset.animateOpen).then(() => {
      el.classList.remove('open');
      el.classList.add('active');
    });
  }
}
