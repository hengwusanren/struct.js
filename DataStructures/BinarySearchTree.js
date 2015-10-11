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
        .method('nil', function () {
            return null;
        })
        .method('isNil', function (node) {
            return node == null;
        })
        .method('left', function (node) {
            if(arguments.length == 0) return this.lchild;
            this.lchild = node;
            if(node) node.parent = this;
        })
        .method('right', function (node) {
            if(arguments.length == 0) return this.rchild;
            this.rchild = node;
            if(node) node.parent = this;
        })
        .method('follow', function (node) {
            this.parent = node;
        })
        .method('position', function () {
            var node = this;
            if(node.parent && node.parent.lchild === node) return -1;
            if(node.parent && node.parent.rchild === node) return 1;
            return 0;
        });
})();

/********************************
 * BinarySearchTree (BinarySortTree)
 ********************************/
var BSTree = (function (SuperTree, Node, Compor) {

    "use strict";

    if(!SuperTree || !Node || !Compor) return null;

    return function (rootValue, comparator) {
        // check arguments:
        // todo

        SuperTree.apply(this, [rootValue]);

        this.size = this.isNilNode(this.root) ? 0 : 1;

        if (!comparator) {
            var comparator = function (v1, v2) { return v1 > v2; };
        }
        this.implements(Compor, [comparator]);
    }
        .inherits(SuperTree)
        .property('_nodeType', Node)
        .implements()
        .method('newNode', function () {
            var node = Construct(this._nodeType, true, arguments);
            node.lchild = this._nil;
            node.rchild = this._nil;
            node.parent = this._nil;
            return node;
        })


        .method('_removeLeftForNode', function (thisNode) {
            if(thisNode.lchild) {
                var child = thisNode.lchild;
                child.parent = this._nil;
                thisNode.lchild = this._nil;
                return child;
            }
            return null;
        })
        .method('_removeRightForNode', function (thisNode) {
            if(thisNode.rchild) {
                var child = thisNode.rchild;
                child.parent = this._nil;
                thisNode.rchild = this._nil;
                return child;
            }
            return null;
        })
        .method('_removeChildForNode', function (thisNode, node) {
            if(node === thisNode.lchild) return this._removeLeftForNode(thisNode);
            if(node === thisNode.rchild) return this._removeRightForNode(thisNode);
            return null;
        })
        .method('_rootForNode', function (thisNode) {
            var h = 1, p = thisNode;
            while(p.parent != null && !this.isNilNode(p.parent)) {
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
        .method('_heightForNode', function (thisNode) {
            if(thisNode.lchild == null || this.isNilNode(thisNode.lchild)) {
                if(thisNode.rchild == null || this.isNilNode(thisNode.rchild)) return 1;
                var rh = this._heightForNode(thisNode.rchild);
                if(rh > 1) return -1-rh;
                if(rh > -1) return 1+rh;
                return -1+rh;
            } else {
                var lh = this._heightForNode(thisNode.lchild),
                    rh = 0;
                if(thisNode.rchild != null && !this.isNilNode(thisNode.rchild)) rh = this._heightForNode(thisNode.rchild);
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
        .method('_isBalancedForNode', function (thisNode) {
            return this._heightForNode(thisNode) >= 0;
        })
        .method('_isLeafForNode', function (thisNode) {
            return (thisNode.lchild == null || this.isNilNode(thisNode.lchild))
                && (thisNode.rchild == null || this.isNilNode(thisNode.rchild));
        })
        .method('_isFullForNode', function (thisNode) {
            return (thisNode.lchild != null && !this.isNilNode(thisNode.lchild))
                && (thisNode.rchild != null && !this.isNilNode(thisNode.rchild));
        })


    /**
     * search a node based on comparison, starting at this node
     */
        .method('findFrom searchFrom', function (node, value, comparator) {
            if(node == null || this.isNilNode(node)) return null;
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
                if(node.lchild == null || this.isNilNode(node.lchild)) return {
                    node: node,
                    pos: -1
                };
                return this.findFrom(node.lchild, value, comparator);
            }
            if(r === -1) {
                if(node.rchild == null || this.isNilNode(node.rchild)) return {
                    node: node,
                    pos: 1
                };
                return this.findFrom(node.rchild, value, comparator);
            }
        })
    /**
     * search a node based on comparison
     */
        .method('find search', function (value, comparator) {
            if(!comparator) var comparator = this.comparator;
            return this.findFrom(this.root, value, comparator);
        })
        .method('findAll', function (comparator, args) {
            // todo
        })
        .method('rheight', function () {
            var p = this.root,
                h = 0;
            if(p == null || this.isNilNode(p)) return h;
            while(true) {
                h++;
                if(p.rchild == null || this.isNilNode(p.rchild)) {
                    break;
                }
                p = p.rchild;
            }
            return h;
        })
        .method('lheight', function () {
            var p = this.root,
                h = 0;
            if(p == null || this.isNilNode(p)) return h;
            while(true) {
                h++;
                if(p.lchild == null || this.isNilNode(p.lchild)) {
                    break;
                }
                p = p.lchild;
            }
            return h;
        })
        .method('maximumOf', function (node) {
            var p = node;
            if(p == null || this.isNilNode(p)) return null;
            while(true) {
                if(p.rchild != null && !this.isNilNode(p.rchild)) {
                    p = p.rchild;
                    continue;
                }
                break;
            }
            return p.value;
        })
        .method('maximum', function () {
            return this.maximumOf(this.root);
        })
        .method('minimumOf', function (node) {
            var p = node;
            if(p == null || this.isNilNode(p)) return null;
            while(true) {
                if(p.lchild != null && !this.isNilNode(p.lchild)) {
                    p = p.lchild;
                    continue;
                }
                break;
            }
            return p.value;
        })
        .method('minimum', function () {
            return this.minimumOf(this.root);
        })
        .method('dfs', function (visitor, immediateReturn, argsOfVisitor) {
            // this is a recurse and immediately-invoking function
            (function recurse(currentNode, scope) {
                var r;
                if(currentNode.lchild != null && !scope.isNilNode(currentNode.lchild)) {
                    r = recurse(currentNode.lchild, scope);
                    if (immediateReturn && r != null) return r;
                }
                if(currentNode.rchild != null && !scope.isNilNode(currentNode.rchild)) {
                    r = recurse(currentNode.rchild, scope);
                    if (immediateReturn && r != null) return r;
                }

                if(visitor.apply(null, [currentNode].concat(argsOfVisitor))) {
                    if(immediateReturn) return currentNode;
                }
                return null;

            })(this.root, this);
        })
        .method('bfs', function (visitor, immediateReturn, argsOfVisitor) {
            if(this.root == null || this.isNilNode(this.root)) return null;
            var q = new Queue();
            q.push(this.root);
            while(!q.isEmpty()) {
                var t = q.top();
                if(visitor.apply(null, [t].concat(argsOfVisitor))) {
                    if(immediateReturn) return t;
                }
                if(t.lchild != null && !this.isNilNode(t.lchild)) {
                    q.push(t.lchild);
                }
                if(t.rchild != null && !this.isNilNode(t.rchild)) {
                    q.push(t.rchild);
                }
                q.pop();
            }
            return null;
        })
        .method('isBalanced', function () {
            return this._isBalancedForNode(this.root);
        })
        .method('isComplete', function () {
            return this.lheight() === this.rheight();
        })
        .method('predecessorOf', function (node) {
            if(node.lchild != null && !this.isNilNode(node.lchild)) return this.maximumOf(node.lchild);
            var c = node, p = c.parent;
            while(p != null && !this.isNilNode(p) && c === p.lchild) {
                c = p;
                p = c.parent;
            }
            return p;
        })
        .method('successorOf', function (node) {
            if(node.rchild != null && !this.isNilNode(node.rchild)) return this.minimumOf(node.rchild);
            var c = node, p = c.parent;
            while(p != null && !this.isNilNode(p) && c === p.rchild) {
                c = p;
                p = c.parent;
            }
            return p;
        })
        .method('insert', function (value, asNode) {
            var findResult = this.find(asNode ? value.value : value);
            var newNode = asNode ? value : this.newNode(value);
            if(findResult == null) {
                this.root = newNode;
                this.size = 1;
                return this.root;
            }
            if(findResult.pos === 0) return findResult.node;
            if(findResult.pos === -1) findResult.node.left(newNode);
            else findResult.node.right(newNode);
            this.size++;
            return newNode;
        })
        .method('remove', function (node, asValue) {
            if(node == null || this.isNilNode(node)) return null;
            if(asValue) {
                var findResult = this.find(node);
                if(!findResult || findResult.pos !== 0) return null;
                this.size--;
                return this.remove(findResult.node);
            }
            if(this._isLeafForNode(node)) {
                if(node.parent == null || this.isNilNode(node.parent)) {
                    this.root = this._nil;
                    this.size = 0;
                    return null;
                }
                this.size--;
                return this._removeChildForNode(node.parent, node);
            }
            this.size--;
            if(!this._isFullForNode(node)) {
                var child = (node.lchild != null && !this.isNilNode(node.lchild)) ? node.lchild : node.rchild;
                this._removeChildForNode(node, child);
                var parent = node.parent;
                if(parent == null || this.isNilNode(parent)) {
                    this.root = child;
                    return child;
                }
                var pos = node.position();
                if(pos == -1) {
                    this._removeLeftForNode(parent);
                    parent.left(child);
                }
                else {
                    this._removeRightForNode(parent);
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
            if (root == null || this.isNilNode(root))
                return;
            visitor(root);
            if (root.lchild != null && !this.isNilNode(root.lchild))
                this.preOrder(root.lchild, visitor);
            if (root.rchild != null && !this.isNilNode(root.rchild))
                this.preOrder(root.rchild, visitor);
        })
        .method('inOrder', function (node, visitor) {
            var root = node;
            if (root == null || this.isNilNode(root))
                return;
            if (root.lchild != null && !this.isNilNode(root.lchild))
                this.inOrder(root.lchild, visitor);
            visitor(root);
            if (root.rchild != null && !this.isNilNode(root.rchild))
                this.inOrder(root.rchild, visitor);
        })
        .method('postOrder', function (node, visitor) {
            var root = node;
            if (root == null || this.isNilNode(root))
                return;
            if (root.lchild != null && !this.isNilNode(root.lchild))
                this.postOrder(root.lchild, visitor);
            if (root.rchild != null && !this.isNilNode(root.rchild))
                this.postOrder(root.rchild, visitor);
            visitor(root);
        });
})(Tree, BinaryTreeNode, Comparator);