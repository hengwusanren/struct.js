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
        .method('hasChild', function (key) {
            return this.children.has(key);
        })
        .method('putChild', function (key, node) {
            this.children.put(key, node);
            node.parent = this;
            return this;
        })
        .method('getChild', function (key) {
            return this.children.get(key);
        })
        .method('removeChild', function (key) {
            var child = this.getChild(key);
            if(child == null) return this;
            child.parent = null;
            this.children.remove(key);
        });
})(SingleTable);

/********************************
 * Tree
 ********************************/
var Tree = (function (Node) {

    "use strict";

    if(!Node) return null;

    return function (treeNode) {
        // check arguments:
        // todo

        this.root = treeNode;

        this._nodeType = Node;
    }
        .method('newNode', function () {
            return Construct(this._nodeType, true, arguments);
        })
        .method('bfs', function (visitor) {
            if(this.root == null) return false;
            var q = new Queue();
            q.push(this.root);
            while(!q.isEmpty()) {
                var t = q.top();
                visitor(t);
                for(var key in t.children) {
                    if(!t.children.hasOwnProperty(key)) continue;
                    q.push(t.children[key]);
                }
                q.pop();
            }
            return this;
        });
})(TreeNode);