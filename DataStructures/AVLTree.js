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
        .method('_rRebalanceForNode', function (node) { // tobe finished
            var lnode = node.left,
                rnode = node.right,
                lheight = this._heightForNode(lnode),
                rheight = this._heightForNode(rnode);
            if(rheight > lheight + 1) {
                //
            } else {
                //
            }
        })
        .method('_lRebalanceForNode', function (node) { // tobe finished
            var lnode = node.left,
                rnode = node.right,
                lheight = this._heightForNode(lnode),
                rheight = this._heightForNode(rnode);
            if(lheight > rheight + 1) {
                //
            } else {
                //
            }
        })
        .method('_rRebalance', function () { // tobe finished
            return this._rRebalanceForNode(this.root);
        })
        .method('_lRebalance', function () { // tobe finished
            return this._lRebalanceForNode(this.root);
        })
        .method('_insertForNode', function (node, v) {
            if(v == null) return null;
            if(this.isNilNode(node)) {
                node = this.newNode(v);
            } else {
                var r = this.comparator(v, node.value);
                if(r < 0) {
                    node.left = this._insertForNode(node.left, v);
                    node = this._lRebalanceForNode(node);
                } else if(r == 0) {
                    node.value = v;
                } else {
                    node.right = this._insertForNode(node.right, v);
                    node = this._rRebalanceForNode(node);
                }
            }
            return node;
        })
        .method('insert', function (v) { // tobe tested
            if(v != null) this._insertForNode(this.root, v);
            return this;
        })
        .method('remove', function (e) { // tobe tested
            // todo
        });
})(BSTree, AVLTreeNode);