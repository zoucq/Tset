var express =  require('express');
var superagent =  require('superagent');
var cheerio =  require('cheerio');
var eventproxy = require('eventproxy');

var url = require('url');

var cnodeUrl = 'https://segmentfault.com/';


var app = express();

app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://segmentfault.com/frontend/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.news-list .news-item').each(function (idx, element) {
        var $element = $(element);
        items.push(cnodeUrl+$element.find('.news__item-title a').attr('href'));
      });

      // res.send(items);
      console.log(items)

      	// 得到一个 eventproxy 的实例
		var ep = new eventproxy();

		// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
		ep.after('items', items.length, function (topics) {
		  // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

		  // 开始行动
		  topics = topics.map(function (topicPair) {
		    // 接下来都是 jquery 的用法了
		    var topicUrl = topicPair[0];
		    var topicHtml = topicPair[1];
		    var $ = cheerio.load(topicHtml);
		    return ({
		      title: $('#articleTitle a').text().trim(),
		      href: topicUrl
		    });
		  });

		  console.log('final:');
		  console.log(topics);
		  res.send(topics);
		});

		items.forEach(function (topicUrl) {
		  superagent.get(topicUrl)
		    .end(function (err, res) {
		      console.log('fetch ' + topicUrl + ' successful');
		      ep.emit('items', [topicUrl, res.text]);
		    });
		});


    });


});


app.listen(3000,function(req,res){
	console.log('app is runnning at port 3000')
});