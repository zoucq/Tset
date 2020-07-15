const api = require('../../../../utils/api.js')

Page({
    //数据
    data: {
        id:1,
        txt:'',
        showPlace:true
    },
    //加载
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id:options.house_id
        });
    },
    //提交
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        let txt = e.detail.value.textarea;
        let that=this;
        api.req.get(api.api.detail.feedBack,
        {
            body:txt,
            house_id:that.data.id,
            type:1
        })
        .then((res)=>{
            let datas = res.data;
            console.log(datas);
            if (datas.ret==0){
                that.setData({
                    txt:'',
                    showPlace: true
                });
                wx.showToast({
                    title: '反馈成功',
                    icon: 'success',
                    success: () => {
                        setTimeout(() => {
                            wx.navigateBack();
                        }, 1000);
                    }
                });
            }else{
                wx.showToast({
                    title: datas.msg,
                    icon: 'success'
                });
            }
        },(err)=>{      
            console.log(err);
            setTimeout(function () {
                wx.hideLoading()
            }, 2000);
        });
    },

    // 点击输入
    handlePlace(){
        this.setData({
            showPlace:false
        });
    },

    // 失去焦点
    handLeBlur() {
        this.setData({
            showPlace: true
        });
    }

})