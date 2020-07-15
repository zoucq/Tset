const api = require('./utils/api.js')
const login = require('./utils/login.js')
//app.js
App({
    onLaunch: function () {
        
    },
    onShow(e) {
        // this.login();
        console.log('app',e);
    },
    // 登录
    login(fn) {
        let that = this;
        wx.login({
            success: function (res) {
                // console.log(res);
                var code = res.code;
                if (res.code) {
                    // that.loginRes(code,fn);
                    api.req.post(api.api.index,
                    {
                        action: "wxLogin",
                        code: code
                    })
                    .then((res) => {
                        console.log('login', res.data.data);

                        wx.setStorageSync('ac_token', res.data.data.ac_token);
                        wx.setStorageSync('is_first_login', res.data.data.is_first_login);
                        that.globalData.ac_token = res.data.data.ac_token;

                        // api.req.post.data.ac_token = res.data.data.ac_token;
                       
                        fn && (typeof fn == 'function') && fn(res.data.data);
                    }, (err) => {
                        console.log(err);
                        console.log('请求错误');
                    });
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }
            },
            fail(err){
                console.log(err);
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
    loginRes(code,fn) {
        let that = this;
        api.req.post(api.api.index,
        {
            action: "wxLogin",
            code: code
        })
        .then((res) => {
            console.log('login', res.data.data);
            wx.setStorageSync('ac_token', res.data.data.ac_token);
            wx.setStorageSync('is_first_login', res.data.data.is_first_login); 
            that.globalData.ac_token = res.data.data.ac_token;
            console.log(that.globalData.ac_token);
            
            fn && (typeof fn == 'function') && fn(res.data.data);
        }, (err) => {
            console.log(err);
            console.log('请求错误');
        });
    },

    istoken(){
        return wx.getStorageSync('ac_token');
    },

    // 全局数据
    globalData: {
        userInfo: null,
        ac_token: null,
        share:{
            title3:'免费领取5000元购房红包，点击立即领取',
            title2: '邀请你领取5000元购房红包',
            b_title3: '免费领取5000元购房红包，点击立即领取',
            b_title2: '邀请你领取5000元购房红包',
            title: '江浙沪好盘精选',
            title4:'江浙沪好盘精选',
            // path:'pages/index/index',
            // imageUrl:'https://ssl.malmam.com/xiangju-static/dfs/17/47b73f490f23b2/icon_share.png'
        }
    }


});