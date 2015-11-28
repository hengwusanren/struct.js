/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * UnionFindSet
 * Each element belongs to only one set.
 ********************************/
var UnionFindSet = (function (SuperHashMap, SuperHashSet) {

    "use strict";

    if (!SuperHashMap || !SuperHashSet) return null;

    return function (lazy, sizeLimit) {
        // check arguments:
        // todo
        this.e2s = new SuperHashMap();
        if(!lazy) this.s2e = new SuperHashMap();
    }
        .method('put', function (elem, setEntry) { // tobe fixed
            // todo
        })
        .method('join', function (elem1, elem2) { // tobe fixed
            // todo
        })
        .method('find getSetOf', function (elem) { // tobe fixed
            // todo
        })
        .method('getElementsOf', function (setEntry) { // tobe fixed
            // todo
        });
})(HashMap, HashSet);