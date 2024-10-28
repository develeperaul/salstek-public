import validate from 'validate.js';
import IMask from 'imask';
import { toggle } from './animation';
//dev
import constraintsObj from '../assets/validate.json';
//prod

// let constraintsObj = {};
// (() => {
//   const res = fetch(
//     'https://salstek.ru/bitrix/templates/salstek/assets/validate.json'
//   )
//     .then((response) => response.json())
//     .then((json) => {

//     });
// })();
// console.log(constraintsObj);
// let mailList = {};
// (() => {
//   const res = fetch('/bitrix/templates/salstek/assets/writetous-mails.json')
//     .then((response) => response.json())
//     .then((json) => {

//     });
// })();

// форма Напишите нам
const formFooterForm = document.querySelector('form#footer-form');
if (formFooterForm) {
  initialChangeInput(formFooterForm, constraintsObj);
  formFooterForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formFooterForm, json, requestFooterForm);
  });
}
function requestFooterForm() {
  formReq(
    formFooterForm,
    '/ajax/createform.php',
    () => toggle('success', 'open'),
    opts
  );
}
//       //форма Заказа
const formOrdering = document.querySelector('form#order');
if (formOrdering) {
  initialChangeInput(formOrdering, constraintsObj);
  formOrdering.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formOrdering, constraintsObj, requestOrdering);
  });
}
function requestOrdering() {
  formReqOrder(formOrdering, '/ajax/order_samples.php', () => {
    toggle('order-modal', 'close');
    toggle('order-success', 'open');
  });
}

//       //форма Резюме
const formRezume = document.querySelector('form#rezume');
if (formRezume) {
  initialChangeInput(formRezume, constraintsObj);
  formRezume.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formRezume, constraintsObj, requestRezume);
  });
}
function requestRezume() {
  formReq(formRezume, '/ajax/rezume.php', () => {
    toggle('rezume-modal', 'close');
    toggle('rezume-success', 'open');
  });
}

const formManagerrForm = document.querySelector('form#manager');
if (formManagerrForm) {
  initialChangeInput(formManagerrForm, constraintsObj);
  formManagerrForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formManagerrForm, constraintsObj, requestManagerForm);
  });
}
function requestManagerForm() {
  formReq(formManagerrForm, '/ajax/reqmanagerform.php', () => {
    toggle('manager-modal', 'close');
    toggle('success', 'open');
  });
}

export function initialChangeInput(form, constraintsObj) {
  const inputs = form.querySelectorAll('input, textarea, select');

  const constraints = form?.id ? constraintsObj[form.id] : {};
  for (let i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener('change', function (ev) {
      var errors = validate(form, constraints) || {};

      checkInvalid(form, errors);
      showErrorsForInput(this, errors[this.name]);
    });
  }
}

[].forEach.call(document.querySelectorAll('[data-mask]'), function (inp) {
  const mask = inp.getAttribute('data-mask');
  if (mask)
    IMask(inp, {
      mask,
      validate: function (value, maked) {},
    });
});

function handleFormSubmit(form, constraintsO, nameFunc) {
  const constraints = form?.id ? constraintsObj[form.id] : {};
  var errors = validate(form, constraints) || {};

  checkInvalid(form, errors);

  showErrors(form, errors || {});

  if (Object.keys(errors).length === 0) {
    nameFunc();
    // alert('success');
  }
}

export function showErrors(form, errors) {
  [...form.querySelectorAll('input[name], select[name]')].forEach((input) => {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

export function showErrorsForInput(input, errors) {
  const field = closestParent(input.parentNode, 'field');
  const select = closestParent(input.parentNode, 'select');
  // console.log(form.submit.disabled);
  errors;
  if (field) {
    if (errors) {
      field.classList.add('field__invalid');
    } else {
      field.classList.remove('field__invalid');
    }
  }
  if (select) {
    if (errors) {
      select.classList.add('select__invalid');
    } else {
      select.classList.remove('select__invalid');
    }
  }
}

export function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
}

export function checkInvalid(form, errors) {
  if (Object.keys(errors).length === 0) {
    form.querySelector("button[type='submit']").removeAttribute('disabled');
  } else {
    form.querySelector("button[type='submit']").setAttribute('disabled', true);
  }
}

const formReq = async (form, url, action, options = {}) => {
  action();
  const formData = new FormData();
  const fields = form.querySelectorAll('input, textarea, checkbox');
  const theme = form.getAttribute('data-theme');
  // const id = document.getElementById('visitor_uid')?.value;
  // const clientID = document.getElementById('clientID')?.value
  //   ? document.getElementById('clientID')?.value
  //   : '';
  formData.append('theme', theme ? theme : '');
  // formData.append('visitor_uid', id ? id : '');
  // formData.append('clientID', clientID ? clientID : '');
  for (let key in options) {
    formData.append(key, options[key]);
  }

  Array.from(fields).forEach((field) => {
    if (field.name) {
      if (field.type === 'checkbox') {
        formData.append(field.name, field.checked);
      } else if (field.type === 'file') {
        formData.append(field.name, field.files[0]);
      } else {
        formData.append(field.name, field.value);
      }
    }
  });

  let success = false;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((responce) => {
      if (responce.status === 200) {
        suc = true;
        action();
      }
    })
    .catch((e) => console.log(e));
  return success;
};

const formReqOrder = async (form, url, action, options = {}) => {
  const list = [];
  const orderingEl = form.querySelector('#ordering');
  console.log(orderingEl);
  if (orderingEl) {
    const childs = orderingEl.children;
    if (childs) {
      [...childs].forEach((el) => {
        if (el.classList.contains('item-parent'))
          list.push(`
              <div>
                <span>Наименование</span>
                <span>${el.querySelector('.checkbox__label').textContent}</span>
              </div>
              <br/>
              <div>
                <span>Количество</span>
                <span>${
                  el.querySelector('.item-parent__count').textContent
                }</span>
              </div>
            `);
        if (el.classList.contains('item-label')) {
          let item = '';
          let itemChild = [];

          [...el.querySelectorAll('.item-child')].forEach((child) => {
            itemChild.push(`
            <div>
                <span>Наименование</span>
                <span>${
                  child.querySelector('.item-child__label .checkbox__label')
                    .textContent
                }</span>
              </div>
              <br/>
              <div>
                <span>Количество</span>
                <span>${
                  child.querySelector(' .item-child__count').textContent
                }</span>
              </div>
            `);
          });
          console.log(itemChild);
          item = `
            <div>
                <span>Наименование раздела</span>
                <span>${
                  el.querySelector('.item-label__head .checkbox__label')
                    .textContent
                }</span>
              </div>
              <br/>
              <div>
                ${itemChild.join('<br/>')}
              </div>
          `;

          list.push(item);
        }
      });
    }
  }
  console.log(list);
  action();
  const formData = new FormData();
  const fields = form.querySelectorAll('input, textarea, checkbox');

  // const id = document.getElementById('visitor_uid')?.value;
  // const clientID = document.getElementById('clientID')?.value
  //   ? document.getElementById('clientID')?.value
  //   : '';
  // formData.append('theme', theme ? theme : '');
  formData.append('order', list.join('<br/>'));
  // formData.append('visitor_uid', id ? id : '');
  // formData.append('clientID', clientID ? clientID : '');
  for (let key in options) {
    formData.append(key, options.key);
  }

  Array.from(fields).forEach((field) => {
    if (field.name) {
      if (field.type === 'checkbox') {
        formData.append(field.name, field.checked);
      } else if (field.type === 'file') {
        formData.append(field.name, field.files[0]);
      } else {
        formData.append(field.name, field.value);
      }
    }
  });

  let success = false;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((responce) => {
      if (responce.status === 200) {
        suc = true;
        action();
      }
    })
    .catch((e) => console.log(e));
  return success;
};
