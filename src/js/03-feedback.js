import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

let formData = {};

form.addEventListener('input', inputValue);
form.addEventListener('submit', onSubmitForm);

function onFormData(el) {
  const data = JSON.stringify(formData);
  if (data) {
    return localStorage.setItem(el, data);
  }
}

function dataFromLocalStorage(el) {
  const data = localStorage.getItem(el);

  if (data === null) {
    return (el = undefined);
  } else {
    return JSON.parse(data);
  }
}

const objFromLocalStorage = dataFromLocalStorage('feedback-form-state');

if (objFromLocalStorage) {
  email.value = objFromLocalStorage.email;
  message.value = objFromLocalStorage.message;
  formData = objFromLocalStorage;
} else {
  email.value = '';
  message.value = '';
}

function onSubmitForm(e) {
  e.preventDefault();
  const formEl = e.currentTarget.elements;

  const emailEl = formEl.email.value;
  const messageEl = formEl.message.value;

  if (emailEl === '' || messageEl === '') {
    alert('Всі поля повинні бути заповнені');
  } else if (emailEl !== '' || messageEl !== '') {
    console.log(formData);
  }

  localStorage.removeItem('feedback-form-state');
  form.reset();
}

function inputValue(e) {
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value || message.value) {
    formData = {
      email: email.value,
      message: message.value,
    };

    throttle(onFormData, 500)('feedback-form-state', formData);
  }
}
