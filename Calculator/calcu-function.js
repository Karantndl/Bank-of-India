const steps = Array.from(document.querySelectorAll('form .step'));
const nextBtn = document.querySelectorAll('form .next-btn');
const backBtn = document.querySelectorAll('form .back-btn');


nextBtn.forEach(button=> {
    button.addEventListener('click', (e) =>{
        e.preventDefault();
        changeStep('next');
    })
})

backBtn.forEach(button =>{
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        changeStep('back')
    })
})




function changeStep(btn){
    let index = 0
    const active = document.querySelector('form .step.active');
    index = steps.indexOf(active)
    steps[index].classList.remove('active') // this  remove active class list from html
    
    if (btn === 'next'){ // if statement to increment index by 1 every time user click nect
        index ++;
    }
    else if (btn === 'back') {
        index--;
    }

    steps [index].classList.add('active') // this will add the active class list and it will display next form
}
// code to validate loan amount must be greater then zero and cannot be negative number
function validateLoanAmount() {
    let loanAmount = document.getElementById('loan_amount').value;
    let errorMessage = document.getElementById('loan_amount-error-message');
    let nextButton = document.getElementById('nextBtn');

    if (loanAmount <= 0) {
        errorMessage.style.display = 'block';  // Show error message
        nextButton.disabled = true;            
    } else {
        errorMessage.style.display = 'none';   // Hide error message
        nextButton.disabled = false;           // allow user to click next button
    }
}

document.getElementById('loan_amount').addEventListener('input', validateLoanAmount);

// Call validateLoanAmount on page load to check  value of loan amount
validateLoanAmount();




function submitBtn(event){
    event.preventDefault(); // to prevent it from loading isue i had!!
    const interestRate = 0.045/12; // (R) monthly interest rate
    var loanTerm = document.getElementById('loan_term').value;
    var loanAmount = document.getElementById('loan_amount').value; //(P)
    var MonthlySalary = document.getElementById('basic_monthly_salary').value;
    var otherFinancial = document.getElementById('other_financial').value;
    var other_monthly_salary = document.getElementById('other_monthly_income').value;

    if (loanAmount <= 0 || MonthlySalary <= 0 || otherFinancial < 0 || other_monthly_salary < 0 || loanTerm <= 0) {
        alert( `the follwoing value cannot be zero or negative value. \n Laon amount: ${loanAmount} Loan term: ${loanTerm} \n Monthly salary: ${MonthlySalary}`);
        return; // Stop top if user enter negative num
    }


    // this is to convert the number to pound currency
    const currencyFormatter =  Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    });

    
    MonthlySalary = Number(MonthlySalary) + Number(other_monthly_salary);// all income so we can compare it to monthly payment
   
    MonthlySalary = Number(MonthlySalary) - Number(otherFinancial); // subtracting the other finance from yearly salarys


    loanTerm = loanTerm * 12 // (N) coverting yearly to monthly
    let formula1 = 1 + interestRate ;
    formula1 = formula1 ** loanTerm; // top (1+r)n
    let formula2 = formula1 - 1;// this code will do  (1 + r)n - 

    let formula = formula1 / formula2; // this code is to divide both 

    let interestFormula = interestRate * formula; // multiply interest rate with formala1 and formula2 result

    let monthlyPayment = loanAmount * interestFormula; // this is the amount the user will have to pay

    let threshold = 0.30 * MonthlySalary;
    console.log(threshold)
    console.log(monthlyPayment)

    if (monthlyPayment <= threshold){
        let totalPayment = monthlyPayment * loanTerm; // Total loan loan term payment
        let totalInterest = totalPayment - loanAmount; // Total interest paid
        let remainingIncome = MonthlySalary - monthlyPayment; // remaning income after monthly payment

        var results = document.getElementById('results');
        results.style.display = "block"; // this will make the result visible and the .toFixed(2) will round it up to 2 decimal point
        results.innerHTML=`<h1> Congratulations, The loan is affordable </h1> \n 
        <P> <strong> Monthly Payment: </strong> ${ currencyFormatter.format(monthlyPayment)} </p> \n 
        <p> <strong> Total Payment: </strong> ${currencyFormatter.format(totalPayment)} </p> \n
        <p> <strong> Total Interest: </strong> ${currencyFormatter.format(totalInterest)} </p> \n
        <p> <strong> Remaining Income After Expenses: </strong> ${currencyFormatter.format(remainingIncome)} </p> 
        `
        $('form.contact-form')[0].reset(); // it will clear all fiels once it successfully submited
    }
    else{
        let results = document.getElementById('results');
        results.style.display = "block";
        results.innerHTML = `<p>Unfortunately, your loan has been <strong>declined</strong> as the monthly payment exceeds 30% of your income. Bank of India</p>`;
    }
}

