import validate from 'validate.js';
import IMask from 'imask';
import constraintsObj from '../assets/validate.json';
import { toggle } from './animation';
const r = new RegExp(`^\\+7\\(\\d{3}\\)-\\d{3}\-\\d{2}\-\\d{2}$`);

//форма Напишите нам
const formFooterForm = document.querySelector('form#footer-form');
if (formFooterForm) {
  initialChangeInput(formFooterForm);
  formFooterForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formFooterForm, requestFooterForm);
  });
}
function requestFooterForm() {
  toggle('success', 'open');
  
}

//форма Заказа
const formOrdering = document.querySelector('form#order');
if (formOrdering) {
  initialChangeInput(formOrdering);
  formOrdering.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formOrdering, requestOrdering);
  });
}
function requestOrdering() {
  toggle('order-modal', 'close');
  toggle('order-success', 'open');
  
}

//форма Резюме
const formRezume = document.querySelector('form#rezume');
if (formRezume) {
  initialChangeInput(formRezume);
  formRezume.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(formRezume, requestRezume);
  });
}
function requestRezume() {
  toggle('rezume-modal', 'close');
  toggle('rezume-success', 'open');
  
}

export function initialChangeInput(form) {
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

function handleFormSubmit(form, nameFunc) {
  const constraints = form?.id ? constraintsObj[form.id] : {};
  var errors = validate(form, constraints) || {};

  checkInvalid(form, errors);

  showErrors(form, errors || {});
  console.log(errors);
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
  console.log(errors);
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
