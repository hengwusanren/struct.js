/**
 * Created by hengwu on 2015/9/22.
 */

/********************************
 * HashTable
 ********************************/
var HashTable = (function () {

    "use strict";

    return function (size, loadFactor) {
        // check arguments:
        // todo

        this._table = new Object();
        this._size = 0;

        //this._valueComparator = function (v1, v2) { return v1 == v2 };
    }
        .method('has', function (key) {
            // check arguments:
            // todo

            return key in this._table;
        })
        .method('get', function (key) {
            // check arguments:
            // todo

            return this.has(key) ? this._table[key] : null;
        })
        .method('put', function (key, value) {
            // check arguments:
            // todo

            if (!this.has(key)) this._size++;
            this._table[key] = value;

            return this;
        })
        .method('remove', function (key) {
            // check arguments:
            // todo

            if (this.has(key) && (delete this._table[key])) {
                this._size--;
            }
            return this;
        })
        .method('size', function () {
            return this._size;
        })
        .method('hasValue', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for (var key in this._table) {
                if (comparator(this._table[key], value)) {
                    return true;
                }
            }
            return false;
        })
        .method('getKeyOfValue', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for (var key in this._table) {
                if (comparator(this._table[key], value)) {
                    return key;
                }
            }
            return null;
        })
        .method('getKeys', function () {
            var keys = new Array();
            for (var key in this._table) {
                keys.push(key);
            }
            return keys;
        })
        .method('getKeysOfValue', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            var keys = new Array();
            for (var key in this._table) {
                if(comparator(this._table[key], value)) {
                    keys.push(key);
                }
            }
            return keys;
        })
        .method('removeValue', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            var keys = this.getKeysOfValue(value, comparator);
            for (var i = 0, len = keys.length; i < len; i++) {
                this.remove(keys[i]);
            }
            return this;
        })
        .method('clear', function () {
            this._table = new Object();
            this._size = 0;
            return this;
        });
})();