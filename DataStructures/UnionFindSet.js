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
            if(setEntry == null) return null;
            if(this.s2e) {
                var oldSet = this.e2s.get(elem);
                if(oldSet != null) this.s2e.get(oldSet).remove(elem);
            }
            this.e2s.put(elem, setEntry);
            if(this.s2e) {
                var oldElements = this.s2e.get(setEntry);
                if(oldElements) oldElements.add(elem);
                else {
                    oldElements = new SuperHashSet();
                    oldElements.add(elem);
                    this.s2e.put(setEntry, oldElements);
                }
            }
            return this;
        })
        /**
         * elem1 to be added is a neighbor of elem2
         * some problem here: what if an insertion makes two different sets to be united?
         */
        .method('putNeighbor', function (elem1, elem2) { // tobe fixed
            var s = this.e2s.get(elem2);
            if(s == null) return null;
            return this.put(elem1, s);
        })
        .method('getSetOf', function (elem) { // tobe fixed
            return this.e2s.get(elem);
        })
        .method('getElementsOf', function (setEntry) { // tobe fixed
            if(this.s2e) {
                return this.s2e.get(setEntry);
            }
            var elems = [];
            // todo: traverse this.e2s to get elems
            return elems;
        });
})(HashMap, HashSet);