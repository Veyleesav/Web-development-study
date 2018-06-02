/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var result = [];
    var tempArr=tweet.split(' ');
for (var i=0;i<tempArr.length;i++){
    if (tempArr[i][0]==='#'){
        result.push(tempArr[i].slice(1));
    }
}
return result;
};
