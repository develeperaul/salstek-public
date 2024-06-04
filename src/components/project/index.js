import './index.scss';
document.addEventListener('DOMContentLoaded', () => {
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
      if (childs.length < 1) {
        count.style.display = 'none';
      }
      count.insertAdjacentHTML(
        'afterbegin',
        `<span>${childs.length > 2 ? '2+' : `${childs.length}+`}</span>`
      );
      [...childs].forEach((i) => typesHidden.append(i));
      count.onmouseover = function () {
        // if (activeType && activeType !== this.parentElement) {
        //   activeType.classList.remove('active');
        //   activeType = undefined;
        // }
        // if (this.parentElement.classList.contains('active')) {
        //   activeType.classList.remove('active');
        //   activeType = undefined;
        // } else {
        //   window.onmouseleave = windowTarget;
        // }
        this.parentElement.classList.add('active');
        activeType = this.parentElement;
      };

      count.ontouchstart = function () {
        this.parentElement.classList.add('active');
        activeType = this.parentElement;
      };

      count.onmouseleave = function () {
        this.parentElement.classList.remove('active');
      };
      count.ontouchend = function () {
        this.parentElement.classList.remove('active');
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
});
