// document.addEventListener('DOMContentLoaded', () => {
//   const selects = document.querySelectorAll('.select2');
//   [...selects].forEach((select) => {
//     select.onclick = actionSelect;
//     initSelect2(select);
//   });
// });
// let openSelect;
// export function initSelect2(select) {
//   const initEl = select.querySelector('.select2__options [data-init]');
//   if (initEl) {
//     const head = select.querySelector('.select2__head');
//     const input = select.querySelector('input');
//     const val = initEl.dataset.val;
//     setVal(initEl, head, input, val);
//   }
// }
// function actionSelect(e) {
//   const head = this.querySelector('.select2__head');
//   const body = this.querySelector('.select2__body');
//   const options = this.querySelectorAll('.select2__option-list > *');
//   const currentTarget = e.target;
//   if (currentTarget === head) {
//     if (this.classList.contains('active')) this.classList.remove('active');
//     else {
//       this.classList.add('active');
//       [...options].forEach((opt) => {
//         opt.onclick = selectOpt.bind(null, opt, head, options, this, null);
//       });
//       window.onclick = windowTarget.bind(null, this);
//       setTimeout(() => (openSelect = this), 0);
//     }
//   }
// }
// function selectOpt(opt, head, options, _this, parentChild = null, e) {
//   const val = opt.dataset.val;
//   const input = _this.querySelector('input');
//   if (val) {
//     [...options].forEach((o) => {
//       if (o !== opt && o.classList.contains('active'))
//         o.classList.remove('active');
//     });
//     _this.classList.remove('active');
//     setVal(opt, head, input, val);
//   }
// }
// function windowTarget(_this, e) {
//   if (!e.composedPath().includes(_this)) {
//     _this.classList.remove('active');
//   } else if (openSelect && openSelect !== _this) {
//     openSelect.classList.remove('active');
//     openSelect = undefined;
//   }
// }

// function setVal(opt, head, input, val) {
//   opt.classList.add('active');
//   head.setAttribute('data-select', val);
//   input.value = val;
//   input.dispatchEvent(new Event('change'));
//   head.textContent = opt.textContent;
// }
