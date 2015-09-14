/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * List
 */
function ListNode (val, next) {
    // check arguments:
    // todo

    this.val = val;
    this.next = next || null;

    // apply other methods:
    // todo

    this.toString = function() {
        var p = this;
        var str = this.val.toString();
        while(p.next !== null) {
            p = p.next;
            str += " -> " + p.val.toString();
        }
        return str;
    };

    this.print = function() {
        console.log(this.toString());
    };

    this.reverse = function() {
        return ListNode.reverse(this);
    };

    this.median = function() {
        return ListNode.median.apply(this);
    };

    this.compare = function(listNode) {
        // check arguments:
        // todo

        return ListNode.compare.apply(this, arguments);
    };
}

ListNode.reverse = function (head) {
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

ListNode.median = function (head) {
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

ListNode.compare = function (p, q) {
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


function test() {
    var n0 = new ListNode(0);
    var n1 = new ListNode(1);
    n0.next = n1;
    var n2 = new ListNode(2);
    n1.next = n2;
    var n3 = new ListNode(3);
    n2.next = n3;
    var n4 = new ListNode(4);
    n3.next = n4;
    var n5 = new ListNode(5);
    n4.next = n5;

    n0.print();
    n0.reverse()
        .print();
}
test();