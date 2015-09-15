/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * Queue
 */
var Queue = function (arr, size, ifInSpace) {
    // check arguments:
    // todo

    var data = ifInSpace ? arr : arr.slice(0);
    this.capacity = size <= 0 ? -1 : size; // -1 means no capacity limit.
    var curSize = data.length;
    if (this.capacity > 0) {
        while (curSize > this.capacity) {
            data.pop();
            curSize--;
        }
    }

    /**
     * pop
     * @returns {*}
     */
    this.pop = function () {
        if (curSize > 0) {
            var top = data[data.length - 1];
            Array.prototype.pop.apply(data);
            curSize--;
            return top;
        }
        return null;
    };

    /**
     * push
     * @param ele
     */
    this.push = function (ele) {
        // check arguments:
        // todo

        if (this.capacity < 0 || this.capacity > curSize) {
            Array.prototype.push.apply(data, arguments);
            curSize++;
        }
    };

    /**
     * clear
     */
    this.clear = function () {
        data.length = 0;
        curSize = 0;
    };

    /**
     * isEmpty
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return curSize == 0;
    };

    /**
     * size
     * @returns {number}
     */
    this.size = function () {
        return curSize;
    };

    this.toString = function () {
        if (curSize == 0) return "";
        var str = data[0].toString();
        for (var i = 1; i < curSize; i++) {
            str += " > " + data[i].toString();
        }
        return str;
    };

    this.print = function () {
        console.log(this.toString());
    };
};