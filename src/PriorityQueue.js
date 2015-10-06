/**
 * Created by hengwu on 2015/9/24.
 */

/********************************
 * PriorityQueue
 * based on Heap
 ********************************/
var PriorityQueue = (function (SuperHeap) {

    "use strict";

    if (!SuperHeap) return null;

    return function (arr, type, priorityComparator, priorityOf) {
        // check arguments:
        // todo

        SuperHeap.call(this, arr, type, priorityComparator);
        this.priorityOf = priorityOf ? priorityOf : (function (v) {return v;});
    }
        .inherits(SuperHeap)
        .method('setPriorityOf', function (priorityOf) {
            this.priorityOf = priorityOf;
            this.comparator = this._type == 1 ? (function (v1, v2) {
                return this.priorityOf(v1) > this.priorityOf(v2);
            }) : (function (v1, v2) {
                return this.priorityOf(v1) < this.priorityOf(v2);
            });
            return this;
        })
        .method('topPriority', function () {
            return this.priorityOf(this.top());
        });
})(Heap);