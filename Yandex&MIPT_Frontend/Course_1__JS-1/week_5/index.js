module.exports = {
    /**
     * @param {String} eventName
     * @param {Object} subscriber
     * @param {Function} handler
     */
    eventsObject: {}, //declaring eventsObject obj to work with it further
    //ON METHOD
    on: function (eventName, subscriber, handler) {
        if (this.eventsObject.hasOwnProperty(eventName) === false) { //checking if the information isn`t already there
            this.eventsObject[eventName] = []; //declaring an arr;
        }

        this.eventsObject[eventName].push( //pushing into eventsObject obj
            {
                subscriber: subscriber,
                handler: handler
            }
        );

        return this;
    },

    /**
     * @param {String} eventName
     * @param {Object} subscriber
     */
    //OFF METHOD
    off: function (eventName, subscriber) {
        var subscriptions = this.eventsObject[eventName];

        if (subscriptions) {
            this.eventsObject[eventName] = subscriptions.filter(function (item) {
                return item.subscriber !== subscriber;   //unsubscribing
            });
        }

        return this;
    },

    /**
     * @param {String} eventName
     */
    //EMIT METHOD
    emit: function (eventName) {
        var subscriptions = this.eventsObject[eventName];

        if (subscriptions) {
            subscriptions.forEach(function (item) {
                item.handler.call(item.subscriber);
            });
        }

        return this;
    }
};