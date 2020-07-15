const api = require('../../../../utils/api.js')
const util = require('../../../../utils/util.js')

//获取应用实例
const app = getApp()

Page({
    data: {
        list:[],
        page: 1,
        pagesize: 10,
        id:1,
        noMore:false,

        boxHeight:0
       
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id:options.house_id || 1
        });
        this.getData(); 
    },
    getData(){
        let that = this;
        api.req.get(api.api.detail.backList, 
        { 
            house_id: that.data.id,
            page:that.data.page,
            pagesize:that.data.pagesize
        })
        .then((res) => {
            let datas = res.data;
            console.log(datas);
            if (datas.ret == 0) {
                datas.data.map((v, i) => {
                    v.Ctime=util.yymmdd(v.Ctime);
                });  
                if (datas.data.length == 0) {
                    that.setData({
                        noMore: true
                    });
                } else {
                    that.setData({
                        noMore: false,
                        page: this.data.page + 1,
                        list: that.data.list.concat(datas.data)
                    });
                    that.totalHeight();
                }
            }

        }, (err) => {
            console.log(err);
        });
    },
    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        this.getData();
    },
    
    // 计算滚动盒子高度
    totalHeight() {
        let height = 200;
        let len = this.data.list.length;
        this.setData({
            boxHeight: height * len + 'rpx'
        });
    }



});

