const selects = document.querySelectorAll('.select');

[...selects].forEach((select) => {
  select.onclick = actionSelect;
});

function actionSelect(e) {
  const head = this.querySelector('.select__head');
  const body = this.querySelector('.select__body');
  const options = this.querySelectorAll('.select__options div');
  const currentTarget = e.target;
  if (currentTarget === head) {
    if (this.classList.contains('active')) this.classList.remove('active');
    else {
      this.classList.add('active');
      [...options].forEach(
        (opt) => (opt.onclick = selectOpt.bind(null, opt, head, options, this))
      );
      window.onclick = windowTarget.bind(null, this);
    }
  }
}
function selectOpt(opt, head, options, _this, e) {
  const val = opt.dataset.val;
  const input = _this.querySelector('input');
  console.log(input);
  if (val) {
    [...options].forEach((o) => {
      if (o !== opt && o.classList.contains('active'))
        o.classList.remove('active');
    });
    opt.classList.add('active');
    _this.classList.remove('active');
    head.setAttribute('data-select', val);
    input.value = val;
    input.dispatchEvent(new Event('change'));
    head.textContent = opt.textContent;
  }
}
function windowTarget(_this, e) {
  if (!e.composedPath().includes(_this)) {
    console.log(_this);
    _this.classList.remove('active');
  }
}
