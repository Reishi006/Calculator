const clear = document.querySelector('#clear');
const ce = document.querySelector('#ce');
const number = document.querySelectorAll('#number');
const operator = document.querySelectorAll('#operator');
const negpos = document.querySelector('#negpos');
const dot = document.querySelector('#dot');
const mathSign = document.querySelector('#mathSign');
const back = document.querySelector('#back');
const eq = document.querySelector('#eq');
const firstInput = document.querySelector('#firstInput');
const secondInput = document.querySelector('#secondInput');
const oneByX = document.querySelector('.oneByX');

let result = '';
let change = -1;
let results = [];

let helloPhrase = 'Hello';

let activate = 0;

function inputScreen() {
    /*
    
    -> the change variable decides whether the number on site load has been clicked
    if change == -1 (onload) then it clears every .innerHTML
    if change == 0 then it doesn't clear any input
    if change == 1 then it clears only the active input which is always firstInput that dynamically changes throughout calculations
    
    */

    if (firstInput.innerHTML.length < 20 
        && firstInput.innerHTML.length >= 0 
        && (change === 0 || change === 1)) {
        if (change === 0) {
            if (firstInput.innerHTML.match(/(?<!\d)0$/) == '0') {   // /(?<!\d)0$/ 0 followed by a character that is not a digit
                firstInput.innerHTML = '';
            }
            firstInput.innerHTML += this.textContent;
            console.log(firstInput.innerHTML.length);
            console.log(`indexOf${firstInput.innerHTML.indexOf('0')}`);
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

    if (firstInput.innerHTML == 0) {
        ce.disabled = true;
        console.log(`IF: ${ce.disabled}`);
    } else if (parseInt(firstInput.textContent) != NaN) {
        ce.disabled = false;
        console.log(`ELSE IF: ${ce.disabled}`);
    } else {
        ce.disabled = true;
        console.log(`ELSE: ${ce.disabled}`);   
    }
    
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
    
    if ((firstInput.innerHTML === '' || firstInput.innerHTML === helloPhrase || secondInput.innerHTML === '') && mathSign.innerHTML !== '1/x') {
        let id = null;
        let iterate = 0;

        if (activate == 0) {
            activate = 1;
            clearInterval(id);
            id = setInterval(blink, 150);

            console.log(`id: ${id}`);

            function blink() {
                if (iterate == 6) {
                    clearInterval(id);
                    activate = 0;
                } else {
                    if (id) {
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
                }
            }
        }
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

    results[results.length] = [parseFloat(result.toFixed(14))];
    console.log(`Results: ${results}`);
    firstInput.innerHTML = results[results.length - 1];
    secondInput.innerHTML = '';
    mathSign.innerHTML = '';
    change = 1;
    console.log(`result change: ${change}`);
    console.log(`1/x: ${mathSign.innerHTML}`);

    
}

function clearFirst () {
    firstInput.innerHTML = '';
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

function negPos() {
    if (firstInput.innerHTML != helloPhrase || firstInput.innerHTML.indexOf('0') != 0 || firstInput.innerHTML.indexOf('-0') != 0) {
        if (firstInput.innerHTML.indexOf('-') == -1 && firstInput.innerHTML.match(/(?<!\d)0(?=\d|$)/) != 0) {
            firstInput.innerHTML = '-' + firstInput.innerHTML;
        } else if (firstInput.innerHTML.indexOf('-') != -1) {
            firstInput.innerHTML = firstInput.textContent.slice(1);
        }
    }
}

function addDot() {
    if ((secondInput.innerHTML == '' || firstInput.innerHTML == helloPhrase || firstInput.innerHTML == '') && (change != 0)) {
        if (secondInput.innerHTML == helloPhrase) {
            firstInput.innerHTML = '';
            secondInput.innerHTML = '';
            mathSign.innerHTML = '';
        }
        if (firstInput.innerHTML.match(/!0|\d+$/) == null) {
            console.log(`${firstInput.innerHTML.match(/!0|\d+$/)}`);
            firstInput.innerHTML += '0.';
            change = 0;
        }
    }
    else if (firstInput.innerHTML.indexOf(".") == -1) {
        firstInput.innerHTML += '.';
    }

}

//eventListener

operator.forEach((button) => button.addEventListener('click', operate));

negpos.addEventListener('click', negPos);

dot.addEventListener('click', addDot);

eq.addEventListener('click', showResult);

oneByX.addEventListener('click', showResult);

ce.addEventListener('click', clearFirst);

clear.addEventListener('click', clearScreen);

number.forEach((button) => {
    button.addEventListener('click', inputScreen)
}); //displayNumbers

back.addEventListener('click', backSpace);


/* let str = "-01041240";
console.log(`${str.match(/(?<!\d)0/)}`); //matches 0 only if it isn't preceeded by a digit*/
