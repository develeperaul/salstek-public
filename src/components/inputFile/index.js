const fileInputs = document.querySelectorAll(".field-file input[type='file']");
[...fileInputs].forEach((inp) => {
  initInput(inp);
});
export function initInput(input) {
  console.log('initinput');
  input.addEventListener('change', changeInputFile);
}
function changeInputFile(e) {
  let file = this.files[0];
  const parent = this.closest('.field-file');
  const fileNameEl = parent.querySelector('.name');
  const btnDelete = parent.querySelector('.del');
  if (fileNameEl) {
    parent.classList.add('active');
    fileNameEl.textContent = file.name;
    btnDelete.addEventListener('click', deleteInputFile);
  }
}

function deleteInputFile() {
  const parent = this.closest('.field-file');
  if (parent) {
    const input = parent.querySelector('input');
    if (input) {
      const dt = new DataTransfer();
      input.files = dt.files;
      parent.classList.remove('active');
      const fileNameEl = parent.querySelector('.name');
      fileNameEl.textContent = '';
    }
  }
}
