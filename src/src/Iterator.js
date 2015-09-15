/**
 * Created by v-kshe on 9/15/2015.
 */

var Iterator = function (list, hasNext, next) {
    // check arguments:
    // todo

    return {
        host: list,
        value: list.head(),
        index: 0,
        hasNext: function () {
            return this.index >= this.host.size();
        },
        next: function () {
            if(!this.hasNext()) return null;

        }
    };
};