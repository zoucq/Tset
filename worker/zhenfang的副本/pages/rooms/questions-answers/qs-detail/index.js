const api = require('../../../../utils/api.js')
const util = require('../../../../utils/util.js')

Page({

    data: {
        id: 1,
        page: 1,
        pagesize: 10,
        list: [],
        noMore: false,

        question:{},
        content:''
    },

    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id || 15
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
        api.req.get(api.api.detail.answerList,
        {
            page: that.data.page,
            pagesize: that.data.pagesize,
            question_id: that.data.id
        }).then((res) => {
            let datas = res.data;
            console.log(datas);
            if (datas.ret == 0) {    
                datas.data.question.Ctime = util.yymmdd(datas.data.question.Ctime);    
                if ( datas.data.list.length == 0) {
                    that.setData({
                        noMore: true,
                        question: datas.data.question
                    });
                } else {
                    datas.data.list.map((v, i) => {
                        v.Ctime = util.yymmdd(v.Ctime)
                    });
                    that.setData({
                        noMore: false,
                        page: this.data.page + 1,
                        list: that.data.list.concat(datas.data.list),
                        question:datas.data.question
                    });
                    console.log(that.data.question)
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

    //表单
    formSubmit(e){
        console.log(e.detail.value);
        let content = e.detail.value.answer;
        let arr=[];
        let that = this;
        that.setData({
            content: ''
        });
        api.req.get(api.api.detail.answerAdd,
        {
            question_id: that.data.id,
            body: content
        }).then((res) => {
            let datas = res.data;
            console.log(datas);
            if (datas.ret == 0) {
                if (wx.getStorageSync('userInfo')){
                    let userInfo = wx.getStorageSync('userInfo');
                    let now=util.yymmdd(util.formatTime(new Date()));
                    arr.push({ 
                        Body: content,
                        Ctime: now,
                        Zan:0,
                        user:{
                            username: userInfo.nickName,
                            headimg: userInfo.avatarUrl,
                            record_name:'未标记'
                        },
                        User: userInfo
                    });  
                } 
                that.setData({
                    list: that.data.list.concat(arr),
                    noMore:false
                });
                console.log(that.data.list);
            } else {
                wx.showToast({
                    title: datas.msg,
                    icon: 'success'
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

})