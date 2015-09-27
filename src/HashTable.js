/**
 * Created by hengwu on 2015/9/27.
 */

/********************************
 * HashTable
 ********************************/
var HashTable = (function (Iter) {

    "use strict";

    if (!Iter) return null;

    return function (size, loadFactor) {
        // check arguments:
        // todo

        this._table = {};
        this._size = 0;

        //this._valueComparator = function (v1, v2) { return v1 == v2 };

        this.implements(Iter, [
            function (key) {
                return this.get(key);
            },
            null,
            null,
            null,
            null
        ]);
    }
        .implements()
        .method('data', function () {
            return this._table;
        })
        .method('size', function () {
            return this._size;
        })
        .method('clear', function () {
            this._table = new Object();
            this._size = 0;
            return this;
        })
        .method('_hasInLine', function (realKey, hashKey) {
            // todo

            if(arguments.length < 2) {
                if(!realKey.hashCode) {
                    throw new Error('The type of key should implement hashCode method.');
                    return false;
                }
                var hashKey = realKey.hashCode();
            }

            // todo
        })
        .method('has contains', function (realKey) {
            // check arguments:
            // todo

            // todo
        })
        .method('_getInLine', function (realKey, hashKey) {
            // todo

            if(arguments.length < 2) {
                if(!realKey.hashCode) {
                    throw new Error('The type of key should implement hashCode method.');
                    return false;
                }
                var hashKey = realKey.hashCode();
            }

            // todo
        })
        .method('get', function (realKey) {
            // check arguments:
            // todo

            // todo
        })
        .method('_putInLine', function (realKey, value, hashKey) {
            // todo

            if(arguments.length < 3) {
                if(!realKey.hashCode) {
                    throw new Error('The type of key should implement hashCode method.');
                    return false;
                }
                var hashKey = realKey.hashCode();
            }

            // todo
        })
        .method('put', function (realKey, value) {
            // check arguments:
            // todo

            if (!this.has(realKey)) this._size++;

            // todo

            return this;
        })
        .method('_removeInLine', function (realKey, hashKey) {
            // todo

            if(arguments.length < 2) {
                if(!realKey.hashCode) {
                    throw new Error('The type of key should implement hashCode method.');
                    return false;
                }
                var hashKey = realKey.hashCode();
            }

            // todo

            return true;
        })
        .method('remove', function (realKey) {
            // check arguments:
            // todo

            if (this.has(realKey) && this._removeInLine(realKey)) {
                this._size--;
            }
            return this;
        })
        .method('hasValue', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for (var hashKey in this._table) {
                if(!this._table.hasOwnProperty(hashKey)) continue;
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
            for (var hashKey in this._table) {
                if(!this._table.hasOwnProperty(hashKey)) continue;
                // todo
            }
            return null;
        })
        .method('getKeys findAll', function (value, comparator) {
            // check arguments:
            // todo

            var keys = new Array();

            if(arguments.length == 0) {
                for (var hashKey in this._table) {
                    if(!this._table.hasOwnProperty(hashKey)) continue;
                    // todo
                }
            } else {
                if(!comparator) {
                    var comparator = function (v1, v2) { return v1 == v2 };
                }
                for (var hashKey in this._table) {
                    if(!this._table.hasOwnProperty(hashKey)) continue;
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
                    for (var k in obj) {
                        if(!obj.hasOwnProperty(k)) continue;
                        return true;
                    }
                    return false;
                })(this._table)) {
                str += "\n";
                for (var hashKey in this._table) {
                    if(!this._table.hasOwnProperty(hashKey)) continue;

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