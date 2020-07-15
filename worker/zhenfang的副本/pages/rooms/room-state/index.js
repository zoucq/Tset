const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
Page({

    data: {
        id: 1,
        page: 1,
        pagesize: 10,
        list: [],
        noMore: false
    },

    onLoad: function (options) {
        console.log('所有动态',options);
        this.setData({
            id: options.house_id || 1
        });
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
        api.req.get(api.api.detail.newsList,
        {
            page: that.data.page,
            pagesize: that.data.pagesize,
            house_id: that.data.id
        }).then((res) => {
            let datas = res.data;
            console.log('所有动态',datas);
            if (datas.ret == 0) {        
                if (datas.data.length == 0 ) {
                    that.setData({
                        noMore: true
                    });
                } else {
                    datas.data.map((v,i)=>{
                        v.Ctime=util.yymmdd(v.Ctime);
                    })
                    that.setData({
                        noMore: false,
                        page: this.data.page + 1,
                        list: that.data.list.concat(datas.data)
                    });
                }
            } else {
                wx.showToast({
                    title: datas.msg,
                    icon: 'success'
                });
            }
        }, (err) => {
            console.log(err);
        });
        return true;
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        this.getData();
    }

    

})