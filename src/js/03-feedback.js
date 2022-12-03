var throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const name = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
// email.addEventListener('input', onEmailInput);
// name.addEventListener('input', onNameInput);


form.addEventListener('input', throttle(onEmailInput, 500));
form.addEventListener('submit',onFormSubmit);

let formData = {};

dataUpdate();

function onEmailInput (e) {
    let previousLocalData= JSON.parse(localStorage.getItem(STORAGE_KEY));
    formData = {...previousLocalData, [e.target.name]: e.target.value};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

};

function dataUpdate() {
    const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (localStorageData) {
        email.value = localStorageData.email || '';
        name.value = localStorageData.message || '';
    }

} 


function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
}