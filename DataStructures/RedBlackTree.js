/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * RedBlackTreeNode
 ********************************/
var RBTreeNode = (function (SuperNode) {

    "use strict";

    if (!SuperNode) return null;

    return function (value, color) {
        // check arguments:
        // todo

        SuperNode.apply(this, arguments);

        this.color = color ? (!!color) : false; // true: red, false: black
    }
        .inherits(SuperNode)
        .method('nil', function () {
            return {
                value: null,
                lchild: null,
                rchild: null,
                parent: null,
                color: false
            };
        })
        .method('isNil', function (node) {
            return (node != null && node.value === null && node.color === false);
        });
})(BinaryTreeNode);

/********************************
 * RedBlackTree
 ********************************/
var RBTree = (function (SuperTree, Node) {

    "use strict";

    if (!SuperTree) return null;

    return function (rootValue, comparator) {
        // check arguments:
        // todo

        SuperTree.apply(this, arguments);
    }
        .inherits(SuperTree)
        .property('_nodeType', Node)
        .method('isNilNode', function (node) {
            return node === this._nil;
        })
        .method('_connectNil', function (node) {
            if(this.isNilNode(node)) return;
            if(!node.lchild) node.lchild = this._nil;
            if(!node.rchild) node.rchild = this._nil;
        })
    //    |                             |
    //   (x)    ---LeftRotate(x)-->    (y)
    //   / \                           / \
    //  a  (y)  <--RightRotate(y)--  (x)  c
    //     / \                       / \
    //    b   c                     a   b
        .method('_lRotate', function (x) { // tobe tested
            var y = x.rchild;
            x.rchild = y.lchild;
            y.lchild.parent = x;
            y.parent = x.parent;
            if(this.isNilNode(x.parent)) {
                this.root = y;
            } else {
                if(x === x.parent.lchild) {
                    x.parent.lchild = y;
                } else {
                    x.parent.rchild = y;
                }
            }
            y.lchild = x;
            x.parent = y;
        })
        .method('_rRotate', function (x) { // tobe tested
            var y = x.lchild;
            x.lchild = y.rchild;
            y.rchild.parent = x;
            y.parent = x.parent;
            if(this.isNilNode(x.parent)) {
                this.root = y;
            } else {
                if(x === x.parent.rchild) {
                    x.parent.rchild = y;
                } else {
                    x.parent.lchild = y;
                }
            }
            y.rchild = x;
            x.parent = y;
        })
        .method('_insertFixUp', function (z) { // tobe tested
            while(z.parent.color === true) {
                if(z.parent === z.parent.parent.lchild) {
                    var y = z.parent.parent.rchild;
                    if(y.color === true) {
                        z.parent.color = false;
                        y.color = false;
                        z.parent.parent.color = true;
                        z = z.parent.parent;
                    } else {
                        if(z === z.parent.rchild) {
                            z = z.parent;
                            this._lRotate(z);
                        }
                        z.parent.color = false;
                        z.parent.parent.color = true;
                        this._rRotate(z.parent.parent);
                    }
                } else {
                    var y = z.parent.parent.lchild;
                    if(y.color === true) {
                        z.parent.color = false;
                        y.color = false;
                        z.parent.parent.color = true;
                        z = z.parent.parent;
                    } else {
                        if(z === z.parent.lchild) {
                            z = z.parent;
                            this._rRotate(z);
                        }
                        z.parent.color = false;
                        z.parent.parent.color = true;
                        this._lRotate(z.parent.parent);
                    }
                }
            }
            this.root.color = false;
        })
        .method('insert', function (z) { // tobe tested
            var y = this._nil,
                x = this.root;
            while(!this.isNilNode(x)) {
                y = x;
                if(z.value < x.value) x = x.lchild;
                else x = x.rchild;
            }
            z.parent = y;
            if(this.isNilNode(y)) this.root = z;
            else {
                if(z.value < y.value) y.lchild = z;
                else y.rchild = z;
            }
            z.lchild = this._nil;
            z.rchild = this._nil;
            z.color = true;
            this._insertFixUp(z);
        })
        .method('_removeFixUp', function (x) { // tobe tested
            while(x !== this.root && x.color === false) {
                if(x === x.parent.lchild) {
                    var w = x.parent.rchild;
                    if(w.color === true) {
                        w.color = false;
                        x.parent.color = true;
                        this._lRotate(x.parent);
                        w = x.parent.rchild;
                    }
                    if(w.lchild.color === false && w.rchild.color === false) {
                        w.color = true;
                        x = x.parent;
                    } else {
                        if(w.rchild.color === false) {
                            w.lchild.color = false;
                            w.color = true;
                            this._rRotate(w);
                            w = x.parent.rchild;
                        }
                        w.color = x.parent.color;
                        x.parent.color = false;
                        w.rchild.color = false;
                        this._lRotate(x.parent);
                        x = this.root;
                    }
                } else {
                    var w = x.parent.lchild;
                    if(w.color === true) {
                        w.color = false;
                        x.parent.color = true;
                        this._rRotate(x.parent);
                        w = x.parent.lchild;
                    }
                    if(w.rchild.color === false && w.lchild.color === false) {
                        w.color = true;
                        x = x.parent;
                    } else {
                        if(w.lchild.color === false) {
                            w.rchild.color = false;
                            w.color = true;
                            this._lRotate(w);
                            w = x.parent.lchild;
                        }
                        w.color = x.parent.color;
                        x.parent.color = false;
                        w.lchild.color = false;
                        this._rRotate(x.parent);
                        x = this.root;
                    }
                }
            }
            x.color = false;
        })
        .method('remove', function (z) { // tobe tested
            var y, x;
            if(this.isNilNode(z.lchild) || this.isNilNode(z.rchild)) y = z;
            else y = this.successorOf(z);
            if(!this.isNilNode(y.lchild)) x = y.lchild;
            else x = y.rchild;
            x.parent = y.parent;
            if(this.isNilNode(y.parent)) this.root = x;
            else {
                if(y === y.parent.lchild) y.parent.lchild = x;
                else y.parent.rchild = x;
            }
            if(y !== z) {
                z.value = y.value;
                // copy y's satellite data into z
            }
            if(y.color === false) this._removeFixUp(x);
            return y;
        });
})(BSTree, RBTreeNode);