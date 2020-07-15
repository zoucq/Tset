const api = require('../../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dongtai:0,
        report:0,
        list:{},
        onoff:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData();
    },
    onShow() {
        if (this.data.onoff) {
            this.getData();
        }
        this.setData({
            onoff: true
        });
    },
    getData(){
        let that = this;
        api.req.get(api.api.message.news,{})
        .then((res)=>{
            console.log(res.data.data);
            let datas=res.data;
            if(datas.ret==0){
                if (datas.data.has_dongtai!=0){
                    that.setData({
                        list: datas.data.dongtai_house
                    });
                }
                that.setData({
                    dongtai: datas.data.has_dongtai,
                    report: datas.data.has_report
                });
            }else{
                console.log(datas.msg);
            }
        },(err)=>{
            console.log(err);
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        setTimeout(()=>{
            wx.stopPullDownRefresh();
        },1500);   
    },

    // 跳转
    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        let type = e.currentTarget.dataset.type;

        if(type==0){
            this.setData({
                dongtai: 0
            });
        }
        if(type == 1){
            this.setData({
                report: 0
            });
        } 

        wx.navigateTo({
            url: url
        });
    }, 

})