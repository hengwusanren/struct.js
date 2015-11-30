/**
 * Created by hengwu on 2015/10/19.
 */

/********************************
 * SkipListNode
 ********************************/
var SkipListNode = (function () {
    "use strict";
    return function (level, key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    };
})();

/********************************
 * SkipList
 ********************************/
var SkipList = (function (Node, SuperHashMap, SuperHashSet) {

    "use strict";

    if (!Node || !SuperHashMap || !SuperHashSet) return null;

    /**
     * maxLevel: max level of skipList
     * p: probability of a node remaining in the next upside level
     */
    return function (maxLevel, p) {
        // check arguments:
        // todo
        this.level = maxLevel;
        this.head = this.newNode();
    }
        .property('_nodeType', Node)
        .method('newNode', function () {
            var node = Construct(this._nodeType, true, arguments);
            return node;
        })
        .method('init', function (elem) {
            // todo
        })
        .method('find', function () {})
        .method('insert', function () {})
        .method('remove', function () {})
        .method('free', function () {});
})(HashMap, HashSet);