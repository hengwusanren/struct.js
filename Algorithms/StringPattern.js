/**
 * Created by hengwu on 2015/10/11.
 */

var RabinKarpMatcher = {
    data: '',
    pattern: '',
    run: function () {}
};

var DFAMatcher = {
    data: '',
    pattern: '',
    _charSet: {},
    _transition: [],
    _initCharSet: function (textdata, charSet) {
        for(var i = 0, len = textdata.length; i < len; i++) {
            charSet[textdata.charAt(i)] = true;
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
            len = p.length,
            transition = new Array(len + 1);
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
        if(this.pattern.length == 0) return 0;
        this._initCharSet(this.data, this._charSet);
        this._initCharSet(this.pattern, this._charSet);
        this._transition = this._initTransition(this.pattern, this._charSet);
        return this._finiteAutomationMatcher(this.data, this._transition, this.pattern.length);
    },
    test_: function () {
        for(var i = 0; i < 100; i++) {
            var randStr = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
                var r = Math.random()*16|0;
                return r.toString(16);
            });
            this.data = randStr;
            var textLen = this.data.length,
                randBegin = Math.random()*textLen|0,
                randLen = Math.random()*(textLen - randBegin)|0;
            this.pattern = this.data.substr(randBegin, randLen);
            console.log('data:    ' + this.data);
            console.log('pattern: ' + this.pattern);
            var result = this.run();
            console.log('result:  ' + result);
            if(randStr.substr(result, randLen) !== this.pattern) {
                console.log('wrong!');
                console.log('randBegin: ' + randBegin);
                console.log('randLen:   ' + randLen);
            }
        }
    }
};

//DFAMatcher.test_();

var KMPMatcher = {
    data: '',
    pattern: '',
    _computePrefix: function (pattern) {
        var m = pattern.length,
            pi = (new Array(m)).fill(0),
            k = 0;
        for(var q = 1; q < m; q++) {
            while(k > 0 && pattern.charAt(k) != pattern.charAt(q)) {
                k = pi[k - 1];
            }
            if(pattern.charAt(k) == pattern.charAt(q)) k++;
            pi[q] = k;
        }
        return pi;
    },
    _kmp: function (textdata, pattern) {
        var n = textdata.length,
            m = pattern.length,
            pi = this._computePrefix(pattern),
            q = 0,
            results = [];
        for(var i = 0; i < n; i++) {
            while(q > 0 && pattern.charAt(q) != textdata.charAt(i)) {
                q = pi[q - 1];
            }
            if(pattern.charAt(q) == textdata.charAt(i)) q++;
            if(q == m) {
                results.push(i + 1 - m);
                q = pi[q - 1];
            }
        }
        return results;
    },
    run: function () {
        return this._kmp(this.data, this.pattern);
    },
    test_: function () {
        this.data = '1010101010101';
        this.pattern = '1';
        console.log(this.run());
    }
};

KMPMatcher.test_();

var BoyerMooreMatcher = {
    data: '',
    pattern: '',
    _charSetSize: 256,
    _badChar: [],
    _goodSuffix: {},
    _prepareBadChars: function (pattern, charSetSize, badChar) {
        for(var i = 0; i < charSetSize; i++) {
            badChar[i] = pattern.length;
        }
        for(var i = 0, m = pattern.length; i < m - 1; i++) {
            badChar[pattern.charCodeAt(i)] = m - 1 - i;
        }
    },
    run: function () {}
};

var RegexMatcher = {
    data: '',
    pattern: '',
    _charSet: {},
    _transition: [],
    run: function () {},
    test_: function () {}
};
