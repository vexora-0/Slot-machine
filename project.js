const prompt = require('prompt-sync')();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    cherry : 2,
    lemon : 4,
    orange : 6,
    plum : 8,
}

const SYMBOL_VALUES = {
    cherry : 2,
    lemon : 3,
    orange : 4,
    plum : 5,
}

const deposit = () => {
    const depositamount = prompt('Enter the amount you want to deposit: ');
    const numberdeposit = parseFloat(depositamount); 
    if (isNaN(numberdeposit) || numberdeposit <= 0) {
        console.log('Please enter a valid amount');
        deposit();
    }
    return numberdeposit;
}

const getnolines = () => {
    const nolines = prompt('Enter the number of lines you want to bet on (1-3): ');
    const numberlines = parseInt(nolines);
    if (isNaN(numberlines) || numberlines <= 0 || numberlines > 3) {
        console.log('Please enter a valid number of lines');
        getnolines();
    }
    return numberlines;
}
const bet = (balance, nolines) => {
    while (true){
        const bet = prompt('Enter the amount you want to bet per line: ');
        const nbet = parseFloat(bet);
        if (isNaN(nbet) || nbet <= 0 || nbet * nolines > balance) {
            console.log('Please enter a valid amount');
        }
        else {
            return nbet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = []
    for (let i = 0; i < ROWS; i++) {
        reels.push([]);
        const reelsymbols = [...symbols];
        for (let j = 0; j < COLS; j++) {
            const randomIndex = Math.floor(Math.random() * reelsymbols.length);
            reels[i].push(reelsymbols[randomIndex]);
            reelsymbols.splice(randomIndex, 1); 
        }
    }
    
    return reels;
}

const transposereels = (reels) => {
    const rows = [];
    for (let i = 0; i < COLS; i++) {
        rows.push([]);
        for (let j = 0; j < ROWS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printrows = (rows) => {
    for (const row of rows) {
        let rowstring = '';
        for (const [i, symbol] of row.entries()) {
            rowstring += symbol;
            if (i < row.length - 1) {
                rowstring += ' | ';
            }
        }
        console.log(rowstring);
    }
}

const getwinngings = (rows, betamount, lines) => {
    let winnings = 0;
    for (row of rows){
        let b = true;
        for (let i = 1; i < row.length; i++){
            if (row[i] !== row[i-1]){
                b = false;
                break;
            }
        }
        if (b){
            winnings += SYMBOL_VALUES[row[0]] * betamount;
        }
    }
    return winnings;
}

let balance = deposit();
let nolines = getnolines();
let betamount = bet(balance, nolines);
const reels = spin();
const rows = transposereels(reels);
printrows(rows);
const winnings = getwinngings(rows, betamount, nolines);