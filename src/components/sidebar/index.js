import './index.scss';
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar__desc');

  let observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      const btns = document.querySelector('[data-target="sidebar"]');
      if (
        mutation.target.classList.contains('active') ||
        mutation.target.classList.contains('open')
      ) {
        btns.classList.add('active');
      } else {
        btns.classList.remove('active');
      }
      if (mutation.target.classList.contains('animate__fadeOutLeft'))
        btns.classList.remove('active');
    }
  });
  observer.observe(document.querySelector('.sidebar'), {
    attributeFilter: ['class'],
  });

  const links = sidebar.querySelectorAll('[data-id]');

  const content = sidebar.querySelector('.content');
  if (links && content) {
    [...links].forEach((link) => {
      link.onmouseenter = enter;
    });
  }
  function enter(e) {
    [...links].forEach((link) => {
      if (link.classList.contains('active')) link.classList.remove('active');
      if (link === this) link.classList.add('active');
    });
    const id = this.dataset.id;
    const temp = sidebar.querySelector(`template#${id}`);

    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    content.append(temp.content.cloneNode(true));
  }
});
