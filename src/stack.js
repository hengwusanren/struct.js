/**
 * Created by hengwu on 2015/9/14.
 */

/**
 * Stack
 */
function Stack (arr, size, ifInSpace) {
    // check argument:
    // todo

    this.data = ifInSpace ? arr : arr.slice(0);
    this.capacity = size;
    this.size = this.data.length;
    while(this.size > this.capacity) {
        this.data.pop();
        this.size--;
    }

    this.pop = function() {
        Array.pop.apply(this.data);
    };

    this.toString = function() {
        if(this.size == 0) return "";
        var str = this.data[0].toString();
        for(var i = 1; i < this.size; i++) {
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
}
test();