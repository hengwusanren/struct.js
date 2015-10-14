/**
 * Created by hengwu on 2015/10/11.
 */

var RabinKarp = {
    data: '',
    pattern: '',
    run: function () {}
};

var DFAMatcher = {
    data: '',
    pattern: '',
    charSet: {},
    transition: [],
    _initCharSet: function (pattern) {
        var charSet = {};
        for(var i = 0, len = pattern.length; i < len; i++) {
            charSet[pattern.charAt(i)] = true;
        }
        return charSet;
    },
    _min: function (v1, v2) {
        return v1 < v2 ? v1 : v2;
    },
    _suffix: function (s1, s2) {
        return s1.length <= s2.length && s2.substr(s2.length - s1.length) === s1;
    },
    _initTransition: function (pattern, charSet) {
        var p = pattern,
            len = p.length;
        var transition = new Array(len + 1);
        for(var i = 0; i <= len; i++) {
            transition[i] = {};
            for(var char in charSet) {
                var k = this._min(len, i + 1);
                while(!this._suffix(p.substr(0, k), (p.substr(0, i) + char))) k--;
                transition[i][char] = k;
            }
        }
        return transition;
    },
    _finiteAutomationMatcher: function (textdata, transition, patternLength) {
        for(var n = textdata.length,
                q = 0,
                i = 0; i < n; i++) {
            q = transition[q].hasOwnProperty(textdata.charAt(i)) ? transition[q][textdata.charAt(i)] : 0;
            if(q == patternLength) {
                return i + 1 - patternLength;
            }
        }
        return -1;
    },
    run: function () {
        this.charSet = this._initCharSet(this.data);
        this.charSet = this._initCharSet(this.pattern);
        this.transition = this._initTransition(this.pattern, this.charSet);
        return (this._finiteAutomationMatcher(this.data, this.transition, this.pattern.length));
    },
    test: function () {
        for(var i = 0; i < 100; i++) {
            var randStr = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
            this.data = randStr;
            var textLen = this.data.length,
                randBegin = Math.random()*textLen|0;
            this.pattern = this.data.substr(randBegin, Math.random()*(textLen - randBegin)|0);
            console.log('data:    ' + this.data);
            console.log('pattern: ' + this.pattern);
            var result = this.run();
            console.log('result:  ' + result);
            if(result !== randBegin) console.log('wrong!');
        }
    }
};

DFAMatcher.test();

var KMP = {
    data: '',
    pattern: '',
    run: function () {}
};

var BoyerMoore = {
    data: '',
    pattern: '',
    run: function () {}
};

var RegexEngine = {};