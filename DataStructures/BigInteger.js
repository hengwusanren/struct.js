/**
 * Created by hengwu on 2015/10/22.
 */

var BigInteger = (function () {

    "use strict";

    return function (value) {
        this.positive = value >= 0;
        //this._initialCapacity = 32;
        //this._capacity = this._initialCapacity;
        this.radix = 16;
        this.data = new Array();
    }
        .method('load', function (value) {
            if(value < 0) {
                this.positive = false;
                value = -value;
            }
            while(value > 0) {
                this.data.push(value ^ ((value >> 16) << 16));
                value >> 16;
            }
        })
        .method('isZero', function () {
            // todo
        })
        .method('add', function (v) {
            // todo
        })
        .method('subtract', function (v) {
            // todo
        })
        .method('multiply', function (v) {
            // todo
        })
        .method('divide', function (v) {
            // todo
        })
        .method('power', function (n) {
            // todo
        })
        .method('sqrt', function (n) {
            // todo
        })
        .method('equals', function (v) {
            // todo
        })
        .method('comparator', function (v1, v2) {
            // todo
        })
        .method('toString', function (radix) {
            // todo
        })
        .method('print', function () {
            console.log(this.toString());
        });
})();