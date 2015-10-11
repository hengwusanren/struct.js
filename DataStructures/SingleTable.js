/**
 * Created by hengwu on 2015/9/22.
 */

/********************************
 * SingleTable
 * Table[key] -> value
 * key must be String
 ********************************/
var SingleTable = (function (Iter) {

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
        .method('has contains', function (key) {
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
        .method('traverse', function (callback, immediateReturn) {
            for (var key in this._table) {
                if(!this._table.hasOwnProperty(key)) continue;
                var entry = {
                    key: key,
                    value: this._table[key]
                };
                if (callback(entry)) {
                    if(immediateReturn) return entry;
                }
            }
            return immediateReturn ? null : this;
        })
        .method('hasValue', function (value, matcher) {
            // check arguments:
            // todo

            if(!matcher) {
                if(value == null) return false;
                var matcher = function (e) { return e.value == value; };
            }
            var result = this.traverse(matcher, true);
            return !!result;
        })
    /**
     * return a matched entry
     */
        .method('find', function (value, matcher) {
            // check arguments:
            // todo

            if(!matcher) {
                if(value == null) return null;
                var matcher = function (e) { return e.value == value; };
            }
            return this.traverse(matcher, true);
        })
    /**
     * return all matched entries
     */
        .method('findAll', function (value, matcher) {
            // check arguments:
            // todo

            var results = new Array();

            if(arguments.length == 0) {
                var matcher = function (e) {
                    results.push(e);
                };
            } else {
                if(!matcher) {
                    if(value == null) return null;
                    var matcher = function (e) {
                        if(e.value == value) {
                            results.push(e);
                            return true;
                        }
                        return false;
                    };
                } else {
                    var naiveMatcher = matcher;
                    matcher = function (e) {
                        if(naiveMatcher(e)) {
                            results.push(e);
                            return true;
                        }
                        return false;
                    }
                }
            }
            this.traverse(matcher);
            return results;
        })
        .method('removeValue', function (value) {
            // check arguments:
            // todo

            var results = this.findAll(value);
            for (var i = 0, len = results.length; i < len; i++) {
                this.remove(results[i].key);
            }
            return this;
        })
        .method('removeAll', function (matcher) {
            var results = this.findAll(null, matcher);
            for (var i = 0, len = results.length; i < len; i++) {
                this.remove(results[i].key);
            }
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
                for (var key in this._table) {
                    if(!this._table.hasOwnProperty(key)) continue;
                    str += key + ": " + this._table[key].toString() + ",\n";
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