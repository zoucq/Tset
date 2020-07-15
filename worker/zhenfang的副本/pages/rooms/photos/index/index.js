const api = require('../../../../utils/api.js')

Page({

    // 初始数据
    data: {
        // 轮播图
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        
        // 页面其他
        id:1,
        photos:[],
        current:0,
        imgCurrent:0,
    },

    // 页面加载
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id:options.house_id || 1
        });
        this.getDate();
    },

    // 获取数据
    getDate(){
        let that = this;
        api.req.get(api.api.detail.getPhoto, { house_id: this.data.id })
        .then((res) => {
            console.log('getphoto', res.data);
            let datas = res.data;
            if (datas.ret == 0) {
                that.setData({
                    photos: datas.data
                });
            }else{
                console.log(datas.msg);
            }
        }, (err) => {
            console.log(err);
        });     
    },

    // 相册选择
    handleClick(e){
        let id = e.currentTarget.dataset.id;
        this.setData({
            current:id,
            imgCurrent: 0
        });
    },

    // 小图点击
    handleImgClick(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            imgCurrent:index
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