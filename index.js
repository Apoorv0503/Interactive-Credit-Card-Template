const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const inputFields = document.querySelectorAll('.input-field');
const modal = document.querySelector('.modal');
// continue-button to close the modal
const modalClose = document.querySelector('.close');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    // changed modal display from none to flex once form is submitted.
    modal.style.display = "flex";
    inputs.forEach(input=>{
        // applying validation on each input by calling functions for the name input, date input and then other inputs
        if(input.classList.contains('name-input')){
            containsNameInput(input)
        }else if(input.classList.contains('date')){
            // for date and month input
            containsDateInput(input)
        }else{
            // for card number and cvv
            containsOtherInput(input)
        }

        //if validation fails, then we add "error-empty" or "error-invalid" classes to the parent container of inputs,
        //in such case do not show modal, resolve error first
        if (input.parentElement.classList.contains('error-empty') ||
            input.parentElement.classList.contains('error-invalid') ||
            input.parentElement.parentElement.classList.contains('error-invalid') ||
            input.parentElement.parentElement.classList.contains('error-empty')) {
            modal.style.display = 'none';
        }
    })
})

//validation check for the name input given by user
const containsNameInput = function(input){
    if(input.value === ''){
        // added "name input can not be empty" error
        input.parentElement.classList.add('error-empty');
        input.parentElement.classList.remove('error-invalid');
    }else if(input.value !== '' && input.value.match(/^[0-9]+$/) !== null){ 
        //if name input is not empty but contains number, then show "invalid name" error 
        // wil return null if value has number
        input.parentElement.classList.remove('error-empty');
        input.parentElement.classList.add('error-invalid');
    }
    else{
        input.parentElement.classList.remove('error-empty');
        input.parentElement.classList.remove('error-invalid');
    }
}

const containsDateInput = function(input){
    if(input.value === ''){
        input.parentElement.parentElement.classList.add('error-empty');
        input.parentElement.parentElement.classList.remove('error-invalid');
    }else if(input.value !== '' && input.value.match(/^[0-9]+$/) === null){  
        //if date input is not empty but does not contains number, then show "invalid date" error 
        // wil return null if value has number
        // wil return null if value has anything other than number
        input.parentElement.parentElement.classList.remove('error-empty');
        input.parentElement.parentElement.classList.add('error-invalid');
    }else{
        input.parentElement.parentElement.classList.remove('error-empty');
        input.parentElement.parentElement.classList.remove('error-invalid');
    }
}

const containsOtherInput = function(input){
    if(input.value === ''){
        input.parentElement.classList.add('error-empty');
        input.parentElement.classList.remove('error-invalid');
    }else if(input.value !== '' && input.value.match(/^[0-9]+$/) === null){
        input.parentElement.classList.remove('error-empty');
        input.parentElement.classList.add('error-invalid');
    }else{
        input.parentElement.classList.remove('error-empty');
        input.parentElement.classList.remove('error-invalid');
    }
}

//if continue button is clicked then close the modal
modalClose.addEventListener('click',()=>{
    modal.style.display = "none";
});


//input value handlers, after user has given the input, we must reflect the output in the output panel of cards.

//name filling
const nameInput = document.querySelector('.name-input');
nameInput.addEventListener('input',(e)=>{
    document.querySelector('.name-output').textContent = e.target.value;
});

//card number filling
const numberInput = document.querySelector('.number-input');
numberInput.addEventListener('input',(e)=>{
    let formattedNumber = e.target.value.toString().replace(/\d{4}(?=.)/g, '$& ');  //place a space after every 4 characters
    document.querySelector('.number-output').textContent = formattedNumber;
});

//month filling
const monthInput = document.querySelector('.month-input');
monthInput.addEventListener('input',(e)=>{
    formattedMonth = ('0' + e.target.value).slice(-2);  // add a 0 to the number if it's less then 10. (e.g. 9 => 09)
    document.querySelector('.month-output').textContent = formattedMonth;
})

//year filling
const yearInput = document.querySelector('.year-input');
yearInput.addEventListener('input',(e)=>{
    formattedYear = ('0' + e.target.value).slice(-2);
    document.querySelector('.year-output').textContent = formattedYear;
})

//cvv filling
const cvcInput = document.querySelector('.cvc-input');
cvcInput.addEventListener('input',(e)=>{
    document.querySelector('.cvc-output').textContent = e.target.value;
})