/* 第1步：引入所需模块【http模块、sockjs模块、静态文件服务器处理模块】*/  
var http = require('http');  
var sockjs = require('sockjs');  
var node_static = require('node-static');  
  
/* 第2步：创建sockjs服务 */  
var sockjs_opts = {sockjs_url:"http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};  
var sockjs_server = sockjs.createServer(sockjs_opts);  
sockjs_server.on('connection',function(conn){  
    conn.on('data',function(message){  
        conn.write('我就不告诉你' + message);  
    });  
});  
  
/* 第3步：指定静态服务文件目录 */  
var static_directory = new node_static.Server(__dirname);  
  
/* 第4步：传递http请求和响应给指定目录 */  
var server = http.createServer();  
server.addListener('request', function(req, res) {  
    static_directory.serve(req, res);  
});  
server.addListener('upgrade', function(req, res){  
    res.end();  
});  
  
/* 第5步：将sockjs服务挂载到http服务上 */  
sockjs_server.installHandlers(server,{prefix:'/sockjsDemo'});  
  
/* 第6步：指定监听端口和地址 */  
console.log(' [*] Listening on 0.0.0.0:10086' );  
server.listen(10086, '127.0.0.1');  