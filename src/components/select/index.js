const selects = document.querySelectorAll('.select');

[...selects].forEach((select) => {
  select.onclick = actionSelect;
});

function actionSelect(e) {
  const head = this.querySelector('.select__head');
  const body = this.querySelector('.select__body');
  const options = this.querySelectorAll('.select__options > *');
  const currentTarget = e.target;
  if (currentTarget === head) {
    if (this.classList.contains('active')) this.classList.remove('active');
    else {
      this.classList.add('active');
      [...options].forEach((opt) => {
        const optsChild = opt.querySelectorAll('.checkbox__childs > *');
        if (optsChild.length > 0) {
          [...optsChild].forEach(
            (optChild) =>
              (optChild.onclick = selectOpt.bind(
                null,
                optChild,
                head,
                optsChild,
                this,
                opt
              ))
          );
        } else {
          opt.onclick = selectOpt.bind(null, opt, head, options, this, null);
        }
      });
      window.onclick = windowTarget.bind(null, this);
    }
  }
}
function selectOpt(opt, head, options, _this, parentChild = null, e) {
  const val = opt.dataset.val;
  const input = _this.querySelector('input');
  const valcheck = opt.dataset.valcheck;
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
  if (valcheck) {
    const checkboxInput = opt.querySelector('input');
    if (parentChild) {
      let check = false;
      const parentChildInput = parentChild.querySelector(
        'input[type="checkbox"]'
      );
      for (const o of [...options]) {
        const inputCheck = o.querySelector('input');
        if (!inputCheck.checked) {
          check = false;
          break;
        }
        check = true;
      }
      if (check) {
        parentChildInput.checked = true;
      } else {
        parentChildInput.checked = false;
      }

      // [...options].forEach(o=>{
      //   if()
      // })
    }
    if (checkboxInput.checked && !opt.classList.contains('active')) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
    checkboxInput.dispatchEvent(new Event('change'));
    // [...options].forEach((o) => {
    //   if (o !== opt && o.classList.contains('active'))
    //     o.classList.remove('active');
    // });
  }
}
function windowTarget(_this, e) {
  if (!e.composedPath().includes(_this)) {
    _this.classList.remove('active');
  }
}
