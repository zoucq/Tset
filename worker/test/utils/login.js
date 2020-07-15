const api = require('./api.js');

var app = getApp();

function islogin() {
    return new Promise(function (resolve, reject) {
        // console.log('istoken',app.istoken())
        // console.log(app);
        // 1 * 60 * 60 * 1000
        let now = new Date().getTime();
        if (now - wx.getStorageSync('timeStart') < 1 * 60 * 1000) {
            resolve(wx.getStorageSync('ac_token'))
        } else {
            login(resolve, reject);
        }
    });
}

function login(resolve, reject){
    wx.login({
        success: function (res) {
            let code = res.code;
            if (res.code) {
                api.req.post(api.api.index,
                    {
                        action: "wxLogin",
                        code: code
                    })
                    .then((res) => {
                        console.log('login', res.data);
                        if (res.data.errCode==0){

                        let datas = res.data && res.data.data;
                        wx.setStorageSync('timeStart', new Date().getTime());
                        wx.setStorageSync('plan_type', datas.plan_type);
                        wx.setStorageSync('ac_token', datas.ac_token);
                        wx.setStorageSync('has_username', datas.has_username);
                        wx.setStorageSync('is_first_login', datas.is_first_login);
                        if (app) app.globalData.ac_token = datas.ac_token;

                        resolve(datas.ac_token);

                        }else{
                            console.log('errCode==1:',res.data.msg);
                        }

                    }, (err) => {
                        console.log(err);
                        reject('reject:',err.data);
                    });
            } else {
                console.log('获取用户登录态失败！' + res.errMsg);
            }
        },
        fail(err) {
            console.log(err);
        }
    });
}


module.exports.islogin = islogin;