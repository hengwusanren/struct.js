/**
 * Created by hengwu on 2015/10/27.
 */

var LRUCache = (function (SuperQueue, SuperMap) {

    "use strict";

    if (!SuperQueue || !SuperMap) return null;

    return function (sizeLimit) {
        this._capacity = sizeLimit;
        this.queue = new SuperQueue();
        this.index = new SuperMap();
        this.data = new SuperMap();
    }
        .method('size', function () {
            return this.queue.size();
        })
        .method('_raise', function (key, noNeedToCheck) {
            if(!noNeedToCheck) {
                if(!this.index.contains(key)) return;
            }
            this.queue.push(this.queue.drop(this.index.get(key)).value);
            this.index.put(key, this.queue.bottom());
        })
        .method('get', function (key) {
            if(!this.index.contains(key)) return null;
            this._raise(key, true);
            return this.data.get(key);
        })
        .method('set', function (key, value) {
            if(this.index.contains(key)) {
                this._raise(key, true);
            } else {
                if(this.size() == this._capacity) {
                    var t = this.queue.top();
                    this.data.remove(t);
                    this.index.remove(t);
                    this.queue.pop();
                }
                this.index.put(key, this.queue.bottom());
                this.queue.push(key);
            }
            this.data.put(key, value);
        });
})(Queue, HashMap);