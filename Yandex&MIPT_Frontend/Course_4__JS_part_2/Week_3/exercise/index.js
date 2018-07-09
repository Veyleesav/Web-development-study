/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {

    if (operations.length === 0) {  //behavior in case when no functions are given
        callback(null, []);
    }

    //behavior in case when there are functions

    let totalData = [];  //data array to be sent back after all
    let numberOfOperations = 0; //counter of operations done
    let errorIsFound = false; // variable to avoid processing operations with errors

    operations.forEach(function (operation, index) { //executing this function once for each element of operations array
        operation(function next(err, data) { //transferring next() for every operation


            if (err) { // checking if there is an error in operation to handle it
                callback(err);
                errorIsFound = true; //switching the errorIsFound boolean to 'true' to remember that there is an error in the operation (to be used further)

                return;
            }
            if (errorIsFound) {
                return;
            }

            totalData[index] = data; //sending the resulting data to it`s index in the data array
            numberOfOperations++; //counting operations

            // Checking if there is no operations left and sending the callback
            if (numberOfOperations === operations.length) {
                callback(null, totalData);
            }
        });
    });
};