/**
 * Created by hengwu on 2015/10/11.
 */

var QuickSort = {
    run: function (data) {
        var quickSort = function (arr, left, right) {
            if(left >= right) return;
            //以中间元素为基准
            var middle = arr.get(Math.floor((left + right + 1) / 2));
            var i = left - 1, j = right + 1; // i left ... right j
            while(true) {
                while(arr.get(++i) < middle && i < right) ; // i <
                while(arr.get(--j) > middle && j > left) ;  // j >
                if(i >= j) break; // i < j
                var tmp = arr.get(i); // swap
                arr.set(i, arr.get(j));
                arr.set(j, tmp);
            }
            quickSort(arr, left, i - 1);
            quickSort(arr, j + 1, right);
        };
        quickSort(data, 0, data.size() - 1);
    }
};

var MergeSort = {
    run: function (data) {}
};

var HeapSort = {
    run: function (data) {}
};

var BubbleSort = {
    run: function (data) {
        var bubbleSort = function (arr) {
            for (var j = 0, n = arr.size(); j < n - 1; j++)
                for (var i = 0; i < n - 1 - j; i++) {
                    if(arr.get(i) > arr.get(i + 1)) {
                        var tmp = arr.get(i);
                        arr.set(i, arr.get(i + 1));
                        arr.set(i + 1, tmp);
                    }
                }
        };
        bubbleSort(data);
    }
};

var InsertSort = {
    run: function (data) {}
};

var SelectionSort = {
    run: function (data) {}
};

var HillSort = {
    run: function (data) {}
};

var CountSort = {
    run: function (data) {
        var countSort = function (arr) {
            // todo
        };
        countSort(data);
    }
};

var BucketSort = {
    run: function (data) {}
};

var RadixSort = {
    run: function (data) {}
};