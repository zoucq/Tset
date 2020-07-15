const api = require('./utils/api.js')
//app.js
App({
    onLaunch: function () {   
        if (wx.getStorageSync('cookie')){
            console.log('登录中');
            // this.login();
        }else{
            console.log('重新登录');
            this.login();
        }
        this.statusData();
    },
    onShow(){
        // this.statusData();
    },
    // 获取所有数据状态
    statusData(cb){
        let that=this;
        api.req.get(api.api.helper.status,{})
        .then((res)=>{
            // console.log('status', res.data.data);
            if(res.data.ret==0){
                api.statusAll = res.data.data;
                that.globalData.statusAll = res.data.data;
                // console.log(that.globalData.statusAll);
                // cb && typeof cb == 'function' && cb(res.data.data);
                return typeof cb == "function" && cb(res.data.data) 
            }else{
                console.log(res.data.msg);
            }
        },(err)=>{
            console.log('status',err);
        });
    },
    // 登录
    login(){
        let that = this;
        wx.login({
            success: function (res) {
                // console.log(res);
                var code = res.code; 
                if (res.code) {
                    that.getUserInfo(code);
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    // 获取用户信息
    getUserInfo(code){
        let that = this;
        wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
                // console.log('user', res);
                let resDate = res;
                // userInfo 只存储个人的基础数据
                wx.setStorageSync('userInfo', res.userInfo);
                // console.log(wx.getStorageSync('userInfo'));

                that.loginRes(resDate,code);
                
            }
        });
    },
    //请求登录接口 
    loginRes(res,code){
        api.req.get(api.api.user.login,
        {
            encryptedData: res.encryptedData,
            iv: res.iv,
            code: code
        })
        .then((res) => {
            console.log('login', res);
            if (res.data.ret == 0) {
                wx.setStorageSync('cookie', res.data.data.login_session);
                var user_id = res.data.data.user_id;
                //wx.setStorageSync('id', user_id); // 用户Id

            } else {
                console.log(res.data.msg)
            }
        }, (err) => {
            console.log(err);
            console.log('请求错误');
        });
    },

    // 全局数据
    globalData: {
        userInfo: null,
        login_session:null,
        statusAll:{}
    }


});



