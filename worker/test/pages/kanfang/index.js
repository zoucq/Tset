const api = require('../../utils/api.js');
const login = require('../../utils/login.js');

const app = getApp();

Page({

    data: {
        list: [
            { name: '海盐看房专线' }, 
            { name: '广州看房专线' }, 
            { name: '云南看房专线' }, 
            { name: '云南看房专线' }],

        houseId:'',

        dialogShow2:true
        
    },

    onLoad: function (options) {
        
    },

    onShow: function () {
        let that = this;
        login.islogin().then(function (res) {
            that.fetch();
        });

    },

    fetch(fn) {
        let that = this;
        wx.showLoading({
            title: '加载中',
        });
        api.req.post(api.api.index, {
            "action": "wxActivityList"
        }).then((res) => {
            console.log(res.data);
            let datas = res.data.data;

            datas.list[0].active = true;

            that.setData({
                houseId: datas.list[0].Data.bind_house,
                list: datas && datas.list
            });

            fn && (typeof fn == 'function') && fn();
            wx.hideLoading();
        });
    },

    _checked(e){
        let index = e.currentTarget.dataset.index;
        let id ;
        this.data.list.map((v,i)=>{
            if(i==index){
                v.active = !v.active;
            }else{
                v.active = false;
            }
            if(v.active){
                id = v.Data.bind_house;
            }
            // v.active = false;
        });
        // this.data.list[index].active = !this.data.list[index].active;
        this.setData({
            houseId: id,
            list:this.data.list,
        });
    },

    _submit(){
        wx.showLoading({
            title: '正在提交',
        });
        if (!this.data.user || this.data.user.length==0){
            wx.showModal({
                title: '提示',
                content: '姓名不能为空！'
            });
            wx.hideLoading();
            return ;
        }
        if (!this.data.phone || this.data.phone.length == 0) {
            wx.showModal({
                title: '提示',
                content: '手机号不能为空！'
            });
            wx.hideLoading();
            return ;
        }
        if (!this.data.houseId || this.data.houseId.length == 0) {
            wx.showModal({
                title: '提示',
                content: '请选择专线'
            });
            wx.hideLoading();
            return;
        }

        if (!this.on) {
            this.on = true;
            api.req.post(api.api.addFrom, {
                from: 1,
                house_id: this.data.houseId,
                type: 1,
                name: this.data.user ? this.data.user : '未知姓名',
                mobile: this.data.phone
            }).then((res) => {
                console.log(res);
                wx.hideLoading();
                if (res.data.ret) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg
                    });
                } else {
                    this.setData({
                        user:'',
                        phone:'',
                        dialogShow2:false
                    });
                    // setTimeout(()=>{
                    //     wx.navigateBack();
                    // },1000);
                }
                this.on = false;
            }, (err) => {
                console.log(err);
                wx.hideLoading();
                this.on = false;
            }, () => {
                this.on = false;
            });
        }


    },

    _closeDialog3(){
        this._closeDialog2();

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        // 不需要页面更新
        prevPage.setData({
            dialogShow2: true
        });
        wx.navigateBack();
        
    },

    _handleGO(e) {
        let url = e.currentTarget.dataset.go;
        // console.log(url);
        wx.navigateTo({
            url: url
        });
    },

    _input(e){
        let type = e.currentTarget.dataset.type;
        let value = e.detail.value;
        this.setData({
            [type]: value
        });
    },

    _closeDialog2() {
        this.onoff('dialogShow2');
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

    onPullDownRefresh: function () {
        
    },

    onReachBottom: function () {
        
    },

    onShareAppMessage: function () {
        
    }

})