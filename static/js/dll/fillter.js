
// 时间格式转化
String.prototype.dateFormatter = dateFormatter
Number.prototype.dateFormatter = dateFormatter

function dateFormatter(formatter) {
    if (typeof this === 'undefined') {
        return '';
    }
    var updateDate = new Date(parseInt((this).toString().replace('/Date(', '').replace(')/', ''), 10));
    updateDate.format = function (format) {
        var o = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    };
    return updateDate.format(`${formatter}`);

}

//千位拆分
String.prototype.thousand = function () {
    return this.replace(/(\d)(?=(?:\d{4})+$)/g, '$1   ');
}

//指定下标移除元素
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};



