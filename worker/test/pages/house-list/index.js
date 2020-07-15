const api = require('../../utils/api.js');
const login = require('../../utils/login.js');

const app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        house:{},
        dialogShow:true,
        dialogShow2: true,
        current:0,

        scroll: false,
        ani: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        let that = this;
        that.setData({
            id: opt.id
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.showShareMenu({
            withShareTicket: true
        });

        let that = this;
        login.islogin().then(function (res) {
            that.setData({
                plan_type: wx.getStorageSync('plan_type'),
            });
            // if (!that.data.open) {
                that.fetch();
            // }
        });

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

    _goRed() {
        this.setData({
            dialogShow2: true
        });
        wx.navigateTo({
            url: '/pages/my-redpacket/index'
        });
    },

    _Start(e) {
        // this.setData({
        //     scroll: true
        // });
    },
    _Move(e) {
        this.setData({
            scroll: true
        });
    },
    _End(e) {
        setTimeout(() => {
            this.setData({
                scroll: false
            });
        }, 200);
    },

    _backHome(){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    },

    fetch() {
        let that = this;
        wx.showLoading({
            title: '加载中',
        });
        api.req.post(api.api.index, {
            "action": "wxActivityDetail",
            activity_id:this.data.id
        }).then((res) => {
            // console.log(res.data.data);
            let datas = res.data.data;

            for (var v in datas.house_list){
                datas.house_list[v].build_type = datas.house_list[v].build_type && datas.house_list[v].build_type.split(',');
                
                if (datas.house_list[v].news && datas.house_list[v].news.body){ 
                    datas.house_list[v].news.body = datas.house_list[v].news.body.replace(/&(\w+);/g, ' ');
                }
            };

            wx.setNavigationBarTitle({
                title: res.data.data.ActivityName
            });

            datas.house_list.map((v, i) => {
                v.active = false;
            });
            
            that.setData({
                house: datas
            });

        });

        api.req.post(api.api.index, {
            action: 'wxHasTake'
        }).then((res) => {
            console.log('hongbao1', res.data);
            this.setData({
                dialogShow: res.data.data.has_take,
                dialogShow2: res.data.data.has_take,
                can_take_count: res.data.data.can_take_count
            });
            if (this.data.dialogShow) {
                this.setData({
                    open: true
                });
            }
            wx.hideLoading();
        }, (err) => {
            console.log('hongbao1', err)
        });



    },

    _userInfo(e) {
        console.log(e);
        let detail = e.detail;
        if (detail.userInfo) {
            if (!wx.getStorageSync('has_username')) {
                api.req.post(api.api.index, {
                    action: 'wxUpUserInfo',
                    username: detail.userInfo.nickName,
                    avatar: detail.userInfo.avatarUrl,
                }).then((res) => {
                    console.log(res.data);
                    wx.navigateTo({
                        url: '../my-redpacket/index',
                    });
                }, (err) => {
                    console.log(err.data);
                });
            } else {
                wx.navigateTo({
                    url: '../my-redpacket/index',
                });
            }
        }
    },

    _handleGO(e) {
        let url = e.currentTarget.dataset.go;
        console.log(url);
        wx.navigateTo({
            url: url
        });
    },

    animate() {
        api.req.post(api.api.index, {
            action: 'wxTakeFirstRedPacket'
        }).then((res) => {
            console.log(res);
            setTimeout(() => {
                this.setData({
                    open: true
                });
            }, 200);
        }, (err) => {
            console.log(err);
        });

    },

    _handleGO(e) {
        let url = e.currentTarget.dataset.go;
        // console.log(url);
        wx.navigateTo({
            url: url
        });
    },

    _open() {
        this.animate();
    },

    // 打开弹窗
    _showDialog(e) {
        let type = e.currentTarget.dataset.type;
        this.onoff(type);
    },

    // 关闭弹窗
    _closeDialog(e) {
        let type = e.currentTarget.dataset.type;
        this.onoff(type);
    },

    // 占位事件
    _place() {

    },

    //  开关函数
    onoff(obj) {
        this.setData({
            [obj]: !this.data[obj]
        });
    },

    _tab(e){
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        this.data.house.house_list.map((v,i)=>{
            if(id==v.house_id){
                v.active = true;
            }else{
                v.active = false;
            }
        });
        console.log(this.data.house);
        this.setData({
            house: this.data.house,
            current:index
        });
    },

    // B方案
    _Bhongbao() {
        if (this.data.dialogShow) {
            this.setData({
                dialogShow2: false,
                open: true
            });
        } else {
            this.setData({
                dialogShow2: false,
                open: false
            });
        }
    },

    _goKanfang() {
        this.setData({
            dialogShow2: true
        });
        wx.navigateTo({
            url: '/pages/kanfang/index',
        });
    },

    // 用户点击右上角分享
    onShareAppMessage: function (e) {
        let that = this;
        if (e.from === 'button') {
            if (wx.getStorageSync('userInfo')) {
                if (this.data.plan_type == 1) {
                    app.globalData.share.title = wx.getStorageSync('userInfo').nickName + app.globalData.share.title2;
                } else {
                    app.globalData.share.title = wx.getStorageSync('userInfo').nickName + app.globalData.share.b_title2;
                }
            } else {
                if (this.data.plan_type == 1) {
                    app.globalData.share.title = app.globalData.share.title3;
                } else {
                    app.globalData.share.title = app.globalData.share.b_title3;
                }
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
                            if (that.data.plan_type != 1) {
                                that.setData({
                                    dialogShow:true,
                                    open: true
                                });
                            }
                        });
                    } else {
                        if (that.data.plan_type != 1) {
                            that.setData({
                                dialogShow: true,
                                open: true
                            });
                        }
                    }
                }, (err) => {
                    console.log(err);
                });
            }
        } else {
            app.globalData.share.imageUrl = '';
            app.globalData.share.title = that.data.house.ActivityName;
        }

        return app.globalData.share;

    }


})