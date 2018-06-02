/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  // Array to lower case
    var temp = hashtags.join(' ').toLowerCase();
    var newArr = temp.split(' ');
    //Delete Duplicates
        var unique_array = [];
        for(var i = 0;i < newArr.length; i++){
            if(unique_array.indexOf(newArr[i]) === -1){
                unique_array.push(newArr[i])
            }
        }
        return unique_array.join(', ');

};
module.exports(['web', 'coursera', 'JavaScript', 'Coursera', 'script', 'programming']);