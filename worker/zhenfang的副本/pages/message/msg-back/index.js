const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
Page({

    data: {
        id: 1,
        page: 1,
        pagesize: 10,
        list: [],
        scrollTop:0,
        scrollHeight:0,
        hidden:true,
        text:'加载中...'
    },

    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.house_id || 1
        });
        this.getData();
    },

    tz() {
        this.setData({
            toView: 'red'
        });
    },

    totalHeight(){
        var that = this;
        wx.getSystemInfo({
            success:function(res) {
                that.setData({
                    scrollHeight:res.windowHeight
                });
            }
       });
    },

    scroll: function (event) {
        //记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
             scrollTop : event.detail.scrollTop
        });
    },

    bindDownLoad: function () {
        // 底部
        console.log("down");
    },

    topLoad: function (event) {
        //页面滑动到顶部的事件
        console.log("top");
        this.getData();
    },

    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    },

    getData() {
        let that = this;
        api.req.get(api.api.message.list,
        {
            page: that.data.page,
            pagesize: that.data.pagesize,
            type: 3
        }).then((res) => {
            let datas = res.data;
            console.log(datas);
            if (datas.ret == 0) {
                if (datas.data.length == 0) {
                    that.setData({
                        hidden:false
                    });
                    setTimeout(() => {
                        that.setData({
                            hidden: true
                        });
                    }, 1000);
                } else {
                    datas.data.map((v,i)=>{
                        v.report.status = v.type ? api.statusAll.report_status[v.report.status] : v.type;
                        v.ctime = util.getDateDiff(v.ctime);
                    });
                    that.setData({
                        hidden:true,
                        text:'无更多数据~~',
                        page: this.data.page + 1,
                        list: datas.data.concat(that.data.list).reverse()
                    });
                    that.tz();
                }
                that.totalHeight();

            } else {
                wx.showToast({
                    title: datas.msg,
                    icon: 'success'
                });
            }
        }, (err) => {
            console.log(err);
        });

    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        // this.getData();
    },

    // 页面下拉
    onPullDownRefresh: function () {
        this.getData();
    },


})