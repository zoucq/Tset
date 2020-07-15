const api = require('./utils/api.js')
//app.js
App({
    onLaunch: function () {
        // this.login();
    },
    onShow() {
        // this.login();
    },
    // 登录
    login() {
        let that = this;
        wx.login({
            success: function (res) {
                console.log(res);
                var code = res.code;
                if (res.code) {
                    // that.getUserInfo(code);
                    // that.loginRes(code);
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            },
            fail(err){
                console.log(err)
            }
        });
    },
    // 获取用户信息
    getUserInfo(code) {
        let that = this;
        wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
                // console.log('user', res);
                let resDate = res;
                // userInfo 只存储个人的基础数据
                wx.setStorageSync('userInfo', res.userInfo);
                // console.log(wx.getStorageSync('userInfo'));

            }
        });
    },
    //请求登录接口 
    loginRes(code) {
        console.log(code);
        api.req.post(api.api.index,
        {
            action: "wxLogin",
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
        login_session: null,
        statusAll: {},
        share:{
            title:'sdas',
            path:'pages/index/index',
            imageUrl:'http://www.zcq.test.91xiangju.com/images/logo_256.png'
        }
    }


});