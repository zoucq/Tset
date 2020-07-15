var WxParse = require('../../utils/wxParse/wxParse.js');

const api = require('../../utils/api.js')
const app = getApp()

Page({

    // 页面的初始数据
    data: {
        city:'杭州',
        boxHeight:'',
        load:false,
        list:[],
        page:1,
        pagesize:20,
        noMore:true,

        arrHight:[],
        type:''

    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {

        app.statusData(function(data){
            console.log(data)
        });

        console.log(api.statusAll.house_status);
        console.log(app.globalData.statusAll);

        let obj = api.statusAll.house_status;
        for(let v in obj){
            if (obj[v]=='在售'){
                this.setData({
                    type:v
                });
            }
        }

        this.getData(); 

        let that = this;
        for (let i = 0; i < this.data.list.length; i++) {
            if (i == 0){
                this.data.list[i].show = true;
            }else{        
                this.data.list[i].show = false;       
            }
            this.data.list[i].id = i + 1;
        }
        // this.setData({
        //     list: this.data.list
        // }); 
        // console.log(this.data.list);

        this.fadeIn('in1', 1);
        this.fadeIn('in2', 1); 

        
        this.testInit();

        // setTimeout(()=>{
        //     this.imgsLoadTest();
        // },1000);


    },

    onShow(){
        wx.createSelectorQuery().selectAll('.loadImg').boundingClientRect((ret) => {
            console.log(333, ret);

        }).exec()
    },

    showImg() {
        let group = this.data.article.images 
        let height = wx.getSystemInfoSync().windowHeight  // 页面的可视高度

        wx.createSelectorQuery().selectAll('.loadImg').boundingClientRect((ret) => {
            console.log(ret);
            ret.forEach((item, index) => {
                if (item.top <= height) {
                    判断是否在显示范围内
                    group[index].show = true // 根据下标改变状态
                }
            })
            this.setData({
                group
            })
        }).exec()

    },
    onPageScroll() { // 滚动事件
        this.showImg()
    },


    testInit(){
        let testList = [
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/15/47d0b2be8ec620/1_E5_89_AF_E6_9C_AC.jpg' },
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/15/4e1078a76d000d/7.jpg' },
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/20/58ee684d2c6b2c/33.jpg' },
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/19/58eaf79894c0ae/wx5a3354566c2ba604.o6zAJsxKILn_y6KT09PxMjEEbOQY.Py6AMYCdyTvQda586ac038e698e0704e66157c45487d.jpeg' },
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/20/58eaf4256c028c/wx5a3354566c2ba604.o6zAJsxKILn_y6KT09PxMjEEbOQY.L5pUILkX6BD6d9ed68aff902622fa44919893c1b00f2.jpg' },
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/19/58ca45de662861/wx5a3354566c2ba604.o6zAJsxKILn_y6KT09PxMjEEbOQY.5h5b7visAmzZfc7f1e6875211f16bd2cb77a2cb81041.png' },
            { index: 0, img: 'https://ssl.malmam.com/xiangju-static/dfs/19/58ca45de662861/wx5a3354566c2ba604.o6zAJsxKILn_y6KT09PxMjEEbOQY.5h5b7visAmzZfc7f1e6875211f16bd2cb77a2cb81041.png' },
        ];

        let str = '';
        testList.map((v, i) => {
            str += `<p><img src="${v.img}"/></p>`
        });

        WxParse.wxParse('article', 'html', str, this, 5);

        

        // this.showImg();

        wx.createIntersectionObserver().relativeToViewport({ bottom: 400 }).observe('.wxParse-p', (res) => {
            console.log(res)
        })


        this._observer = wx.createIntersectionObserver(this)


        console.log(this._observer)
        this._observer.relativeToViewport().observe('.loadImg', (ret) => {
            console.log(6666,ret);
        })

        // console.log(this.data.article);
        // this.imgsLoadTest();
    },


    imgsLoadTest(){
        let list = this.data.article.images  // 获取原数据
        console.log(list);
        list.map((v,i)=>{
            // 设置监听回调事件，当元素 .loadImg{{i}},进入页面20px内就触发回调事件，
            //设置图片为真正的图片，通过show控制
            this._observer = wx.createIntersectionObserver(this)
            this._observer.relativeToViewport({ bottom: 20 }).observe('.loadImg' + i, (ret) => {
                if (ret.intersectionRatio > 0) {
                    v.show = true
                }
                this.data.article.images = list;
                this.setData({ // 更新数据
                    article: this.data.article
                });
            })
        }); 
    },

    imgLoad(e){
        // console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id;
        let list =this.data.list;
        for(let i in list){
            if(id==list[i].id){
                list[i].show=true;
            }
        }
        this.setData({
            list:list
        });
    },
    onPageScroll(e) {
        // console.log(e.scrollTop);
        // let _this = this;
        // let imgH = 160;
        // let index = parseInt(e.scrollTop / imgH);
        // _this.data.list[index].show = true;
        // _this.setData({
        //     list: _this.data.list
        // });
        // this.fadeIn('in2', 1); 
        // console.log(this.data.list);

    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        // this.getData();
    },

    // 获取数据
    getData(){
        let that=this;
        that.setData({
            load: true
        });
        api.req.get(api.api.index.search, 
        {
            week_views:1,
            page:that.data.page,
            pagesize:that.data.pagesize
        })
        .then( (res) => {
            console.log('index列表', res.data);
            let datas = res.data;
            if(datas.ret==0){
                if (datas.data.list && datas.data.list.length==0){
                    that.setData({
                        noMore:true
                    });
                }else{
                    let statusAll = api.statusAll;
                    datas.data.list.map((v, i) => {
                        for (let vv in statusAll.house_status) {
                            if (v.Status == vv) {
                                v.Status = statusAll.house_status[vv];
                            }
                        }
                        for (let vv in statusAll.house_renovation_type) {
                            if (v.RenovationStatus == vv) {
                                v.RenovationStatus = statusAll.house_renovation_type[vv];
                            }
                        }
                        for (let vv in statusAll.house_property_type) {
                            if (v.PropertyType == vv) {
                                v.PropertyType = statusAll.house_property_type[vv];
                            }
                        }
                        for (let vv in statusAll.house_architectural_type) {
                            if (v.ArchitecturalType == vv) {
                                v.ArchitecturalType = statusAll.house_architectural_type[vv];
                            }
                        }
                        for (let vv in api.statusAll.house_price_type) {
                            if (v.PriceUnit == vv) {
                                v.PriceUnit = api.statusAll.house_price_type[vv];
                            }
                        }
                    });
                    that.setData({
                        noMore: false,
                        page: this.data.page + 1,
                        list: that.data.list.concat(datas.data.list)
                    });
                }        
            }else{
                console.log('index列表',datas.msg);
                wx.showModal({
                    title: '提示',
                    content: datas.msg,
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

    // 跳转
    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    },    

    // 计算滚动盒子高度
    totalHeight(){
        let height=320;
        let len = this.data.list.length;
        this.setData({
            boxHeight:height*len+'rpx'
        });
    },

    // 动画
    fadeIn: function (obj, n) {
        var animation = wx.createAnimation({
            timingFunction: 'ease-in-out',
        })
        animation.opacity(n).step()

        this.setData({
            [obj]: animation.export()
        })
    }


})