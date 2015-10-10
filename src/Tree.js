/**
 * Created by hengwu on 2015/10/7.
 */

/********************************
 * TreeNode
 ********************************/
var TreeNode = (function (Map) {

    "use strict";

    if(!Map) return null;

    return function (value) {
        // check arguments:
        // todo

        this.value = value;
        this.children = new Map();
        this.parent = null;
    }
        .method('nil', function () {
            return null;
        })
        .method('isNil', function (node) {
            return node == null;
        })
        .method('hasChild', function (key) {
            return this.children.has(key);
        })
        .method('putChild', function (key, node) {
            if(this.isNil(node)) {
                this.removeChild(key);
                return this;
            }
            this.children.put(key, node);
            node.parent = this;
            return this;
        })
        .method('getChild', function (key) {
            return this.children.get(key);
        })
        .method('removeChild', function (key) {
            var child = this.getChild(key);
            if(child != null) child.parent = null;
            this.children.remove(key);
        });
})(SingleTable);

/********************************
 * Tree
 ********************************/
var Tree = (function (Node) {

    "use strict";

    if(!Node) return null;

    return function (rootValue) {
        // check arguments:
        // todo

        this._nil = this._nodeType.prototype.nil();
        if(arguments.length > 0) {
            this.root = this.newNode(rootValue);
        } else {
            this.root = this._nil;
        }
    }
        .property('_nodeType', Node)
        .method('newNode', function () {
            var node = Construct(this._nodeType, true, arguments);
            node.parent = this._nil;
            return node;
        })
        .method('isNilNode', function (node) {
            return this._nodeType.prototype.isNil(node);
        })
    /**
     * traverse this tree with depth-first search
     * refer to: http://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393.
     * visitor is also a comparator, while the node is its first arg, followed by some else
     * if immediateReturn is true and visitor considers the current node matched, return it
     */
        .method('dfs', function (visitor, immediateReturn, argsOfVisitor) {
            if(this.root == null || this.isNilNode(this.root)) return null;

            // this is a recurse and immediately-invoking function
            (function recurse(currentNode) {
                for(var key in currentNode.children) {
                    if(!currentNode.children.hasOwnProperty(key)) continue;
                    var r = recurse(currentNode.children[key]);
                    if(immediateReturn && r != null) return r;
                }

                if(visitor.apply(null, [currentNode].concat(argsOfVisitor))) {
                    if(immediateReturn) return currentNode;
                }
                return null;

            })(this.root);
        })
    /**
     * traverse this tree with breadth-first search
     * visitor is also a comparator, while the node is its first arg, followed by some else
     * if immediateReturn is true and visitor considers the current node matched, return it
     */
        .method('bfs', function (visitor, immediateReturn, argsOfVisitor) {
            if(this.root == null || this.isNilNode(this.root)) return null;

            var q = new Queue();
            q.push(this.root);
            while(!q.isEmpty()) {
                var t = q.top();
                if(visitor.apply(null, [t].concat(argsOfVisitor))) {
                    if(immediateReturn) return t;
                }
                for(var key in t.children) {
                    if(!t.children.hasOwnProperty(key)) continue;
                    q.push(t.children[key]);
                }
                q.pop();
            }
            return null;
        })
    /**
     * if immediateReturn is true, return the first found node
     */
        .method('traverse', function (traversal, callback, immediateReturn, argsOfCallback) {
            return traversal.apply(this, Array.prototype.slice.call(arguments, 1));
        })
        .method('contains has', function (traversal, matcher, argsOfMatcher) {
            return this.traverse(traversal, matcher, true, argsOfMatcher) != null;
        });
})(TreeNode);