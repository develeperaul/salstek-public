import './index.scss';
let activeType;
const setElsProjects = () => {
  const projects = document.querySelectorAll('.project');
  [...projects].forEach((project, index) => {
    const width = document.body.clientWidth;
    const typesVisible = project.querySelector('.project__types-visible');
    const count = project.querySelector('.project__types-count--wrapper');

    const typesHidden = project.querySelector('.project__types-hidden');
    const temp = project.querySelector('template');
    const childs = temp.content.cloneNode(true).children;

    typesVisible.innerHTML = '';
    count.innerHTML = '';
    typesHidden.innerHTML = '';

    let childsForTypesVisible;
    if (width >= 1024) childsForTypesVisible = [...childs].slice(0, 2);
    else childsForTypesVisible = [...childs].slice(0, 1);

    [...childsForTypesVisible].forEach((i) => typesVisible.append(i));
    count.insertAdjacentHTML(
      'afterbegin',
      `<span>${childs.length > 2 ? '2+' : childs.length}</span>`
    );
    [...childs].forEach((i) => typesHidden.append(i));
    count.onclick = function () {
      if (activeType && activeType !== this.parentElement) {
        activeType.classList.remove('active');
        activeType = undefined;
      }
      if (this.parentElement.classList.contains('active')) {
        activeType.classList.remove('active');
        activeType = undefined;
      } else {
        this.parentElement.classList.add('active');
        activeType = this.parentElement;
        window.onclick = windowTarget;
      }
    };
  });
};

setElsProjects();
window.addEventListener('resize', (e) => {
  const width = document.body.clientWidth;
  if (width >= 1024) setElsProjects();
  else setElsProjects();
});

function windowTarget(e) {
  if (activeType && !e.composedPath().includes(activeType))
    activeType.classList.remove('active');
}
