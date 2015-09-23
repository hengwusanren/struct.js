/**
 * Created by v-kshe on 9/15/2015.
 */

/********************************
 * ArrayList
 ********************************/
var ArrayList = (function (SuperList) {

    "use strict";

    if (!SuperList) return null;

    return function (sizeLimit, arr, clone) {
        // check arguments:
        // todo

        SuperList.call(this, 1, sizeLimit);

        if (!arr) arr = [];
        this._data = clone ? Object.clone(arr) : arr;

        this._size = this._data.length;
        if (this._capacity > 0) {
            // shrink:
            while (this._size > this._capacity) {
                this._data.pop();
                this._size--;
            }
        }

        // notice: _front and _back are useless to ArrayList
    }
        .inherits(SuperList)
        .method('resizeTo', function (sizeLimit) {
            // check arguments:
            // todo

            if (sizeLimit < 1 || this._capacity == sizeLimit) return this;
            if (this._capacity < sizeLimit) {
                this._capacity = sizeLimit;
                return this;
            }
            this._capacity = sizeLimit;

            while (this._size > sizeLimit) {
                this._data.pop();
                this._size--;
            }
            return this;
        })
        .method('front', function () {
            return this._size > 0 ? this._data[0] : null;
        })
        .method('back', function () {
            return this._size > 0 ? this._data[this._data.length - 1] : null;
        })
        .method('get', function (index) {
            // check arguments:
            // todo

            return this._data[index];
        })
        .method('set', function (index, value) {
            // check arguments:
            // todo

            this._data[index] = value;
            return this;
        })
        .method('push', function (value, clone, asArray) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            if(asArray) {
                if(!Array.isArray(value)) return this;

                var arrLen = value.length;

                // cannot push the array for no space:
                if (this._capacity > 0 && this._capacity < (this._size + arrLen)) return this;

                if(clone) {
                    for(var i = 0; i < arrLen; i++) {
                        this.push(value[i], true);
                    }
                } else {
                    this._data = this._data.concat(value);
                    this._size += arrLen;
                }
                return this;
            }

            this._data.push(clone ? Object.clone(value) : value);
            this._size++;

            return this;
        })
        .method('rpush', function (value, clone, asArray) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            if(asArray) {
                if(!Array.isArray(value)) return this;

                var arrLen = value.length;

                // cannot push the array for no space:
                if (this._capacity > 0 && this._capacity < (this._size + arrLen)) return this;

                if(clone) {
                    for(var i = arrLen - 1; i >= 0; i--) {
                        this.rpush(value[i], true);
                    }
                } else {
                    this._data = value.concat(this._data);
                    this._size += arrLen;
                }
                return this;
            }

            this._data.unshift(clone ? Object.clone(value) : value);
            this._size++;

            return this;
        })
        .method('pop', function () {
            if (!this.isEmpty()) {
                this._data.pop();
                this._size--;
            }
            return this;
        })
        .method('rpop', function () {
            if (!this.isEmpty()) {
                this._size--;
            }
            this._data.shift();
            return this;
        })
        .method('indexOf find', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for(var i = 0, len = this._data.length; i < len; i++) {
                if(comparator(this._data[i], value)) {
                    return i;
                }
            }
            return -1;
        })
        .method('each', function (callback) {
            // check arguments:
            // todo

            for(var i = 0, len = this._data.length; i < len; i++) {
                callback(this._data[i]);
            }
            return this;
        })
        .method('findAll', function (value, comparator) {
            // check arguments:
            // todo

            // todo

            return this;
        })
        .method('findAllValues', function (value, comparator) {
            // check arguments:
            // todo

            // todo

            return this;
        })
        .method('rindexOf rfind', function (value, comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 == v2 };
            }
            for(var i = this._data.length - 1; i >= 0; i--) {
                if(comparator(this._data[i], value)) {
                    return i;
                }
            }
            return -1;
        })
        .method('clear', function () {
            this._data.length = 0;
            this._size = 0;
            return this;
        })
        .method('toString', function () {
            if (this._size == 0) return "";
            var str = this._data[0].toString();
            for (var i = 1; i < this._size; i++) {
                str += ", " + this._data[i].toString();
            }
            return str;
        })
        .method('sort', function (comparator) {
            // check arguments:
            // todo

            if(!comparator) {
                var comparator = function (v1, v2) { return v1 - v2 };
            }
            this._data.sort(comparator);
            return this;
        });
})(List);


(function () { // test

    return; // not execute tests

    var n = 5;

    var alist1 = new ArrayList(n);
    var alist2 = new ArrayList(n, [0, 1, 2]);

    alist1.print();
    alist2.print();
})
();