const api = require('../../../utils/api.js')

//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        infos:{},
        historyInfo:[],

        onoff:false

    },
    onLoad: function () {
        
        //用户登录授权
        // this.getUserInfo();
        //判断用户信息和兼容
        // this.pdUserInfo();

        this.userLogin();

        //获取用户问答和反馈
        // this.getQsData();

        //获取用户浏览历史记录
        this.historyData();
        
    },
    onShow(){
        // this.getQsData();
        if(this.data.onoff){
            this.userLogin();
            //获取用户浏览历史记录
            this.historyData();
        }
        this.setData({
            onoff: true
        });
    },
    userLogin(){
        let that=this;
        console.log('data', wx.getStorageSync('userInfo'));
        if (wx.getStorageSync('userInfo')) {
            let userInfo = wx.getStorageSync('userInfo');
            this.setData({
                userInfo: userInfo,
                hasUserInfo: true
            });
        }else{
            wx.getUserInfo({
                success: function (res) {
                    console.log('getUser',res);
                    wx.setStorageSync('userInfo', res.userInfo);
                    that.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
    },
    pdUserInfo(){
        if (app.globalData.userInfo) {
            console.log('storage',111);
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log('back',res);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
                console.log(this.data.userInfo)
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    console.log('getUserInfo', res);
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
    },
    // 用户信息
    getUserInfo: function(e) {
        console.log('tapGet',e);
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    // 提问，反馈，回答
    getQsData(){
        let that = this;
        api.req.get(api.api.user.info,{})
        .then((res)=>{
            let datas = res.data;
            console.log('Q-S', datas);
            if (datas.ret==0){
                this.setData({
                    infos:datas.data
                });
            }else{
                wx.showModal({
                    title: '提示',
                    content: datas.msg
                });
            }
        },(err)=>{
            console.log(err);
        });
    },
    // 用户历史
    historyData(){
        let that = this;
        api.req.get(api.api.user.userStatus, {})
        .then((res) => {
            let datas = res.data;
            console.log('history', datas);
            if (datas.ret == 0) {
                let status = api.statusAll.record_type;
                // console.log(status);
                let arr=[];
                for(let v in datas.data){
                    // console.log(v);
                    arr.push({name:status[v],num:datas.data[v],id:v});
                }
                console.log(arr);
                this.setData({
                    historyInfo: arr
                });
            } else {
                wx.showModal({
                    title: '提示',
                    content: datas.msg
                });
            }
        }, (err) => {
            console.log(err);
        });
    },
    // 跳转
    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    }

})
