/**
 * Created by hengwu on 2015/9/24.
 */

var Vector = (function () {
    "use strict";

    return function () {
        // check arguments:
        // todo

        this._data = [];
    }
        .method('front', function () {
            if(this.isEmpty()) return null;
            return this._data[0];
        })
        .method('back', function () {
            if(this.isEmpty()) return null;
            return this._data[this._data.length - 1];
        })
        .method('size', function () {
            return this._data.length;
        })
        .method('isEmpty', function () {
            return this.size() == 0;
        })
        .method('push', function (v) {
            this._data.push(v);
            return this;
        })
        .method('rpush', function (v) {
            this._data.unshift(v);
            return this;
        })
        .method('pop', function () {
            this._data.pop();
            return this;
        })
        .method('rpop', function () {
            this._data.shift();
            return this;
        })
        .method('each', function (callback) {
            for(var i = 0, len = this._data.length; i < len; i++) {
                callback(this._data[i]);
            }
            return this;
        })
        .method('subset', function () {})
        .method('add', function (vec, elementAdd) {
            if(this.size() != vec.size()) {
                throw new Error('Different sizes.');
                return this;
            }
            for(var i = 0, len = this.size(); i < len; i++) {
                this._data[i] = elementAdd ? elementAdd(this._data[i], vec[i]) : (this._data[i] + vec[i]);
            }
            return this;
        })
        .method('multiply', function () {})
        .method('power', function () {})
        .method('sqrt', function () {})
        .method('zeros', function () {})
        .method('ones', function () {})
        .method('format', function () {})
        .method('toString', function () {})
        .method('print', function () {})
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
        .method('zeros', function () {})
        .method('ones', function () {})
        .method('eye', function () {})
    /**
     * calculate the determinant
     */
        .method('det', function () {})
        .method('format', function () {})
        .method('toString', function () {})
        .method('print', function () {})
})();