
(function(root){

	var obj = {
		digitUppercase : digitUppercase,
		isUrl :isUrl,
		isPhoneNum:isPhoneNum,
		format:format
	}

	/**
	 * 
	 * @desc   现金额转大写
	 * @param  {Number} n 
	 * @return {String}
	 */
	function digitUppercase(n) {
	    var fraction = ['角', '分'];
	    var digit = [
	        '零', '壹', '贰', '叁', '肆',
	        '伍', '陆', '柒', '捌', '玖'
	    ];
	    var unit = [
	        ['元', '万', '亿'],
	        ['', '拾', '佰', '仟']
	    ];
	    var head = n < 0 ? '欠' : '';
	    n = Math.abs(n);
	    var s = '';
	    for (var i = 0; i < fraction.length; i++) {
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	    }
	    s = s || '整';
	    n = Math.floor(n);
	    for (var i = 0; i < unit[0].length && n > 0; i++) {
	        var p = '';
	        for (var j = 0; j < unit[1].length && n > 0; j++) {
	            p = digit[n % 10] + unit[1][j] + p;
	            n = Math.floor(n / 10);
	        }
	        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元')
	        .replace(/(零.)+/g, '零')
	        .replace(/^整$/, '零元整');
	};


	/**
	 * 
	 * @desc   判断是否为URL地址
	 * @param  {String} str 
	 * @return {Boolean}
	 */
	function isUrl(str) {
	    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
	}

	/**
	 * 
	 * @desc   判断是否为手机号
	 * @param  {String|Number} str 
	 * @return {Boolean} 
	 */
	function isPhoneNum(str) {
	    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
	}

	/**
	 * 
	 * @desc  判断是否为身份证号
	 * @param  {String|Number} str 
	 * @return {Boolean}
	 */
	function isIdCard(str) {
	    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
	}

	/**
	 * 
	 * @desc   判断是否为邮箱地址
	 * @param  {String}  str
	 * @return {Boolean} 
	 */
	function isEmail(str) {
	    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	}

	/**
	 * 
	 * @desc 生成指定范围随机数
	 * @param  {Number} min 
	 * @param  {Number} max 
	 * @return {Number} 
	 */
	function randomNum(min, max) {
	    return Math.floor(min + Math.random() * (max - min));
	}

	/**
	 * 
	 * @desc 获取浏览器类型和版本
	 * @return {String} 
	 */
	function getExplore() {
	    var sys = {},
	        ua = navigator.userAgent.toLowerCase(),
	        s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
	        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
	        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
	        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
	        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
	        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
	        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
	    // 根据关系进行判断
	    if (sys.ie) return ('IE: ' + sys.ie)
	    if (sys.edge) return ('EDGE: ' + sys.edge)
	    if (sys.firefox) return ('Firefox: ' + sys.firefox)
	    if (sys.chrome) return ('Chrome: ' + sys.chrome)
	    if (sys.opera) return ('Opera: ' + sys.opera)
	    if (sys.safari) return ('Safari: ' + sys.safari)
	    return 'Unkonwn'
	}

	/**
	 * 
	 * @desc 获取操作系统类型
	 * @return {String} 
	 */
	function getOS() {
	    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
	    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
	    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

	    if (/mac/i.test(appVersion)) return 'MacOSX'
	    if (/win/i.test(appVersion)) return 'windows'
	    if (/linux/i.test(appVersion)) return 'linux'
	    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
	    if (/android/i.test(userAgent)) return 'android'
	    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
	}

	/**
	 * @desc   格式化${startTime}距现在的已过时间
	 * @param  {Date} startTime 
	 * @return {String}
	 */
	function formatPassTime(startTime) {
	    var currentTime = Date.parse(new Date()),
	        time = currentTime - startTime,
	        day = parseInt(time / (1000 * 60 * 60 * 24)),
	        hour = parseInt(time / (1000 * 60 * 60)),
	        min = parseInt(time / (1000 * 60)),
	        month = parseInt(day / 30),
	        year = parseInt(month / 12);
	    if (year) return year + "年前"
	    if (month) return month + "个月前"
	    if (day) return day + "天前"
	    if (hour) return hour + "小时前"
	    if (min) return min + "分钟前"
	    else return '刚刚'
	}

	/**
	 * 日期格式化
	 * @param format
	 * @returns {*}
	 */
	function format (format) {
	  var o = {
	    "M+": this.getMonth() + 1,   //month
	    "d+": this.getDate(),      //day
	    "h+": this.getHours(),     //hour
	    "m+": this.getMinutes(),   //minute
	    "s+": this.getSeconds(),   //second
	    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
	    "S": this.getMilliseconds() //millisecond
	  };
	  if (/(y+)/.test(format)) {
	    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	  }
	  for (var k in o) {
	    if (new RegExp("(" + k + ")").test(format)) {
	      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    }
	  }
	  return format;
	}



	root.$cq = obj || {};

})( window )