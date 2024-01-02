import validate from 'validate.js';
import IMask from 'imask';
const r = new RegExp(`^\\+7\\(\\d{3}\\)-\\d{3}\-\\d{2}\-\\d{2}$`);
const constraints = {
  name: {
    presence: { message: 'поле обязательно для заполнения' },
  },
  institute: {
    presence: true,
  },
  department: {
    presence: true,
  },
  email: {
    presence: true,
    email: true,
  },
  phone: {
    presence: true,

    format: {
      pattern: new RegExp(`^\\+7\\(\\d{3}\\)-\\d{3}\-\\d{2}\-\\d{2}$`),
      message: 'поле обязательно для заполнения',
    },
  },

  creditCardZip: function (
    value,
    attributes,
    attributeName,
    options,
    constraints
  ) {
    if (!/^(34|37).*$/.test(attributes.creditCardNumber)) return null;
    return {
      presence: { message: 'is required when using AMEX' },
      length: { is: 5 },
    };
  },
};
var form = document.querySelector('form#footer-form');
if (form) {
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });
}

var inputs = document.querySelectorAll('input, textarea, select');
for (var i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener('change', function (ev) {
    var errors = validate(form, constraints) || {};
    checkInvalid(errors);
    showErrorsForInput(this, errors[this.name]);
  });
}

[].forEach.call(document.querySelectorAll('[data-mask]'), function (inp) {
  const mask = inp.getAttribute('data-mask');
  if (mask)
    IMask(inp, {
      mask,
      validate: function (value, maked) {},
    });
});

function handleFormSubmit(form, input) {
  // validate the form against the constraints
  var errors = validate(form, constraints);
  checkInvalid(errors);
  // then we update the form to reflect the results
  showErrors(form, errors || {});
  if (!errors) {
    // alert('success');
  }
}

function showErrors(form, errors) {
  [...form.querySelectorAll('input[name], select[name]')].forEach((input) => {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

function showErrorsForInput(input, errors) {
  const field = closestParent(input.parentNode, 'field');
  const select = closestParent(input.parentNode, 'select');
  // console.log(form.submit.disabled);
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

function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
}

function checkInvalid(errors) {
  if (Object.keys(errors).length === 0) {
    form.querySelector("button[type='submit']").removeAttribute('disabled');
  } else {
    form.querySelector("button[type='submit']").setAttribute('disabled', true);
  }
}
