const colors    = require('colors');
const isPrime   = require('prime-number');

colors.setTheme({
    G: 'green',
    Y: 'yellow',
    R: 'red',
});

let nrColor         = 1;
let isPrimeNo       = true;
const firstNum      = +process.argv[2];
const secondNum     = +process.argv[3];

if(isNaN(firstNum) || isNaN(secondNum)){
    console.log('Is not a prime number'.R);
    return;
}

for(i = firstNum; i <= secondNum; i++) {
    if(isPrime(i)){
        isPrimeNo = false;
        switch(nrColor) {
            case 1:
                console.log(`${i}`.G);
                break;
            case 2:
                console.log(`${i}`.Y);
                break;
            case 3:
                console.log(`${i}`.R);
                break;
        }

        if(++nrColor == 4) nrColor = 1;
    }
}

if(isPrimeNo) {
    console.log('No prime numbers'.R);
}
//console.log(isPrimeList);