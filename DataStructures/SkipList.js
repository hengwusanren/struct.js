/**
 * Created by hengwu on 2015/10/19.
 */

/********************************
 * SkipListNode
 ********************************/
var SkipListNode = (function () {
    "use strict";
    return function (key, value) {
        this.key = key;
        this.value = value;

        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;

        this._pos = 0;
    }
        .property('negInf', '-∞')
        .property('posInf', '+∞')
        .method('val', function (v) {
            if(arguments.length > 0) this.value = v;
            return this.value;
        })
        .method('getKey', function () {
            return this.key;
        })
        .method('equals', function (node) {
            return (typeof node) === (typeof this)
                && node.getKey() === this.key
                && node.val() === this.value;
        })
        .method('toString', function () {
            return '(' + this.key + ', ' + this.value + ')';
        });
})();

/********************************
 * SkipList
 * Refer to: http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/Map/skip-list-impl.html
 ********************************/
var SkipList = (function (Node) { // tobe tested

    "use strict";

    if (!Node) return null;

    /**
     * maxLevel: max level of skipList
     * p: probability of a node remaining in the next upside level
     */
    return function (maxLevel, p) {
        // check arguments:
        // todo
        this.maxLevel = maxLevel;
        this.level = 0;
        this._size = 0;
        //this.prob = p;
        this.head = this.newNode(this.negInf, null);
        this.rear = this.newNode(this.posInf, null);
        this.head.right = this.rear;
        this.rear.left = this.head;
    }
        .property('_nodeType', Node)
        .property('negInf', this._nodeType.negInf)
        .property('posInf', this._nodeType.posInf)
        .method('newNode', function () {
            var node = Construct(this._nodeType, true, arguments);
            return node;
        })
        .method('keyComparator', function (k1, k2) {
            var s1 = k1.toString(),
                s2 = k2.toString();
            if(s1 == s2) return 0;
            return s1 > s2 ? 1 : -1;
        })
        .method('size', function () {
            return this._size;
        })
        .method('isEmpty', function () {
            return this._size == 0;
        })
        .method('init', function (elem) {
            // todo
        })
        .method('find', function (key) {
            var p = this.head;
            while(true) {
                while(p.right.key != this.posInf
                    && this.keyComparator(p.right.key, key) <= 0) {
                    p = p.right;
                }
                if(p.down != null) {
                    p = p.down;
                } else break;
            }
            return p;
        })
        .method('get', function (key) {
            var p = this.find(key);
            return (key == p.getKey()) ? p.value : null;
        })
        .method('put insert', function (key, value) {
            var p = this.find(key);
            if(key == p.getKey()) {
                var oldVal = p.value;
                p.value = value;
                return oldVal;
            }

            var q = this.newNode(key, value);
            q.left = p;
            q.right = p.right;
            p.right.left = q;
            p.right = q;

            var i = 0; // current level

            while(Math.random() < 0.5) {
                if(i >= this.level) { // create a new level
                    this.level++;
                    var p1 = this.newNode(this.negInf, null),
                        p2 = this.newNode(this.posInf, null);

                    p1.right = p2;
                    p1.down = this.head;

                    p2.left = p1;
                    p2.down = this.rear;

                    this.head.up = p1;
                    this.rear.up = p2;

                    this.head = p1;
                    this.rear = p2;
                }

                while(p.up == null) {
                    p = p.left;
                }
                p = p.up;

                var e = this.newNode(key, null);
                e.left = p;
                e.right = p.right;
                e.down = q;

                p.right.left = e;
                p.right = e;
                q.up = e;

                q = e;
                i++;
            }

            this._size++;

            return null;
        })
        .method('remove', function (key) { // tobe tested
            var p = this.find(key);
            if(key != p.getKey()) return null;

            while(p != null) {
                p.left.right = p.right;
                p.right.left = p.left;
                p = p.up;
            }
        })
        .method('_getOneRow', function (node) {
            var s = '';
            var a, b, i;
            a = 0;
            s = node.key.toString();
            node = node.right;

            while(node != null) {
                var q = node;
                while(q.down != null) q = q.down;
                b = q.pos;

                s += ' <-';

                for(i = a + 1; i < b; i++) {
                    s += '--------';
                }
                s += ('> ' + node.key);

                a = b;

                node = node.right;
            }

            return s;
        })
        .method('print hPrint', function () {
            var i,
                p = this.head;

            while(p.down != null) {
                p = p.down;
            }

            i = 0;
            while(p != null) {
                p.pos = i++;
                p = p.right;
            }

            p = this.head;
            while(p != null) {
                console.log(this._getOneRow(p));
                p = p.down;
            }
        })
        .method('_getOneCol', function (node) {
            var s = '';
            while(node != null) {
                s += (' ' + node.key.toString());
                node = node.up;
            }
            return s;
        })
        .method('vPrint', function () {
            var p = this.head;
            while(p.down != null) {
                p = p.down;
            }

            while(p != null) {
                console.log(this._getOneCol(p));
                p = p.right;
            }
        });
})(SkipListNode);