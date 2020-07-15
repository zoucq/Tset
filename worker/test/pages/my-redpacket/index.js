const api = require('../../utils/api.js');
const login = require('../../utils/login.js');

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        all:{},
        useDialog:true,

        indicatorDots: false,
        autoplay: true,
        interval: 1000,
        duration: 1000,

        list:[],
        animationData: {},
        animationData3:{},

        ani: false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
                // 分享成功
                console.log('shareMenu share success')
                console.log('分享' , res)
            },
            fail: function (res) {
                // 分享失败
                console.log(res)
            }
        });
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (e) {
        let that = this;
        login.islogin().then((res) => {
            that.fetch(()=>{
                // that.num = 0;
                // that._qh();
            });
        });

        // this.ani();

        this.num = 0;

        this._qh();

        this.ff();

    },

    ff() {
        this.setData({
            ani: false
        });
        setTimeout(() => {
            this.setData({
                ani: true
            });
        }, 100)
    },

    ani() {
        var animationBtn = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1100,
            timingFunction: 'ease',
        });

        this.animationBtn = animationBtn;

        this.setData({
            animationBtn: animationBtn.export()
        });

        setTimeout(() => {
            this.animationBtn.scale(1.1, 1.1).step()
            this.animationBtn.scale(1, 1).step()
            this.setData({
                animationBtn: this.animationBtn.export()
            });
            this.ani();
        }, 1000);
    },

    _qh2(){
        let animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: 'ease',
        });

        let animation3 = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: 'ease',
        });

        this.animation = animation;
        this.animation3 = animation3;

        this.animation.left(-120).opacity(0).step()
        this.animation.left(0).opacity(1).step()

        this.animation3.left(0).opacity(1).top(10).step()
        this.animation3.left(0).opacity(0).top(-60).step()

        this.setData({
            animationData: this.animation.export(),
            animationData3: this.animation3.export()
        });

        let time = random(1000, 5000);

        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        setTimeout(() => {

            if (this.num >= this.data.list.length) {
                this.on = true;
                this.num = 0;
            }

            console.log(this.num)

            this.setData({
                num: this.num,
                time: time
            });

            this.num++;

            if (!this.on) {
                this._qh2();
            }

        }, time);
    },

    _qh(){
        
        let time = random(1500, 5000);
        
        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        setTimeout(() => {

            if (this.num >= this.data.list.length){
                this.num = 0;
            }   

            // console.log(this.num);

            this.setData({
                num: this.num,
                time:time
            });

            this.num++;

            this._qh();

        }, time);
    },

    fetch(fn) {
        let that = this;

        wx.showLoading({
            title: '加载中',
        });
        api.req.post(api.api.index, {
            "action": "wxRedPackList"
        }).then((res) => {
            console.log('hongbao-list',res.data);
            that.setData({
                all:res.data.data
            });
            // wx.hideLoading();
        },(err)=>{
            console.log(err.data)
        });
        
        api.req.post(api.api.index, {
            "action": "wxGetLastTakeRedPackList"
        }).then((res) => {
            console.log('list', res.data);
            that.setData({
                list: res.data.data.list
            });
            wx.hideLoading();
            fn && (typeof fn == 'function') && fn();
        }, (err) => {
            console.log(err.data)
        });

    },

    _change(e){
        // console.log(e);
        // console.log(e.detail.current);
        if (e.detail.source == "autoplay"){   
            let time = random(1000, 5000);
            this.setData({
                interval: time
            });
            function random(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
        }
    },  

    // 占位事件
    _place() {

    },

    _open(e){
        let that = this;
        let pid = e.currentTarget.dataset.id;
        api.req.post(api.api.index,{
            action:'wxTakeRedPack',
            pid:pid
        }).then((res)=>{
            console.log(res.data);
            that.fetch();
        },(err)=>{
            console.log(err.data);
        });
    },

    _goMoney(e){
        wx.reLaunch({
            url: '../index/index'
        });
    },

    _closeDialog(e) {
        let type = e.currentTarget.dataset.type;
        console.log(type)
        this.setData({
            [type]:!this.data[type]
        });
    },

    _backHome() {
        wx.reLaunch({
            url: '/pages/index/index'
        });
    },

    _handleGO(e) {
        let url = e.currentTarget.dataset.go;
        // console.log(url);
        wx.navigateTo({
            url: url
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        let that = this;
        if (wx.getStorageSync('userInfo')){
            app.globalData.share.title = wx.getStorageSync('userInfo').nickName + app.globalData.share.title2;
        }else{
            app.globalData.share.title = app.globalData.share.title3;
        }
        app.globalData.share.imageUrl = 'https://ssl.malmam.com/xiangju-static/dfs/14/49001c7c3184c4/share3.png';
        
        app.globalData.share.success = function (e) {
            console.log(e);

            api.req.post(api.api.index, {
                action: 'wxShare'
            }).then((res) => {
                console.log('share-success', res);
                if (res.data.errCode && res.data.errCode == '-41003') {
                    login.islogin().then(function (res) {
                        that.fetch();
                    });
                } else {
                    that.fetch();
                }
            }, (err) => {
                console.log(err);
            });

            // if (e && e.shareTickets) {
            //     console.log('qqq222');
            //     wx.getShareInfo({
            //         shareTicket: e.shareTickets[0],
            //         success: function (res) {
            //             console.log(res);
                        
            //             api.req.post(api.api.index, {
            //                 action: 'wxShare',
            //                 encryptedData: res.encryptedData,
            //                 iv: res.iv
            //             }).then((res) => {
            //                 console.log('share-success',res);
            //                 if (res.data.errCode && res.data.errCode == '-41003') {
            //                     login.islogin().then(function (res) {
            //                         that.fetch();
            //                     });
            //                 }else{
            //                     that.fetch();
            //                 }
            //             }, (err) => {
            //                 console.log(err);
            //             });
            //         },
            //         fail: function (res) {
            //             console.log(res)
            //         },
            //         complete: function (res) {
            //             console.log(res)
            //         }
            //     });
            // }
        }

        return app.globalData.share;

    }
})