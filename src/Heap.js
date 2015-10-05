/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * Heap
 ********************************/
var Heap = (function () {

    "use strict";

    return function (arr, type) {
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

        this.minBuild(arr);
    }
        .method('size', function () {
            return this._data.length;
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
        .method('_minHeapFixUp', function (arr, index) { // while larger than parent, swap with parent
            for(var i = index,
                    j = Heap.prototype.parent(i);
                (j >= 0 && i != 0) && arr[i] > arr[j];
                i = j, j = Heap.prototype.parent(i)) {
                Heap.prototype._swap(arr, i, j);
            }
        })
        .method('_minHeapFixDown', function (arr, index, n) {
            for(var lchild = Heap.prototype.lchild(index),
                     rchild = Heap.prototype.rchild(index);
                 lchild < n;
                 index = lchild, lchild = Heap.prototype.lchild(index), rchild = Heap.prototype.rchild(index)) {

                if (rchild < n && arr[rchild] < arr[lchild]) lchild = rchild; // let lchild be the smaller child

                if (arr[lchild] >= arr[index]) break;

                Heap.prototype._swap(arr, index, lchild);
            }
        })
        .method('minPush', function (v) {
            this._data.push(v);
            Heap.prototype._minHeapFixUp(this._data, this._data.length - 1);
            return this;
        })
        .method('minPop', function () {
            Heap.prototype._swap(this._data, 0, this._data.length - 1);
            this._data.pop();
            Heap.prototype._minHeapFixDown(this._data, 0, this._data.length);
        })
        .method('minHeapSort', function (arr, noNeedToBuild) {
            if(!noNeedToBuild) {
                Heap.prototype.minHeapBuild(arr);
            }
            for(var i = arr.length - 1; i >= 1; i--) {
                Heap.prototype._swap(arr, 0, i);
                Heap.prototype._minHeapFixDown(arr, 0, i);
            }
            return arr;
        })
        .method('minSort', function () { // descending
            Heap.prototype.minHeapSort(this._data, true);
            return this;
        })
        .method('minHeapBuild', function (arr) {
            for(var i = arr.length / 2; i >= 0; i--) {
                Heap.prototype._minHeapFixDown(arr, i, arr.length);
            }
        })
        .method('minBuild', function (arr) {
            // check arguments:
            // todo

            this._data = arr.slice(0);
            Heap.prototype.minHeapBuild(this._data);
            return this;
        })
        .method('toString', function () {
            return this._data.toString();
        })
        .method('print', function () {
            console.log(this.toString());
        });
})();


(function () { // test

    return; // not execute tests

    var arr = [];
    for(var i = 0; i < 100; i++) arr.push(Math.floor(Math.random() * 100));

    console.log('Array: ');
    console.log(arr);

    console.log('Build min-heap: ');
    var heap = new Heap(arr);
    heap.print();

    console.log('Sort min-heap: ');
    heap.minSort();
    heap.print();

    console.log('Array after sort: ');
    console.log(Heap.prototype.minHeapSort(arr));
})
();