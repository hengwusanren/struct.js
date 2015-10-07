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
            // todo
        })
        .method('minimum', function () {
            // todo
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