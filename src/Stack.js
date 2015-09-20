/**
 * Created by hengwu on 2015/9/14.
 */

/********************************
 * Stack
 ********************************/
var Stack = (function (SuperArrayList) {
    if (!SuperArrayList) return null;

    return function (sizeLimit, arr, ifInSpace) {
        // check arguments:
        // todo

        SuperArrayList.call(this, sizeLimit, arr, ifInSpace);
    }
        .inherits(SuperArrayList)
        .method('top', function () {
            return this.back();
        });
})(ArrayList);


(function () {
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