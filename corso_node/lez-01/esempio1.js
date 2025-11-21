console.log('start - inizio index.js');

const num1 = 5;
const num2 = 15;
const mioNome = 'Mario Rossi'

// const paragrafo = document.querySelector('#paragrafo')
// alert('ciao io sono alert')

somma(num1, num2)
saluta(mioNome)

function somma(a,b) {
    console.log(a + b)
}
function saluta(nome) {
    console.log('Ciao io sono ' + nome)
}
