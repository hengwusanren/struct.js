/**
 * Created by v-kshe on 9/15/2015.
 */

var List = (function () {
    /********************************
     * List
     ********************************/
    return function (type, sizeLimit) {
        // check arguments:
        // todo

        /**
         * type of list
         * 0: linked allocated
         * 1: sequential allocated
         * @type {number}
         * @private
         */
        this._type = (type === 0 ? 0 : 1);

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
            if(this._capacity == 0) return false;
            if (this._size > this._capacity) {
                this._size = this._capacity;
            }
            return this._size === this._capacity;
        })
        .method('toString', function () {
            return '';
        })
        .method('print', function () {
            console.log(this.toString());
        });
})();