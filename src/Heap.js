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

        /**
         * type of heap
         * 0: min heap
         * 1: max heap
         */
        Object.defineProperty(this, "_type", {
            value: (type ? 1 : 0),
            writable: false
        });
    }
        .method('parent', function (n) {
            return (n <= 0 ? -1 : (n - 1) / 2);
        })
        .method('lchild', function (n) {
            if(n < 0) return 0;
            return 2 * n + 1;
        })
        .method('rchild', function (n) {
            if(n < 0) return 0;
            return 2 * n + 2;
        });
})();