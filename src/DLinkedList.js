/**
 * Created by hengwu on 2015/9/14.
 */

var DListNode = (function () {
    /********************************
     * DListNode
     ********************************/
    return function (value, next) {
        // check arguments:
        // todo

        this.value = value;
        this.next = (next == null ? null : next);
        if(next != null) {
            next.prev = this;
        }
    }
        .method('connect', function (dListNode) {
            // check arguments:
            // todo

            this.next = dListNode;
            dListNode.prev = this;
            return this.next;
        });
})();

/********************************
 * DLinkedList
 ********************************/
var DLinkedList = (function (SuperList, SuperLinkedList) {
    if (!SuperList || !SuperLinkedList) return null;

    return function (value, sizeLimit) {
        // check arguments:
        // todo

        SuperList.call(this, 0, sizeLimit);

        this._front = (value == null) ?
            null : new DListNode(value);

        this._head = new DListNode(0, this._front);

        this._updateRearNode();

        this._rear = new DListNode(0, this._back);
    }
        .inherits(SuperLinkedList)
        .method('_getFrontNode', function () {
            // todo
        })
        .method('_updateFrontNode', function () {
            // todo
        })
        .method('head', function () {
            return this._head;
        })
        .method('rear', function () {
            return this._rear;
        })
        .method('reverseList', function (head) {
            // check arguments:
            // todo

            // todo
        })
        .method('reverse', function () {
            // todo
        })
        .method('push', function () {
            // todo
        })
        .method('pushList', function () {
            // todo
        });
})(List, LinkedList);