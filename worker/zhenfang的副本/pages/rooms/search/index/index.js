//logs.js
const util = require('../../../../utils/util.js')
const api = require('../../../../utils/api.js')

Page({
    data: {
        txt:'',
        history: [],
        alert:[],
        search:false,
        map:false
    },
    // 加载
    onLoad: function (opt) {
        console.log(opt)
        if(opt.source && opt.source=='map'){
            this.setData({
                map:true
            });
        }
        this.getList();
    },
    // 获取最近搜索列表
    getList(){
        let that = this;
        api.req.get(api.api.index.history,{})
        .then((res)=>{
            console.log(res.data);
            let datas=res.data;
            if(datas.ret==0){
                that.setData({
                    history: datas.data
                });
            }
        },(err)=>{
            console.log(err);
        });
    },
    // input输入事件
    handleInput(e){
        let val = e.detail.value;
        let that = this;
        if (val.length == 0) {
            this.setData({
                search: false
            });
        }else{
            that.setData({
                txt: val
            });
            api.req.get(api.api.index.words,{term:val})
            .then((res)=>{
                console.log(res.data);
                let datas=res.data;
                if(datas.ret==0){
                    let reg = new RegExp("(" + val + ")", "ig");
                    datas.data.map((v,i)=>{
                        v.value=v.value.replace(reg,'<b style="color:#000;">'+val+'</b>');
                        // console.log(reg);
                    });
                    console.log(datas.data);
                    that.setData({
                        alert: datas.data,
                        search: true
                    });
                }
            },(err)=>{
                console.log(err);
            });
        }

    },
    // 点击最近搜索事件
    handleKeywords(e){
        let words = e.currentTarget.dataset.word;
        words = words.replace(/<[^>]+>/g, '');

        this.setData({
            txt: words
        });
        if(this.data.map){
            wx.redirectTo({
                url: '../../../map-house/gaode-map/index?words=' + words 
            });
        }else{
            wx.navigateTo({
                url: '../list/index?words=' + words
            });
        }
    },
    // 跳转
    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    }

})
