const api = require('../../utils/api.js');

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
        circular: true,
        current: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetch();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    fetch() {
        let that = this;
        api.req.post(api.api.index, {
            "action": "wxHouseDetail",
            "house_id": "347"
        }).then((res) => {
            console.log(res);
            // &middot;
            res.data.data.house_intro.body = res.data.data.house_intro.body.replace(/&middot;|&ldquo;|&rdquo;/g, ' ');
            that.setData({
                house: res.data.data
            });
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    }
})