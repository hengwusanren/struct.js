/**
 * Created by hengwu on 2015/9/22.
 */

/********************************
 * GraphNode
 ********************************/
var GraphNode = (function (Map, Ider) {

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
         * id of this node
         * in some cases, id can be got in node's value
         */
        this.implements(Ider, [id, true]);

        /**
         * edges that start from this node
         * key is a node's guid, value is the value of this edge, e.g. weight.
         * @type {SingleTable}
         */
        this.edges = new Map();
    }
        .implements()
    /**
     * get the edges starting from this node,
     * which means all the nodes connected with this node.
     */
        .method('edges getNeighbors', function () {
            return this.edges;
        })
    /**
     * connect this node with another node,
     * given another node or id, and some extra info of this edge.
     */
        .method('connect addEdge addNeighbor', function (nodeId, edgeValue, asNode) {
            // check arguments:
            // todo

            this.edges.put(asNode ? nodeId.id() : nodeId, edgeValue);
            return this;
        })
    /**
     * disconnect this node with another node,
     * given another node or id.
     */
        .method('disconnect removeEdge removeNeighbor', function (nodeId, asNode) {
            // check arguments:
            // todo

            this.edges.remove(asNode ? nodeId.id() : nodeId);
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
})(SingleTable, Identifier);

/********************************
 * Graph
 ********************************/
var Graph = (function (Node, Map) {

    "use strict";

    if(!Node || !Map) return null;

    return function (type) {
        // check arguments:
        // todo

        /**
         * type of graph
         * 0: undirected
         * 1: directed
         * @type {number}
         * @private
         */
        Object.defineProperty(this, "_type", {
            value: (type ? 1 : 0),
            writable: false
        });

        this._nodes = new Map();

        var counter = 0;
        this.allocId = function () {
            while(this._nodes.has(counter)) {
                counter++;
            }
            return counter;
        };
    }
        .property('_nodeType', Node)
        .method('size', function () {
            return this._nodes.size();
        })
    /**
     * call the node constructor to create a node
     */
        .method('newNode', function () {
            return Construct(this._nodeType, true, arguments);
        })
    /**
     * get the node from this graph,
     * given a node's id or itself.
     */
        .method('getNode', function (d, asNode) {
            // check arguments:
            // todo

            return this._nodes.get(asNode ? d.id() : d);
        })
    /**
     * see if the node is in this graph,
     * given a node's id or itself.
     */
        .method('hasNode', function (d, asNode) {
            // check arguments:
            // todo

            return this._nodes.has(asNode ? d.id() : d);
        })
    /**
     * add a node to this graph,
     * case1: given the new node's value, and an optional id,
     * case2: given a new node directly.
     * actually, case2 is impossible because all nodes should be created by the graph.
     */
        .method('addNode', function (value, id, asNode) {
            // check arguments:
            // todo

            if(!asNode && id == null) {
                var id = this.allocId();
            } else if(asNode) {
                var id = value.id();
            }
            this._nodes.put(id, asNode ? value : this.newNode(value, id));
            return this;
        })
    /**
     * remove a node
     * notice: this method of removing node is 'lazy-mode',
     *     which means we shall remove each edge ending with this node when we visit edges.
     */
        .method('removeNode', function (d, asNode) {
            // check arguments:
            // todo

            this._nodes.remove(asNode ? d.id() : d);
            return this;
        })
    /**
     * connect node A to node B,
     * given A and B (or A's id and B's id), and some extra info of the new edge.
     * notice: if the graph is undirected, connect B to A at the same time.
     */
        .method('addEdge', function (d1, d2, edgeWeight, asNode) {
            // check arguments:
            // todo

            if(edgeWeight == null) edgeWeight = 0;

            if(!asNode) {
                if (!this.hasNode(d1)) {
                    throw new Error('Node ' + d1.toString() + ' does not exist.');
                    return this;
                }
                if (!this.hasNode(d2)) {
                    throw new Error('Node ' + d2.toString() + ' does not exist.');
                    return this;
                }
            } else {
                if (!this.hasNode(d1, true)) {
                    this.addNode(d1, null, true);
                }
                if (!this.hasNode(d2, true)) {
                    this.addNode(d2, null, true);
                }
            }
            this.getNode(d1, asNode).connect(d2, edgeWeight, asNode);

            // if this graph is undirected, add a reversed edge:
            if(this._type == 0) {
                this.getNode(d2, asNode).connect(d1, edgeWeight, asNode);
            }

            return this;
        })
    /**
     * disconnect node A to node B,
     * given A and B (or A's id and B's id).
     * notice: if the graph is undirected, disconnect B to A at the same time.
     */
        .method('removeEdge', function (d1, d2, asNode) {
            // check arguments:
            // todo

            if(!asNode) {
                if (!this.hasNode(d1)) {
                    throw new Error('Node ' + d1.toString() + ' does not exist.');
                    return this;
                }
                if (!this.hasNode(d2)) {
                    return this;
                }
            } else {
                if (!this.hasNode(d1, true)) {
                    throw new Error('Node ' + d1.toString() + ' does not exist.');
                    return this;
                }
                if (!this.hasNode(d2, true)) {
                    return this;
                }
            }
            this.getNode(d1, asNode).disconnect(d2, asNode);

            // if this graph is undirected, remove the reversed edge:
            if(this._type == 0) {
                this.getNode(d2, asNode).disconnect(d1, asNode);
            }

            return this;
        })
    /**
     * get the neighbors of a node,
     * given the node or its id.
     */
        .method('getNeighborsOfNode', function (d, asNode) {
            // check arguments:
            // todo

            var node = asNode ? d : this.getNode(d);
            if(node == null) {
                throw new Error('Node ' + d.toString() + ' does not exist.');
                return null;
            }
            return node.getNeighbors();
        })
        .method('toString', function () {
            return this._nodes.toString();
        })
        .method('print', function () {
            console.log(this.toString());
        })
        .method('dfs', function (start, visitor, ifTrace, ifAll, stateStorage) {
            // check arguments:
            // todo

            return this;
        })
        .method('bfs', function (start, visitor, ifTrace, ifAll, stateStorage) {
            // check arguments:
            // todo

            return this;
        });
})(GraphNode, SingleTable);


(function () { // test

    //return; // not execute tests

    var g = new Graph();

    for(var i = 0; i < 100; i++) {
        g.addNode(i, i);
    }
    g.print();
    for(var i = 0; i < 100; i++) {
        g.addEdge(i, (i + 1) % 100);
    }
    g.print();
})
();