
const v1 = 'http://admin.wangtaotao.test.91xiangju.com'
// const v1 = 'https://api.xinfang007.com';


const api = {
    // 登录
    // "action": "wxLogin",
    // "code": "微信code"
    index: v1 + '/api/v1/hpjx'
}

const req = {
    get: (url, data) => {
        return fn(url, 'GET', data)
    },
    post: (url, data) => {
        return fn(url, 'POST', data)
    }
}

const ready = () => {
    return Promise((resolve, reject) => {
        // 如果未登录就前往登录界面
        wx.getSetting({
            success: (res) => {
                console.log(res.authSetting['scope.userInfo'])
                if (!res.authSetting['scope.userInfo']) {
                    let href = util.getCurrentPageUrlWithArgs();
                    console.log(href);
                    if (href && href.indexOf('?') > 0) {
                        href = href.split('?');
                        href[1] = href[1].split('=').join('-');
                        if (!res.authSetting['scope.userInfo']) {
                            // app.login(href.join(','));
                            wx.redirectTo({
                                url: '/pages/authorize/index?href=' + href.join(',')
                            });
                        }
                    }
                } else {
                    resolve();
                }
            }
        });
    });
}

const fn = (url, method, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
                // 'application/json' || 'application/x-www-form-urlencoded'
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'Cookie': `XFUID=${wx.getStorageSync('cookie')}`
            },
            dataType: 'json',// 默认值
            responseType: 'text',// 默认值     
            success: data => {
                resolve(data);
            },
            fail: err => {
                reject(err)
            },
            complete: () => {

            }
        });

    })
}



module.exports = {
    api,
    req
}