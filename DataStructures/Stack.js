/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * Stack
 ********************************/
var Stack = (function (SuperArrayList) {

    "use strict";

    if (!SuperArrayList) return null;

    return function (sizeLimit, arr, clone) {
        // check arguments:
        // todo

        SuperArrayList.apply(this, arguments);
    }
        .inherits(SuperArrayList)
        .method('top', function () {
            return this.back();
        })
        .method('popUntil', function (value, comparator) {
            // check arguments:
            // todo

            // todo

            return this;
        });
})(ArrayList);


(function () { // test

    return; // not execute tests

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
})
();