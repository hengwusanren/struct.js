/**
 * Created by v-kshe on 9/15/2015.
 */

var ArrayList = (function (SuperList) {
    if(!SuperList) return null;

    return function (sizeLimit, arr, ifInSpace) {
        // check arguments:
        // todo

        SuperList.call(this, 1, sizeLimit);

        if(!arr) arr = [];
        this._data = (!ifInSpace) ? arr : arr.clone();

        this._size = this._data.length;
        if(this._capacity > 0) {
            // shrink:
            while (this._size > this._capacity) {
                this._data.pop();
                this._size--;
            }
        }
    }
        .inherits(SuperList)
        .method('resizeTo', function (sizeLimit) {
            // check arguments:
            // todo

            if(sizeLimit < 1 || this._capacity == sizeLimit) return this;
            if(this._capacity < sizeLimit) {
                this._capacity = sizeLimit;
                return this;
            }
            this._capacity = sizeLimit;

            while (this._size > sizeLimit) {
                this._data.pop();
                this._size--;
            }
            return this;
        })
        .method('toString', function () {
            if(this._size == 0) return "";
            var str = this._data[0].toString();
            for (var i = 1; i < this._size; i++) {
                str += ", " + this._data[i].toString();
            }
            return str;
        });
})(List);


function test() {
    var n = 5;

    var alist1 = new ArrayList(n);
    var alist2 = new ArrayList(n, [0,1,2]);

    alist1.print();
    alist2.print();
}
//test();