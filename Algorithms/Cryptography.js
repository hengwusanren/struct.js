/**
 * Created by hengwu on 2015/10/4.
 */

/**
 * 移位密码
 */
var ShiftCipher = {
    groupSize: 256,
    key: 3,
    encode: function (ss) {
        var s = ss.toString(),
            n = s.length,
            e = '';
        for(var i = 0; i < n; i++) {
            e += String.fromCharCode((s.charCodeAt(i) + this.key) % this.groupSize);
        }
        return e;
    },
    decode: function (ss) {
        var s = ss.toString(),
            n = s.length,
            d = '';
        for(var i = 0; i < n; i++) {
            d += String.fromCharCode((s.charCodeAt(i) - this.key) % this.groupSize);
        }
        return d;
    }
};

/**
 * 代换密码
 */
var SubstitutionCipher = {
    map: (function () {
        var groupSize = 256;
        var encode = new Array(groupSize);
        for(var i = 0; i < groupSize; i++) encode[i] = i;
        for(var i = 0; i < groupSize - 1; i++) {
            var rand = i + Math.floor(Math.random() * 10000) % (groupSize - i);
            var tmp = encode[rand];
            encode[rand] = encode[i];
            encode[i] = tmp;
        }
        var decode = new Array(groupSize);
        for(var i = 0; i < groupSize; i++) {
            decode[encode[i]] = i;
        }
        //console.log('encoding map: ' + encode);
        //console.log('decoding map: ' + decode);
        return {
            encode: encode,
            decode: decode
        };
    })(),
    encode: function (ss) {
        var s = ss.toString(),
            n = s.length,
            e = '';
        for(var i = 0; i < n; i++) {
            e += String.fromCharCode(this.map.encode[s.charCodeAt(i)]);
        }
        return e;
    },
    decode: function (ss) {
        var s = ss.toString(),
            n = s.length,
            d = '';
        for(var i = 0; i < n; i++) {
            d += String.fromCharCode(this.map.decode[s.charCodeAt(i)]);
        }
        return d;
    }
};

/**
 * 仿射密码
 */
var AffineCipher = {
    groupSize: 256,
    key: (function () {
        var groupSize = 256;
        function gcd (a, b) {
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

        var i = 2;
        for(; i < groupSize; i++) {
            if(gcd(i, groupSize) == 1) break;
        }
        var j = 2;
        for(; j < groupSize; j++) {
            if((i * j) % groupSize == 1) break;
        }
        var k = Math.floor(Math.random() * 256);
        return {
            i: i,
            j: j,
            k: k
        }
    })(),
    encode: function (ss) {
        var s = ss.toString(),
            n = s.length,
            e = '';
        for(var i = 0; i < n; i++) {
            var charCode = s.charCodeAt(i);
            var enCode = (this.key.i * charCode + this.key.k) % this.groupSize;
            e += String.fromCharCode(enCode);
        }
        return e;
    },
    decode: function (ss) {
        var s = ss.toString(),
            n = s.length,
            d = '';
        for(var i = 0; i < n; i++) {
            var charCode = s.charCodeAt(i);
            var deCode = (this.key.j * (charCode - this.key.k + this.groupSize)) % this.groupSize;
            d += String.fromCharCode(deCode);
        }
        return d;
    }
};

/**
 * 维吉尼亚密码
 */
var VigenereCipher = {};

/**
 * 希尔密码
 */
var HillCipher = {};

/**
 * 置换密码
 */
var PermutationCipher = {};

// notice: above are all Block Ciphers.

/**
 * 流密码
 */
var StreamCipher = {};


var HuffmanCode = {};

var SHA1 = {};

var MD5 = {};

var RSA = {};

(function () {
    var testStr = "My nickname is Hengwusanren. My birthday is 1991-03-27.";
    console.log(testStr);
    var encodedStr = AffineCipher.encode(testStr);
    console.log(encodedStr);
    var decodedStr = AffineCipher.decode(encodedStr);
    console.log(decodedStr);
})();