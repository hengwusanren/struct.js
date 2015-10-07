/**
 * Created by hengwu on 2015/9/27.
 */

/********************************
 * HashTable
 * Table[indexOf(hashOf(key))] contains Entry {key,value,next}
 ********************************/
var HashTable = (function (Iter) {

    "use strict";

    if (!Iter) return null;

    return function (getHashOf, size, loadFactor) {
        // check arguments:
        // todo

        this._table = {};
        this._size = 0;
        var initCapacity = arguments.length > 1 ? size : 16;
        Object.defineProperty(this, '_initialCapacity', {
            value: initCapacity,
            writable: false
        });
        this._capacity = this._initialCapacity;
        this._loadFactor = arguments.length > 2 ? loadFactor : 0.75;

        this.implements(Iter, [
            function (key) {
                return this.get(key);
            },
            null,
            null,
            null,
            null
        ]);

        this._hashOf = null;
        if(getHashOf && (typeof getHashOf === 'function')) {
            this._hashOf = getHashOf;
        } else {
            this._hashOf = function (key) {
                if(key === null || key === undefined) return null;
                if(key.hashCode) return key.hashCode();
                if(key.id && (typeof key.id === 'function')) {
                    var id = key.id();
                    if(typeof id === 'number') return id;
                    return id.toString().hashCode();
                }
                var typeOfKey = (typeof key);
                if(typeOfKey === 'number' && Math.round(key) === key) return key;
                if(typeOfKey === 'boolean') return (key ? 1 : 0);
                if(typeOfKey === 'number'
                    || typeOfKey === 'string'
                    || typeOfKey === 'function') {
                    return key.toString().hashCode();
                }
                return JSON.stringify(key).hashCode();
            };
        }
        this.indexOf = function (h, asKey) {
            return (asKey ? this._hashOf(h) : h) & (this._capacity - 1);
        };
    }
        .implements()
        .method('data', function () {
            return this._table;
        })
        .method('size', function () {
            return this._size;
        })
        .method('capacity', function () {
            return this._capacity;
        })
        .method('checkThreshold', function () {
            return this.size() > this.capacity() * this._loadFactor;
        })
        .method('resize', function () {
            // rehash:
            // todo
        })
        .method('clear', function () {
            this._table = new Object();
            this._size = 0;
            this._capacity = this._initialCapacity;
            return this;
        })
        .method('_hasInLine', function (key, index) {
            // check if there is an Entry with this key:
            // todo

            if(arguments.length < 2) {
                var index = this.indexOf(key);
            }

            // todo
        })
        .method('has contains', function (key) {
            var index = this.indexOf(key);
            return this._hasInLine(key, index);
        })
        .method('_getInLine', function (key, index) {
            // get the Entry with this key in some line:
            // todo

            if(arguments.length < 2) {
                var index = this.indexOf(key);
            }

            // todo
        })
        .method('get', function (key) {
            var index = this.indexOf(key);
            return this._getInLine(key, index);
        })
        .method('_putInLine', function (key, value, index) {
            // put an Entry into some line:
            // todo

            if(arguments.length < 3) {
                var index = this.indexOf(key);
            }

            // todo
        })
        .method('put', function (key, value) {
            var index = this.indexOf(key);
            return this._putInLine(key, value, index);
        })
        .method('_removeInLine', function (key, index) {
            // find and remove the Entry with this key:
            // todo

            if(arguments.length < 2) {
                var index = this.indexOf(key);
            }

            // todo

            return true;
        })
        .method('remove', function (key) {
            var index = this.indexOf(key);
            return this._removeInLine(key, index);
        })
        .method('hasValue', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for (var i in this._table) {
                if(!this._table.hasOwnProperty(i)) continue;
                // todo
            }
            return false;
        })
        .method('getKey find', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for (var i in this._table) {
                if(!this._table.hasOwnProperty(i)) continue;
                // todo
            }
            return null;
        })
        .method('getKeys findAll', function (value, comparator) {
            // check arguments:
            // todo

            var keys = new Array();

            if(arguments.length == 0) {
                for (var i in this._table) {
                    if(!this._table.hasOwnProperty(i)) continue;
                    // todo
                }
            } else {
                if(!comparator) {
                    var comparator = function (v1, v2) { return v1 == v2 };
                }
                for (var i in this._table) {
                    if(!this._table.hasOwnProperty(i)) continue;
                    // todo
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

            // todo

            return this;
        })
        .method('toString', function () {
            var str = "{";
            if ((function(obj){
                    for (var i in obj) {
                        if(!obj.hasOwnProperty(i)) continue;
                        return true;
                    }
                    return false;
                })(this._table)) {
                str += "\n";
                for (var i in this._table) {
                    if(!this._table.hasOwnProperty(i)) continue;

                    // todo

                    str += ",\n";
                }
                str = str.substr(0, str.length - 2);
            }
            str += "\n}";
            return str;
        })
        .method('print', function () {
            console.log(this.toString());
        });
})(Iterator);