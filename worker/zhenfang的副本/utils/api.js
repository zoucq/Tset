const md5 = require('./md5.js');
// const v1 = 'http://api.ylx.test.xinfang007.com';
const v1 = 'https://api.xinfang007.com';

const api = {
    index:{
        // week_views=1 热门房源  搜索关键词 name='富春'
        // price=10000-20000,30000-40000
        // country=330110,111
        // habitable=1,2,3
        // architectural_type=1,2
        // renovation_status=1

        // return status=》代售预售
        search:v1+'/api/house/get-list',
        // 杭州的各区 place_id=3301
        addr:v1+'/api/place/get-children',
        // 关键词匹配 参数:term
        words: v1 +'/api/house/get-house-name-list',
        // 搜索历史
        history: v1 +'/api/house/get-search-name-list'

    },
    detail:{
        // 楼盘详情，参数是id:房源id
        index:v1+'/api/house',
        // 获取用户标记类型
        types: v1 +'/api/records/get-records-type-list',
        // 切换用户标记, 参数 house_id type
        tab: v1 +'/api/records/add',
        // 获取标记状态  type==6 订阅
        getType: v1 +'/api/records/getUserRecordsByTypeAction',

        // 反馈接口, 参数body 是反馈内容，house_id 是房源id   type=report_type
        feedBack: v1 +'/api/report/add',
        // 反馈列表, house_id=1
        backList: v1 +'/api/report/get-list',

        // 问题添加, body内容;  house_id
        questionAdd: v1 +'/api/question/add',    
        // 问题列表, house_id page pagesize
        questionList: v1 +'/api/question/get-list',

        // 回答添加, body内容 question_id
        answerAdd: v1 +'/api/answer/add',
        // 回答列表, question_id page pagesize page第一页可不传 pagesize默认10
        answerList: v1 +'/api/answer/get-list',

        // 获取相册, house_id
        getPhoto: v1 +'/api/house/get-photos',
        // 图片上传, 字段file
        upload: v1 +'/api/photo/upload',

        // 新闻列表, house_id page pagesize 三个参数 
        newsList: v1 +'/api/house/get-news',
        // 新闻详情, news_id 
        newsDetail: v1 +'/api/news/get-detail'  
        

    },
    message:{
        // 我的反馈列表
        // list:v1+'/api/report/get-my-list',
        // 通知type=3 || 动态 type=1,2
        list: v1 +'/api/message/get-my-list',
        news: v1 +'/api/message/index'
    },
    user:{
        // 用户信息, 用户的个人信息 
        info: v1 +'/api/user/get-info',
        // 获取用户 相关数据接口 如浏览过，关注过多少个楼盘
        userStatus: v1 +'/api/records/get-user-records',
        // 获取 用户 特殊类型 列表, type page pagesize, 如点击浏览过的详情列表，根据参数type
        userStatusList: v1 +'/api/records/get-user-records-by-type',
        // 登录
        login: v1 +'/api/user/weixin-login'

    },
    helper:{
        status: v1 +'/api/index/get-all-types'
    }
}




// token
// xf_aslertWERYkferJKLJLkljdsalfdklfsajDF
const str_token = 'xf_aslertWERYkferJKLJLkljdsalfdklfsajDF';

const md_token = (str) => {
    return md5.hex_md5(str);
}

const req = {
    get: (url,data) => { 
        let time = String(new Date().getTime());
        data._time=time;
        data.token = md_token(md_token(time)+md_token(str_token));
        return fn(url,'GET', data)
    },
    post: (url,data) => {
        let time = String(new Date().getTime());
        data._time = time;
        data.token = md_token(md_token(time) + md_token(str_token));
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
                // 'application/json' || 'application/x-www-form-urlencoded'
                'content-type': 'application/json', // 默认值
                'Cookie': `XFUID=${wx.getStorageSync('cookie')}`
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

// const statusData = ()=>{
//     req.get(api.api.helper.status, {})
//     .then((res) => {
//         console.log(res);
//     }, (err) => {
//         console.log(err);
//     });
// }

let statusAll = {};


module.exports={
    api,
    req,
    statusAll
}