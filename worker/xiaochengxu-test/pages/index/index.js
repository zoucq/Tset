const api = require('../../utils/api.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        city:'定位中...',
        // list
        boxHeight:'',
        load:false,
        list:[
            {
                url:'http://img.xiaopiu.com/userImages/img74516025767768.png',
                title:'绿城安吉桃花源',
                addr:'文一西路啥的骄傲的',
                price:'均价13000/㎡',
                bq:['精装','高端']
            },
            {
                url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                title: '绿城安吉桃花源',
                addr: '文一西路啥的骄傲的',
                price: '均价13000/㎡',
                bq: ['精装', '高端']
            }
        ],

        // touchmove
        lastX: 0,
        lastY: 0,
        mask:false,
        animationData: {},

        // sidebar-user
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),


        cur:1,

        zd:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLocal();
        this.getUser();
        this.getData();     
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    zd() {
        let that = this;
        this.setData({
            zd: true
        });
        wx.vibrateLong({
            success(res){
                console.log(res);
                that.vibrateLong();
            },
            fail(err){
                console.log(err);
            }
        });
    },
    vibrateLong() {
        setTimeout(() => {
            if (!this.data.zd) return;
            this.zd();
        },1000);
    },
    zdCancel(){
        this.setData({
            zd: false
        });
    },


    animateStart(){
        var animation = wx.createAnimation({
            left: '-80%',
            duration: 300,
            delay: 0
        })
        animation.left(0).step()

        this.setData({
            animationData: animation.export()
        })
    },
    animateEnd() {
        var animation = wx.createAnimation({
            left: 0,
            duration: 300,
            delay: 0
        })
        animation.left('-80%').step()

        this.setData({
            animationData: animation.export()
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        
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
        // this.getData();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    },

    //获取位置
    getLocal(){
        let that=this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log('坐标',res);
                let latitude = res.latitude,
                    longitude = res.longitude,
                    speed = res.speed,
                    accuracy = res.accuracy;

                let url = `https://api.map.baidu.com/geocoder/v2/?ak=0jFt2SXxVikl2ycnx9alQd0n3r3LDP9Z&location=${latitude},${longitude}&output=json`;
                api.req.get(url,{})
                .then(function(res){
                    console.log('位置',res.data);
                    that.setData({
                        city: res.data.result.addressComponent.city
                    })
                },function(err){
                    console.log(err);
                });
            }
        });
        
    },

    // 获取数据
    getData(){
        let that=this;
        that.setData({
            load: true
        });
        api.req.get('https://api.huacaijia.com/v1/category/parent_list', {})
        .then( (data) => {
            console.log('列表',data.data);     
            that.setData({
                load:false,
                list: that.data.list.concat(that.data.list)
            });
            that.totalHeight();
        }, (err) => {
            console.log(err);
        });
    },

    // 搜索跳转
    toSearch(){
        wx.navigateTo({
            url: '../search/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    // 计算滚动盒子高度
    totalHeight(){
        let height=290;
        let len = this.data.list.length;
        this.setData({
            boxHeight:height*len+'rpx'
        });
    },

    //触摸事件
    touchStart(e){
        console.log(e);
        this.data.lastX = e.touches[0].pageX
        this.data.lastY = e.touches[0].pageY
    },

    //滑动操作
    touchMove(e){
        console.log(e);
        let currentX = e.touches[0].pageX,
            currentY = e.touches[0].pageY;
        //console.log(currentX); 
        let text = "", offsetX, offsetY;
        offsetX = currentX - this.data.lastX;
        offsetY = currentY - this.data.lastY;

        text = offsetX < 0 ? "向左滑动" : "向右滑动";
        
        // 左右滑动
        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            if (offsetX < 5){
                this.animateEnd();
                this.setData({
                    mask:false
                });
            } else if (offsetX > 5){
                this.animateStart();
                this.setData({
                    mask:true
                });
            }
        }
        //上下方向滑动
        else {
            if (offsetY < 0)
                text = "向上滑动"
            else if (offsetY > 0)
                text = "向下滑动"
        }

        console.log(text);

        this.setData({
            //将当前坐标进行保存以进行下一次计算
            lastX: currentX,
            lastY: currentY
        });

    },

    //获取用户相关
    getUser(){
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
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
    //重新获取
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },


    testChange(){
        let cur=this.data.cur;
        if(cur==1){
            cur=2;
            this.setData({
                list:[
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    }
                ]
            })
        }else{
            cur=1;
            this.setData({
                list: [
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    },
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    },
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    },
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    },
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    },
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    },
                    {
                        url: 'http://img.xiaopiu.com/userImages/img74516025767768.png',
                        title: '绿城安吉桃花源',
                        addr: '文一西路啥的骄傲的',
                        price: '均价13000/㎡',
                        bq: ['精装', '高端']
                    }

                ]
            })
        }
        this.setData({
            cur:cur
        });
    }




})