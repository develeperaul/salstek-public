export const animateCSS = (element, animation, prefix = 'animate__') => {
  let node;
  // console.log(element);
  if (typeof element === 'string') {
    node = document.querySelector(element);
  } else {
    console.log('dsds');
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
function clickBtn(e) {
  const target = this.getAttribute('data-target');
  const action = this.getAttribute('data-action');
  if (target) {
    const el = document.querySelector(`#${target}`);
    if (el) {
      if (el.dataset?.animateOpen && el.dataset?.animateClose) {
        if (action === 'open') {
          el.classList.add('open');
          animateCSS(`#${target}`, el.dataset.animateOpen).then(() => {
            el.classList.remove('open');
            el.classList.add('active');
          });
        }
        if (action === 'close')
          animateCSS(`#${target}`, el.dataset.animateClose).then(() =>
            el.classList.remove('active')
          );
        if (action === 'toggle') {
          if (el.classList.contains('active')) {
            animateCSS(`#${target}`, el.dataset.animateClose).then(() =>
              el.classList.remove('active')
            );
          } else {
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
