// 1. Seleção dos elementos pelos IDs exatos do teu HTML
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

// Função para limpar mensagens e resetar números
function resetDisplay() {
    [errorDay, errorMonth, errorYear].forEach(el => el.textContent = "");
    yearsResults.textContent = "- -";
    monthsResults.textContent = "- -";
    dayResults.textContent = "- -";
}

btnCalc.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que a página recarregue
    
    resetDisplay();

    let hasError = false;
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();
    const currentYear = today.getFullYear();

    // 2. Validação: Campos Vazios
    if (!dayInput.value) {
        errorDay.textContent = "This field is required";
        hasError = true;
    }
    if (!monthInput.value) {
        errorMonth.textContent = "This field is required";
        hasError = true;
    }
    if (!yearInput.value) {
        errorYear.textContent = "This field is required";
        hasError = true;
    }

    if (hasError) return;

    // 3. Validação: Valores fora do intervalo lógico
    if (day < 1 || day > 31) {
        errorDay.textContent = "Must be a valid day";
        hasError = true;
    }
    if (month < 1 || month > 12) {
        errorMonth.textContent = "Must be a valid month";
        hasError = true;
    }
    if (year > currentYear) {
        errorYear.textContent = "Must be in the past";
        hasError = true;
    }

    // 4. Validação: Data que não existe (ex: 31/02)
    const birthdayDate = new Date(year, month - 1, day);
    if (birthdayDate.getMonth() + 1 !== month || birthdayDate.getDate() !== day) {
        errorDay.textContent = "Must be a valid date";
        hasError = true;
    }

    if (hasError) return;

    // 5. Cálculo da Diferença de Tempo
    let diffYears = today.getFullYear() - birthdayDate.getFullYear();
    let diffMonths = today.getMonth() - birthdayDate.getMonth();
    let diffDays = today.getDate() - birthdayDate.getDate();

    // Ajuste se o dia atual for menor que o dia de nascimento
    if (diffDays < 0) {
        diffMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        diffDays += lastMonth;
    }

    // Ajuste se o mês atual for menor que o mês de nascimento
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    // 6. Exibir os resultados finais
    yearsResults.textContent = diffYears;
    monthsResults.textContent = diffMonths;
    dayResults.textContent = diffDays;
});