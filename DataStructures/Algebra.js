/**
 * Created by hengwu on 2015/9/24.
 */

var Vector = (function () {
    "use strict";

    return function (arrOrValue, size) {
        // check arguments:
        // todo

        if(arguments.length >= 2) {
            if(isNaN(parseInt(size))) {
                throw new Error('Wrong parameters. A size of array is needed');
                return null;
            } else {
                size = parseInt(size);
                if(size < 0) size = -size;
                arrOrValue = (arrOrValue == null ? 0 : arrOrValue);
                this._data = new Array(size);
                for(var i = 0; i < size; i++) this._data[i] = arrOrValue;
            }
        } else if(arguments.length == 1 && Array.isArray(arrOrValue)) {
            this._data = arrOrValue;
        } else this._data = [];
    }
        .method('data', function () {
            return this._data;
        })
        .method('clone', function () {
            var len = this.size(),
                arr = new Array(len);
            for(var i = 0; i < len; i++) {
                arr[i] = this._data[i];
            }
            return new Vector(arr);
        })
        .method('front', function () {
            if(this.isEmpty()) return null;
            return this._data[0];
        })
        .method('back', function () {
            if(this.isEmpty()) return null;
            return this._data[this._data.length - 1];
        })
        .method('get', function (index) {
            return this._data[index];
        })
        .method('set', function (index, value) {
            this._data[index] = value;
            return this;
        })
        .method('size', function () {
            return this._data.length;
        })
        .method('isEmpty', function () {
            return this.size() == 0;
        })
        .method('push', function (v) {
            if(!Array.isArray(v)) {
                this._data.push(v);
            } else {
                for(var i = 0, len = v.length; i < len; i++) this._data.push(v[i]);
            }
            return this;
        })
        .method('rpush', function (v) {
            if(!Array.isArray(v)) {
                this._data.unshift(v);
            } else {
                for(var i = v.length - 1; i >= 0; i--) this._data.unshift(v[i]);
            }
            return this;
        })
        .method('pop', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this._data.pop();
                n--;
            }
            return this;
        })
        .method('rpop', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this._data.shift();
                n--;
            }
            return this;
        })
        .method('each', function (callback) {
            for(var i = 0, len = this._data.length; i < len; i++) {
                callback(this._data[i]);
            }
            return this;
        })
        .method('subset', function (begin, length) {
            var arr = [];
            for(var i = begin; i < begin + length; i++) {
                arr.push(this._data[i]);
            }
            return new Vector(arr);
        })
        .method('add', function (vec, adder) {
            if(!(vec instanceof Vector)) {
                if(typeof vec !== 'number') {
                    throw new Error('The parameter should be a Number or Vector.');
                    return null;
                } else {
                    var arr = [];
                    for(var i = 0, len = this.size(); i < len; i++) {
                        arr.push(adder ? adder(this._data[i], vec) : (this._data[i] + vec));
                    }
                    return new Vector(arr);
                }
            }
            if(this.size() != vec.size()) {
                throw new Error('Different sizes.');
                return null;
            }
            var arr = [];
            for(var i = 0, len = this.size(); i < len; i++) {
                arr.push(adder ? adder(this._data[i], vec.get(i)) : (this._data[i] + vec.get(i)));
            }
            return new Vector(arr);
        })
        .method('subtract', function (vec) {
            return this.add(vec, function (v1, v2) {
                return v1 - v2;
            });
        })
        .method('multiply', function (vec, multiplier) {
            if(!(vec instanceof Vector)) {
                if(typeof vec !== 'number') {
                    throw new Error('The parameter should be a Number or Vector.');
                    return null;
                } else {
                    var arr = [];
                    for(var i = 0, len = this.size(); i < len; i++) {
                        arr.push(multiplier ? multiplier(this._data[i], vec) : (this._data[i] * vec));
                    }
                    return new Vector(arr);
                }
            }
            if(this.size() != vec.size()) {
                throw new Error('Different sizes.');
                return null;
            }
            var sum = 0;
            for(var i = 0, len = this.size(); i < len; i++) {
                sum += (multiplier ? multiplier(this._data[i], vec.get(i)) : (this._data[i] * vec.get(i)));
            }
            return sum;
        })
        .method('xMultiply', function (vec) {
            if(this.size() !== 3 || !(vec instanceof Vector) || vec.size() !== 3) return null;
            var ret = Vector.prototype.zeros(3);
            ret.set(0, this.get(1) * vec.get(2) - this.get(2) * vec.get(1));
            ret.set(1, this.get(2) * vec.get(0) - this.get(0) * vec.get(2));
            ret.set(2, this.get(0) * vec.get(1) - this.get(1) * vec.get(0));
            return ret;
        })
        .method('init', function (val, size) {
            if(arguments.length == 0) {
                throw new Error('A size is needed.');
                return null;
            }
            var arr = [];
            while(size > 0) {
                arr.push(0);
                size--;
            }
            return new Vector(arr);
        })
        .method('zeros', function (size) {
            return Vector.prototype.init(0, size);
        })
        .method('ones', function (size) {
            return Vector.prototype.init(1, size);
        })
        .method('median', function () {
            var n = this.size();
            if(n == 0) return null;
            var arr = this._data.slice(0);
            arr.sort();
            if(n % 2 === 0) return (this._data[n / 2] + this._data[n / 2 - 1]) / 2;
            return this._data[(n - 1) / 2];
        })
        .method('mean', function () {
            var n = this.size();
            if(n == 0) return 0;
            var s = 0;
            for(var i = 0; i < n; i++) {
                s += this._data[i];
            }
            return s/n;
        })
        .method('modulus', function () {
            var s = 0;
            for(var i = 0, n = this.size(); i < n; i++) {
                s += this._data[i] * this._data[i];
            }
            if(s == 0) return 0;
            return Math.pow(s, 1/2);
        })
        .method('normalize', function () {
            var mod = this.modulus();
            if(mod != 0) {
                for (var i = 0, n = this.size(); i < n; i++) {
                    this._data[i] /= mod;
                }
            }
            return this;
        })
        .method('variance', function () {
            var n = this.size();
            if(n == 0) return 0;
            var m = this.mean();
            var s = 0;
            for(var i = 0; i < n; i++) {
                s += Math.pow(this._data[i] - m, 2);
            }
            return s/n;
        })
        .method('equals', function (v) {
            if(this.size() !== v.size()) {
                return false;
            }
            var len = this.size();
            for(var i = 0; i < len; i++) {
                if(this._data[i] !== v.get(i)) return false;
            }
            return true;
        })
        .method('toString', function () {
            return '(' + this._data.toString() + ')';
        })
        .method('print', function () {
            console.log(this.toString());
        })
})();

var Matrix = (function () {
    "use strict";

    return function (arrOrValue, size) {
        // check arguments:
        // todo

        if(arguments.length >= 2) {
            if(!this.sizeValid(size)) {
                throw new Error('Wrong format of the matrix size.');
                return null;
            } else {
                var vsize = parseInt(size[0]),
                    hsize = parseInt(size[1]);
                if(vsize < 0) vsize = -vsize;
                if(hsize < 0) hsize = -hsize;
                arrOrValue = (arrOrValue == null ? 0 : arrOrValue);
                this._data = new Array(vsize);
                for(var i = 0; i < vsize; i++) {
                    this._data[i] = new Array(hsize);
                    for(var j = 0; j < hsize; j++) {
                        this._data[i][j] = arrOrValue;
                    }
                }
            }
        } else if(arguments.length == 1 && Array.isArray(arrOrValue)
            && (function () {
                for(var i = 0, len = arrOrValue.length; i < len; i++) {
                    if(!Array.isArray(arrOrValue[i])) return false;
                }
                return true;
            })()) {
            this._data = arrOrValue;
        } else this._data = [[]];
    }
        .method('data', function () {
            return this._data;
        })
        .method('clone', function () {
            var vlen = this.vsize(),
                arr = new Array(vlen);
            for(var i = 0, hlen = this.hsize(); i < vlen; i++) {
                var curRow = this._data[i];
                arr[i] = new Array(hlen);
                for(var j = 0; j < hlen; j++) {
                    arr[i][j] = curRow[j];
                }
            }
            return new Matrix(arr);
        })
        .method('sizeValid', function (size) {
            return Array.isArray(size) && size.length === 2
                && !isNaN(parseInt(size[0])) && !isNaN(parseInt(size[1]));
        })
        .method('vsize', function () {
            return this._data.length;
        })
        .method('hsize', function () {
            return this.vsize() == 0 ? 0 : this._data[0].length;
        })
        .method('row', function (rowIndex) {
            if(this.vsize() == 0) return null;
            return new Vector(this._data[rowIndex]);
        })
        .method('col', function (colIndex) {
            if(this.hsize() == 0) return null;
            var curCol = new Array(this.vsize());
            for(var ri = 0, rnum = this.vsize(); ri < rnum; ri++) {
                curCol[ri] = this._data[ri][colIndex];
            }
            return new Vector(curCol);
        })
        .method('get', function (rowIndex, colIndex) {
            return this._data[rowIndex][colIndex];
        })
        .method('set', function (rowIndex, colIndex, value) {
            this._data[rowIndex][colIndex] = value;
        })
        .method('frontRow', function () {
            if(this.vsize() == 0) return null;
            return this.row(0);
        })
        .method('backRow', function () {
            if(this.vsize() == 0) return null;
            return this.row(this.vsize() - 1);
        })
        .method('frontCol', function () {
            if(this.hsize() == 0) return null;
            return this.col(0);
        })
        .method('backCol', function () {
            if(this.hsize() == 0) return null;
            return this.col(this.hsize() - 1);
        })
        .method('size', function () {
            return [this.vsize(), this.hsize()];
        })
        .method('isEmpty', function () {
            return this.hsize() == 0;
        })
        .method('push pushRow', function (arr, asVector) {
            if(!asVector && !Array.isArray(arr) || arr.length !== this.hsize()) {
                throw new Error('Wrong row to add.');
                return this;
            } else if(asVector && (!(arr instanceof Vector) || arr.size() !== this.hsize())) {
                throw new Error('Wrong row to add.');
                return this;
            }
            this._data.push(asVector ? arr.data() : arr);
            return this;
        })
        .method('rpush rpushRow', function (arr, asVector) {
            if(!asVector && !Array.isArray(arr) || arr.length !== this.hsize()) {
                throw new Error('Wrong row to add.');
                return this;
            } else if(asVector && (!(arr instanceof Vector) || arr.size() !== this.hsize())) {
                throw new Error('Wrong row to add.');
                return this;
            }
            this._data.unshift(asVector ? arr.data() : arr);
            return this;
        })
        .method('pop popRow', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this._data.pop();
                n--;
            }
            return this;
        })
        .method('rpop rpopRow', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this._data.shift();
                n--;
            }
            return this;
        })
        .method('pushCol', function (arr, asVector) {
            if(!asVector && !Array.isArray(arr) || arr.length !== this.vsize()) {
                throw new Error('Wrong column to add.');
                return this;
            } else if(asVector && (!(arr instanceof Vector) || arr.size() !== this.vsize())) {
                throw new Error('Wrong column to add.');
                return this;
            }
            for(var i = 0, rnum = this.vsize(); i < rnum; i++) {
                this._data[i].push(asVector ? arr.get(i) : arr[i]);
            }
            return this;
        })
        .method('rpushCol', function (arr, asVector) {
            if(!asVector && !Array.isArray(arr) || arr.length !== this.vsize()) {
                throw new Error('Wrong column to add.');
                return this;
            } else if(asVector && (!(arr instanceof Vector) || arr.size() !== this.vsize())) {
                throw new Error('Wrong column to add.');
                return this;
            }
            for(var i = 0, rnum = this.vsize(); i < rnum; i++) {
                this._data[i].unshift(asVector ? arr.get(i) : arr[i]);
            }
            return this;
        })
        .method('eachRow', function (callback) {
            for(var i = 0, len = this.vsize(); i < len; i++) {
                callback(this.row(i));
            }
            return this;
        })
        .method('eachCol', function (callback) {
            for(var i = 0, len = this.hsize(); i < len; i++) {
                callback(this.col(i));
            }
            return this;
        })
        .method('popCol', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this.eachRow(function (r) {
                    Vector.prototype.pop.call(r);
                });
                n--;
            }
            return this;
        })
        .method('rpopCol', function (n) {
            if(arguments.length == 0) var n = 1;
            while(n > 0) {
                this.eachRow(function (r) {
                    Vector.prototype.rpop.call(r);
                });
                n--;
            }
            return this;
        })
        .method('each', function (callback) {
            this.eachRow(function (r) {
                Vector.prototype.each.call(r, callback);
            });
            return this;
        })
        .method('subset', function (rbegin, rlength, cbegin, clength) {
            // check arguments:
            // todo

            if(rbegin < 0 || (rlength <= 0 && rlength !== -1)
                || (rlength !== -1 && rbegin + rlength > this.vsize())
                || (rlength === -1 && rbegin >= this.vsize())
                || cbegin < 0 || (clength <= 0 && clength !== -1)
                || (clength !== -1 && cbegin + clength > this.hsize())
                || (clength === -1 && cbegin >= this.hsize())) {
                throw new Error('Wrong range.')
                return this;
            }

            var arrArr = [],
                rend = (rlength == -1 ? this.vsize() : (rbegin + rlength)),
                cend = (clength == -1 ? this.hsize() : (cbegin + clength));
            for(var i = rbegin; i < rend; i++) {
                var curRow = this._data[i],
                    newRow = [];
                for(var j = cbegin; j < cend; j++) {
                    newRow.push(curRow[j]);
                }
                arrArr.push(newRow);
            }
            return new Matrix(arrArr);
        })
        .method('sizeEqual', function (mat) {
            // check arguments:
            // todo

            var size = this.size(),
                size1 = Matrix.prototype.size.call(mat);
            return (size1 && size1[0] === size[0] && size1[1] === size[1]);
        })
        .method('isSquare', function () {
            return this.vsize() === this.hsize();
        })
        .method('add', function (mat, adder) {
            if(!(mat instanceof Matrix)) {
                if(typeof mat !== 'number') {
                    throw new Error('The parameter should be a Number or Matrix.');
                    return null;
                } else {
                    var arrArr = [];
                    for(var i = 0, vlen = this.vsize(); i < vlen; i++) {
                        var curRow = this._data[i],
                            newRow = [];
                        for(var j = 0, hlen = this.hsize(); j < hlen; j++) {
                            newRow.push(adder ? adder(curRow[j], mat) : (curRow[j] + mat));
                        }
                        arrArr.push(newRow);
                    }
                    return new Matrix(arrArr);
                }
            }
            if(!this.sizeEqual(mat)) {
                throw new Error('Different sizes.');
                return null;
            }
            var arrArr = [];
            for(var i = 0, vlen = this.vsize(); i < vlen; i++) {
                var curRow = this._data[i],
                    newRow = [];
                for(var j = 0, hlen = this.hsize(); j < hlen; j++) {
                    newRow.push(adder ? adder(curRow[j], mat.get(i, j)) : (curRow[j] + mat.get(i, j)));
                }
                arrArr.push(newRow);
            }
            return new Matrix(arrArr);
        })
        .method('subtract', function (mat) {
            return this.add(mat, function (v1, v2) {
                return v1 - v2;
            });
        })
        .method('trans transpose', function () {
            var arrArr = [];
            for(var j = 0, hlen = this.hsize(); j < hlen; j++) {
                arrArr.push([]);
            }
            for(var i = 0, vlen = this.vsize(); i < vlen; i++) {
                var curRow = this._data[i];
                for(var j = 0, hlen = this.hsize(); j < hlen; j++) {
                    arrArr[j].push(curRow[j]);
                }
            }
            return new Matrix(arrArr);
        })
        .method('multiply', function (mat) {
            // check arguments:
            // todo

            if(mat.vsize() !== this.hsize()) {
                throw new Error('Wrong size.');
                return this;
            }
            var newSize = [this.vsize(), mat.hsize()];
            var arrArr = new Array(newSize[0]);
            for(var i = 0; i < newSize[0]; i++) {
                var newRow = new Array(newSize[1]),
                    curRow = this._data[i];
                for(var j = 0; j < newSize[1]; j++) {
                    var sum = 0;
                    for (var k = 0, hsize = this.hsize(); k < hsize; k++) {
                        sum += curRow[k] * mat.get(k, j);
                    }
                    newRow[j] = sum;
                }
                arrArr[i] = newRow;
            }
            return new Matrix(arrArr);
        })
        .method('power', function (n) { // to be tested
            if(n < 0) {
                return this.power(-n).inv();
            } else if(n == 0) {
                return this.ones(this.size());
            } else if(n == 1) {
                return this.clone();
            } else {
                var h = Math.floor(n / 2);
                var hp = this.power(h),
                    p = hp.multiply(hp);
                if(p > hp * 2) return this.multiply(p);
                return p;
            }
        })
        .method('sqrt', function () {})
        .method('init', function (val, size) {
            if(arguments.length == 0) {
                throw new Error('A size is needed.');
                return null;
            }
            if(!Matrix.prototype.sizeValid(size)) {
                throw new Error('Wrong format of the matrix size.');
                return null;
            }
            var arrArr = new Array(size[0]);
            for(var i = 0; i < size[0]; i++) {
                var newRow = new Array(size[1]);
                for(var j = 0; j < size[1]; j++) {
                    newRow[j] = val;
                }
                arrArr[i] = newRow;
            }
            return new Matrix(arrArr);
        })
        .method('zeros', function (size) {
            return Matrix.prototype.init(0, size);
        })
        .method('ones', function (size) {
            return Matrix.prototype.init(1, size);
        })
        .method('eye', function (size) {
            if(arguments.length == 0) {
                throw new Error('A size is needed.');
                return null;
            }
            if(!Matrix.prototype.sizeValid(size)) {
                throw new Error('Wrong format of the matrix size.');
                return null;
            }
            var arrArr = new Array(size[0]);
            for(var i = 0; i < size[0]; i++) {
                var newRow = new Array(size[1]);
                for(var j = 0; j < size[1]; j++) {
                    newRow[j] = (i == j ? 1 : 0);
                }
                arrArr[i] = newRow;
            }
            return new Matrix(arrArr);
        })
        .method('_childMatrix', function (x, y) {
            var mother = this._data,
                vsize = this.vsize(),
                hsize = this.hsize();
            var child = [];
            for(var i = 0; i < vsize; i++) {
                if(i == x) continue;
                var newRow = [];
                for(var j = 0; j < hsize; j++) {
                    if(j == y) continue;
                    newRow.push(this._data[i][j]);
                }
                child.push(newRow);
            }
            return new Matrix(child);
        })
    /**
     * calculate the determinant
     */
        .method('det', function () { // tobe tested
            var n = this.vsize();
            if(n <= 0 || n !== this.hsize()) return 0;
            if(n == 1) return this._data[0][0];
            if(n == 2) return this._data[0][0] * this._data[1][1] - this._data[1][0] * this._data[0][1];
            // turn to upper triangular matrix:
            // return the product of the entries on the main diagonal:
            return this.clone().format(0, true);
        })
        .method('inv', function () { // tobe finished
            // [A,b]增广矩阵，化为[E,X]
            // 即，将A经过行变换变为E的同时，得到X
            var n = this.vsize(),
                X = Matrix.prototype.eye([n, n]);
            var t = this.clone().format(null, null, function (mat, i, c, j) {
                    if(arguments.length < 3) return mat;
                    if(arguments.length == 3) {
                        var curRow = mat._data[i];
                        for(var k = 0, n = mat.hsize(); k < n; k++) {
                            curRow[k] *= c;
                        }
                        return mat;
                    }
                    if(c == null) {
                        var tmpRow = mat._data[i];
                        mat._data[i] = mat._data[j];
                        mat._data[j] = tmpRow;
                        return mat;
                    }
                    var dstRow = mat._data[j],
                        srcRow = mat._data[i];
                    for(var k = 0, n = mat.hsize(); k < n; k++) {
                        dstRow[k] += srcRow[k] * c;
                    }
                    return mat;
                }, X);
            if(this.multiply(X).equals(Matrix.prototype.eye([n, n]))) console.log('Right!');
            else console.log('Wrong!');
            return X;
        })
        .method('rowTrans', function (i, c, j) {
            if(arguments.length < 2) return this;
            if(arguments.length == 2) {
                var curRow = this._data[i];
                for(var k = 0, n = this.hsize(); k < n; k++) {
                    curRow[k] *= c;
                }
                return this;
            }
            if(c == null) {
                var tmp = this._data[i];
                this._data[i] = this._data[j];
                this._data[j] = tmp;
                return this;
            }
            var dstRow = this._data[j],
                srcRow = this._data[i];
            for(var k = 0, n = this.hsize(); k < n; k++) {
                dstRow[k] += srcRow[k] * c;
            }
            return this;
        })
        .method('colTrans', function (i, c, j) {
            if(arguments.length < 2) return this;
            if(arguments.length == 2) {
                for(var k = 0, n = this.vsize(); k < n; k++) {
                    this._data[k][i] *= c;
                }
                return this;
            }
            if(c == null) {
                for(var k = 0, n = this.vsize(); k < n; k++) {
                    var tmp = this._data[k][i];
                    this._data[k][i] = this._data[k][j];
                    this._data[k][j] = tmp;
                }
                return this;
            }
            for(var k = 0, n = this.vsize(); k < n; k++) {
                this._data[k][j] += this._data[k][i] * c;
            }
            return this;
        })
        .method('rank', function () { // tobe tested
            var m = this.clone();
            var trans = m.format(),
                v = m.vsize(),
                h = m.hsize();
            if(trans.full) return Math.min(v, h);
            return trans.rowOffset;
        })
        .method('invertible nonSingular', function () { // tobe tested
            return this.clone().format().full && this.vsize() === this.hsize();
        })
    /**
     * format to upper/lower triangle matrix
     */
        .method('format', function (type, noNeedToTrans, callback, mat) { // tobe tested
            var prod = 1,
                roffset = 0,
                coffset = 0,
                v = this.vsize(),
                h = this.hsize();
            if(!type) { // upper
                for(; roffset < v && coffset < h;) {
                    // try to make this._data[roffset][coffset] != 0;
                    // if success, make the coffset_th elements of all rows below be 0,
                    //     roffset++, coffset++, continue;
                    // else, if noNeedToTrans, prod = 0, break;
                    //       else, coffset++, continue;
                    var i = 0;
                    if(this._data[roffset][coffset] === 0) {
                        for(i = roffset + 1; i < v; i++) {
                            if(this._data[i][coffset] !== 0) {
                                this.rowTrans(roffset, null, i);
                                if(callback) {
                                    callback(mat, roffset, null, i);
                                }
                                prod *= -1;
                                break;
                            }
                        }
                        if(i == v) { 
                            prod = 0;
                            if(noNeedToTrans) break;
                            coffset++;
                            continue;
                        }
                    }
                    var base = this._data[roffset][coffset];
                    for(i = roffset + 1; i < v; i++) {
                        if(this._data[i][coffset] === 0) continue;
                        this.rowTrans(roffset, -this._data[i][coffset] / base, i);
                        if(callback) {
                            callback(mat, roffset, -this._data[i][coffset] / base, i);
                        }
                    }
                    prod *= base;
                    roffset++;
                    coffset++;
                }
                if(roffset != v || coffset != h) return noNeedToTrans ? 0 : { 
                    value: 0,
                    rowOffset: roffset,
                    colOffset: coffset
                };
                if(callback && v === h) {
                    for(i = v - 1; i >= 0; i--) {
                        callback(mat, i, 1/this._data[i][i]);
                        for(var j = i - 1; j >= 0; j--) {
                            callback(mat, i, -this._data[j][i], j);
                        }
                    }
                }
                return noNeedToTrans ? prod : {
                    value: prod,
                    full: true
                };
            } else { // lower
                for(; roffset < v && coffset < h;) {
                    if(this._data[roffset][coffset] === 0) {
                        for(i = coffset + 1; i < h; i++) {
                            if(this._data[roffset][i] !== 0) {
                                this.colTrans(coffset, null, i);
                                prod *= -1;
                                break;
                            }
                        }
                        if(i == h) {
                            prod = 0;
                            if(noNeedToTrans) break;
                            roffset++;
                            continue;
                        }
                    }
                    var base = this._data[roffset][coffset];
                    for(var i = coffset + 1; i < h; i++) {
                        if(this._data[roffset][i] === 0) continue;
                        this.colTrans(coffset, -this._data[roffset][i] / base, i);
                    }
                    prod *= base;
                    roffset++;
                    coffset++;
                }
                if(roffset != v || coffset != h) return noNeedToTrans ? 0 : {
                    value: 0,
                    rowOffset: roffset,
                    colOffset: coffset
                };
                prod *= ((Math.floor(n / 2) % 2 == 0) ? 1 : -1);
                return noNeedToTrans ? prod : {
                    value: prod,
                    full: true
                };
            }
        })
        .method('equals', function (m) {
            if(!this.sizeEqual(m)) {
                return false;
            }
            var v = this.vsize(), h = this.hsize();
            for(var i = 0; i < v; i++) {
                for(var j = 0; j < h; j++) {
                    if(this._data[i][j] !== m.get(i, j)) return false;
                }
            }
            return true;
        })
        .method('toString', function () {
            var ret = '(\n';
            for(var i = 0, vsize = this.vsize(); i < vsize; i++) {
                ret += this._data[i].toString() + '\n';
            }
            return ret + ')';
        })
        .method('print', function () {
            console.log(this.toString());
        })
})();

var RationalNumber = (function () {
    "use strict";
    return function (p, q) {
        // notice: a rational number is any number that can be expressed as the quotient
        // or fraction p/q of two integers, p and q, with the denominator q not equal to zero.

        // check arguments:
        // todo

        if(arguments.length <= 1) var q = 1;
        if(arguments.length == 0) var p = 0;

        this.p = parseInt(p);
        this.q = parseInt(q);
        if(this.q < 0) {
            this.q = -this.q;
            this.p = -this.p;
        }
        if(this.q > 1) {
            var t = RationalNumber.prototype.gcd(this.p, this.q);
            this.p = Math.round(this.p / t);
            this.q = Math.round(this.q / t);
        }
    }
        .method('clone', function () {
            return new RationalNumber(this.p, this.q);
        })
        .method('gcd', function (a, b) {
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
        })
        .method('isInfinite', function () {
            return this.q === 0;
        })
        .method('isZero', function () {
            return this.p === 0 && this.q != 0;
        })
        .method('add', function (r) {
            return new RationalNumber(this.p * r.q + this.q * r.p, this.q * r.q);
        })
        .method('subtract', function (r) {
            return new RationalNumber(this.p * r.q - this.q * r.p, this.q * r.q);
        })
        .method('multiply', function (r) {
            return new RationalNumber(this.p * r.p, this.q * r.q);
        })
        .method('divide', function (r) {
            return new RationalNumber(this.p * r.q, this.q * r.p);
        })
        .method('inv', function () {
            return new RationalNumber(this.q, this.p);
        })
        .method('power', function (n) {
            return new RationalNumber(Math.pow(this.p, n), Math.pow(this.q, n));
        })
        .method('sqrt', function (n) {
            return this.isInfinite() ? null : Math.sqrt(this.p / this.q);
        })
        .method('toString', function () {
            return this.p.toString() + '/' + this.q.toString();
        })
        .method('hashCode', function () {
            return this.toString().hashCode();
        })
        .method('equalSign', function (r) {
            return ((this.p > 0 && r.p > 0) || (this.p == 0 && r.p == 0) || (this.p < 0 && r.p < 0));
        })
        .method('equals', function (r) {
            if(this.q === 0 && r.q === 0) {
                return this.equalSign(r);
            }
            return (this.p === r.p && this.q === r.q);
        })
        .method('floatVal', function () {
            if(this.p === 0) return 0;
            if(this.q === 0) return null;
            return (this.p / this.q);
        })
        .method('comparator', function (r1, r2) {
            if(r1.equals(r2)) return 0;
            var v1 = r1.floatVal(),
                v2 = r2.floatVal();
            if(v1 == null || v2 == null) {
                if(v1 == null) {
                    if(v2 == null) {
                        if(r1.p * r2.p > 0) return 0;
                        return r1.p > 0 ? 1 : -1;
                    } else {
                        return r1.p > 0 ? 1 : -1;
                    }
                } else {
                    return r2.p < 0 ? 1 : -1;
                }
            }
            return (v1 > v2) ? 1 : -1;
        })
        .method('print', function () {
            console.log(this.toString());
        });
})();

var ComplexNumber = (function () {
    "use strict";
    return function (a, b) {
        // notice: a is the real part and b is the imaginary part of the complex number.
        // thus, this is a + bi.

        // check arguments:
        // todo

        this.a = parseFloat(a);
        this.b = parseFloat(b);
    }
        .method('clone', function () {
            return new ComplexNumber(this.a, this.b);
        })
        .method('isZero', function () {
            return this.a === 0 && this.b === 0;
        })
        .method('numberCheck', function (num) {
            if(num == null) return null;
            if(!(num instanceof ComplexNumber)) {
                if(isNaN(parseFloat(num))) {
                    throw new Error('Wrong number.');
                    return null;
                }
                num = new ComplexNumber(parseFloat(num), 0);
            }
            return num;
        })
        .method('modSquare', function () {
            return this.a * this.a + this.b * this.b;
        })
        .method('modulus', function () {
            return Math.sqrt(this.modSquare());
        })
        .method('arg phase', function () {
            if(this.a != 0) {
                var c = Math.atan(this.b / this.a);
                if(this.a > 0) return c;
                if(this.b >= 0) return c + Math.PI;
                return c - Math.PI;
            }
            if(this.b > 0) return Math.PI / 2;
            if(this.b < 0) return -Math.PI / 2;
            return null;
        })
        .method('add', function (c) {
            c = ComplexNumber.prototype.numberCheck(c);
            if(c == null) return null;

            return new ComplexNumber(this.a + c.a, this.b + c.b);
        })
        .method('subtract', function (c) {
            c = ComplexNumber.prototype.numberCheck(c);
            if(c == null) return null;

            return new ComplexNumber(this.a - c.a, this.b - c.b);
        })
        .method('multiply', function (c) {
            c = ComplexNumber.prototype.numberCheck(c);
            if(c == null) return null;

            return new ComplexNumber(this.a * c.a - this.b * c.b, this.a * c.b + this.b * c.a);
        })
        .method('conjugate', function () {
            return new ComplexNumber(this.a, -this.b);
        })
        .method('inv', function () {
            if(this.isZero()) {
                throw new Error('This is a Zero-ComplexNumber.');
                return null;
            }
            return new ComplexNumber(this.a / modSquare, -this.b / modSquare);
        })
        .method('divide', function (c) {
            c = ComplexNumber.prototype.numberCheck(c);
            if(c == null) return null;

            return this.multiply(c.inv());
        })
        .method('fromModAndArg', function (r, arg) {
            return new ComplexNumber(r * Math.cos(arg), r * Math.sin(arg));
        })
        .method('power', function (n) {
            var r = Math.pow(this.modulus(), n);
            var arg = (this.arg() * n) % (2 * Math.PI);
            return this.fromModAndArg(r, arg);
        })
        .method('sqrt', function (n) { // tobe tested
            var r = Math.pow(this.modulus(), 1 / n);
            var a = this.arg();
            var ret = new Array(n);
            for(var i = 0; i < n; i++) {
                ret[i] = this.fromModAndArg(r, (a + i * 2 * Math.PI) / n);
            }
            return ret;
        })
        .method('toString', function () {
            return this.a.toString() + (this.b < 0
                    ? (this.b.toString() + 'i')
                    : (this.b == 0
                    ? ''
                    : ((this.b > 0 ? '+' : '') + this.b.toString() + 'i')));
        })
        .method('hashCode', function () {
            return this.toString().hashCode();
        })
        .method('equals', function (c) {
            c = ComplexNumber.prototype.numberCheck(c);
            if(c == null) return false;

            return this.a === c.a && this.b === c.b;
        })
        .method('comparator', function (c1, c2) {})
        .method('print', function () {
            console.log(this.toString());
        });
})();

(function () {
    return;

    var mtrx0 = new Matrix([
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3]
    ]);
    console.log(mtrx0.det());
    console.log(mtrx0.invertible());
    var mtrx1 = new Matrix([
        [1, 1, 1],
        [0, 2, 2],
        [0, 0, 3]
    ]);
    console.log(mtrx1.det());
    console.log(mtrx1.invertible());
    var mtrx2 = new Matrix([
        [1, 1, 1],
        [0, 2, 2]
    ]);
    console.log(mtrx2.det());
    console.log(mtrx2.invertible());
})
();
