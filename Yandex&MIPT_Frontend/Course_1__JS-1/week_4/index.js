/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
//QUERY FUNCTION
function query(collection) {
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].name === 'filterIn') { //checking arument name to understand the needed func
            collection = arguments[i](collection);
            if (arguments[i].name === 'select') {  //checking arument name to understand the needed func
                collection = arguments[i](collection);
            }
        }
    }
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].name === 'select') {  //checking arument name to understand the needed func
            collection = arguments[i](collection);
        }
    }

    return collection;
}

/**
 * @params {String[]}
 */
//SELECT FUNCTION
function select() {
    var visibleArguments = arguments;

    return function select(collection) {
        var resultCollection = []; //declaring an arr so I can push things in it later

        collection.forEach(function (obj) {
            var pushMeLater = {}; //declaring object

            for (var i = 0; i < visibleArguments.length; i++) { //looping through visibleArguments
                if (visibleArguments[i] in obj) { //checking if there is such an arg in the object
                    pushMeLater[visibleArguments[i]] = obj[visibleArguments[i]];
                }
            }

            resultCollection.push(pushMeLater); //pushing object to an array declared before
        });

        return resultCollection;
    };
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
//FILTERIN FUNCTION
function filterIn(property, values) {
    return function filterIn(collection) {
        function iterator(array, object) {
            values.forEach(function (value) {
                if (object[property] === value) {
                    array.push(object);
                }
            });

            return array;
        }

        return collection.reduce(iterator, []);
    };
}

// exporting methods
module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};