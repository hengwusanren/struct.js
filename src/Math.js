/**
 * Created by hengwu on 2015/9/24.
 */

var Vector = (function () {
    "use strict";

    return function () {
        // check arguments:
        // todo

        this._date = [];
    }
        .method('front', function () {
            if(this.isEmpty()) return null;
            return this._date[0];
        })
        .method('back', function () {
            if(this.isEmpty()) return null;
            return this._date[this._date.length - 1];
        })
        .method('size', function () {
            return this._date.length;
        })
        .method('isEmpty', function () {
            return this.size() == 0;
        })
        .method('push', function (v) {
            this._date.push(v);
            return this;
        })
        .method('rpush', function (v) {
            this._date.unshift(v);
            return this;
        })
        .method('pop', function () {
            this._date.pop();
            return this;
        })
        .method('rpop', function () {
            this._date.shift();
            return this;
        })
        .method('each', function (callback) {
            for(var i = 0, len = this._date.length; i < len; i++) {
                callback(this._date[i]);
            }
            return this;
        })
        .method('subset', function () {})
        .method('add', function () {})
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

        this._date = [];
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
            return [this._date.length, this._date.length == 0 ? 0 : this._date[0].length];
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