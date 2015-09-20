/**
 * Created by hengwu on 2015/9/14.
 */

var DListNode = (function () {
    /********************************
     * DListNode
     ********************************/
    return function (value, next, single) {
        // check arguments:
        // todo

        this.value = value;
        this.next = (next == null ? null : next);
        if(next != null) {
            next.prev = single ? null : this;
        }
        this.prev = null;
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

        this._head = {
            next: this._front
        };

        this._updateRearNode();

        this._rear = {
            prev: this._back
        };

        this._reversed = false;
    }
        .inherits(SuperLinkedList)
        .method('_getFrontNode', function () {
            if (this._front !== null) return this._front; // cached
            return this._updateFrontNode();
        })
        .method('_updateFrontNode', function () {
            if (this._front === null) {
                this._front = this._back;
                this._size = 1;
            }
            if (this._front === null) {
                this._size = 0;
                this._updateHead();
                return null;
            }
            while (this._front.prev !== null) {
                this._front = this._front.prev;
                this._size++;
            }
            this._updateHead();
            return this._front;
        })
        .method('_updateBackNode', function () {
            if (this._back === null) {
                this._back = this._front;
                this._size = 1;
            }
            if (this._back === null) {
                this._size = 0;
                this._updateRear();
                return null;
            }
            while (this._back.next !== null) {
                this._back = this._back.next;
                this._size++;
            }
            this._updateRear();
            return this._back;
        })
        .method('head', function () {
            return this._head;
        })
        .method('rear', function () {
            return this._rear;
        })
        .method('_updateHead', function () {
            this._head.next = this.front();
            return this._head;
        })
        .method('_updateRear', function () {
            this._rear.next = this.back();
            return this._rear;
        })
        .method('reverseList', function (list) {
            // check arguments:
            // todo

            DLinkedList.prototype.reverse.call(list);
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