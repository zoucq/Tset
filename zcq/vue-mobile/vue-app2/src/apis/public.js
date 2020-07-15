const hs={
	dateTime:function (time){
		let date= (time && new Date(time)) || new Date();
		let year=date.getFullYear();
		let mon=date.getMonth()+1;
		let day=date.getDate();
		mon=mon<10?'0'+mon:mon;
		day=day<10?'0'+day:day;
		return year+'-'+mon+'-'+day;
	},
	getImage: function(url){
		// 403错误----把现在的图片连接传进来，返回一个不受限制的路径
		if(url !== undefined){
		  return url.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
		}
	}
}
export default hs




