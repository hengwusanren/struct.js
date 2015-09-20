/**
 * Created by hengwu on 2015/9/14.
 */

var ListNode = (function () {
    /********************************
     * ListNode
     ********************************/
    return function (value, next) {
        // check arguments:
        // todo

        this.value = value;
        this.next = next || null;
    }
        .method('connect', function (listNode) {
            // check arguments:
            // todo

            this.next = listNode;
            return this.next;
        });
})();

var LinkedList = (function (SuperList) {
    if(!SuperList) return null;

    /********************************
     * LinkedList
     ********************************/
    return function (value, sizeLimit) {
        // check arguments:
        // todo

        SuperList.call(this, 0, sizeLimit);

        this._front = (value == null) ?
            null : new ListNode(value);

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
        .method('reverseList', function (head) {
            // check arguments:
            // todo

            if (head === null || head.next === null) return head;
            var p = head;
            var q = p.next;
            var t = null;
            while (true) {
                p.next = t;
                if (q === null) break;
                t = p;
                p = q;
                q = q.next;
            }
            return p;
        })
        .method('reverse', function () {
            this._back = this._front;
            var head = this._front;
            this._front = this.reverseList(head);
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
        .method('compare', function (list) {
            return this.compareLists([this, list], function (v1, v2) {
                return Object.compare(v1, v2);
            });
        })
        .method('push', function (value) {
            // check arguments:
            // todo

            if(this.isFull()) return this;

            var listNode = new ListNode(Object.clone(value));
            this._back = this._getBackNode();

            if (this._back === null) {
                this._front = listNode;
                this._back = this._front;
                this._size = 1;
                return this;
            }
            this._back.next = listNode;

            this._updateBackNode();
            return this;
        })
    /**
     * append a list
     */
        .method('pushList', function (list) {
            // check arguments:
            // todo

            if(this.isFull() || list.isEmpty()) return this;

            var listSize = list.size();

            var count = this._capacity <= 0 ? listSize : (this._capacity - this._size);
            if(count > listSize) count = listSize;

            var listIterator = list.front();

            while(count > 0 && listIterator !== null) {
                this.push(listIterator.value);
                listIterator = listIterator.next;
                count--;
            }

            return this;
        })
    /**
     * prepend a listNode
     */
        .method('insert', function (value) {
            return 'tobe overridden';
        })
    /**
     * prepend an array of listNode
     */
        .method('insertArray', function (arr) {
            return 'tobe overridden';
        })
    /**
     * prepend a list
     */
        .method('insertList', function (list) {
            return 'tobe overridden';
        })
        .method('toString', function () {
            var p = this._front;
            var str = this._front.value.toString();
            while (p.next !== null) {
                p = p.next;
                str += " -> " + p.value.toString();
            }
            this._back = p;
            return str;
        });
})(List);


(function () {
    //
})
();