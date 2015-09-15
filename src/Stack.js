/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * Stack
 */
var Stack = (function (SuperArrayList) {
    if (!SuperArrayList) return null;

    return function (sizeLimit, arr, ifInSpace) {
        // check arguments:
        // todo

        SuperArrayList.call(this, sizeLimit, arr, ifInSpace);
    }
        .inherits(SuperArrayList)
        .method('push', function (ele) {
            // check arguments:
            // todo

            if (this._capacity < 0 || this._capacity > this._size) {
                Array.prototype.push.apply(this._data, arguments);
                this._size++;
            }
        })
        .method('pop', function () {
            if (this._size > 0) {
                var top = this._data[this._data.length - 1];
                Array.prototype.pop.apply(this._data);
                this._size--;
                return top;
            }
            return null;
        })
        .method('clear', function () {
            this._data.length = 0;
            this._size = 0;
        })
        .method('toString', function () {
            if (this._size == 0) return "";
            var str = this._data[0].toString();
            for (var i = 1; i < this._size; i++) {
                str += " > " + this._data[i].toString();
            }
            return str;
        });
})(ArrayList);


function test() {
    var s = new Stack(8, [1, 2, 3, 4]);
    s.print();
    s.push("test");
    s.print();
    s.pop();
    s.pop();
    s.pop();
    s.push(new Date());
    s.print();
    console.log(s.size());
    s.clear();
    console.log(s.isEmpty());
    s.print();
}
test();