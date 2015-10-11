/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * Heap
 ********************************/
var Heap = (function (Compor) {

    "use strict";

    if (!Compor) return null;

    return function (arr, type, comparator) {
        // check arguments:
        // todo

        if(arr == null) var arr = [];

        if(!Array.isArray(arr)) throw new Error('The 1st parameter should be an Array.');

        this._data = [];

        /**
         * type of heap
         * 0: min heap
         * 1: max heap
         */
        Object.defineProperty(this, '_type', {
            value: (type ? 1 : 0),
            writable: false
        });

        if (!comparator) {
            var comparator = (this._type == 0 ?
                (function (v1, v2) { return v1 < v2; }) :
                (function (v1, v2) { return v1 > v2; }));
        }
        this.implements(Compor, [comparator]);

        this.build(arr);
    }
        .implements()
        .method('isEmpty', function () {
            return this._data.length === 0;
        })
        .method('size', function () {
            return this._data.length;
        })
        .method('height', function () {
            var size = this.size();
            var height = 0;
            while(size > 0) {
                height++;
                size = Math.floor(size / 2);
            }
            return height;
        })
        .method('parent', function (n) {
            return (n <= 0 ? -1 : Math.floor((n - 1) / 2));
        })
        .method('lchild', function (n) {
            if(n < 0) return 0;
            return 2 * n + 1;
        })
        .method('rchild', function (n) {
            if(n < 0) return 0;
            return 2 * n + 2;
        })
        .method('_swap', function (arr, index1, index2) {
            var tmp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = tmp;
        })
        .method('_heapFixUp', function (arr, index, comparator) { // while larger/smaller than parent, swap with parent
            for(var i = index,
                    j = Heap.prototype.parent(i);
                (j >= 0 && i != 0) && comparator(arr[j], arr[i]) === 1;
                i = j, j = Heap.prototype.parent(i)) {
                Heap.prototype._swap(arr, i, j);
            }
        })
        .method('_heapFixDown', function (arr, index, n, comparator) {
            for(var lchild = Heap.prototype.lchild(index),
                     rchild = Heap.prototype.rchild(index);
                 lchild < n;
                 index = lchild, lchild = Heap.prototype.lchild(index), rchild = Heap.prototype.rchild(index)) {

                if (rchild < n && comparator(arr[rchild], arr[lchild]) === 1) lchild = rchild; // let lchild be the smaller child

                if (comparator(arr[lchild], arr[index]) !== 1) break;

                Heap.prototype._swap(arr, index, lchild);
            }
        })
        .method('push', function (v) {
            this._data.push(v);

            Heap.prototype._heapFixUp(this._data, this._data.length - 1, this.comparator);

            return this;
        })
        .method('pop', function () {
            Heap.prototype._swap(this._data, 0, this._data.length - 1);
            this._data.pop();

            Heap.prototype._heapFixDown(this._data, 0, this._data.length, this.comparator);

            return this;
        })
        .method('top', function () {
            if(this._data.length == 0) return null;
            return this._data[0];
        })
        .method('heapSort', function (arr, type, comparator, noNeedToBuild) {
            if(!type) var type = 0; // min-heap
            if (!comparator) {
                var comparator = (type == 0 ?
                    (function (v1, v2) { return (v1 < v2 ? 1 : (v1 > v2 ? -1 : 0)); }) :
                    (function (v1, v2) { return (v1 > v2 ? 1 : (v1 < v2 ? -1 : 0)); }));
            }
            if(!noNeedToBuild) {
                Heap.prototype.heapBuild(arr, type, comparator);
            }
            for(var i = arr.length - 1; i >= 1; i--) {
                Heap.prototype._swap(arr, 0, i);
                Heap.prototype._heapFixDown(arr, 0, i, comparator);
            }
            return arr;
        })
        .method('sort', function () { // min-heap will be descending, max-heap will be ascending.
            Heap.prototype.heapSort(this._data, this._type, this.comparator, true);

            return this;
        })
        .method('heapBuild', function (arr, type, comparator) {
            if(!type) var type = 0; // min-heap
            if (!comparator) {
                var comparator = (type == 0 ?
                    (function (v1, v2) { return (v1 < v2 ? 1 : (v1 > v2 ? -1 : 0)); }) :
                    (function (v1, v2) { return (v1 > v2 ? 1 : (v1 < v2 ? -1 : 0)); }));
            }
            for(var i = arr.length / 2; i >= 0; i--) {
                Heap.prototype._heapFixDown(arr, i, arr.length, comparator);
            }
        })
        .method('build', function (arr) {
            // check arguments:
            // todo

            this._data = arr.slice(0);

            Heap.prototype.heapBuild(this._data, this._type, this.comparator);

            return this;
        })
        .method('toString', function () {
            return this._data.toString();
        })
        .method('print', function () {
            console.log(this.toString());
        });
})(Comparator);


(function () { // test

    return; // not execute tests

    var arr = [];
    for(var i = 0; i < 100; i++) arr.push(Math.floor(Math.random() * 100));

    console.log('Array: ');
    console.log(arr);

    console.log('Build min-heap: ');
    var heap = new Heap(arr, 0, function (v1, v2) {
        return (v1%10) < (v2%10);
    });
    heap.print();

    console.log('Sort min-heap: ');
    heap.sort();
    heap.print();

    console.log('Build max-heap: ');
    heap = new Heap(arr, 1, function (v1, v2) { return v1 > v2; });
    heap.print();

    console.log('Sort max-heap: ');
    heap.sort();
    heap.print();

    console.log('Array after min-heap sort: ');
    console.log(Heap.prototype.heapSort(arr, 0));

    console.log('Array after max-heap sort: ');
    console.log(Heap.prototype.heapSort(arr, 1));
})
();