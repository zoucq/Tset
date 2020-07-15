//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
            motto: 'Hello World',
            userInfo: {},
            hasUserInfo: false,
            canIUse: wx.canIUse('button.open-type.getUserInfo'),

            animationData: {},
            animationData3:{},
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9]

    },
    onShow: function (e) {
        let that = this;


        

        // this.num = 0;

        // this._qh();

    },

    _qh() {
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

        this.animation = animation
        this.animation3 = animation3

        

        let time = random(1000, 5000);

        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        setTimeout(() => {

            this.animation.left(-120).opacity(0).step();
            this.animation3.left(0).opacity(1).top(10).step();
            this.animation.left(0).opacity(1).step()
            this.animation3.left(0).opacity(0).top(-60).step()

            this.setData({
                animationData: this.animation.export(),
                animationData3: this.animation3.export()
            });

            if (this.num >= this.data.list.length) {
                this.on = true;
                this.num = 0;
                //   this.setData({
                //       animationData: {},
                //       animationData3: {}
                //   });
            }

            this.setData({
                num: this.num,
                time: time
            });

            this.num++;

            if (!this.on) {
                this._qh();
            }

        }, time);
    },
    _handleGO(e){
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url,
        });
    },


    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
        url: '../logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
        })
        } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
            this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
            })
        }
        } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
            success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
            }
        })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
        })
    }
})



