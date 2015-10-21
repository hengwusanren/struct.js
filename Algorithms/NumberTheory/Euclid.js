/**
 * Created by hengwu on 2015/10/19.
 */

var Euclid = {
    run_recurse: function (a, b) {
        if(b == 0) return a;
        return this.run_recurse(b, a % b);
    },
    run: function (a, b) {
        if (a < b) {
            var c = a;
            a = b;
            b = c;
        }
        var r = a % b;
        while (r != 0) {
            a = b;
            b = r;
            r = a % b;
        }
        return b;
    }
};