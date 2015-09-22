/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * ListNode
 ********************************/
var ListNode = (function () {

    "use strict";

    return function (value, next) {
        // check arguments:
        // todo

        if (arguments.length == 0) throw new Error('Constructor requires value.');

        this.value = value;
        this.next = null;
        this.connect(next);
    }
        .method('connect', function (listNode) {
            // check arguments:
            // todo

            this.next = listNode ? listNode : null;
            return this.next;
        });
})();

/********************************
 * LinkedList
 ********************************/
var LinkedList = (function (SuperList, Node) {

    "use strict";

    if (!SuperList) return null;

    return function (value, sizeLimit) {
        // check arguments:
        // todo

        SuperList.call(this, 0, sizeLimit);

        this._nodeType = Node;

        this._front = (value == null) ?
            null : this.newNode(value);

        this._updateBackNode();
    }
        .inherits(SuperList)
        .method('_getFrontNode', function () {
            return this._front;
        })
        .method('_updateBackNode', function () {
            if (this._back === null) {
                this._back = this._front;
                this._size = 1;
            }
            if (this._back === null) {
                this._size = 0;
                return null;
            }
            while (this._back.next !== null) {
                this._back = this._back.next;
                this._size++;
            }
            return this._back;
        })
        .method('_getBackNode', function () {
            if (this._back !== null) return this._back; // cached
            return this._updateBackNode();
        })
        .method('front', function () {
            return this._getFrontNode();
        })
        .method('back', function () {
            return this._getBackNode();
        })
        .method('reverseList', function (list) {
            // check arguments:
            // todo

            LinkedList.prototype.reverse.call(list);
        })
        .method('reverse', function () {
            this._back = this._front;
            var head = this._front;
            if (!(head == null || head.next == null)) {
                var p = head;
                var q = p.next;
                var t = null;
                while (true) {
                    p.connect(t);//p.next = t;
                    if (q === null) break;
                    t = p;
                    p = q;
                    q = q.next;
                }
                this._front = p;
            }
            return this;
        })
        .method('medianOfList', function (head) {
            // check arguments:
            // todo

            if (head == null || head.next == null) return head;
            var p = head, q = head.next;
            while (q !== null && q.next !== null) {
                p = p.next;
                q = q.next.next;
            }
            return p;
        })
        .method('median', function () {
            var head = this._front;
            return this.medianOfList(head);
        })
        .method('compareLists', function (listArr, comparator) {
            // check arguments:
            // todo

            if (listArr.length <= 1) return true;
            var p, q;
            for (var i = 1, len = listArr.length; i < len; i++) {
                p = listArr[0].front();
                q = listArr[i].front();
                while (p !== null && q !== null) {
                    if (comparator(p.value, q.value)) {
                        return false;
                    }
                    p = p.next;
                    q = q.next;
                }
                if (!(p == null && q == null)) return false;
            }
            return true;
        })
        .method('compare', function (list, comparator) {
            // check arguments:
            // todo

            if (!comparator) {
                comparator = function (v1, v2) {
                    return v1 == v2;
                };
            }
            return this.compareLists([this, list], comparator);
        })
        .method('push', function (value, clone) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            var listNode = this.newNode(clone ? Object.clone(value) : value);
            this._back = this._getBackNode();

            if (this._back === null) {
                this._front = listNode;
                this._back = this._front;
                this._size = 1;
                return this;
            }
            this._back.connect(listNode);//this._back.next = listNode;

            this._updateBackNode();
            return this;
        })
    /**
     * append a list
     */
        .method('pushList', function (list, clone) {
            // check arguments:
            // todo

            if (this.isFull() || list.isEmpty()) return this;

            var listSize = list.size();

            // cannot push the list for no space:
            if (this._capacity > 0 && this._capacity < (this._size + listSize)) return this;

            var listIterator = list.front();

            if (!clone) {
                if (this._back == null) {
                    this._front = listIterator;
                } else {
                    this._back.connect(listIterator);//this._back.next = listIterator;
                }
                this._back = list.back();
                this._size += listSize;
            } else {
                var count = this._capacity <= 0 ? listSize : (this._capacity - this._size);
                if (count > listSize) count = listSize;

                while (count > 0 && listIterator !== null) {
                    this.push(listIterator.value, true);
                    listIterator = listIterator.next;
                    count--;
                }
            }

            return this;
        })
        .method('newNode', function () {
            return Construct(this._nodeType, true, arguments);
        })
    /**
     * prepend a listNode
     */
        .method('rpush', function (value, clone) {
            // check arguments:
            // todo

            if (this.isFull()) return this;

            var listNode = this.newNode(clone ? Object.clone(value) : value);
            this._front = this._getFrontNode();

            if (this._front === null) {
                this._size = 0;
                this._front = listNode;
                this._back = this._front;
            } else {
                listNode.connect(this._front);//listNode.next = this._front;
                this._front = listNode;
            }
            this._size++;
            return this;
        })
    /**
     * prepend a list
     */
        .method('rpushList', function (list, clone) {
            // check arguments:
            // todo

            if (this.isFull() || list.isEmpty()) return this;

            var listSize = list.size();

            // cannot rpush the list for no space:
            if (this._capacity > 0 && this._capacity < (this._size + listSize)) return this;

            var listIterator = list.back();

            if (!clone) {
                if (this._front == null) {
                    this._back = listIterator;
                } else {
                    listIterator.connect(this._front);//listIterator.next = this._front;
                }
                this._front = list.front();
                this._size += listSize;
            } else {
                list.reverse();
                var count = this._capacity <= 0 ? listSize : (this._capacity - this._size);
                if (count > listSize) count = listSize;

                while (count > 0 && listIterator !== null) {
                    this.rpush(listIterator.value, true);
                    listIterator = listIterator.next;
                    count--;
                }
                list.reverse();
            }

            return this;
        })
        .method('toString', function () {
            var p = this._front;
            if(!p) return "empty list";
            var str = this._front.value.toString();
            while (p.next !== null) {
                p = p.next;
                str += " -> " + p.value.toString();
            }
            //this._back = p;
            return str;
        });
})(List, ListNode);


(function () { // test

    return; // not execute tests
})
();