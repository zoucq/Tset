// pages/list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataObj: {
            list: []
        },
        pageData:{
            page:1,
            pageSize:10,
            loading:false,
            bottomTip:true,
            text: '加载中'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },

    getData(){
        return new Promise((resolve,reject)=>{
            this.setData({
                ['pageData.loading']: true
            });
            setTimeout(() => {
                let res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                if(this.data.pageData.page >= 3) res = []
                let noList = this.data.pageData.page === 1 && res.length === 0
                let isMore = this.data.pageData.page > 1 && res.length < this.data.pageData.pageSize
                let list = noList || isMore ? this.data.dataObj.list : this.data.dataObj.list.concat(res)
                let page = noList || isMore ? this.data.pageData.page : this.data.pageData.page + 1
                let text = noList ? '暂无数据~' : (isMore ? '没有更多了~' : '加载中')
                this.setData({
                    ['dataObj.list']: list,
                    ['pageData.page']: page,
                    ['pageData.text']: text,
                    ['pageData.loading']: false
                });
                resolve(res)
            }, 1000)
        })
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
        this.setData({
            ['pageData.text']: '加载中',
            ['pageData.bottomTip']: false,
            ['pageData.page']: 1,
            ['dataObj.list']: []
        });
        this.getData().then(() => {
            this.setData({
                ['pageData.bottomTip']: true
            });
            wx.stopPullDownRefresh()
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})