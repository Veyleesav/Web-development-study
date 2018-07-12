'use strict';

// Код валидации формы
function validateForm(attrs) {
    let form = document.getElementById(attrs.formId),
        inputErrorClass = attrs.inputErrorClass,
        formValidClass = attrs.formValidClass,
        formInvalidClass = attrs.formInvalidClass,
        isValid = false;

    //Adding listeners for DOM events
    form.addEventListener('blur', blurHandling, true);
    form.addEventListener('submit', submitHandling);
    form.addEventListener('focus', focusHandling, true);

    //function to check the validness of the input(should return true or false)
    function validateInput(input) {
        let value = input.value; //getting value typed in the input form

        if (input.dataset.validator === 'letters') {
            isValid = /^[a-zа-яё]{2,}$/gi.test(value);
        } else {
            if (input.dataset.validator === 'number') {
                if (/^-?\d+$/.test(value)) {

                    isValid = !('validatorMin' in input.dataset &&
                        value < +input.dataset.validatorMin ||
                        'validatorMax' in input.dataset &&
                        value > +input.dataset.validatorMax);
                }
            } else if (input.dataset.validator === 'regexp') {
                isValid = new RegExp(input.dataset.validatorPattern).test(value) ||
                    value === '';
            }
        }
            //checking if the field is required (*)
        if ('required' in input.dataset && value === '') {
            isValid = false;
        }

        if (!('required' in input.dataset) && value === '') {
            isValid = true;
        }
// switching error class ON or OFF depending on validness
        if (isValid) {
            input.classList.remove(inputErrorClass);
        } else {
            input.classList.add(inputErrorClass);
        }

        return isValid;
    }

// function for handling event on blur
    function blurHandling(event) {
        let elem = event.target;

        if (elem.tagName === 'INPUT') {
            isValid = validateInput(elem);
        }
    }

// function for handling event on submit
    function submitHandling(event) {
        let elem = event.target;

        let inputs = Array.from(document.querySelectorAll('#profile input'));
        let input;

        for (let i = 0, l = inputs.length; i < l; i++) {    //Switching NodeList to Array
            input = inputs[i];
            if (!validateInput(input)) {
                isValid = false;
                break;
            }
            isValid = true;
        }
        let classList = elem.classList;
        if (isValid) {                              // if is valid shows the green box message, otherwise shows red one
            classList.remove(formInvalidClass);
            classList.add(formValidClass);
        } else {
            classList.remove(formValidClass);
            classList.add(formInvalidClass);
        }

        event.preventDefault();  // is used to stop page from reloading;
    }

// function for handling event on focus
    function focusHandling(event) {
        if (event.target.tagName === 'INPUT') {   //checking target type to be input
            event.target.classList.remove(inputErrorClass);
        }
    }

}