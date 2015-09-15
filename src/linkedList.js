/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * ListNode
 * @param value
 * @param next
 * @constructor
 */
var ListNode = function (value, next) {
    // check arguments:
    // todo

    this.value = value;
    this.next = next || null;

    /**
     * connect
     * @param listNode
     * @returns {*|null}
     */
    this.connect = function (listNode) {
        // check arguments:
        // todo

        this.next = listNode;
        return this.next;
    };
};

/**
 * LinkedList
 * @param listNode
 * @constructor
 */
var LinkedList = function (listNode, sizeLimit) {
    // check arguments:
    // todo

    List.call(this, 0, sizeLimit);

    this._front = listNode;

    this._updateRearNode();
};
LinkedList
    .inherits(List)
    .method('_getHeadNode', function () {
        return this._front;
    })
    .method('_updateRearNode', function () {
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
    .method('_getRearNode', function () {
        if (this._back !== null) return this._back; // cached
        return this._updateRearNode();
    })
    .method('front', function () {
        return this._getHeadNode();
    })
    .method('back', function () {
        return this._getRearNode();
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

        if (head === null || head.next === null) return head;
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
    .method('compareLists', function (listArr) {
        // check arguments:
        // todo

        if(listArr.length <= 1) return true;
        var p, q;
        for(var i = 1, len = listArr.length; i < len; i++) {
            p = listArr[0].front();
            q = listArr[i].front();
            while (p !== null && q !== null) {
                if (p.value != q.value) {
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
        return compareLists([this, list]);
    })
    .method('add', function (listNode) {
        // check arguments:
        // todo

        this._back = this._getRearNode();

        if (this._back === null) {
            this._front = listNode;
            this._back = this._front;
        } else {
            this._back.next = listNode;
        }

        this._updateRearNode();
        return this;
    })
    .method('concat', function (list) {
        // check arguments:
        // todo

        this._back = this._getRearNode();

        if (this._back === null) {
            this._front = list.front();
            this._back = this._front;
        } else {
            this._back.next = list.front();
        }

        this._updateRearNode();
        return this;
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


function test() {
    var n0 = new ListNode(0);
    var n1 = new ListNode(1);
    var n2 = new ListNode(2);
    var n3 = new ListNode(3);
    var n4 = new ListNode(4);
    var n5 = new ListNode(5);

    var m0 = new ListNode('a');
    var m1 = new ListNode('b');
    var m2 = new ListNode('c');
    var m3 = new ListNode('d');
    var m4 = new ListNode('e');
    var m5 = new ListNode('f');

    n0.connect(n1).connect(n2).connect(n3).connect(n4).connect(n5);
    m0.connect(m1).connect(m2).connect(m3).connect(m4).connect(m5);

    var llist1 = new LinkedList(n0);
    llist1.print();
    llist1.reverse()
        .print();
    llist1.print();
    llist1.reverse();
    llist1.print();
    llist1.add(new ListNode(6));
    llist1.print();

    var llist2 = new LinkedList(m0);

    llist1.concat(llist2);
    llist1.print();
    llist2.print();
    console.log(llist1.front().value);
    console.log(llist1.back().value);
    console.log(llist2.front().value);
    console.log(llist2.back().value);
    console.log(llist1.median().value);

    console.log(llist1.size());
}
test();