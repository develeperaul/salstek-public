const inputs = document.querySelectorAll('input, textarea');
[...inputs].forEach((inp) => {
  initInput(inp);
});
export function initInput(input) {
  input.addEventListener('input', editInput);
}

function editInput(e) {
  const parentEl = this.closest('.field, .field-fixed');
  if (parentEl) {
    if (this.value) parentEl.classList.add('filled');
    else parentEl.classList.remove('filled');
    const btnDel = parentEl.querySelector('.del');
    if (btnDel) {
      if (this.value) {
        btnDel.classList.add('active');
        btnDel.addEventListener('click', clearValue);
      } else {
        btnDel.classList.remove('active');
        btnDel.removeEventListener('click', clearValue);
      }
    }
  }
}

function clearValue() {
  const parentEl = this.closest('.field, .field-fixed');
  const input = parentEl.querySelector('input, textarea');
  input.value = '';
  this.classList.remove('active');
  parentEl.classList.remove('filled');
  this.removeEventListener('click', clearValue);
}
