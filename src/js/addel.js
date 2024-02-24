const dataContents = document.querySelectorAll('[data-content]');
[...dataContents].forEach((dataContent) => {
  const addBtn = dataContent.querySelector('[data-add]');
  addBtn.addEventListener('click', addContent);
});
function addContent(e) {
  const id = this.dataset.id;
  if (id) {
    const template = document.querySelector(`#${id}`);
    const cloneContent = template.content.cloneNode(true);

    let parentEl = this.closest('[data-content]').parentNode;
    cloneContent.addEventListener;
    const btnRemove = cloneContent.querySelector('[data-remove]');
    if (btnRemove) btnRemove.addEventListener('click', removeContent);
    parentEl.append(cloneContent);
  }
}
function removeContent(e) {
  const dataContent = this.closest('[data-content]');
  if (dataContent) dataContent.remove();
}
