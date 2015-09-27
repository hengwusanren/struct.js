/**
 * Created by hengwu on 2015/9/27.
 */

var Identifier = function (id, numeric) {

    "use strict";

    // check arguments:
    // todo

    if(id != null && !isNaN(parseInt(id))) {
        Object.defineProperty(this, '_id', {
            value: parseInt(id),
            writable: false
        });
    }
    var _id = Guid();
    if(numeric) _id = _id.hashCode();
    this.id = function () {
        if(!this.hasOwnProperty('_id')) {
            Object.defineProperty(this, '_id', {
                value: _id,
                writable: false
            });
        }
        return this._id;
    };
};