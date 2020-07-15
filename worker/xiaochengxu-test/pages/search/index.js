//logs.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({
    data: {
        txt:'请输入关键词',
        list: ['西溪湿地','杭州湾','绿城'],
        alert:['中交财富中心','中交小区'],
        search:false
    },
    onLoad: function () {
        this.setData({
        
        })
    },
    getList(){

    },
    handleInput(e){
        let val = e.detail.value;
        this.setData({
            txt: val,
            search:true
        });
        if(val.length==0){
            this.setData({
                search: false
            });
        }
    },
    handleTrim(e){
        
    },
    handleKeywords(e){
        let words = e.currentTarget.dataset.word;
        console.log(words);
        
        this.setData({
            txt: words
        });
    }
})
