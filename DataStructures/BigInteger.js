/**
 * Created by hengwu on 2015/10/22.
 */

var BigInteger = (function (Compor) {

    "use strict";

    if (!Compor) return null;

    return function (value, asArray, negative) {
        this.positive = asArray ? !negative : (value >= 0);
        //this._initialCapacity = 32;
        //this._capacity = this._initialCapacity;
        this.radix = 16; // an element in this.data ranges from 0 to (2^16 - 1).
        this.data = new Array();
        if(asArray) this.data = value;
        else this.load(value);

        this._shrink();

        this.implements(Compor, [this.compare]);
    }
        .implements()
        .method('compare', function (v1, v2) {
            if(v1.positive) {
                if(!v2.positive || v1.data.length > v2.data.length) return true;
                if(v1.data.length < v2.data.length) return false;
                for(var i = v1.data.length - 1; i >= 0; i--) {
                    if(v1.data[i] != v2.data[i]) return v1.data[i] > v2.data[i];
                }
                return false;
            } else {
                if(v2.positive || v1.data.length > v2.data.length) return false;
                if(v1.data.length < v2.data.length) return true;
                for(var i = v1.data.length - 1; i >= 0; i--) {
                    if(v1.data[i] != v2.data[i]) return v1.data[i] < v2.data[i];
                }
                return false;
            }
        })
        .method('load', function (value) {
            var r = this.radix;
            this.positive = value >= 0;
            if(value < 0) value = -value;
            while(value > 0) {
                this.data.push(value ^ ((value >> r) << r));
                value >> r;
            }
        })
        .method('isZero', function () {
            // todo
        })
        .method('_shrink', function () {
            while(this.data.length > 0 && this.data[this.data.length - 1] == 0) this.data.pop();
            if(this.data.length == 0) this.positive = true;
        })
        .method('reverse', function () {
            if(this.data.length > 0) this.positive = !this.positive;
            else this.positive = true;
            return this;
        })
        .method('add', function (v) {
            var positive = (this.positive && v.positive) || (!this.positive && !v.positive);
            if(!positive) return this.subtract(v.reverse());
            var len1 = this.data.length,
                len2 = v.data.length,
                bonus = 0,
                arr = [],
                r = this.radix;
            for(var i = 0; i < len1 || i < len2; i++) {
                var tmp = (this.data[i] ? this.data[i] : 0) + (v.data[i] ? v.data[i] : 0) + bonus;
                arr.push(tmp ^ ((tmp >> r) << r));
                bonus = (tmp >> r);
            }
            if(bonus > 0) arr.push(bonus);
            return new BigInteger(arr, true, !this.positive);
        })
        .method('subtract', function (v) {
            var positive = (this.positive && !v.positive) || (!this.positive && v.positive);
            if(positive) return this.add(v.reverse());
            var abs1 = this.abs(),
                abs2 = v.abs();
            var v1 = abs1, v2 = abs2;
            if(this.compare(abs2, abs1)) {
                v1 = abs2;
                v2 = abs1;
            }
            var len1 = v1.data.length,
                len2 = v2.data.length,
                bonus = 0,
                arr = [],
                r = this.radix;
            for(var i = 0; i < len1 || i < len2; i++) {
                var tmp = (v1.data[i] ? v1.data[i] : 0) - (v2.data[i] ? v2.data[i] : 0) - bonus;
                bonus = 0;
                while(tmp < 0) {
                    bonus++;
                    tmp += r;
                }
                arr.push(tmp % r);
            }
            return new BigInteger(arr, true, !!(this.positive ^ (v1 === abs1))); // to be tested!
        })
        .method('abs', function () {
            return new BigInteger(this.data, true);
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
})(Comparator);