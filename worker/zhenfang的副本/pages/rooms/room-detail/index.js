const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
import weSwiper from '../../../public/src/main'
const coordtansform = require('../../../utils/coordtransform.js')
//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        load:false,
        id:1,
        data:[],
        nowDate:'',

        // 用户状态标记
        userTypes:[],
        usertypes:'标记看房状态',
        navShow:false,

        // 在售房源
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        rooms: [
            {
                name: 1, photos: ['http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                    'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg']
            },
            {
                name: 2, photos: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
            }
        ],

        //户型图
        current: 0,
        huxingShow:false,
        huxing:[],

        //问答swiper-current
        currentSwiper:0,
        swiper:0,
        len:0,

        // 订阅成功
        follow:false,
        followActive:false,
        followId:0,
        followText:'订阅'

    }, 
    onLoad: function (option) {
        console.log(api);
        this.init(option);
        this.getData(); 
        
        // 初始化动画
        this.scaleY(0.86, 'ani', .4);
        this.scaleY(1, 'ani2', 1);
    },
    // 初始化weSwiper
    touchstart(e) {
        this.weswiper.touchstart(e)
    },
    touchmove(e) {
        this.weswiper.touchmove(e)
    },
    touchend(e) {
        this.weswiper.touchend(e)
    },
    // 初始化weSwiper
    initSwiper(len) {
        let that = this;
        // const len= 9;
        const device = wx.getSystemInfoSync();
        new weSwiper({
            animationViewName: 'animationData',
            slideLength: len,
            initialSlide: 0,
            width: 650 * device.windowWidth / 750,
            height: 400 * device.windowWidth / 750,
            // swiper初始化后执行
            onInit(weswiper) {
                
            },
            // 达到过度条件
            onSlideChangeStart(weswiper) {
                that.setData({
                    swiper: weswiper.activeIndex
                });
            },
            // swiper从一个slide过渡到另一个slide结束时执行
            onSlideChangeEnd(weswiper) {
                // console.log(weswiper.activeIndex);
                
            }
            
        });
    },
    // 初始化
    init(option){
        console.log(option);
        this.setData({
            id: option.id || 1,
            nowDate: util.formatTime(new Date()).split(' ')[0]
        });
        let statusAll = api.statusAll;
        for (let key in statusAll.record_type) {
            if (statusAll.record_type[key] == '浏览') {
                this.handleTab({ currentTarget: { dataset: { name: '浏览', id: key } } });
            }
        }    
    },
    // 获取数据
    getData(){
        let that = this;
        that.setData({
            load: true
        });

        // 标记数据
        api.req.get(api.api.detail.types,{})
        .then((res)=>{
            console.log('room-detail用户标记',res.data);
            if(res.data.ret==0){
                that.setData({
                    userTypes:res.data.data
                });
            }
        },(err)=>{
            console.log(err);
        });

        // 页面数据
        api.req.get(api.api.detail.index,{id:this.data.id})
            .then((res) => {
                if(res.data.ret==0){
                    console.log('room-detail列表', res.data);
                    let datas = res.data.data;
                    let statusAll = api.statusAll;

                    for(let key in statusAll.record_type){
                        // console.log(key, statusAll.record_type[key]);
                        if (statusAll.record_type[key]=='订阅'){
                            that.setData({
                                followId:key
                            });
                        }
                    }
                    datas.records && datas.records.map((v,i)=>{
                        console.log(v);
                        for (let key in statusAll.record_type) {
                            // console.log(key, statusAll.record_type[key]);
                            if (v==key) {
                                // console.log('res', statusAll.record_type[key])
                                if (statusAll.record_type[key] == '订阅'){
                                    that.setData({
                                        followActive: true,
                                        followText: '取消订阅'
                                    });
                                }else{
                                    if (statusAll.record_type[key] != '浏览'){
                                        if (statusAll.record_type[key] == '未标记'){
                                            that.setData({
                                                usertypes: '标记看房状态'
                                            });
                                        }else{
                                            that.setData({
                                                usertypes: statusAll.record_type[key]
                                            });
                                        }
                                    } 
                                }
                            }
                        }
                    })


                    datas.house_attrs.ArchitecturalType = datas.house_attrs.ArchitecturalType==0 ? datas.house_attrs.ArchitecturalType : statusAll.house_architectural_type[datas.house_attrs.ArchitecturalType];
                    datas.house_attrs.RenovationStatus = datas.house_attrs.RenovationStatus == 0 ? datas.house_attrs.RenovationStatus : statusAll.house_renovation_type[datas.house_attrs.RenovationStatus];
                    datas.house_attrs.Status = datas.house_attrs.Status == 0 ? datas.house_attrs.Status : statusAll.house_room_status[datas.house_attrs.Status];
                    datas.house_attrs.PriceUnit = datas.house_attrs.PriceUnit == 0 ? datas.house_attrs.Status : statusAll.house_price_type[datas.house_attrs.PriceUnit];

                    datas.rooms.map((v,i)=>{ 
                            v.price_unit = v.price_unit > 0 ? statusAll.house_room_price_unit[v.price_unit] : v.price_unit
                    });

                    datas.house_attrs.OpenTime = util.yymmdd(datas.house_attrs.OpenTime);
                    datas.house_attrs.Ctime = util.yymmdd(datas.house_attrs.Ctime);
                    datas.house_attrs.ApartmentTime = util.yymmdd2(datas.house_attrs.ApartmentTime);
                    datas.lastNews.Ctime = util.yymmdd(datas.lastNews.Ctime);
                    datas.lastQuestions.map((v,i)=>{
                        v.Ctime = util.yymmdd(v.Ctime);
                    });
                    datas.lastReports.map((v, i) => {
                        v.Ctime = util.yymmdd(v.Ctime);
                    });
                    datas.rooms.map((v,i)=>{
                        v.habitable = api.statusAll.house_room_type[v.habitable];
                        v.mtime = v.mtime.split(' ')[0];
                    });
                    
                    that.setData({
                        data: datas
                    });
                    // 问题长度
                    let len = datas.lastQuestions && datas.lastQuestions.length;
                    //this.initSwiper(len); 
                }else{
                    console.log('room-detail列表错误',res.data.msg);
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        success: function (res) {
                            wx.navigateBack();
                        }
                    });
                }
                that.setData({
                    load: false
                });
            }, (err) => {
                console.log(err);
            });
    },
    // 
    handleShow(){
        this.setData({
            navShow: !this.data.navShow
        });
    },
    // 打电话
    handleCall(e){
        let phone = e.currentTarget.dataset.phone;
        if (phone){
            wx.makePhoneCall({
                phoneNumber: phone
            });
        }
    },
    // 跳转
    handleGo(e){
        let url=e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    },
    // 标记状态
    handleTab(e){
        console.log(e.currentTarget.dataset.name);
        console.log(e.currentTarget.dataset.id);

        let name = e.currentTarget.dataset.name;
        let id = e.currentTarget.dataset.id;
        let that = this;

        api.req.get(api.api.detail.tab, 
        {
            house_id:that.data.id,
            type: id
        })
        .then((res) => {
            console.log('标记tab', res.data);   
            if (res.data.ret == 0) {
                if (name == '订阅') {
                    if (that.data.followActive){
                        that.setData({
                            followActive: false,
                            followText: '订阅'
                        });
                        wx.showToast({
                            title: '取消订阅成功',
                            icon: 'success',
                            duration: 2000
                        });
                    }else{
                        that.setData({
                            followActive:true,
                            followText:'取消订阅'
                        });
                        that.handleFollow();
                    }
                }
                if(name=='未标记' || name=='浏览' || name=='订阅'){
                    name ='标记看房状态';
                }else{
                    wx.showToast({
                        title: '标记成功',
                        icon: 'success',
                        duration: 2000
                    });
                }
                that.setData({
                    usertypes: name,
                    navShow:false
                });       
            }else{
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                });
            }
        }, (err) => {
            console.log('err',err);
        });

    },
    
    // 滑动swiper
    handleSlider(e) {
        // console.log(e.detail.current);
        let current = e.detail.current;
        this.setData({
            current: current
        });
    },
    // 户型展示
    handleShowHuxing(e){
        let index=e.currentTarget.dataset.index;
        console.log(index);
        this.setData({
            huxingShow:!this.data.huxingShow,
            huxing:this.data.data.rooms[index],
            current:0
        });
        // console.log(this.data.huxing);
    },
    // q-s 滑动事件
    ban_change: function (e) {
        // console.log(e)
        this.setData({ currentSwiper: e.detail.current })
        this.scaleY(0.86, 'ani', .4);
        this.scaleY(1, 'ani2', 1);
    },
    // 动画
    scaleY: function (y, obj, n) {
        var animation = wx.createAnimation({
            timingFunction: 'ease-in-out',
        })
        animation.opacity(n).scaleY(y).step()

        this.setData({
            [obj]: animation.export()
        })
    },
    //订阅
    follow(e){
        // if (!this.data.followActive){
            this.handleTab(e);
        // }
    },
    handleFollow(){
        this.setData({
            follow:!this.data.follow
        });
    }

});

