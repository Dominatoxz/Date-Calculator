const btnCalc = document.getElementById('btn-results');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const yearsResults = document.getElementById('years-info');
const monthsResults = document.getElementById('months-info');
const dayResults = document.getElementById('days-info');

const errorDay = document.getElementById('error-msg-day');
const errorMonth = document.getElementById('error-msg-month');
const errorYear = document.getElementById('error-msg-year');

const inputs = [dayInput, monthInput, yearInput];

function resetDisplay() {
    inputs.forEach(el => el.textContent = "");
    yearsResults.textContent = "- -";
    monthsResults.textContent = "- -";
    dayResults.textContent = "- -";
}

function resetInputs() {
    inputs.forEach((input) =>{
        input.style.borderColor = "";
        if (input.id === 'day') errorDay.textContent = ""; 
        if (input.id === 'month') errorMonth.textContent = "";
        if (input.id === 'year') errorYear.textContent = "";
})
}

inputs.forEach((input) =>{
    input.addEventListener('input', () => {
        input.style.borderColor = "";
        if (input.id === 'day') errorDay.textContent = ""; 
        if (input.id === 'month') errorMonth.textContent = "";
        if (input.id === 'year') errorYear.textContent = "";

    })
})

btnCalc.addEventListener('click', (e) => {
    e.preventDefault();
    
    resetDisplay();
    resetInputs()

    let hasError = false;
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();
    const currentYear = today.getFullYear();

    if (!dayInput.value){
        errorDay.textContent = "This field is required";
        dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
        monthInput.style.borderColor = 'none';
        yearInput.style.borderColor = 'none';
        hasError = true
    }

    if (!monthInput.value){
        errorMonth.textContent = "This field is required";
        monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
        yearInput.style.borderColor = 'none';
        dayInput.style.borderColor = 'none';
        hasError = true
    }

    if (!yearInput.value){
        errorYear.textContent = "This field is required";
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
        monthInput.style.borderColor = 'none';
        dayInput.style.borderColor = 'none';
        hasError = true
    }

    if (hasError) return;

    if (day < 1 || day > 31) {
        errorDay.textContent = "Must be a valid day";
        dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
        monthInput.style.borderColor = 'none';
        yearInput.style.borderColor = 'none';
        hasError = true;
    }

    if (month < 1 || month > 12) {
        errorMonth.textContent = "Must be a valid month";
        monthInput.style.borderColor = 'hsl(0, 100%, 67%)';
        yearInput.style.borderColor = 'none';
        dayInput.style.borderColor = 'none';
        hasError = true;
    }

    if (year > currentYear) {
        errorYear.textContent = "Must be in the past";
        yearInput.style.borderColor = 'hsl(0, 100%, 67%)';
        monthInput.style.borderColor = 'none';
        dayInput.style.borderColor = 'none';
        hasError = true;
    }

    const birthdayDate = new Date(year, month - 1, day);
    if (birthdayDate.getMonth() + 1 !== month || birthdayDate.getDate() !== day) {
        errorDay.textContent = "Must be a valid date";
        dayInput.style.borderColor = 'hsl(0, 100%, 67%)';
        monthInput.style.borderColor = 'none';
        yearInput.style.borderColor = 'none';
        hasError = true;
    }

    if (hasError) return;

    let diffYears = today.getFullYear() - birthdayDate.getFullYear();
    let diffMonths = today.getMonth() - birthdayDate.getMonth();
    let diffDays = today.getDate() - birthdayDate.getDate();

    if (diffDays < 0) {
        diffMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        diffDays += lastMonth;
    }

    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    yearsResults.textContent = diffYears;
    monthsResults.textContent = diffMonths;
    dayResults.textContent = diffDays;
});
