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
        .inherits(SuperNode);
})(BinaryTreeNode);

/********************************
 * RedBlackTree
 ********************************/
var RBTree = (function (SuperTree, Node) {

    "use strict";

    if (!SuperTree) return null;

    return function (binTreeNode, comparator) {
        // check arguments:
        // todo

        SuperTree.apply(this, arguments);
    }
        .inherits(SuperTree)
        .property('_nodeType', Node)
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