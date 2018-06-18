module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection(input) {
    this.container = new Set(input);
}

// Методы коллекции
Collection.prototype.values = function (values) {
    let arr = [];
    let storeForVals= this.container.values();
    for (let i=0; i<this.container.size; i++) {

        arr.push(storeForVals.next().value);

    }

    return(arr);
};
// другие методы

// метод count
Collection.prototype.count = function() {
    return this.container.size;
};

//TODO: метод Collection.from() ; Метод at ; Метод append ; Метод removeAt ;

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (input) {
    Object.create(Collection);
};

//Debugging in the most disgusting way but I still love it
let test = new Collection(['a','b','c']);
console.log(test.count());
console.log(test.values());
