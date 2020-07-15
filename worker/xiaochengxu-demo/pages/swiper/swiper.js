// pages/swiper/swiper.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
        "http://www.huacaijia.com/images/upload/image/201801/20180104085223_96581.jpg",
       "http://www.huacaijia.com/images/upload/image/201801/20180104102512_38369.jpg",
       "http://www.huacaijia.com/images/upload/image/201801/20180104085447_58532.jpg",
        "http://www.huacaijia.com/images/upload/image/201801/20180104093347_26912.jpg"],
        current:0
    },
    ban_change:function(e){
        console.log(e)
        this.setData({ current: e.detail.current})
        this.scaleY(0.9,'ani',.4);
        this.scaleY(1,'ani2',1)
    },
    
    scaleY: function (y, obj,n) {
        var animation = wx.createAnimation({
            timingFunction: 'ease-in-out',
        })
        animation.opacity(n).scaleY(y).step()

        this.setData({
            [obj]: animation.export()
        })
    }
})