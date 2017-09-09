/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */

function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function createDiv() {
    var div = document.createElement('div');

    div.style.position = 'absolute';
   
    var color = '#' + ('00000' + Math.floor(Math.random() * 16777216).toString(16)).substr(-6);
    var containerHeight = document.documentElement.clientHeight;
    var containerWidth = document.documentElement.clientWidth;
    var itemHeight = randomNumber(30, 200);
    var itemWidth = randomNumber(30, 200);

    div.className = 'draggable-div';
    div.style.backgroundColor = color;
    div.style.width = itemWidth + 'px';
    div.style.height = itemHeight + 'px';
    div.style.top = randomNumber(0, (containerHeight - itemHeight)) + 'px';
    div.style.left = randomNumber(0, (containerWidth - itemWidth)) + 'px';

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function getCoords(elem) {
    var box = elem.getBoundingClientRect();
  
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function addListeners(target) {
    
    target.addEventListener('mousedown', function (e) {
        var coords = getCoords(target);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;
       
        moveTo(e);
       
        function moveTo (e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }
       
        function mouseMove (e) {
            moveTo(e);
        }

        function mouseUp () {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp)
        }

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp)
    });
    
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
