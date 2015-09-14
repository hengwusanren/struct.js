/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * Stack
 */
function Stack (arr, size, ifInSpace) {
    // check arguments:
    // todo

    this.data = ifInSpace ? arr : arr.slice(0);
    this.capacity = size <= 0 ? -1 : size; // -1 means no capacity limit.
    var curSize = this.data.length;
    if(this.capacity > 0) {
        while (curSize > this.capacity) {
            this.data.pop();
            curSize--;
        }
    }

    this.pop = function() {
        if(curSize > 0) {
            var top = this.data[this.data.length - 1];
            Array.prototype.pop.apply(this.data);
            curSize--;
            return top;
        }
        return null;
    };

    this.push = function(ele) {
        // check arguments:
        // todo

        if(this.capacity < 0 || this.capacity > curSize) {
            Array.prototype.push.apply(this.data, arguments);
            curSize++;
        }
    };

    this.size = function() {
        return curSize;
    };

    this.toString = function() {
        if(curSize == 0) return "";
        var str = this.data[0].toString();
        for(var i = 1; i < curSize; i++) {
            str += " > " + this.data[i].toString();
        }
        return str;
    };

    this.print = function() {
        console.log(this.toString());
    };
}


function test() {
    var s = new Stack([1, 2, 3, 4], 8);
    s.print();
    s.push("sdffw");
    s.print();
    s.pop();
    s.pop();
    s.pop();
    s.pop();
    s.pop();
    s.pop();
    s.pop();
    s.print();
    console.log(s.size());
}
test();