/**
 * Created by hengwu on 2015/9/24.
 */

var Vector = (function () {
    "use strict";

    return function (arr) {
        // check arguments:
        // todo

        this._data = (arguments.length > 0 && Array.isArray(arr)) ? arr : [];
    }
        .method('front', function () {
            if(this.isEmpty()) return null;
            return this._data[0];
        })
        .method('back', function () {
            if(this.isEmpty()) return null;
            return this._data[this._data.length - 1];
        })
        .method('get', function (index) {
            return this._data[index];
        })
        .method('size', function () {
            return this._data.length;
        })
        .method('isEmpty', function () {
            return this.size() == 0;
        })
        .method('push', function (v) {
            if(!Array.isArray(v)) {
                this._data.push(v);
            } else {
                for(var i = 0, len = v.length; i < len; i++) this._data.push(v[i]);
            }
            return this;
        })
        .method('rpush', function (v) {
            if(!Array.isArray(v)) {
                this._data.unshift(v);
            } else {
                for(var i = v.length - 1; i >= 0; i--) this._data.unshift(v[i]);
            }
            return this;
        })
        .method('pop', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this._data.pop();
                n--;
            }
            return this;
        })
        .method('rpop', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this._data.shift();
                n--;
            }
            return this;
        })
        .method('each', function (callback) {
            for(var i = 0, len = this._data.length; i < len; i++) {
                callback(this._data[i]);
            }
            return this;
        })
        .method('subset', function (begin, length) {
            var arr = [];
            for(var i = begin; i < begin + length; i++) {
                arr.push(this._data[i]);
            }
            return new Vector(arr);
        })
        .method('add', function (vec, adder) {
            if(!(vec instanceof Vector)) {
                if(typeof vec !== 'number') {
                    throw new Error('The parameter should be a Number or Vector.');
                    return null;
                } else {
                    var arr = [];
                    for(var i = 0, len = this.size(); i < len; i++) {
                        arr.push(adder ? adder(this._data[i], vec) : (this._data[i] + vec));
                    }
                    return new Vector(arr);
                }
            }
            if(this.size() != vec.size()) {
                throw new Error('Different sizes.');
                return null;
            }
            var arr = [];
            for(var i = 0, len = this.size(); i < len; i++) {
                arr.push(adder ? adder(this._data[i], vec.get(i)) : (this._data[i] + vec.get(i)));
            }
            return new Vector(arr);
        })
        .method('multiply', function (vec, multiplier) {
            if(!(vec instanceof Vector)) {
                if(typeof vec !== 'number') {
                    throw new Error('The parameter should be a Number or Vector.');
                    return null;
                } else {
                    var arr = [];
                    for(var i = 0, len = this.size(); i < len; i++) {
                        arr.push(multiplier ? multiplier(this._data[i], vec) : (this._data[i] * vec));
                    }
                    return new Vector(arr);
                }
            }
            if(this.size() != vec.size()) {
                throw new Error('Different sizes.');
                return null;
            }
            var sum = 0;
            for(var i = 0, len = this.size(); i < len; i++) {
                sum += (multiplier ? multiplier(this._data[i], vec.get(i)) : (this._data[i] * vec.get(i)));
            }
            return sum;
        })
        .method('init', function (val, size) {
            if(arguments.length == 0) {
                throw new Error('A size is needed.');
                return null;
            }
            var arr = [];
            while(size > 0) {
                arr.push(0);
                size--;
            }
            return new Vector(arr);
        })
        .method('zeros', function (size) {
            return Vector.prototype.init(0, size);
        })
        .method('ones', function (size) {
            return Vector.prototype.init(1, size);
        })
        .method('format', function () {})
        .method('toString', function () {
            return '(' + this._data.toString() + ')';
        })
        .method('print', function () {
            console.log(this.toString());
        })
})();

var Matrix = (function () {
    "use strict";

    return function () {
        // check arguments:
        // todo

        this._data = [];
    }
        .method('frontRow', function () {
            // todo
        })
        .method('backRow', function () {
            // todo
        })
        .method('frontCol', function () {
            // todo
        })
        .method('backCol', function () {
            // todo
        })
        .method('size', function () {
            return [this._data.length, this._data.length == 0 ? 0 : this._data[0].length];
        })
        .method('isEmpty', function () {
            // todo
        })
        .method('push', function (v) {
            // todo
        })
        .method('rpush', function (v) {
            // todo
        })
        .method('pop', function () {
            // todo
        })
        .method('rpop', function () {
            // todo
        })
        .method('each', function (callback) {
            // todo
        })
        .method('subset', function () {})
        .method('add', function () {})
        .method('multiply', function () {})
        .method('power', function () {})
        .method('sqrt', function () {})
        .method('init', function (val, size) {})
        .method('zeros', function (size) {})
        .method('ones', function (size) {})
        .method('eye', function (size) {})
    /**
     * calculate the determinant
     */
        .method('det', function () {})
        .method('format', function () {})
        .method('toString', function () {})
        .method('print', function () {})
})();