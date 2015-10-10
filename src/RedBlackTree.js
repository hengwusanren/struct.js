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
        .method('rotate', function (dir) {
            // todo
        })
        .method('insertFixUp', function () {
            // todo
        })
        .method('removeFixUp', function () {
            // todo
        });
})(BSTree, RBTreeNode);