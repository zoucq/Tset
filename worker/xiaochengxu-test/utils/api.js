const api={
    index:{

    },
    message:{

    },
    user:{

    }
}

// const req={
//     get: function (opt) {
//         opt.method = 'GET';
//         fn(opt);
//     },
//     post: function (opt) {
//         opt.method = 'POST';
//         fn(opt);
//     }
// }

// function fn(opt={}){
//     wx.request({
//         url: opt.url,
//         method: opt.method,
//         data: opt.data,
//         header: {
//             'content-type': 'application/json' // 默认值
//         },
//         dataType: 'json',// 默认值
//         responseType: 'text',// 默认值     
//         success: opt.success,
//         fail: opt.fail,
//         complete: () => {
//             // wx.hideLoading();
//         }
//     });
// }

const request = (url, method='POST',data,success,fail)=>{
    // wx.showLoading({
    //     title: '加载中'
    // });
    wx.request({
        url: url, 
        method:method,
        data: data,
        header: {
            'content-type': 'application/json' // 默认值
        },
        dataType: 'json',// 默认值
        responseType: 'text',// 默认值     
        success: success,
        fail:fail,
        complete: () => {
            // wx.hideLoading();
        }    
    });
}

const req = {
    get: (url,data) => { 
       return fn(url,'GET', data)
    },
    post: (url,data) => {
       return fn(url,'POST', data)
    }
}

const fn = (url, method, data) => {
    return new Promise((resolve,reject)=>{
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            dataType: 'json',// 默认值
            responseType: 'text',// 默认值     
            success: data=>{
                resolve(data)
            },
            fail: err=>{
                reject(err)
            },
            complete: () => {
                
            }
        });
    })
}

module.exports={
    api,
    request,
    req
}