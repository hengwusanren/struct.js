/**
 * Created by v-kshe on 9/15/2015.
 */

var Iterator = function (howToGetElement,
                         howToGetNextKey,
                         howToGetPrevKey,
                         howToGetFirst,
                         howToGetLast) {

    "use strict";

    // notice: it's a deal that the Function implementing Iterator
    //     has these methods in arguments.

    // check arguments:
    // todo

    if (arguments.length < 5) {
        throw new Error('Wrong parameter.');
        return null;
    }

    // notice: key shares the same meaning
    //     with index, id, and other distinct attribute of an element.


    this.iterator = new (function (scope,
                      howToGetElement,
                      howToGetNextKey,
                      howToGetPrevKey,
                      howToGetFirst,
                      howToGetLast) {
        var _scope = scope;
        var _getElement = howToGetElement;
        var _getNextKey = howToGetNextKey;
        var _getPrevKey = howToGetPrevKey;
        var _getFirst = howToGetFirst;
        var _getLast = howToGetLast;

        var _curKey = 0;

        this.init = function (key) {
            if (arguments.length == 0) var key = _getFirst.call(_scope);
            _curKey = key;
            return _getElement.call(_scope, _curKey);
        };
        this.hasNext = function () {
            if (_getNextKey == null) {
                throw new Error('Cannot getNextKey.');
                return null;
            }

            if(_curKey == null) return false;

            return _getNextKey.call(_scope, _curKey) != null;
        };
        this.next = function () {
            if (_getNextKey == null) {
                throw new Error('Cannot getNextKey.');
                return null;
            }

            if(_curKey == null) return null;

            _curKey = _getNextKey.call(_scope, _curKey);
            return _curKey == null ? null : _getElement.call(_scope, _curKey);
        };
        this.hasPrev = function () {
            if (_getPrevKey == null) {
                throw new Error('Cannot getPrevKey.');
                return null;
            }

            if(_curKey == null) return false;

            return _getPrevKey.call(_scope, _curKey) != null;
        };
        this.prev = function () {
            if (_getPrevKey == null) {
                throw new Error('Cannot getPrevKey.');
                return null;
            }

            if(_curKey == null) return null;

            _curKey = _getPrevKey.call(_scope, _curKey);
            return _curKey == null ? null : _getElement.call(_scope, _curKey);
        };
        this.begin = function () {
            return _getFirst.call(_scope);
        };
        this.end = function () {
            return _getLast.call(_scope);
        };
        this.value = function () {
            return _getElement.call(_scope, _curKey);
        };
    })(this,
        howToGetElement,
        howToGetNextKey,
        howToGetPrevKey,
        howToGetFirst,
        howToGetLast);
};