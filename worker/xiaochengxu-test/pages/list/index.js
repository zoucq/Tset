
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:0,
        lastIndex:0,
        filter:1,
        animationData: {},
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
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'linear',
        })

        this.animation = animation

        animation.opacity(0).step()

        this.setData({
            animationData: animation.export()
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
        
    },
    //radio选中
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    //区域切换
    handleFilter(e){
        let keys=e.currentTarget.dataset.key;
        this.setData({
            filter:keys
        });
    },
    handContent(e){    
        let keys = e.currentTarget.dataset.key;
        if (this.data.lastIndex == keys){     
            this.setData({
                content: 0,
                lastIndex: 0
            });
            this.fadeOut();
        }else{
            this.setData({
                content: keys,
                lastIndex:keys
            });
            this.fadeIn();
        }
    },
    fadeIn(){
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'linear',
        })

        this.animation = animation

        animation.opacity(0).step()

        this.setData({
            animationData: animation.export()
        })

        setTimeout(function () {
            animation.opacity(1).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 400)
    },
    fadeOut() {
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'linear',
        })

        this.animation = animation

        // animation.opacity(1).step()

        // this.setData({
        //     animationData: animation.export()
        // })

        setTimeout(function () {
            animation.opacity(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 400)
    }

})