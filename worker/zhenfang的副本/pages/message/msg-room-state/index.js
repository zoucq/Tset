const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
Page({

    data: {
        id: 1,
        page: 1,
        pagesize: 10,
        list: [],
        scrollTop: 0,
        scrollHeight: 0,
        hidden: true,
        text: '加载中...',
        toView:'demo'
    },

    onLoad: function (options) {
        console.log(options);
        this.getData();
    },

    tz(){
        this.setData({
            toView: 'red'
        });
    },

    totalHeight() {   
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
    },

    scroll: function (event) {
        //记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop: event.detail.scrollTop
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
            url: url,
        });
    },

    getData() {
        let that = this;
        api.req.get(api.api.message.list,
            {
                type:'1,2',
                page: that.data.page,
                pagesize: that.data.pagesize
            }).then((res) => {
                let datas = res.data;
                console.log(datas);
                if (datas.ret == 0) {
                    if (datas.data.length == 0) {
                        that.setData({
                            hidden: false
                        });
                        setTimeout(() => {
                            that.setData({
                                hidden: true
                            });
                        }, 1000);
                    } else {   
                        datas.data.map((v,i)=>{
                            v.ctime = util.getDateDiff(v.ctime);
                            // v.ctime=v.ctime.split(' ')[1];
                            // v.ctime = v.ctime.split(':');
                            // if (v.ctime[0]>0 && v.ctime[0]<12){
                            //     v.ctime = '上午' + v.ctime[0] + ':' + v.ctime[1];
                            // }else{
                            //     v.ctime = '下午' + v.ctime[0] + ':' + v.ctime[1];
                            // }
                            v.type = v.type ? api.statusAll.message_type[v.type]:v.type;
                        });   
                        that.setData({
                            hidden: true,
                            text: '无更多数据~~',
                            page: this.data.page + 1,
                            list: that.data.list.concat(datas.data).reverse()
                        });
                        
                        // 跳转到最后
                        that.tz();
                    }
                    // 计算高度
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
        this.getData();
    },

    // 页面下拉
    onPullDownRefresh: function () {
        // this.getData();
    }


})