import './index.scss';

const sidebar = document.querySelector('.sidebar__desc');
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
