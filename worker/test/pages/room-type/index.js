const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const login = require('../../utils/login.js');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        circular: false,
        current: 0,

        imgs:[],

        dialogShow: true,
        dialogShow2: true,
        dialogCurrent: 0,

        dialogShow3:true,

        inputName: '',
        inputPhone: '',

        houseId:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        console.log(opt)
        let that = this;
        that.setData({
            houseId: opt.id,
            current: opt.index || 0
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
    },

    fetch(fn) {
        let that = this;
        wx.showLoading({
            title: '加载中',
        });
        api.req.post(api.api.index, {
            "action": "wxHouseDetail",
            "house_id": this.data.houseId
        }).then((res) => {
            console.log(res);
            // &middot;
            // res.data.data.house_intro.body = res.data.data.house_intro.body.replace(/&middot;|&ldquo;|&rdquo;/g, ' ');
            if (res.data.data.house_intro && res.data.data.house_intro.body) {
                res.data.data.house_intro.body = res.data.data.house_intro.body.replace(/&middot;|&ldquo;|&rdquo;|&mdash;|&lsquo;|&rsquo;|&hellip;/g, ' ');
            } 
            res.data.data.rooms.rooms.map((v,i)=>{
                v.update_time = util.yymmdd(v.update_time);
            });
            let arr=[];
            res.data.data.rooms.rooms.map((v,i)=>{
                arr.push(v.photo_urls);
            });
            that.setData({
                house: res.data.data,
                imgs:arr
            });

            let title = `户型详情（${this.data.current*1 + 1}/${this.data.house.rooms.rooms.length}）`;
            wx.setNavigationBarTitle({
                title: title
            });

        });

        api.req.post(api.api.index, {
            action: 'wxHasTake'
        }).then((res) => {
            console.log('hongbao1', res.data);
            this.setData({
                dialogShow2: true,
                dialogShows: res.data.data.has_take,
                can_take_count: res.data.data.can_take_count
            });
            if (this.data.dialogShows) {
                this.setData({
                    open: true
                });
            }
            (typeof fn =='function') && fn();
            wx.hideLoading();
        }, (err) => {
            console.log('hongbao1', err)
        });

    },

    // swiper切换text
    _slider(e) {
        let obj = e.detail;
        // console.log(obj);
        if (obj.source == 'touch') {
            this.setData({
                current: obj.current
            });
            let title = `户型详情（${this.data.current+1}/${this.data.house.rooms.rooms.length}）`;
            wx.setNavigationBarTitle({
                title: title
            });
        }
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

    _closeDialog2() {
        this.onoff('dialogShow2');
    },

    // 关闭弹窗
    _closeDialog() {
        this.onoff('dialogShow');
    },

    // 打开弹窗
    _showDialog(e) {
        let type = e.currentTarget.dataset.type;
        this.setData({
            dialogCurrent: type
        });
        this.onoff('dialogShow');
    },

    //  开关函数
    onoff(obj) {
        this.setData({
            [obj]: !this.data[obj]
        });
    },

    // 打电话
    _call(e) {
        let phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        });
    },

    _inputName(e) {
        // console.log(e.detail.value);
        this.setData({
            inputName: e.detail.value
        });
    },

    _inputPhone(e) {
        this.setData({
            inputPhone: e.detail.value
        });
    },

    _closeDialog3() {
        this.onoff('dialogShow3');
    },

    // 表单提交
    _submit() {
        console.log(this.data.dialogCurrent);
        wx.showLoading({
            title: '正在提交',
        });
        if (this.data.inputName.length == 0 || this.data.inputPhone.length == 0 
        || this.data.inputPhone.length < 11 ) {
            wx.hideLoading();
            wx.showModal({
                title: '提示',
                content: '姓名和手机号不能为空！'
            });
            return;
        }
        console.log(this.data.inputPhone);
        console.log(this.data.inputName);
        api.req.post(api.api.addFrom,{
            from:1,
            house_id: this.data.houseId,
            type: this.data.dialogCurrent == 0 ? 13 : (this.data.dialogCurrent == 1 ? 2 : 1),
            name: this.data.inputName ? this.data.inputName : '未知姓名',
            mobile: this.data.inputPhone 
        }).then((res)=>{
            console.log(res);
            wx.hideLoading(); 
            if(res.data.ret==1){
                wx.showModal({
                    title: '提示',
                    content: res.data.msg
                });
            }else{   
                this.setData({
                    dialogShow:true,
                    dialogShow3:false,
                    backText: res.data.msg,
                    inputName:'',
                    inputPhone:''
                });
            }
        },(err)=>{
            console.log(err);
            wx.hideLoading(); 
        });
    },

    // B方案
    _Bhongbao() {
        if (this.data.dialogShows) {
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

    _handleGO(e) {
        let url = e.currentTarget.dataset.go;
        // console.log(url);
        wx.navigateTo({
            url: url
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
                                    dialogShows: true,
                                    open: true
                                });
                            }
                        });
                    } else {
                        if (that.data.plan_type != 1) {
                            that.setData({
                                dialogShows: true,
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
            app.globalData.share.title = app.globalData.share.title4;
        }

        return app.globalData.share;

    }


})