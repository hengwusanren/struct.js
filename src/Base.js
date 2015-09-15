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
 * add a "public method" onto prototype
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