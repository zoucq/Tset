const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// '2018-01-04 15:06:27' 
const yymmdd = n => {
    n = n ? n.split(' ')[0].split('-') : '';
    return n ? n[0] + '年' + n[1] + '月' + n[2] + '日' : '';
    // return n ? n[0] + '年' + n[1] + '月' + n[2] + '日' + str : '';
}

// '2018-01-04 15:06:27' 
const yymmddOld = n => {
    if (n) {
        let time = new Date(n).getTime();
        let nowTime = new Date().getTime();
        let str = "";
        if (nowTime - time < 0) {
            str = '预计';
        }
        n = n ? n.split(' ')[0].split('-') : '';
        if (str == '预计') {
            return str + n[0] + '年' + n[1] + '月' + n[2] + '日';
        } else {
            return n[0] + '年' + n[1] + '月' + n[2] + '日';
        }
    } else {
        return '';
    }
    // return n ? n[0] + '年' + n[1] + '月' + n[2] + '日' + str : '';
}
// yymmdd('2018-01-04 15:06:27');

// '12/30/17'
const yymmdd2 = n => {
    if (n) {
        n = n ? n.split(' ')[0].split('/') : '';
        let year = new Date().getFullYear();
        year = String(year).split('');
        year = year[0] + year[1];
        return n ? year + n[2] + '年' + n[0] + '月' + n[1] + '日' : '';
    } else {
        return '';
    }
    // return n ? year + n[2] + '年' + n[0] + '月' + n[1] + '日' : '';
}
// yymmdd2('12/30/17');

// '12/30/17'
const yymmdd2Old = n => {
    if (n) {
        let time = new Date(n).getTime();
        let nowTime = new Date().getTime();
        let str = "";
        if (nowTime - time < 0) {
            str = '预计';
        }
        n = n ? n.split(' ')[0].split('/') : '';
        let year = new Date().getFullYear();
        year = String(year).split('');
        year = year[0] + year[1];

        if (str == '预计') {
            return str + year + n[2] + '年' + n[0] + '月' + n[1] + '日';
        } else {
            return year + n[2] + '年' + n[0] + '月' + n[1] + '日';
        }
    } else {
        return '';
    }
    // return n ? year + n[2] + '年' + n[0] + '月' + n[1] + '日' : '';
}
// yymmdd2('12/30/17');

// "2018-01-23 14:24:14"

const getDateDiff = (date) => {
    date = date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
    var strdate = date;

    var dateTimeStamp = new Date(date).getTime();
    var result = '';
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) { return; }
    // console.log(diffValue);
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 日期为当天的 显示格式为： 上午10：22 下午08：22
    // 日期为前一天的 显示格式为： 昨天上午10：22 昨天下午10：22
    // 其他日期，显示完整的时间： 2017年12月1日 12：22

    date = date.split(' ');

    var str = date[0] + ' 23:59:59';
    var time = new Date(str).getTime() - new Date(strdate).getTime();
    time = time / hour;

    date[1] = date[1].split(':');
    date[0] = date[0].split('/');
    if (hourC > time && hourC < time * 1 + (day / hour)) {
        if (date[1][0] >= 0 && date[1][0] <= 12) {
            result = '昨天上午' + date[1][0] + ':' + date[1][1];
        } else {
            result = '昨天下午' + date[1][0] + ':' + date[1][1];
        }
    } else if (hourC <= time) {
        if (date[1][0] >= 0 && date[1][0] <= 12) {
            result = '上午' + date[1][0] + ':' + date[1][1];
        } else {
            result = '下午' + date[1][0] + ':' + date[1][1];
        }
    } else if (hourC >= time * 1 + (day / hour)) {
        result = '' + date[0][0] + '年' + date[0][1] + '月' + date[0][2] + '日 ' + date[1][0] + ':' + date[1][1];
    }

    return result;
}

// console.log(getDateDiff('2018-01-24 12:00:00'));


/*获取当前页url*/
function getCurrentPageUrl() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
}



module.exports = {
    formatTime: formatTime,
    yymmdd: yymmdd,
    yymmddOld: yymmddOld,
    yymmdd2: yymmdd2,
    yymmdd2Old: yymmdd2Old,
    getDateDiff: getDateDiff,


    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs
}
