
var app = getApp();


const v1 = 'http://admin.wangtaotao.test.91xiangju.com'
// const v1 = 'http://admin.zcq.test.91xiangju.com'
// const v1 = 'https://admin.91xiangju.com';

const api = {
    // 登录
    // "action": "wxLogin",
    // "code": "微信code"
    index: v1 + '/api/v1/hpjx',
    addFrom: v1 + '/api/customer/add-customer'
}


const req = {
    get: (url, data) => {
        return fn(url, 'GET', data)
    },
    post: (url, data, token) => {
        return fn(url, 'POST', data)
    }
}

const fn = (url, method, data) => {
    return new Promise((resolve, reject, complete) => {
        // wx.showLoading({
        //     title: '加载中',
        // });
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
                // 'application/json' || 'application/x-www-form-urlencoded'
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'ac-token': `${wx.getStorageSync('ac_token')}`
            },
            dataType: 'json',// 默认值
            responseType: 'text',// 默认值     
            success: data => {
                resolve(data);
            },
            fail: err => {
                reject(err);
            },
            complete: () => {
                // setTimeout(()=>{
                //     wx.hideLoading();
                // },400);
               complete && (typeof complete == 'function') && complete();
            }
        });

    })
}



module.exports = {
    api,
    req
}