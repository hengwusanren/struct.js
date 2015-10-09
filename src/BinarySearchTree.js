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
        .method('removeChild', function (node) {
            if(node === this.lchild) return this.removeLeft();
            if(node === this.rchild) return this.removeRight();
            return null;
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
        })
        .method('isLeaf', function () {
            return this.lchild == null && this.rchild == null;
        })
        .method('isFull', function () {
            return this.lchild != null && this.rchild != null;
        })
        .method('position', function () {
            var node = this;
            if(node.parent == null) return 0;
            if(node.parent.lchild === node) return -1;
            if(node.parent.rchild === node) return 1;
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
    /**
     * search a node based on comparison, starting at this node
     */
        .method('findFrom searchFrom', function (node, value, comparator) {
            if(!comparator) {
                var comparator = function (v1, v2) {
                    return v1 == v2 ? 0 : (v1 > v2 ? 1 : -1);
                };
            }
            var r = comparator(node.value, value);
            if(r === 0) return {
                node: node,
                pos: 0
            };
            if(r === 1) {
                if(node.lchild == null) return {
                    node: node,
                    pos: -1
                };
                return BSTree.prototype.findFrom(node.lchild, value, comparator);
            }
            if(r === -1) {
                if(node.rchild == null) return {
                    node: node,
                    pos: 1
                };
                return BSTree.prototype.findFrom(node.rchild, value, comparator);
            }
        })
    /**
     * search a node based on comparison
     */
        .method('find search', function (value, comparator) {
            if(!comparator) var comparator = this.comparator;
            return BSTree.prototype.findFrom(this.root, value, comparator);
        })
        .method('findAll', function (comparator, args) {
            // todo
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
        .method('maximumOf', function (node) {
            var p = node;
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
        .method('maximum', function () {
            return BSTree.prototype.maximumOf.call(this.root);
        })
        .method('minimumOf', function (node) {
            var p = node;
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
        .method('minimum', function () {
            return BSTree.prototype.minimumOf.call(this.root);
        })
        .method('isBalanced', function () {
            return this.root.isBalanced();
        })
        .method('isComplete', function () {
            return this.lheight() === this.rheight();
        })
        .method('predecessorOf', function (node) {
            if(node.lchild != null) return BSTree.prototype.maximumOf(node.lchild);
            var c = node, p = c.parent;
            while(p != null && c === p.lchild) {
                c = p;
                p = c.parent;
            }
            return p;
        })
        .method('successorOf', function (node) {
            if(node.rchild != null) return BSTree.prototype.minimumOf(node.rchild);
            var c = node, p = c.parent;
            while(p != null && c === p.rchild) {
                c = p;
                p = c.parent;
            }
            return p;
        })
        .method('insert', function (value, asNode) {
            var findResult = this.find(asNode ? value.value : value);
            if(findResult.pos === 0) return findResult.node;

            var newNode = asNode ? value : this.newNode(value);
            if(findResult.pos === -1) findResult.node.left(newNode);
            else findResult.node.right(newNode);
            return newNode;
        })
        .method('remove', function (node, asValue) {
            if(node == null) return null;
            if(asValue) {
                var findResult = this.find(node);
                if(findResult.pos !== 0) return null;
                return this.remove(findResult.node);
            }
            if(node.isLeaf()) {
                if(node.parent == null) {
                    this.root = null;
                    return null;
                }
                return node.parent.removeChild(node);
            }
            if(!node.isFull()) {
                var child = (node.lchild || node.rchild);
                node.removeChild();
                var parent = node.parent;
                if(parent == null) {
                    this.root = child;
                    return child;
                }
                var pos = node.position();
                if(pos == -1) {
                    parent.removeLeft();
                    parent.left(child);
                }
                else {
                    parent.removeRight();
                    parent.right(child);
                }
                return parent;
            }
            // if node is full:
            var successor = this.successorOf(node);
            node.value = successor.value;
            this.remove(successor);
            return node;
        })
        .method('preOrder', function (node, visitor) {
            var root = node;
            if (root == null)
                return;
            visitor(root);
            if (root.lchild != null)
                BSTree.prototype.preOrder(root.lchild, visitor);
            if (root.rchild != null)
                BSTree.prototype.preOrder(root.rchild, visitor);
        })
        .method('inOrder', function (node, visitor) {
            var root = node;
            if (root == null)
                return;
            if (root.lchild != null)
                BSTree.prototype.inOrder(root.lchild, visitor);
            visitor(root);
            if (root.rchild != null)
                BSTree.prototype.inOrder(root.rchild, visitor);
        })
        .method('postOrder', function (node, visitor) {
            var root = node;
            if (root == null)
                return;
            if (root.lchild != null)
                BSTree.prototype.postOrder(root.lchild, visitor);
            if (root.rchild != null)
                BSTree.prototype.postOrder(root.rchild, visitor);
            visitor(root);
        });
})(Tree, BinaryTreeNode, Comparator);