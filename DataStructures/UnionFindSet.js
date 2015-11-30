/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * UnionFindSet or DisjointSet
 * Implemented with forest, union by rank and path compression.
 * Each element is a unique string here, so is each set.
 ********************************/
var UnionFindSet = (function () {

    "use strict";

    //if (!SuperHashMap || !SuperHashSet) return null;

    return function (lazy) {
        // check arguments:
        // todo
        this._data = new Object();
    }
        .method('makeSet', function (elem) {
            this._data[elem] = {
                parent: elem,
                rank: 0
            };
        })
        .method('_p', function (elem, p) {
            if(!this._data.hasOwnProperty(elem)) return null;
            if(arguments.length > 1) this._data[elem].parent = p;
            return this._data[elem].parent;
        })
        .method('_r', function (elem, r) {
            if(!this._data.hasOwnProperty(elem)) return null;
            if(arguments.length > 1) this._data[elem].rank = r;
            return this._data[elem].rank;
        })
        .method('init', function (elemArr) {
            for(var i = 0, n = elemArr.length; i < n; i++) {
                var v = elemArr[i],
                    t = typeof v;
                if(t == 'number') v = v.toString();
                else if(t != 'string') continue;

                this.makeSet(v); // now v is a string.
            }
        })
        .method('link', function (elem1, elem2) { // tobe fixed
            if(this._r(elem1) > this._r(elem2)) {
                this._p(elem2, elem1);
            } else {
                this._p(elem1, elem2);
                if(this._r(elem1) == this._r(elem2)) this._r(elem2, this._r(elem2) + 1);
            }
        })
        .method('findSet', function (elem) { // tobe fixed
            var p = this._p(elem);
            if(elem !== p) return this._p(elem, this.findSet(p));
            return this._p(elem);
        })
        .method('union', function (elem1, elem2) { // tobe fixed
            this.link(this.findSet(elem1), this.findSet(elem2));
        })
        .method('findElements', function (setId) { // tobe fixed
            // todo
        })
        .method('print', function () {
            for(var i in this._data) {
                if(!this._data.hasOwnProperty(i)) continue;
                console.log(i + ' ∈ ' + this.findSet(i));
            }
        });
})();

(function () {
    return;

    var ufset = new UnionFindSet();
    var n = 10;
    var arr = new Array(n);
    for(var i = 0; i < n; i++) {
        arr[i] = i;//(Math.floor(Math.random() * 1000 % n));
    }
    ufset.init(arr);
    ufset.union(arr[1], arr[3]);
    ufset.print();
})
();