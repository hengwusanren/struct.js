/**
 * Created by hengwu on 2015/9/22.
 */

/********************************
 * Graph
 ********************************/
var Graph = (function () {

    "use strict";

    return function (size, loadFactor) {
        // check arguments:
        // todo

        this._table = new Object();
        this._size = 0;
    }
        .method('has', function (key) {
            // check arguments:
            // todo

            return key in this._table;
        })
        .method('get', function (key) {
            // check arguments:
            // todo

            return this.has(key) ? entry[key] : null;
        })
        .method('put', function (key, value) {
            // check arguments:
            // todo

            if(!this.has(key)) this._size++;
            this._table[key] = value;
        });
})();