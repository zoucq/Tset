const api = require('../../../../utils/api.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        select:false,
        imgs:[
        //  {   id:0,url:'https://ssl.malmam.com/xiangju-static/dfs/6/25727970afb4ef/_E6_B8_85_E5_8D_8E_E5_9B_AD3.jpg'
        //  }
        ],
        id:0,
        imgId:[],
        list:[
            { name: '实景图' },
            { name: '样板间' },
            { name: '售楼处' },
            { name: '效果图' }
        ],
        act:0,
        name:'实景图',
        arrs:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:options.id
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    handleSelectSecond(e){
        let index = e.currentTarget.dataset.index;
        let name= e.currentTarget.dataset.name;
        this.setData({
            act:index,
            name:name,
            select: !this.data.select
        });
    },
    handleSelect(){
        this.setData({
            select:!this.data.select
        });
    },
    // 选取
    upload(){
        let that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                that.chooseImg(tempFilePaths);
            }
        })
    },
    // 上传返回url和id
    chooseImg(arrs){
        let that=this;
        wx.uploadFile({
            url: api.api.detail.upload, //仅为示例，非真实的接口地址
            filePath: arrs[0],
            method: 'POST',
            header: {
                'content-type': 'multipart/form-data',
                'Cookie': `XFUID=${wx.getStorageSync('cookie')}`
            },
            name: 'file',
            formData: {
                ot:'xiaochengxu'
            },
            success: function (res) {
                console.log(res);
                let id = res.data;
                let obj = {};
                obj.id = id;
                obj.url =arrs[0];
                that.data.imgs.push(obj);
                that.setData({
                    imgId:that.data.imgId.concat(id),
                    imgs: that.data.imgs
                });
                console.log(that.data.imgs);
            },
            fail:(err)=>{
                console.log(err);
            }
        });
    },
    // 提交
    addSubmit(){
        let that = this;
        api.req.get(api.api.detail.feedBack,
        {
            body: { name: that.data.name, id: that.data.imgId.join(',')},
            house_id: that.data.id,
            type: 2
        })
        .then((res)=>{
            console.log(res);
            if(res.data.ret==0){
                wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                });
            }else{
                console.log(res.data.msg);
            }
        },(err)=>{
            console.log(err);
        })
    },
    delPng(e){
        let index = e.currentTarget.dataset.index;
        let id=e.currentTarget.dataset.id;
        this.data.imgs.splice(index,1);
        this.data.imgId.map((v,i)=>{
            if(v==id){
                this.data.imgId.splice(i,1);
            }
        })
        this.setData({
            imgs: this.data.imgs,
            imgId: this.data.imgId
        });
        console.log(this.data.imgId);
        console.log(this.data.imgs);
    }


})