/**
 * Created by hengwu on 2015/10/11.
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
        .method('contains has', function () {})
        .method('add', function () {})
        .method('remove', function () {})
        .method('clear', function () {})
        .method('numToBinString', function (dec){
            return (dec >>> 0).toString(2);
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
    var bm = new BitMap(100, 8);
    bm.print();
})
();