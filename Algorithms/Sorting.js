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
    run: function (data) {}
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
    run: function (data) {}
};

var BucketSort = {
    run: function (data) {}
};

var RadixSort = {
    run: function (data) {}
};