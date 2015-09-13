/**
 * Created by v-kshe on 6/18/2015.
 */

/**
 * judge the type of obj
 */
var Is = {
    types: [
        "Array",
        "Boolean",
        "Date",
        "Number",
        "Object",
        "RegExp",
        "String",
        "Window",
        "HTMLDocument"
    ]
};
(function () {
    for (var i = 0, c; c = Is.types[i++];) {
        Is[c] = (function (type) {
            return function (obj) {
                return Object.prototype.toString.call(obj) == "[object " + type + "]";
            }
        })(c);
    }
})();

/**
 * generate hash code of string
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

var Util = {
    /**
     * return a deep clone of an obj
     * @param obj
     * @returns {*}
     */
    clone: function (obj) {
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
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },

    /**
     * judge if the value is empty
     * true: undefined, null, '', false, 0, [], {}
     */
    isEmpty: function (v) {
        switch (typeof v) {
            case 'undefined' :
                return true;
            case 'string'    :
                if (v.trim().length == 0) return true;
                break;
            case 'boolean'   :
                if (!v) return true;
                break;
            case 'number'    :
                if (0 === v) return true;
                break;
            case 'object'    :
                if (null === v) return true;
                if (undefined !== v.length && v.length == 0) return true;
                for (var k in v) {
                    return false;
                }
                return true;
                break;
        }
        return false;
    },
    /**
     * judge if the obj is an array
     * @param obj
     * @returns {boolean}
     */
    isArray: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    /**
     * a helper for the following function 'select'
     * @param by
     * @param from
     * @returns {*}
     */
    getElement: function (by, from) {
        if (by == '') return from;
        var s = by.charAt(0);
        // if '#id':
        if (s == '#') return document.getElementById(by.substr(1));
        var eleArr = [];
        // if 'tag.class...':
        if (s != '.') {
            var classbegin = by.indexOf('.');
            var tagname = (classbegin == -1 ? by : by.substring(0, classbegin));
            if (Util.isArray(from) === false) return from.getElementsByTagName(tagname);
            var fromLen = from.length;
            for (var i = 0; i < fromLen; i++) {
                var tmpArr = from[i].getElementsByTagName(tagname);
                var tmpArrLen = tmpArr.length;
                while (tmpArrLen > 0) {
                    eleArr.push(tmpArr.shift());
                    tmpArrLen--;
                }
            }
            if (classbegin == -1) return eleArr;
            return Util.getElement(by.substr(classbegin), eleArr);
        }
        // if '.class...':
        var nextclassbegin = by.indexOf('.', 1);
        var classname = (nextclassbegin == -1 ? by.substr(1) : by.substring(1, nextclassbegin));
        if (Util.isArray(from) === false) return from.getElementsByClassName(classname);
        var fromLen = from.length;
        for (var i = 0; i < fromLen; i++) {
            var tmpArr = from[i].getElementsByClassName(classname);
            var tmpArrLen = tmpArr.length;
            while (tmpArrLen > 0) {
                eleArr.push(tmpArr.shift());
                tmpArrLen--;
            }
        }
        if (nextclassbegin == -1) return eleArr;
        return Util.getElement(by.substr(nextclassbegin), eleArr);
    },
    /**
     * a simple implementation of selector
     * only support tag, #id, .class, and tag.class, .class1.class2 as a piece of selector
     * @param sels
     * @param parent
     * @returns {*}
     */
    select: function (sels, parent) {
        if (!parent) {
            if (sels.charAt(0) == '#') return document.getElementById(sels.substr(1));
            if (sels.charAt(0) == '.' && sels.indexOf(' ') == -1) return document.getElementsByClassName(sels.substr(1));
            parent = document;
        }
        var selectors = sels.split(' ');
        var len = selectors.length;
        while (len > 0) {
            var s = selectors.shift();
            len--;
            if (s == '') continue;
            parent = Util.getElement(s, parent);
        }
        return parent;
    },

    /**
     * get the height of page
     * @returns {number}
     */
    getPageHeight: function () {
        var g = document,
            a = g.body,
            f = g.documentElement,
            d = g.compatMode == "BackCompat" ? a : g.documentElement;
        return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
    },
    /**
     * get the width of page
     * @returns {number}
     */
    getPageWidth: function () {
        var g = document,
            a = g.body,
            f = g.documentElement,
            d = g.compatMode == "BackCompat" ? a : g.documentElement;
        return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
    },
    /**
     * get the view width of page
     * @returns {number}
     */
    getPageViewWidth: function () {
        var d = document,
            a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
        return a.clientWidth;
    },
    /**
     * get the scrollTop of page
     * @returns {number}
     */
    getPageScrollTop: function () {
        var a = document;
        return a.documentElement.scrollTop || a.body.scrollTop;
    },
    /**
     * get the size of viewport
     * @returns {*}
     */
    getViewSize: function () {
        var de = document.documentElement;
        var db = document.body;
        var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
        var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
        return Array(viewW, viewH);
    },

    /**
     * cut a string of a certain length
     * @param str
     * @param len
     * @returns {string}
     */
    cutStr: function (str, len) {
        var temp;
        var icount = 0;
        var patrn = /[^\x00-\xff]/;
        var strre = "";
        for (var i = 0; i < str.length; i++) {
            if (icount < len - 1) {
                temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                    icount = icount + 1;
                } else {
                    icount = icount + 2;
                }
                strre += temp;
            } else {
                break;
            }
        }
        return strre + "..."
    },

    /**
     * decode data from a base64 string
     * @param data
     * @returns {*}
     */
    base64Decode: function (data) {
        //todo
    },
    /**
     * decode data from a utf-8 string
     * @param data
     * @returns {*}
     */
    utf8Decode: function (data) {
        //todo
    },

    /**
     * generate the time-stamp, like 201509022229234
     * @returns {string}
     */
    timestampCode: function () {
        var result = "";

        var now = new Date();

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minutes = now.getMinutes();
        var second = now.getSeconds();
        var millisecond = now.getMilliseconds();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        if (hour < 10) hour = "0" + hour;
        if (minutes < 10) minutes = "0" + minutes;
        if (second < 10) second = "0" + second;

        if (millisecond < 10) millisecond = "00" + millisecond;
        else {
            if (millisecond < 100) {
                millisecond = "0" + millisecond;
            }
        }

        result = year.toString() + month.toString()
            + day.toString() + hour.toString()
            + minutes.toString() + second.toString()
            + millisecond.toString();
        return result;
    },
    /**
     * parse the datatime of an ISO8601-format time string
     * @param string
     * @returns {Date}
     */
    parseISO8601DateTime: function (string) {
        var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
            "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
            "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
        if (string) {
            var d = string.match(new RegExp(regexp));
            var offset = 0;
            var date = new Date(d[1], 0, 1);

            if (d[3]) {
                date.setMonth(d[3] - 1);
            }
            if (d[5]) {
                date.setDate(d[5]);
            }
            if (d[7]) {
                date.setHours(d[7]);
            }
            if (d[8]) {
                date.setMinutes(d[8]);
            }
            if (d[10]) {
                date.setSeconds(d[10]);
            }
            if (d[12]) {
                date.setMilliseconds(Number("0." + d[12]) * 1000);
            }
            if (d[14]) {
                offset = (Number(d[16]) * 60) + Number(d[17]);
                offset *= ((d[15] == '-') ? 1 : -1);
            }
            offset -= date.getTimezoneOffset();
            date.setTime(Number(Number(date) + (offset * 60 * 1000)));
            return date;
        } else {
            return new Date();
        }
    },
    /**
     * convert an ISO8601-format time string to '--年--月--日'
     * @param string
     * @returns {string}
     */
    parseISO8601DTToString: function (string) {
        var dt = this.parseISO8601DateTime(string);
        return dt.getFullYear() + "年" + (dt.getMonth() + 1) + "月" + dt.getDate() + "日";
    },

    /**
     * get the value of a parameter in the url
     * @param name
     * @returns {string|null}
     */
    getUrlParameter: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    /**
     * get the hash value in the url
     * @param url
     * @returns {*}
     */
    getUrlHash: function (url) {
        if (!url) var url = window.location.href;
        if (url.indexOf('#') < 0) return '';
        return url.substring(url.indexOf('#') + 1);
    },
    /**
     * remove a parameter from a url and return the new url string
     * @param name
     * @param url
     * @returns {*}
     */
    removeUrlParameter: function (name, url) {
        var hash = (url.indexOf('#') < 0 ? '' : url.substring(url.indexOf('#')));
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {
            var prefix = encodeURIComponent(name) + '=';
            var pars = urlparts[1].split(/[&;]/g);

            for (var i = pars.length; i-- > 0;) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlparts[0] + (pars.length > 0 ? '?' : '') + pars.join('&') + hash;
            return url;
        } else {
            return url + hash;
        }
    },
    /**
     * get the host name of a url
     */
    getUrlHost: function (url) {
        var host = "null";
        if (typeof url == "undefined" || null == url) {
            url = window.location.href;
        }
        var regex = /^\w+\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        if (typeof match != "undefined" && null != match) {
            host = match[1];
        }
        return host;
    },

    /**
     * encode html string
     * @param text
     */
    htmlEncode: function (text) {
        //todo
    },
    /**
     * decode html string
     * @param text
     */
    htmlDecode: function (text) {
        //todo
    },

    /**
     * parse out the file type
     * @param url
     * @returns {*}
     */
    typeOfFile: function (url) {
        var arr = url.split('.');
        if (arr.length == 0) return 'unknown';
        var ext = arr[arr.length - 1].toLowerCase();
        return ext;
    },
    /**
     * parse out the file name
     * @param url
     * @returns {*}
     */
    nameOfFile: function (url) {
        var arr = url.split('/');
        if (arr.length == 0) return '';
        return arr[arr.length - 1];
    },
    /**
     * format the file size, from number to string
     * @param bytes
     * @returns {string}
     */
    parseFileSize: function (bytes) {
        if (Is['String'](bytes)) bytes = parseInt(bytes);
        if (bytes < 1000) return bytes.toString() + 'b';
        bytes /= 1000;
        bytes = Math.round(bytes * 100) / 100;
        if (bytes < 1000) return bytes.toString() + 'kb';
        bytes /= 1000;
        bytes = Math.round(bytes * 100) / 100;
        if (bytes < 1000) return bytes.toString() + 'mb';
        bytes /= 1000;
        bytes = Math.round(bytes * 100) / 100;
        return bytes.toString() + 'gb';
    },

    /**
     * generate guid code
     * @returns {string}
     */
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

    /**
     * detect the current mobile platform/device/webBrowser
     * to be extended
     */
    isMobile: {
        android: function () {
            return navigator.userAgent.toLowerCase().match(/android/i);
        },
        blackBerry: function () {
            return navigator.userAgent.toLowerCase().match(/blackberry/i);
        },
        iOS: function () {
            return navigator.userAgent.toLowerCase().match(/iphone|ipad|ipod/i);
        },
        opera: function () {
            return navigator.userAgent.toLowerCase().match(/opera mini/i);
        },
        windows: function () {
            return navigator.userAgent.toLowerCase().match(/iemobile/i);
        }
    },
    /**
     * check if it's mobile user-agent
     * @returns {boolean}
     */
    isMobileUserAgent: function () {
        return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
    },

    /**
     * load a css file
     * @param url
     */
    loadStyleSheet: function (url) {
        try {
            document.createStyleSheet(url);
        } catch (e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(cssLink);
        }
    },

    /**
     * a simple event binder
     * @param obj
     * @param eventName
     * @param func
     */
    addEvent: function (obj, eventName, func) {
        if (obj.addEventListener) {
            obj.addEventListener(eventName, func, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + eventName, func);
        }
    },

    /**
     * some common-used regexes
     */
    regex: {
        isEmail: function (str) {
            var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (re.test(str) != true) {
                return false;
            } else {
                return true;
            }
        },
        isUrl: function (str) {
            if (!str) return false;
            var re = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;
            var url = str.trim();
            if (url.match(re) == null)
                return false;
            else
                return true;
        },
        isNumber: function (str) {
            var re = /^\d*$/;
            if (str.match(re) == null)
                return false;
            else
                return true;
        },
        isDecimal: function (str) {
            var re = /^\d*\.?\d{1,2}$/;
            if (str.match(re) == null)
                return false;
            else
                return true;
        },
        isFloat: function (str) {
            for (i = 0; i < str.length; i++) {
                if ((str.charAt(i) < '0' || str.charAt(i) > '9') && str.charAt(i) != '.') {
                    return false;
                }
            }
            return true;
        },
        isLetters: function (str) {
            var re = /^[A-Za-z]+$/;
            if (str.match(re) == null)
                return false;
            else
                return true;
        },
        isZipCode: function (str) {
            var re = /^\d{6}$/;
            if (str.match(re) == null)
                return false;
            else
                return true;
        },
        isNULL: function (str) {
            if (str == null)
                return true;
            if (str.trim().length == 0)
                return true;
            return false;
        }
    }
};

/**
 * sessionStorage
 */
var SessionData = function () {
    return {
        has: function (key) {
            return !(sessionStorage.getItem(key) === null);
        },
        get: function (key) {
            var value = sessionStorage.getItem(key);
            if (value === null) return null;
            var realValue;
            try {
                realValue = JSON.parse(value);
            } catch (e) {
                realValue = value;
            }
            return realValue;
        },
        getStr: function (key) {
            return sessionStorage.getItem(key);
        },
        set: function (key, value) {
            if (Object.prototype.toString.call(value) === "[object String]") sessionStorage.setItem(key, value);
            else sessionStorage.setItem(key, JSON.stringify(value));
            return value;
        },
        remove: function (key) {
            sessionStorage.removeItem(key);
        }
    };
}();

/**
 * localStorage
 */
var LocalData = function () {
    return {
        has: function (key) {
            return !(localStorage.getItem(key) === null);
        },
        get: function (key) {
            var value = localStorage.getItem(key);
            if (value === null) return null;
            var realValue;
            try {
                realValue = JSON.parse(value);
            } catch (e) {
                realValue = value;
            }
            return realValue;
        },
        getStr: function (key) {
            return localStorage.getItem(key);
        },
        set: function (key, value) {
            if (Object.prototype.toString.call(value) === "[object String]") localStorage.setItem(key, value);
            else localStorage.setItem(key, JSON.stringify(value));
            return value;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        }
    };
}();

/**
 * cookie
 */
var CookieData = new function () {
    this.set = function (key, value, expiredays) {
        var now = new Date();
        now.setDate(now.getDate() + expiredays);
        document.cookie = key + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + now.toGMTString());
    };
    this.get = function (key) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(key + "=");
            if (start != -1) {
                start = start + key.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(start, end));
            }
        }
        return "";
    };
};

/**
 * Below is by Dean Edwards.
 */
function addEvent(element, type, handler) {
    // 为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++;
    // 为元素的事件类型创建一个哈希表
    if (!element.events) element.events = {};
    // 为每一个"元素/事件"对创建一个事件处理程序的哈希表
    var handlers = element.events[type];
    if (!handlers) {
        handlers = element.events[type] = {};
        // 存储存在的事件处理函数(如果有)
        if (element["on" + type]) {
            handlers[0] = element["on" + type];
        }
    }
    // 将事件处理函数存入哈希表
    handlers[handler.$$guid] = handler;
    // 指派一个全局的事件处理函数来做所有的工作
    element["on" + type] = handleEvent;
}
// 用来创建唯一的ID的计数器
addEvent.guid = 1;
function removeEvent(element, type, handler) {
    // 从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
}
function handleEvent(event) {
    var returnValue = true;
    // 抓获事件对象(IE使用全局事件对象)
    event = event || fixEvent(window.event);
    // 取得事件处理函数的哈希表的引用
    var handlers = this.events[event.type];
    // 执行每一个处理函数
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
}
// 为IE的事件对象添加一些“缺失的”函数
function fixEvent(event) {
    // 添加标准的W3C方法
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
}
fixEvent.preventDefault = function () {
    this.returnValue = false;
};
fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
};


/**
 * selector
 */
function $(sels, parent) {
    return Util.select(sels, parent);
}