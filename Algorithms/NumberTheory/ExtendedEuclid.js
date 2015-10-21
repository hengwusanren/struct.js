/**
 * Created by hengwu on 2015/10/19.
 */

var ExtendedEuclid = {
    run: function (a, b) {
        if(b == 0) return [a, 1, 0];
        var d_x_y_ = this.run(b, a % b);
        var dxy = [d_x_y_[0], d_x_y_[2], d_x_y_[1] - Math.floor(a / b) * d_x_y_[2]];
        return dxy;
    }
};
