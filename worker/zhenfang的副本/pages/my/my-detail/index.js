const api = require('../../../utils/api.js')
const app = getApp()
Page({

    // 页面的初始数据
    data: {
        load:false,
        list:[],
        page:1,
        pagesize:10,
        noMore:false,
        types:'关注过',
        id:1

    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        //this.getData(); 
        console.log(options); 
        
        let opt=options;
        this.setData({
            types: opt.type,
            id:opt.id
        });
        this.getData();
        // wx.showNavigationBarLoading();
        // wx.setNavigationBarTitle({
        //     title: this.data.types+'的房源',
        //     success:()=>{
        //         wx.hideNavigationBarLoading();
        //     }
        // });
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        this.getData();
    },

    // 获取数据
    getData(){
        let that=this;
        that.setData({
            load: true
        });
        api.req.get(api.api.user.userStatusList,
        {
            type: that.data.id,
            page: that.data.page,
            pagesize: that.data.pagesize
        })
        .then( (res) => {
            console.log('index列表', res.data);
            let datas = res.data;
            if(datas.ret==0){
                if (datas.data && datas.data.length<=0){
                    that.setData({
                        noMore:true
                    });
                }else{
                    let statusAll = api.statusAll;
                    datas.data.map((v, i) => {
                        for (let vv in statusAll.house_status) {
                            if (v.house.Status == vv) {
                                v.house.Status = statusAll.house_status[vv];
                            }
                        }
                        for (let vv in statusAll.house_renovation_type) {
                            if (v.house.RenovationStatus == vv) {
                                v.house.RenovationStatus = statusAll.house_renovation_type[vv];
                            }
                        }
                        for (let vv in statusAll.house_property_type) {
                            if (v.house.PropertyType == vv) {
                                v.house.PropertyType = statusAll.house_property_type[vv];
                            }
                        }
                        for (let vv in statusAll.house_architectural_type) {
                            if (v.house.ArchitecturalType == vv) {
                                v.house.ArchitecturalType = statusAll.house_architectural_type[vv];
                            }
                        }
                        v.house.PriceUnit = statusAll.house_price_type[v.house.PriceUnit];
                    });
                    datas.data.map((v, i) => {
                        v.mtime = v.mtime.split(' ');
                        v.mtime[0] = v.mtime[0].split('-');
                        v.mtime[0] = v.mtime[0][0] + '年' + v.mtime[0][1] + '月' + v.mtime[0][2] + '日';
                        v.mtime[1] = v.mtime[1].split(":");
                        if (v.mtime[1][0] > 0 && v.mtime[1][0] < 12) {
                            v.mtime[1] = 'AM ' + v.mtime[1][0] + ':' + v.mtime[1][1];
                        } else {
                            v.mtime[1] = 'PM ' + v.mtime[1][0] + ':' + v.mtime[1][1];
                        }
                    });
                    that.setData({
                        noMore: false,
                        page:that.data.page+1,
                        list: that.data.list.concat(datas.data)
                    });
                }        
            }else{
                console.log('index列表',datas.msg);
                wx.showModal({
                    title: '提示',
                    content: datas.msg,
                    success: function (res) {
                        wx.navigateBack();
                    }
                });
            }
            that.setData({
                load: false
            });
               
        }, (err) => {
            console.log(err);
        });
    },

    // 跳转
    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    }


})