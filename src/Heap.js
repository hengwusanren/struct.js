/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * Heap
 ********************************/
var Heap = (function () {

    "use strict";


    return function (arr, type) {
        // check arguments:
        // todo

        if (arguments.length == 0) throw new Error('Constructor requires value.');

        if(!Array.isArray(arr)) throw new Error('The 1st parameter should be an Array.');

        this._data = arr;

        Object.defineProperty(this, "_type", {
            value: (type ? 1 : 0),
            writable: false
        });
    };
})();