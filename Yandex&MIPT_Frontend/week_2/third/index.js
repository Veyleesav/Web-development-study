// Телефонная книга
var phoneBook = { };

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

    var comArr = command.split(' ');
    // 'ADD'
    if (comArr[0] == 'ADD'){
        var name = comArr[1];
        if (phoneBook.hasOwnProperty(name)===false){
            var phone = comArr[2].split(',');
            phoneBook[name] = phone;
        }
        else {
            phone = comArr[2].split(',');
            for (var k=0;k<phone.length;k++){
                phoneBook[name].push(phone[k]);
            }


        }

    }
    // 'SHOW'
    else if (comArr[0]=='SHOW'){
        var tmpArr=(Object.keys(phoneBook));
        var nameArr = tmpArr.sort();
        var result=[];
        for (var i=0;i<nameArr.length;i++) {
            if (phoneBook[nameArr[i]].filter(String).length>=1){
            var showRes = (nameArr[i]+': '+ phoneBook[nameArr[i]].filter(String).join(', '));
            result = result.concat(showRes);

        }}
        return result;


    }
//'REMOVE_PHONE'
else{
        var numToDel = comArr[1];
                         for (var x = 0; x < Object.keys(phoneBook).length; x++) {
                if (phoneBook[Object.keys(phoneBook)[x]].indexOf(numToDel) !== -1) {
                    var delIndex = phoneBook[Object.keys(phoneBook)[x]].indexOf(numToDel);
                     return delete phoneBook[Object.keys(phoneBook)[x]][delIndex];
                }
            }
        for (var x = 0; x < Object.keys(phoneBook).length; x++) {
            if (phoneBook[Object.keys(phoneBook)[x]].indexOf(numToDel) === -1) {
                return false;
            }
        }



        }

};
