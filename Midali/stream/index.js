// // creo unfile grande di testo
// const {writeFileSync} = require('fs');
// for (let i =0; i<100000; i++){
//      writeFileSync('./fileGrende.txt', `questa è la linea numero ${i}\n`, {flag: 'a'});
// };

// // leggo SENZA STREAM il file grande di testo
// const {readFileSync,writeFileSync} = require('fs');
// const fileGrende = readFileSync('./fileGrende.txt', );

// console.log(fileGrende);

// leggo CON STREAM il file grande di testo
const {createReadStream, readFileSync,writeFileSync} = require('fs');
const stream = createReadStream('./fileGrende.txt');
stream.on('data', (result) => {
    console.log(result);
});

// si nota come il file viene diviso in 3 buffer da 64kb ciascuno, 
// e l'ultimo buffer contiene il resto del file.