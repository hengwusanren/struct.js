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