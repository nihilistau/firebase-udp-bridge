/* jshint -W097 */
/* globals require, module */
'use strict';

var q = require('q'),
    FirebaseNodes = require('../lookups/firebasenodes.js'),
    FirebaseEvent = require('../lookups/firebaseevent.js');

/**
 * Helper functions for working with Firebase
 * @constructor
 * @class
 */
function FirebaseUtility() {

    /**
     * Authenticate the client using a custom token
     * @param {Firebase} firebase the firebase token
     * @param {String} token the auth token
     * @returns {Promise<null>} the promise of an authentication outcome
     */
    this.authWithCustomToken = function (firebase, token) {

        var deferred = q.defer();

        firebase.authWithCustomToken(token,
            function complete(error) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve();
                }
            });

        return deferred.promise;
    };

    /**
     * Resolve a path to be rooted in the Data/ root node
     * @param {Firebase} firebase the firebase instance
     * @param {String} path the node path
     * @returns {Firebase} the child node
     */
    this.getDataChild = function(firebase, path) {

        if (path[0] !== '/') {
            throw new Error("Path must start with '/'");
        }
        // Remove the leading '/'
        path = path.substring(1);

        return firebase
            .root()
            .child(FirebaseNodes.DATA_ROOT)
            .child(path);
    };

    /**
     * Return the root Session node
     * @param {Firebase} firebase the firebase client
     * @returns {Firebase} the child node
     */
    this.getSessionRoot = function(firebase) {

        return firebase
            .root()
            .child(FirebaseNodes.SESSION_ROOT);
    };

    /**
     * Return the root Channel node
     * @param {Firebase} firebase the firebase client
     * @returns {Firebase} the child node
     */
    this.getChannelRoot = function(firebase) {

        return firebase
            .root()
            .child(FirebaseNodes.CHANNEL_ROOT);
    };

    /**
     * Return the root Client node
     * @param {Firebase} firebase the firebase client
     * @returns {Firebase} the client node
     */
    this.getClientRoot = function(firebase) {
        return firebase
            .root()
            .child(FirebaseNodes.CLIENT_ROOT);
    };

    /**
     * Get the Firebase server time
     * @param {Firebase} firebase the firebase client
     * @returns {Promise<Number>} a promise to the server time in MS
     */
    this.getFirebaseServerTime = function(firebase) {

        var fbPromise = firebase
            .root()
            .child(FirebaseNodes.SERVER_TIME_OFFSET)
            .once(FirebaseEvent.VALUE)
            .then(function success(snapshot) {
                return new Date().getTime() + snapshot.val();
            });

        return q(fbPromise);
    };

    /**
     * Push a value to a location and return a promise
     * @param {Firebase} reference a reference to the location
     * @param {*} value the value to push
     * @returns {Promise} a promise to the completed server write
     */
    this.push = function(reference, value) {

        var deferred = q.defer();
        reference.push(value, function completed(error) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
}

module.exports = new FirebaseUtility();
