const clear = document.querySelectorAll('#clear');
const number = document.querySelectorAll('#number');
const operator = document.querySelectorAll('#operator');
const mathSign = document.querySelector('#mathSign');
const back = document.querySelector('#back');
const eq = document.querySelector('#eq');
const firstInput = document.querySelector('#firstInput');
const secondInput = document.querySelector('#secondInput');
const oneByX = document.querySelector('.oneByX');

let result = '';
let change = -1;
let results = [];

//proj euler 5% diff
let i = 0;
let count = 0;
let numbers = [];
for (i; i < 1000; i++) {
    if (i % 3 == 0 || i % 5 == 0) {
        numbers[numbers.length + 1] += i;
        count += i;
    }
}
console.log(count);
console.log(numbers);


function inputScreen() {
    /*if (change > 0) {
        firstInput.innerHTML = '';
        secondInput.innerHTML = '';
        mathSign.innerHTML = '';
    }*/

    
    /* if (isNaN(Number(firstInput.innerHTML)) === true && firstInput.innerHTML !== '') {
        firstInput.innerHTML = '';
        secondInput.innerHTML = '';
        mathSign.innerHTML = '';
        console.log(Number(firstInput.innerHTML));
        firstInput.innerHTML += this.textContent;

    } else  */

    if (firstInput.innerHTML.length < 20 
        && firstInput.innerHTML.length >= 0 
        && (change === 0 || change === 1)) {

        if (change === 0) {
            firstInput.innerHTML += this.textContent;
            console.log(firstInput.innerHTML.length);
        } else if (change === 1) {
            firstInput.innerHTML = '';
            firstInput.innerHTML += this.textContent;
            change = 0;
        }
        

    } else if (change === -1) {

        firstInput.innerHTML = '';
        secondInput.innerHTML = '';
        mathSign.innerHTML = '';
        firstInput.innerHTML += this.textContent;
        change = 0;
        console.log(`inputScreen 1st elseif change: ${change}`);

    } 
    
    /* else if (change > 0){
        secondInput.innerHTML = '';
        mathSign.innerHTML = '';
        firstInput.innerHTML += this.textContent;
        change = 0;
        console.log(`inputScreen 2nd elseif change: ${change}`);
    } */
    
}

function operate() {
    if (mathSign.innerHTML !== '') {
        showResult();
    }
    

    if (firstInput.innerHTML !== '') {
        secondInput.innerHTML = firstInput.innerHTML;
    } else return;
    mathSign.innerHTML = this.textContent;
    firstInput.innerHTML = '';
}

function showResult() {
    
    if ((firstInput.innerHTML === '' || secondInput.innerHTML === '') && mathSign.innerHTML !== '1/x') {
        /* firstInput.innerHTML = '';
        secondInput.innerHTML = '';
        mathSign.innerHTML = ''; */
        let id = null;
        let iterate = 0;
        var funcActive = false;

        clearInterval(id);
        id = setInterval(blink, 200);

        function blink() {
            if (funcActive == true) {
                return;
            } else {
                funcActive = true;
                if (iterate == 4) {
                    clearInterval(id);
                } else {
                    iterate++;
                    if (iterate % 2 == 1) {
                        firstInput.style.visibility = 'hidden';
                        secondInput.style.visibility = 'hidden';
                        mathSign.style.visibility = 'hidden';
                    } else {
                        firstInput.style.visibility = 'visible';
                        secondInput.style.visibility = 'visible';
                        mathSign.style.visibility = 'visible';
                    }
                }
                funcActive = false;
            }
        } //DO NAPRAWY/WYWALENIA
        return;
    };
    
    let x = Number(firstInput.innerHTML);
    let y = Number(secondInput.innerHTML);

    let mathop = mathSign.innerHTML;
    

    switch (mathop) {
        case '+':
            result = x + y;
            break;
        case '-':
            result = y - x;
            break;
        case '*':
            result = x * y;
            break;
        case ':':
            result = y / x;
            break;
        case '1/x':
            result = 1 / y;
            break;
        case 'x^y':
            result = y ** x;
            break;
        case '√':
            result = Math.pow(y, 1/x);
            break;
        case '%':
            result = y % x;
            break;
    }

    results[results.length] = [parseFloat(result.toFixed(16))];
    console.log(`Results: ${results}`);
    firstInput.innerHTML = results[results.length - 1];
    secondInput.innerHTML = '';
    mathSign.innerHTML = '';
    change = 1;
    console.log(`result change: ${change}`);
    console.log(`1/x: ${mathSign.innerHTML}`);

    
}

function clearScreen() {
    results = [];
    result = '';
    firstInput.innerHTML = '';
    secondInput.innerHTML = '';
    mathSign.innerHTML = '';
    
    change = 0;
    console.log(`change: ${change}`);
}

function backSpace() {
    firstInput.innerHTML = firstInput.textContent.slice(0, -1);
}

//eventListener

operator.forEach((button) => button.addEventListener('click', operate));



/* operator.addEventListener('click', (button) => {
    if (button.target.id.contains('operator') && button.target.textContent !== '1/x') {
        showResult();
    }
}) */

eq.addEventListener('click', showResult);

oneByX.addEventListener('click', showResult);

clear.forEach((button) => button.addEventListener('click', clearScreen));

number.forEach((button) => {
    button.addEventListener('click', inputScreen)
}); //displayNumbers

back.addEventListener('click', backSpace);