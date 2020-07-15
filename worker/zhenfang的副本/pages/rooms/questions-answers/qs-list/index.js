const api = require('../../../../utils/api.js')
Page({

    data: {
        id:1,
        page:1,
        pagesize:10,
        list:[],
        noMore:false
    },

    onLoad: function (options) {
        console.log(options);
        this.setData({
            id:options.house_id
        });
        this.getData();
    },

    handleGo(e){
        let url=e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url,
        });
    },

    getData(){
        let that = this;
        api.req.get(api.api.detail.questionList, 
        { 
            page: that.data.page, 
            pagesize: that.data.pagesize,
            house_id: that.data.id 
        }).then((res) => {
                let datas = res.data;
                console.log(datas);
                if (datas.ret == 0) {                  
                    if (datas.data.length==0){
                        that.setData({
                            noMore:true
                        });
                    }else{
                        that.setData({
                            noMore:false,
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
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        this.getData();
    },


})