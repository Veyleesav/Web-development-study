/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    //get the time in minutes after adding the interval
    var fullMinutes = hours*60 + minutes+interval;
    var newHours = Math.floor(fullMinutes/60);
    var newMins = fullMinutes-newHours*60;
    //if the next day comes
    while (newHours>=24){
        newHours=newHours-24;
    }
    //formatting
    newHours = ('0' + newHours).slice(-2);
    newMins = ('0' + newMins).slice(-2);
    return newHours + ':' + newMins;
};
