const dataContents = document.querySelectorAll('[data-content]');
[...dataContents].forEach((dataContent) => {
  const addBtn = dataContent
    .closest('.rezume__content')
    .querySelector('[data-add]');
  if (addBtn) addBtn.addEventListener('click', addContent);
});
function addContent(e) {
  const id = this.dataset.id;
  if (id) {
    const template = document.querySelector(`#${id}`);
    const cloneContent = template.content.cloneNode(true);
    console.log(cloneContent);
    let parentEl = this.parentNode.querySelector('[data-content]');
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
