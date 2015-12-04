/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * AVLTreeNode
 ********************************/
var AVLTreeNode = (function (SuperNode) {

    "use strict";

    if (!SuperNode) return null;

    return function (value) {
        // check arguments:
        // todo

        SuperNode.apply(this, arguments);

        this.height = (value == null ? 0 : 1); // ?
    }
        .inherits(SuperNode);
})(BinaryTreeNode);

/********************************
 * AVLTree
 * Refer to: http://www.cs.cmu.edu/~fp/courses/15122-s11/lectures/18-avl.pdf
 ********************************/
var AVLTree = (function (SuperTree, Node) {

    "use strict";

    if (!SuperTree || !Node) return null;

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
        .method('_heightForNode', function (node) {
            return (node == null ? 0 : node.height);
        })
        .method('height', function () {
            return this._heightForNode(this.root);
        })
        .method('_lRotate', function (t) { // tobe tested
            var root = t.right;
            t.right = root.left;
            root.left = t;
            return root;
        })
        .method('_rRotate', function (t) { // tobe tested
            var root = t.left;
            t.left = root.right;
            root.right = t;
            return root;
        })
        .method('_rRebalance', function () {
            // todo
        })
        .method('_lRebalance', function () {
            // todo
        })
        .method('_insertForNode', function (node, value) {
            // todo
        })
        .method('insert', function (v) { // tobe tested
            if(v == null) return this;
            if(this.isNilNode(this.root)) {
                this.root = this.newNode(v);
            } else {
                var r = this.comparator(v, root.value);
                if(r < 0) {
                    this._insertForNode(this.root.left, v);
                    this._lRebalance();
                } else if(r == 0) {
                    this.root.value = v;
                } else {
                    this._insertForNode(this.root.right, v);
                    this._rRebalance();
                }
            }
            return this;
        })
        .method('remove', function (e) { // tobe tested
            // todo
        });
})(BSTree, AVLTreeNode);