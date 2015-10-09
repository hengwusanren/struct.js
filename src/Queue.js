/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * Queue
 ********************************/
var Queue = (function (SuperDLinkedList) {

    "use strict";

    if (!SuperDLinkedList) return null;

    return function (value, sizeLimit) {
        // check arguments:
        // todo

        SuperDLinkedList.apply(this, arguments);
    }
        .inherits(SuperDLinkedList)
        .method('top', function () {
            return SuperDLinkedList.prototype.front.call(this).value;
        })
        .method('pop', function () {
            return SuperDLinkedList.prototype.rpop.call(this);
        })
        .method('rpop', function () {
            return SuperDLinkedList.prototype.pop.call(this);
        })
        .method('popUntil', function (value, comparator) {
            // check arguments:
            // todo

            // todo

            return this;
        })
        .method('rpopUntil', function (value, comparator) {
            // check arguments:
            // todo

            // todo

            return this;
        });
})(DLinkedList);