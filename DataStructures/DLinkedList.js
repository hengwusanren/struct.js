/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * DListNode
 ********************************/
var DListNode = (function () {

    "use strict";

    return function (value, next, single) {
        // check arguments:
        // todo

        if (arguments.length == 0) throw new Error('Constructor requires value.');

        this.value = value;
        this.prev = null;
        this.next = null;
        this.connect(next, single);
    }
        .method('connect', function (dListNode, single) {
            // check arguments:
            // todo

            if (this.next) {
                this.next.prev = null;
            }

            this.next = dListNode ? dListNode : null;
            if (dListNode) dListNode.prev = single ? null : this;
            return this.next;
        });
})();

/********************************
 * Doubly LinkedList
 ********************************/
var DLinkedList = (function (SuperList, SuperLinkedList, Node, Iter) {

    "use strict";

    if (!SuperList || !SuperLinkedList) return null;

    return function (value, sizeLimit) {
        // check arguments:
        // todo

        SuperList.call(this, 0, sizeLimit);

        this._front = (value == null) ?
            null : this.newNode(value);

        this._head = {};
        this._rear = {};

        this._updateBackNode();

        this._updateHeadRear();

        //this._reversed = false;

        this.implements(Iter, [
            function (node) {
                // what if node does not exist?
                // todo

                return node;
            },
            function (node) {
                return node.next;
            },
            function (node) {
                return node.prev;
            },
            function () {
                return this.front();
            },
            function () {
                return this.back();
            }
        ]);
    }
        .inherits(SuperLinkedList)
        .property('_nodeType', Node)
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
            if (this._front) this._front.prev = null;
            if (this._back) this._back.next = null;
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
        .method('push', function (value, clone, asArray) {
            return LinkedList.prototype.push.call(this, value, clone, asArray)._updateHeadRear();
        })
        .method('pushList', function (list, clone) {
            return LinkedList.prototype.pushList.call(this, list, clone)._updateHeadRear();
        })
        .method('rpush', function (value, clone, asArray) {
            return LinkedList.prototype.rpush.call(this, value, clone, asArray)._updateHeadRear();
        })
        .method('rpushList', function (list, clone) {
            return LinkedList.prototype.rpushList.call(this, list, clone)._updateHeadRear();
        })
        .method('pop', function () {
            if(this.isEmpty()) return this;
            if(this.size() == 1) {
                this._front = this._back = null;
                this._size = 0;
            } else {
                var lastSecondNode = this.back().prev;
                this._back.prev = null;
                this._back = lastSecondNode;
                this._back.next = null;
                this._size--;
            }
            return this._updateHeadRear();
        })
        .method('rpop', function () {
            if(this.isEmpty()) return this;
            if(this.size() == 1) {
                this._front = this._back = null;
                this._size = 0;
            } else {
                var secondNode = this.front().next;
                this._front.next = null;
                this._front = secondNode;
                this._front.prev = null;
                this._size--;
            }
            return this._updateHeadRear();
        })
        .method('rfind', function (value, comparator) {
            // check arguments:
            // todo

            // todo

            return this;
        })
        .method('rtoString', function () {
            var p = this._back;
            if(!p) return "empty list";
            var str = this._back.value.toString();
            while (p.prev !== null) {
                p = p.prev;
                str += " <- " + p.value.toString();
            }
            //this._front = p;
            return str;
        })
        .method('rprint', function () {
            console.log(this.rtoString());
        });
})(List, LinkedList, DListNode, Iterator);


(function () { // test

    return; // not execute tests
})
();