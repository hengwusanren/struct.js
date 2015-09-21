/**
 * Created by v-kshe on 9/15/2015.
 */

/**
 * create a new object
 */
if (!Object.create) {
    Object.create = function(oldObject) {
        function F() {}
        F.prototype = oldObject;
        return new F();
    }
}
//var newObject = Object.create(oldObject);

function InheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

/**
 * Copied from http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply
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
 * add a "public method" to prototype
 */
Function.prototype.method = function(name, func) {
    //if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    //}
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
 * return a deep clone of an obj
 * @param obj
 * @returns {*}
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
 * copied from http://stackoverflow.com/a/1144249.
 * @para {array}
 * @returns {boolean}
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