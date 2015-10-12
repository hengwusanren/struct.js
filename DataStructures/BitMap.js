/**
 * Created by hengwu on 2015/10/11.
 */

/**
 * BitMap
 * 事实上 JS 并没有真正意义的 Array，Array 的内存并不一定是连续的
 * 因此一个 Array 所占的内存不能用静态语言中的 sizeof 直接计算
  */

var BitMap = (function () {
    "use strict";
    return function (size, bucketSize) {
        this.bucketSize = bucketSize;
        this._capacity = Math.ceil(size / this.bucketSize);
        this._data = new (this.arrayTypes[this.bucketSize])(this._capacity).fill(0);
        this._size = 0;
    }
        .property('arrayTypes', {
            '8': Uint8Array,
            '16': Uint16Array,
            '32': Uint32Array
        })
        .method('capacity', function () {
            return this._capacity;
        })
        .method('size', function () {
            return this._size;
        })
        .method('contains has', function (v) {
            if(v >= this.bucketSize * this._capacity || v < 0) return false;
            var bucket = this._data[Math.floor(v / this.bucketSize)],
                bonus = v % this.bucketSize; // can be optimised by Bit Manipulation
            return ((bucket >> bonus) & 1) === 1;
        })
        .method('add', function (v) {
            if(v >= this.bucketSize * this._capacity || v < 0) return false;
            var index = Math.floor(v / this.bucketSize),
                bucket = this._data[index],
                bonus = v % this.bucketSize; // can be optimised by Bit Manipulation
            if(((bucket >> bonus) & 1) === 1) return this;
            this._data[index] = (bucket | (1 << bonus));
            this._size++;
            return this;
        })
        .method('remove', function (v) {
            if(v >= this.bucketSize * this._capacity || v < 0) return false;
            var index = Math.floor(v / this.bucketSize),
                bucket = this._data[index],
                bonus = v % this.bucketSize; // can be optimised by Bit Manipulation
            if(((bucket >> bonus) & 1) === 1) {
                this._data[index] = (bucket & ((-1) ^ (1 << bonus)));
                this._size--;
            }
            return this;
        })
        .method('clear', function () {
            this._data = new (this.arrayTypes[this.bucketSize])(this._capacity).fill(0);
            this._size = 0;
            return this;
        })
        .method('numToBinString', function (dec){
            var s = (dec >>> 0).toString(2);
            return (new Array(this.bucketSize - s.length)).fill(0).join('') + s;
        })
        .method('toString', function () {
            var s = '';
            for(var i = 0; i < this._capacity; i++) {
                s += this.numToBinString(this._data[i]) + '\n';
            }
            return s;
        })
        .method('print', function () {
            console.log(this.toString());
        });
})();

(function () {
    return; // not test

    var bm = new BitMap(100, 8);
    bm.print();
})
();