/**
 * Created by v-kshe on 9/15/2015.
 */


/**
 * generate hash code of string
 * @returns {number}
 */
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
/**
 * string trim, to remove the white space in the front or back
 * @returns {string}
 */
String.prototype.trim = function () {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1");
};
String.prototype.ltrim = function () {
    return this.replace(/^(\s*|　*)/, "");
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*|　*)$/, "");
};
/**
 * string replaceAll
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
/**
 * string starts with pattern
 * @param p
 * @returns {boolean}
 */
String.prototype.startWith = function (p) {
    return this.indexOf(p) == 0;
};
/**
 * string ends with pattern
 * @param p
 * @returns {boolean}
 */
String.prototype.endWith = function (p) {
    var d = this.length - p.length;
    return (d >= 0 && this.lastIndexOf(p) == d)
};
/**
 * format a Date obj
 * @param formatStr
 * @returns {*}
 */
Date.prototype.format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
};

/**
 * create a new object
 * e.g: var newObject = Object.create(oldObject);
 */
if (!Object.create) {
    Object.create = function(oldObject) {
        function F() {}
        F.prototype = oldObject;
        return new F();
    }
}

/**
 * let subType inherit superType
 */
function InheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

/**
 * construct an object with a constructor and arguments
 * Copied from http://stackoverflow.com/a/3362623.
 */
function Construct(Constructor, ifArguments, args) {
    if(!ifArguments) var args = Array.prototype.slice.call(arguments, 2);
    return function() {

        var Temp = function(){}, // temporary constructor
            inst, ret; // other vars

        // Give the Temp constructor the Constructor's prototype
        Temp.prototype = Constructor.prototype;

        // Create a new instance
        inst = new Temp;

        // Call the original Constructor with the temp
        // instance as its context (i.e. its 'this' value)
        ret = Constructor.apply(inst, args);

        // If an object has been returned then return it otherwise
        // return the original instance.
        // (consistent with behaviour of the new operator)
        return Object(ret) === ret ? ret : inst;
    }();
}

/**
 * generate a guid
 * Copied from http://stackoverflow.com/a/105074.
 * @return {string}
 */
function Guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

/**
 * add a public method named "method" to prototype
 * Refer to http://www.crockford.com/javascript/inheritance.html.
 */
Function.prototype.method = function(name, func) {
    var names = name.split(' ');
    for(var i = 0, len = names.length; i < len; i++) {
        names[i] = names[i].trim();
        if(names[i] == '') continue;

        //if (!this.prototype[name]) {
        this.prototype[names[i]] = func;
        //}
    }
    return this;
};

/**
 * let this constructor inherit F
 */
Function.method('inherits', function(F) {
    //this.prototype = new F();
    InheritPrototype(this, F);

    return this;
});

/**
 * allow this constructor to implement something, such as Iterator
 */
Function.method('implements', function() {
    return this.method('implements', function(F, args) {
        F.apply(this, args);

        return this;
    });
});


/**
 * return a deep clone of an obj
 * Refer to http://stackoverflow.com/a/728694.
 */
if (!Object.clone && !Object.prototype.clone) {
    Object.clone = function (obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = Object.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = Object.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    };
    Object.prototype.clone = function () {
        return Object.clone(this);
    };
}

/**
 * deeply-compare objects
 * Refer to http://stackoverflow.com/a/1144249.
 */
if (!Object.compare) {
    Object.compare = function () {
        var i, l, leftChain, rightChain;

        function compare2Objects(x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.
            // Check if both arguments link to the same object.
            // Especially useful on step when comparing prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good a we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // Check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            // Quick checking of one object beeing a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof (x[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (arguments.length < 1) {
            return true; //Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }

        for (i = 1, l = arguments.length; i < l; i++) {

            leftChain = []; //todo: this can be cached
            rightChain = [];

            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    };
    Object.prototype.deepCompare = function (obj) {
        return Object.compare(this, obj);
    };
}