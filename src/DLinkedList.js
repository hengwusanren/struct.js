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
            if(dListNode != null) dListNode.prev = this;
            return this.next;
        });
})();

/********************************
 * DLinkedList
 ********************************/
var DLinkedList = (function (SuperList, SuperLinkedList, Node) {
    if (!SuperList || !SuperLinkedList) return null;

    return function (value, sizeLimit) {
        // check arguments:
        // todo

        SuperList.call(this, 0, sizeLimit);

        this._nodeType = Node;

        this._front = (value == null) ?
            null : this.newNode(value);

        this._head = {};
        this._rear = {};

        this._updateBackNode();

        this._updateHeadRear();

        //this._reversed = false;
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
            this._head = {
                next: this._front
            };
            return this._head;
        })
        .method('_updateRear', function () {
            this._rear = {
                prev: this._back
            };
            return this._rear;
        })
        .method('_updateHeadRear', function () {
            this._head = {
                next: this._front
            };
            this._rear = {
                prev: this._back
            };
            if(this._front) this._front.prev = null;
            if(this._back) this._back.next = null;
            return this;
        })
        .method('reverseList', function (list) {
            // check arguments:
            // todo

            DLinkedList.prototype.reverse.call(list);
        })
        .method('reverse', function () {
            return LinkedList.prototype.reverse.call(this)._updateHeadRear();
        })
        .method('push', function (value, clone) {
            return LinkedList.prototype.push.call(this, value, clone)._updateHeadRear();
        })
        .method('pushList', function (list, clone) {
            return LinkedList.prototype.pushList.call(this, list, clone)._updateHeadRear();
        });
})(List, LinkedList, DListNode);