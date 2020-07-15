const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dialogShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.showShareMenu({
        //     withShareTicket:true
        // });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (e) {
        console.log(e);
        if (e && e.shareTicket){
            wx.getShareInfo({
                shareTicket: e.shareTickets[0],
                success: function (res) { console.log(res) },
                fail: function (res) { console.log(res) },
                complete: function (res) { console.log(res) }
            })
        }
        
    },

    animate(){
        var animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1000,
            timingFunction: "ease",
            delay: 0
        });

        setTimeout(function () {
            animation.rotateY(180).rotateY(90).step()
            animation.rotateY(90).rotateY(0).step()
            // animation.rotateY(360).step()
            this.setData({
                animated: animation.export()
            });
            setTimeout(()=>{
                this.setData({
                    open: true
                });
            },1000);
        }.bind(this), 200);

        

        
    },
    _handleGO(e){
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url,
        });
    },

    _open(){
        this.animate();
    },

    // 打开弹窗
    _showDialog(e) {
        this.onoff('dialogShow');
    },

    // 关闭弹窗
    _closeDialog() {
        this.onoff('dialogShow');
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
    onShareAppMessage: function (res) {
        if (res.from === 'button' || res.from === 'menu') {
            console.log(res.target);
        }
        app.globalData.share.success=function(res){
            console.log(res);
            
        }
        return app.globalData.share;
    }
})