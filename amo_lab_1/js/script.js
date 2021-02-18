draw_the_answer = (answer) => document.getElementById('start').innerHTML = 'Відповідь: ' + answer;
<!--===============================================================================================-->
not_sqrt = (num) => isNaN(num) ? 'Неможливо взяти корінь' : num;
linear = (a, b) => draw_the_answer(Math.sin(a + b) - (Math.cos(a - b) * Math.cos(a - b)));
branching = (g, n, b, k, i) => {
    if (i % 5 < 3) {
        if (n === 0 || b === 0)
            draw_the_answer('Помилка ділення');
        else
            draw_the_answer(Math.pow(g, g + i) / (n * Math.pow(b, k + i)));
    } else {
        if (g === 0)
            draw_the_answer('Помилка ділення');
        else {
            draw_the_answer(not_sqrt(Math.pow(n * Math.pow(b, g + i) / Math.pow(g, k + i), 0.25)));
        }
    }
}
cyclic = (m, p, c) => {
    if ((m.length !== p.length) || (m.length !== c.length)) {
        alert('кількіть чисел в рядках нерівна \n рахувати по мінімальній?');
        const LEN = Math.min(m.length, p.length, c.length);
        m = m.slice(0, LEN, 1);
        p = p.slice(0, LEN, 1);
        c = c.slice(0, LEN, 1);
    }
    let sum = c.reduce((a, b) => a + b, 0);
    sum = m.reduce((a, b) => a + b, sum) / p.reduce((a, b) => a + b, sum);
    draw_the_answer(sum === Infinity ? 'Помилка ділення' : not_sqrt(Math.sqrt(sum)));
}

<!--===============================================================================================-->

const REGE_XP = /[+-]?\d+\.?\d*/
const REGE_XP3 = /[ +-.0-9]+$/
//const PARAM_XP = /^[a-z A-Z]+/
<!--===============================================================================================-->

let my_error = () => alert('некорекна робота програми');

<!--===============================================================================================-->

function run() {
    const a = parseFloat(document.getElementById('input_a').value);
    const b = parseFloat(document.getElementById('input_b').value);
    if (!(isNaN(a) || isNaN(b)))
        linear(a, b);

}

// перепис на одну функцію читання
function with_file(input) {
    const file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        let a_b = reader.result.split(';')
            .map((str) => str.match(REGE_XP))
            .filter((str) => str != null);
        if (a_b.length >= 2) {
            alert('a = ' + a_b[0] + '\n' +
                'b = ' + a_b[1]);
            linear(a_b[0], a_b[1]);
        } else
            my_error();
    }
}

function run2() {
    const g = parseFloat(document.getElementById('input_g').value);
    const n = parseFloat(document.getElementById('input_n').value);
    const b = parseFloat(document.getElementById('input_b').value);
    const k = parseFloat(document.getElementById('input_k').value);
    const i = parseFloat(document.getElementById('input_i').value);
    if (!(isNaN(g) || isNaN(n) || isNaN(b) || isNaN(k) || isNaN(i)))
        branching(g, n, b, k, i);

}

function with_file2(input) {
    const file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        let a_b = reader.result.split(';')
            .map((str) => str.match(REGE_XP))
            .filter((str) => str != null);
        if (a_b.length >= 5) {
            alert('g = ' + a_b[0] + '\n' +
                'n = ' + a_b[1] + '\n' +
                'b = ' + a_b[2] + '\n' +
                'k = ' + a_b[3] + '\n' +
                'i = ' + a_b[4]);
            branching(a_b[0], a_b[1], a_b[2], a_b[3], a_b[4]);
        } else
            my_error();
    }
}

function run3() {
    let f = true;
    my_error = (num) => isNaN(num) ? f = false : num
    const m = document.getElementById('input_m').value.split(/ /).map((num) => my_error(parseFloat(num)));
    const p = document.getElementById('input_p').value.split(/ /).map((num) => my_error(parseFloat(num)));
    const c = document.getElementById('input_c').value.split(/ /).map((num) => my_error(parseFloat(num)));
    if (f)
        cyclic(m, p, c);


}

function with_file3(input) {
    const file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        console.log(reader.result)
        let a_b = reader.result.split(';')
            .map((str) => str.match(REGE_XP3))
            .filter((str) => str != null)
        a_b = a_b.map((item) => item[0].split(' ').filter((str) => str !== '').map(parseFloat))
        if (a_b.length >= 3) {
            alert('m = ' + a_b[0] + '\n' +
                'p = ' + a_b[1] + '\n' +
                'c = ' + a_b[2]);
            cyclic(a_b[0], a_b[1], a_b[2]);
        } else
            my_error();
    }
}
