/**
 * Created by hengwu on 2015/9/22.
 */

/********************************
 * GraphNode
 ********************************/
var GraphNode = (function (Map) {

    "use strict";

    if(!Map) return null;

    return function (value, id) {
        // check arguments:
        // todo

        if (arguments.length == 0) throw new Error('Constructor requires value.');

        /**
         * value of this node
         */
        this.value = value;

        /**
         * guid of this node
         */
        var tmp_id = this.guid();
        if(arguments.length > 1 && !isNaN(parseInt(id))) {
            tmp_id = parseInt(id);
        }
        Object.defineProperty(this, "_id", {
            value: tmp_id,
            writable: false
        });

        /**
         * edges that start from this node
         * key is a node's guid, value is the value of this edge, e.g. weight.
         * @type {HashTable}
         */
        this.edges = new Map();
    }
        .method('guid', function () {
            return Guid();
        })
        .method('id', function () {
            return this._id;
        })
        .method('edges getNeighbors', function () {
            return this.edges;
        })
        .method('connect addEdge', function (graphNode, edgeValue) {
            // check arguments:
            // todo

            this.edges.put(graphNode.id(), edgeValue);
            return this;
        })
        .method('disconnect removeEdge', function (graphNode) {
            // check arguments:
            // todo

            this.edges.remove(graphNode.id());
            return this;
        })
        .method('toString', function () {
            var str = "{\n";
            str += "id: " + this.id().toString() + ",\n";
            str += "value: " + this.value.toString() + ",\n";
            str += "edges: " + this.edges.toString() + "\n";
            str += "}";
            return str;
        })
        .method('print', function () {
            console.log(this.toString());
        });
})(HashTable);

/********************************
 * Graph
 ********************************/
var Graph = (function (Node, Map) {

    "use strict";

    if(!Node || !Map) return null;

    return function () {
        // check arguments:
        // todo

        this._nodeType = Node;

        this._nodes = new Map();

        var counter = 0;

        this.allocId = function () {
            while(this._nodes.has(counter)) {
                counter++;
            }
            return counter;
        };
    }
        .method('size', function () {
            return this._nodes.size();
        })
        .method('newNode', function () {
            return Construct(this._nodeType, true, arguments);
        })
        .method('node', function (id) {
            // check arguments:
            // todo

            return this._nodes.get(id);
        })
        .method('add', function (value, id) {
            // check arguments:
            // todo

            if(arguments.length < 2) {
                var id = this.allocId();
            }
            this._nodes.put(id, this.newNode(value, id));
            return this;
        })
        .method('get', function (id) {
            // check arguments:
            // todo

            return this._nodes.get(id);
        })
        .method('getNeighborsOfNode', function (id) {
            // check arguments:
            // todo

            var node = this._nodes.get(id);
            return node.getNeighbors();
        })
        .method('toString', function () {
            return this._nodes.toString();
        })
        .method('print', function () {
            console.log(this.toString());
        })
        .method('dfs', function (start, visit, ifTrace, ifAll, stateStorage) {
            // check arguments:
            // todo

            return this;
        })
        .method('bfs', function (start, visit, ifTrace, ifAll, stateStorage) {
            // check arguments:
            // todo

            return this;
        });
})(GraphNode, HashTable);