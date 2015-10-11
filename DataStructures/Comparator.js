/**
 * Created by hengwu on 2015/10/7.
 */

var Comparator = function (largerOrNot) {

    "use strict";

    // check arguments:
    // todo

    if (arguments.length < 1) {
        throw new Error('Wrong parameter.');
        return null;
    }

    this.comparator = function (v1, v2) {
        if(largerOrNot(v1, v2)) return 1;
        if(largerOrNot(v2, v1)) return -1;
        return 0;
    };
};