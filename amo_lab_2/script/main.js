// Алгоритм 11. Сортування підрахунком o(n)
// найбыльше число для генерування вибадкового масиву
let THE_LARGEST_NUMBER = 1000;
const ONE_NUMBER = /\d+/;
const AN_ARRAY_OF_NUMBERS = /[ ]?\d+/;
//<--------------------------------------------------------------------------------------------->

get_an_array = (len_arr) => [...Array(len_arr)].map(_ => Math.floor(Math.random() * THE_LARGEST_NUMBER));

// повертає час виконання в секундах
measure_time = (fun, parameter) => {
    let s_time = Date.now();
    fun(parameter);
    return (Date.now() - s_time) / 1000;
}

// сам алгоритм сортування
my_sort = (arr) => {
    let count = Array(THE_LARGEST_NUMBER).fill(0);
    arr.map(item => count[item]++);
    let b = [];
    count.map((item, i) => b.push(...Array(item).fill(i)));
    return b;
}

//<--------------------------------------------------------------------------------------------->

// вивід даних
output_data = (arr) => {
    alert("Почати сортування? \n Після закінчення сайт оновиться автоматично")
    let arr2 = arr.map(num => measure_time(my_sort, get_an_array(num)))

    // обновочка для сайту
    document.body.innerHTML = "<center><link rel=\"stylesheet\" type=\"text/css\" href=\"../css/tab.css\">" +
        "<table id='tab' class=\"styled-table\" >" +
        arr2.map((num, i) => "<tr><th>" + arr[i] + " чисел" + "</th><th>" + num + " секунд" + "</th></tr>").join('') +
        "</table></center>" +
        "<div id=\"your-id\" style=\"height: 400px;\"></div>"

    document.addEventListener("mousemove", function () {
        //Create liteChart.js Object
        settings = {};
        let d = new liteChart("chart", settings);

        // Set labels
        d.setLabels(arr);

        // Set legends and values
        d.addLegend({"name": "Day", "stroke": "#3b95f7", "fill": "#fff", "values": arr2});
        //d.addLegend({"name": "Night", "stroke": "#CDDC39", "fill": "#fff", "values": [200, 150, 240, 180, 150, 240, 230, 300, 200, 150, 270, 200]});

        // Inject chart into DOM object
        let div = document.getElementById("your-id");
        d.inject(div);

        d.draw();
    });
}

// запуск з клавіатури
run = () => {
    if (parseInt(document.getElementById('input_max').value) > 0) {
        THE_LARGEST_NUMBER = parseFloat(document.getElementById('input_max').value);
        let f = true;
        let my_error = (num) => isNaN(num) ? f = false : num
        const arr = document.getElementById('input_b').value.split(/ /)
            .map((num) => my_error(parseFloat(num)));
        if (f)
            output_data(arr)
    }
}

// запуск з клавіатури
run2 = () => {
    if (parseInt(document.getElementById('input_max').value) > 0) {
        THE_LARGEST_NUMBER = parseFloat(document.getElementById('input_max').value);
        let f = true;
        let my_error = (num) => isNaN(num) ? f = false : num
        const arr = document.getElementById('input_b').value.split(/ /)
            .map((num) => my_error(parseFloat(num)));
        if (f)
            document.getElementById('start').innerHTML = '<h3>' + my_sort(arr) + '<h3>'
    }
}

with_file = (input) => {
    const file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        let entry = reader.result.split(';')
            .filter(str => ONE_NUMBER.test(str));
        THE_LARGEST_NUMBER = parseInt(entry[0].match(ONE_NUMBER)[0]);
       output_data(entry[1].split(' ')
           .map(str => str.match(ONE_NUMBER))
           .filter(Boolean)
           .map(arr => parseInt(arr[0])));
    }
    return null

    //     let a_b = reader.result.split(';')
    //         .map((str) => str.match(REGE_XP))
    //         .filter((str) => str != null);
    //     if (a_b.length >= 5) {
    //
    //     } else
    //         my_error();
    // }
}

console.log(["THE LARGEST NUMBER = 1000", "довжини масивів = 1000 2000 3000 4000 5000", ""]


);

//console.log(with_file())
//console.log(my_sort([11, 5, 21, 115, 30, 75]))
//console.log(measure_time(my_sort, get_an_array(1000)));