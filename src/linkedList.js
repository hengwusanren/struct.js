/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * ListNode
 */
var ListNode = function (val, next) {
    // check arguments:
    // todo

    this.val = val;
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
var LinkedList = function (listNode) {
    // check arguments:
    // todo

    var headNode = listNode;
    var rearNode = null;
    var curSize = 0;

    /**
     * update the rearNode
     * @returns {*}
     */
    var updateRearNode = function () {
        if (rearNode === null) {
            rearNode = headNode;
            curSize = 1;
        }
        if (rearNode === null) {
            curSize = 0;
            return null;
        }
        while (rearNode.next !== null) {
            rearNode = rearNode.next;
            curSize++;
        }
        return rearNode;
    };

    /**
     * get the rearNode
     * @returns {*}
     */
    var getRearNode = function () {
        if (rearNode !== null) return rearNode; // cached
        return updateRearNode();
    };

    updateRearNode();

    /**
     * reverse
     * @param head
     * @returns {*}
     */
    var reverseList = function (head) {
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
    };
    this.reverse = function () {
        rearNode = headNode;
        var head = headNode;
        headNode = reverseList(head);
        return this;
    };

    /**
     * median
     * @param head
     * @returns {*}
     */
    var medianOfList = function (head) {
        // check arguments:
        // todo

        if (head === null || head.next === null) return head;
        var p = head, q = head.next;
        while (q !== null && q.next !== null) {
            p = p.next;
            q = q.next.next;
        }
        return p;
    };
    this.median = function () {
        var head = headNode;
        return medianOfList(head);
    };

    /**
     * compare
     * @param p
     * @param q
     * @returns {boolean}
     */
    var compareLists = function (p, q) {
        // check arguments:
        // todo

        while (p !== null && q !== null) {
            if (p.val != q.val) {
                return false;
            }
            p = p.next;
            q = q.next;
        }
        return (p == null && q == null);
    };
    this.compare = function (listNode) {
        var head = headNode;
        return compareLists(head, listNode);
    };

    /**
     * add
     * @param listNode
     * @returns {*}
     */
    this.add = function (listNode) {
        // check arguments:
        // todo

        rearNode = getRearNode();

        if (rearNode === null) {
            headNode = listNode;
            rearNode = headNode;
        } else {
            rearNode.next = listNode;
        }

        updateRearNode();
        return this;
    };

    /**
     * concat
     * @param listNode
     * @returns {*}
     */
    this.concat = function (linkedList) {
        // check arguments:
        // todo

        rearNode = getRearNode();

        if (rearNode === null) {
            headNode = linkedList.front();
            rearNode = headNode;
        } else {
            rearNode.next = linkedList.front();
        }

        updateRearNode();
        return this;
    };

    /**
     * the front node
     * @returns {*}
     */
    this.front = function () {
        return headNode;
    };

    /**
     * the back node
     */
    this.back = function () {
        return getRearNode();
    };

    /**
     * size
     * @returns {number}
     */
    this.size = function () {
        return curSize;
    };

    this.toString = function () {
        var p = headNode;
        var str = headNode.val.toString();
        while (p.next !== null) {
            p = p.next;
            str += " -> " + p.val.toString();
        }
        rearNode = p;
        return str;
    };

    this.print = function () {
        console.log(this.toString());
    };
};


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

    var list = new LinkedList(n0);
    list.print();
    list.reverse()
        .print();
    list.print();
    list.reverse();
    list.print();
    list.add(new ListNode(6));
    list.print();

    var list2 = new LinkedList(m0);

    list.concat(list2);
    list.print();
    list2.print();
    console.log(list.front().val);
    console.log(list.back().val);
    console.log(list2.front().val);
    console.log(list2.back().val);
    console.log(list.median().val);

    console.log(list.size());
}
test();