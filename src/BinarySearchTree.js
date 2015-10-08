/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * BinaryTreeNode
 ********************************/
var BinaryTreeNode = (function () {

    "use strict";

    return function (value) {
        // check arguments:
        // todo

        this.value = value;
        this.lchild = null;
        this.rchild = null;
        this.parent = null;
    }
        .method('left', function (node) {
            if(arguments.length == 0) return this.lchild;
            this.lchild = node;
            node.parent = this;
        })
        .method('right', function (node) {
            if(arguments.length == 0) return this.rchild;
            this.rchild = node;
            node.parent = this;
        })
        .method('removeLeft', function () {
            this.lchild.parent = null;
            this.lchild = null;
        })
        .method('removeRight', function () {
            this.rchild.parent = null;
            this.rchild = null;
        })
        .method('follow', function (node) {
            this.parent = node;
        })
        .method('root', function () {
            var h = 1, p = this;
            while(p.parent != null) {
                h++;
                p = p.parent;
            }
            return {
                root: p,
                depth: h
            };
        })
    /**
     * height of the tree with this root node
     * if unbalanced, height is negative.
     */
        .method('height', function () {
            if(this.lchild == null) {
                if(this.rchild == null) return 1;
                var rh = this.rchild.height();
                if(rh > 1) return -1-rh;
                if(rh > -1) return 1+rh;
                return -1+rh;
            } else {
                var lh = this.lchild.height(),
                    rh = 0;
                if(this.rchild != null) rh = this.rchild.height();
                if(lh < 0 || rh < 0) {
                    lh = Math.abs(lh);
                    rh = Math.abs(rh);
                    return -1-(lh > rh ? lh : rh);
                }
                var max = (lh > rh ? lh : rh);
                if(lh > rh + 1 || rh > lh + 1) return -1-max;
                else return 1+max;
            }
            return 1;
        })
        .method('isBalanced', function () {
            return this.height() >= 0;
        });
})();

/********************************
 * BinarySearchTree (BinarySortTree)
 ********************************/
var BSTree = (function (SuperTree, Node, Compor) {

    "use strict";

    if(!SuperTree || !Node || !Compor) return null;

    return function (binTreeNode, comparator) {
        // check arguments:
        // todo

        SuperTree.call(this, binTreeNode);

        if(binTreeNode.constructor !== Node) {
            throw new Error('Wrong type of node.');
            return null;
        }

        this._nodeType = Node;

        if (!comparator) {
            var comparator = function (v1, v2) { return v1 > v2; };
        }
        this.implements(Compor, [comparator]);
    }
        .inherits(SuperTree)
        .implements()
        .method('find search', function (node, value, comparator) {
            // todo
        })
        .method('maximum', function () {
            var p = this.root;
            if(p == null) return null;
            while(true) {
                if(p.rchild != null) {
                    p = p.rchild;
                    continue;
                }
                if(p.lchild != null) {
                    p = p.lchild;
                    continue;
                }
                break;
            }
            return p.value;
        })
        .method('rheight', function () {
            var p = this.root,
                h = 0;
            if(p == null) return h;
            while(true) {
                h++;
                if(p.rchild == null) {
                    break;
                }
                p = p.rchild;
            }
            return h;
        })
        .method('minimum', function () {
            var p = this.root;
            if(p == null) return null;
            while(true) {
                if(p.lchild != null) {
                    p = p.lchild;
                    continue;
                }
                if(p.rchild != null) {
                    p = p.rchild;
                    continue;
                }
                break;
            }
            return p.value;
        })
        .method('lheight', function () {
            var p = this.root,
                h = 0;
            if(p == null) return h;
            while(true) {
                h++;
                if(p.lchild == null) {
                    break;
                }
                p = p.lchild;
            }
            return h;
        })
        .method('isBalanced', function () {
            return this.root.isBalanced();
        })
        .method('isComplete', function () {
            return this.lheight() === this.rheight();
        })
        .method('predecessorOf', function (node) {
            // todo
        })
        .method('successorOf', function (node) {
            // todo
        })
        .method('insert', function () {
            // todo
        })
        .method('remove', function () {
            // todo
        })
        .method('preOrder', function () {})
        .method('inOrder', function () {})
        .method('postOrder', function () {});
})(Tree, BinaryTreeNode, Comparator);