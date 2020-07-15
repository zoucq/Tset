const api = require('../../utils/api.js');
const login = require('../../utils/login.js');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        circular:true,
        current:0,

        more1: false,  
        more2:false,
        tabCurrent:0,

        dialogShow:true,
        dialogCurrent:0,

        dialogShow2: true,
        dialogShow3: true,

        inputName:'',
        inputPhone:'',

        house:{},

        scroll:false,

        plan_type: wx.getStorageSync('plan_type'),

        d2:0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        console.log(opt)
        let that = this;
        that.init(opt);
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

    init(opt){
        this.setData({
            houseId: opt.id || 388
        });
    },

    fetch(){
        let that = this;
        wx.showLoading({
            title: '加载中',
        });
        api.req.post(api.api.index,{
            "action": "wxHouseDetail",
            "house_id": this.data.houseId
        }).then((res)=>{
            console.log('index-info',res);

            if (res.data.data.news && res.data.data.news.body ){
                res.data.data.news.body = res.data.data.news.body.replace(/&(\w+);/g, ' ');
            }

            // &middot;
            if (res.data.data.house_intro && res.data.data.house_intro.body){
                res.data.data.house_intro.body = res.data.data.house_intro.body.replace(/&(\w+);/g, ' ');
            } 

            let obj = {};
            for (let i in res.data.data.house_detail){
                // console.log(i,res.data.data.house_detail[i]);
                if(res.data.data.house_detail[i]){
                    obj[i]=res.data.data.house_detail[i]
                } 
            }
            // console.log(obj);
            res.data.data.house_detail = obj;

            res.data.data.addr = res.data.data.house_address.split(' ')[0] || '';
            res.data.data.house_address = res.data.data.house_address && res.data.data.house_address.split(' ')[1] || res.data.data.house_address;

            wx.setNavigationBarTitle({
                title: res.data.data.house_name
            });

            that.setData({
                house: res.data.data
            });

        });

        api.req.post(api.api.index, {
            action: 'wxHasTake'
        }).then((res) => {
            console.log('hongbao1', res.data);
            this.setData({
                dialogShows: res.data.data.has_take,
                dialogShow2: true,
                can_take_count: res.data.data.can_take_count
            });

            if (this.data.dialogShows) {
                this.setData({
                    open: true
                });
            }
            
            wx.hideLoading();
        }, (err) => {
            console.log('hongbao1', err)
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

    // swiper切换text
    _slider(e){
        let obj = e.detail;
        // console.log(obj);
        if(obj.source == 'touch'){
            this.setData({
                current:obj.current
            });
        }
    },

    // 亮点切换
    _tab(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            tabCurrent:index
        });
    }, 

    // 查看更多
    _more(e){
        let type = e.currentTarget.dataset.type;
        this.onoff(type);
    },

    _inputName(e){
        // console.log(e.detail.value);
        this.setData({
            inputName: e.detail.value
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

    _inputPhone(e) {
        this.setData({
            inputPhone: e.detail.value
        });
    },

    // 表单提交
    _submit(){
        wx.showLoading({
            title: '正在提交',
        });
        console.log(this.data.dialogCurrent);
        if (this.data.dialogCurrent == 0 || this.data.dialogCurrent == 2){
            if (this.data.inputName.length == 0 || this.data.inputPhone.length == 0) {
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: '姓名和手机号不能为空！'
                });
                return ;
            }
        } else{
            if (this.data.inputPhone.length == 0 && 
                this.data.inputPhone.length < 11) {
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: '手机号不能为空！'
                });
                return ;
            }
        }

        console.log(this.data.inputPhone);
        console.log(this.data.inputName);

        if(!this.on){
            this.on = true;
            api.req.post(api.api.addFrom, {
                from:1,
                house_id: this.data.houseId,
                type: this.data.dialogCurrent == 0 ? 13 : (this.data.dialogCurrent == 1 ? 2 : 1),
                name: this.data.inputName ? this.data.inputName : '未知姓名',
                mobile: this.data.inputPhone
            }).then((res) => {
                console.log(res);

                wx.hideLoading();
                if (res.data.ret==1){
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg
                    });
                }else{
                    this.setData({
                        dialogShow: true,
                        dialogShow3: false,
                        backText: res.data.msg,
                        inputName: '',
                        inputPhone: ''
                    });
                }
                this.on = false;
            }, (err) => {
                wx.hideLoading();
                console.log(err);
                this.on = false;
            },()=>{
                this.on = false;
            });
        }


    },

    // 打开弹窗
    _showDialog(e){
        let type = e.currentTarget.dataset.type;
        this.setData({
            dialogCurrent: type
        });
        this.onoff('dialogShow');
    },

    // 打电话
    _call(e){
        let phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        });
    },

    // 关闭弹窗
    _closeDialog(){
        this.onoff('dialogShow');
    },

    _closeDialog2() {
        this.onoff('dialogShow2');
    },

    _closeDialog3() {
        this.onoff('dialogShow3');
    },
    
    // 占位事件
    _place(){

    },

    //  开关函数
    onoff(obj){
        this.setData({
            [obj]: !this.data[obj]
        });
    },

    _handleGO(e) {
        let url = e.currentTarget.dataset.go;
        console.log(url);
        wx.navigateTo({
            url: url
        });
    },

    tabs(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            d2:index
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
                    wx.setStorageSync('off', true);
                }, (err) => {
                    console.log(err);
                });
            }
        } else {
            app.globalData.share.imageUrl = '';
            app.globalData.share.title = that.data.house.house_name;
        }

        return app.globalData.share;

    }
    

})