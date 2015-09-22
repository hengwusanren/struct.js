/**
 * Created by v-kshe on 9/15/2015.
 */

/********************************
 * List
 ********************************/
var List = (function () {

    "use strict";

    return function (type, sizeLimit) {
        // check arguments:
        // todo

        if (sizeLimit == null) sizeLimit = 0;

        /**
         * type of list
         * 0: linked allocated
         * 1: sequential allocated
         * @type {number}
         * @private
         */
            //this._type = (type === 0 ? 0 : 1);
        Object.defineProperty(this, "_type", {
            value: (type === 0 ? 0 : 1),
            writable: false
        });

        /**
         * capacity of list
         * @type {number}
         * @private
         */
        this._capacity = (sizeLimit > 0 ? sizeLimit : 0); // 0: no limit

        /**
         * size of list
         * @type {number}
         * @private
         */
        this._size = 0;

        /**
         * front of list
         * @type {null}
         * @private
         */
        this._front = null;

        /**
         * back of list
         * @type {null}
         * @private
         */
        this._back = null;
    }
        .method('front', function () {
            return this._front;
        })
        .method('back', function () {
            return this._back;
        })
        .method('capacity', function () {
            return this._capacity;
        })
        .method('size', function () {
            return this._size;
        })
        .method('isEmpty', function () {
            if (this._size < 0) {
                this._size = 0;
            }
            return this._size === 0;
        })
        .method('isFull', function () {
            if (this._capacity <= 0) return false;
            if (this._size > this._capacity) {
                this._size = this._capacity;
            }
            return this._size == this._capacity;
        })
        .method('push', function (value, clone) {
            return 'tobe overridden';
        })
        .method('pushArray', function (arr, clone) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            var count = this._capacity <= 0 ? arr.length : (this._capacity - this._size);
            if (count > arr.length) count = arr.length;

            for (var i = 0; i < count; i++) {
                this.push(arr[i], clone);
            }
            return this;
        })
        .method('insert', function (value, clone) {
            return 'tobe overridden';
        })
        .method('insertArray', function (arr, clone) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            var count = this._capacity <= 0 ? arr.length : (this._capacity - this._size);
            if (count > arr.length) count = arr.length;

            for (var i = 0; i < count; i++) {
                this.insert(arr[i], clone);
            }
            return this;
        })
        .method('toString', function () {
            return 'tobe overridden';
        })
        .method('print', function () {
            console.log(this.toString());
        });
})();