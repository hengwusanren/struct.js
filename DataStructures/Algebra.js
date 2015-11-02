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
        .method('format', function () {})
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
        .method('trans transpose', function () {})
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
        .method('power', function () {})
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
    /**
     * calculate the determinant
     */
        .method('det', function () {})
        .method('inv', function () {})
        .method('format', function () {})
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
        .method('equals', function (r) {})
        .method('comparator', function (r1, r2) {})
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
        .method('module', function () {
            return Math.sqrt(this.modSquare());
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
        .method('power', function (n) {})
        .method('sqrt', function (n) {})
        .method('toString', function () {
            return this.a.toString() + (this.b < 0
                    ? (this.b.toString() + 'i')
                    : (this.b == 0
                    ? ''
                    : ('+' + this.b.toString() + 'i')));
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