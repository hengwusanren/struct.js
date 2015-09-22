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
        .method('push', function (value, clone) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            this._data.push(clone ? Object.clone(value) : value);
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
        .method('clear', function () {
            this._data.length = 0;
            this._size = 0;
        })
        .method('toString', function () {
            if (this._size == 0) return "";
            var str = this._data[0].toString();
            for (var i = 1; i < this._size; i++) {
                str += ", " + this._data[i].toString();
            }
            return str;
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