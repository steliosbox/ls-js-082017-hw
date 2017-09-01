/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        newArray.push( fn(array[i], i, array) );
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var corrent = initial || array[0],
        i = initial ? 0 : 1,
        length = array.length;

    for (i; i < length; i++) {
        corrent = fn(corrent, array[i], i, array);
    }

    return corrent;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var array = [];

    for (var key in obj) {
        if ( obj.hasOwnProperty(key) ) {
            array.push( key );
        }
    }

    return array;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var array = [];
    
    for (var key in obj) {
        if ( obj.hasOwnProperty(key) ) {
            array.push( key.toUpperCase() );
        }
    }
    
    return array;    
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to) {
    var length = array.length,
        arr = [];

    if (!isNaN(to)) {
        if (to < 0) {
            to = (length + to);
        }
    } else {
        to = length;
    }

    for (var i = 0; i < length; i++) {
        if ( from <= i && i < to ) {
            arr.push(array[i]);
        }
    }

    return arr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    var handler = {

        set(obj, key, value) {
            obj[key] = value * value;
            
            return true;
        }
    };

    return new Proxy(obj, handler);
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
