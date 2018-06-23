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

//метод at
Collection.prototype.at = function(num){
    let arr = this.values();
    let index = num-1;
    if(typeof arr[index] === 'undefined') {
        return null;
    }
    else {
        return arr[index];
    }
};

//метод append
Collection.prototype.append = function(input){
    //Проверка, подаётся ли на вход массив или другая коллекция

if (Array.isArray(input)){                           //Если массив
    let addition = new Set(input);
    let storeForVals= addition.values();
    for (let i=0; i<addition.size; i++) {
        this.container.add(storeForVals.next().value);

    }
}

else if (typeof input === 'object') {                                               //Если коллекция

    let storeForVals= input.container.values();
    for (let i=0; i<input.container.size; i++) {

        this.container.add(storeForVals.next().value);

    }
}
else {
        let arr =[];
        arr.push(input);
        let addition = new Set(arr);
        let storeForVals = addition.values();
        for (let i = 0; i < addition.size; i++) {
            this.container.add(storeForVals.next().value);
        }
    }
};

// метод removeAt
Collection.prototype.removeAt = function(num){
    let arr = this.values();
    let index = num-1;
    arr.splice(index,1);
    this.container = new Set(arr);
};


//TODO: метод Collection.from() ;

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (input) {
   return new Collection(input);

};
let test = Collection.from(['a','b','c']);
console.log('Метод count():');
console.log(test.count());
console.log('Метод values():');
console.log(test.values());
console.log('Метод at():');
console.log(test.at(0));
console.log(test.at(1));
console.log(test.at(2));
console.log(test.at(3));
console.log(test.at(4));
console.log('Метод append() с массивом [\'1\',\'7\',\'5\']:');
test.append(['1','7','5']);
console.log(test.values());
console.log('Метод append() с другой коллекцией: [\'e\',\'f\',\'g\']');
let test2 = Collection.from(['e','f','g']);
test.append(test2);
console.log(test.values());
console.log('Метод append() с буквой S:');
test.append('S');
console.log(test.values());
console.log('Метод append() с цифрой 6:');
test.append(6);
console.log(test.values());
console.log('Метод removeAt(1):');
test.removeAt(1);
console.log(test.values());
console.log('Метод removeAt(3):');
test.removeAt(3);
console.log(test.values());