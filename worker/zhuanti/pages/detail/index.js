const api = require('../../utils/api.js');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        circular:true,
        current:0,

        more1: false,  
        more2:false,
        tabCurrent:0,

        dialogShow:true,
        dialogCurrent:0,

        inputName:'',
        inputPhone:'',

        house:{}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        console.log(opt);
        this.fetch();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    init(){

    },

    fetch(){
        let that = this;
        api.req.post(api.api.index,{
            "action": "wxHouseDetail",
            "house_id": "347"
        }).then((res)=>{
            console.log(res);
            // &middot;
            res.data.data.house_intro.body = res.data.data.house_intro.body.replace(/&middot;|&ldquo;|&rdquo;/g, ' ');
            that.setData({
                house: res.data.data
            });
        });
    },

    // swiper切换text
    _slider(e){
        let obj = e.detail;
        // console.log(obj);
        if(obj.source == 'touch'){
            this.setData({
                current:obj.current
            });
        }
    },

    // 亮点切换
    _tab(e){
        let index = e.currentTarget.dataset.index;
        this.setData({
            tabCurrent:index
        });
    }, 

    // 查看更多
    _more(e){
        let type = e.currentTarget.dataset.type;
        this.onoff(type);
    },

    _inputName(e){
        // console.log(e.detail.value);
        this.setData({
            inputName: e.detail.value
        });
    },

    _inputPhone(e) {
        this.setData({
            inputPhone: e.detail.value
        });
    },

    // 表单提交
    _submit(){
        console.log(this.data.dialogCurrent);
        if (this.data.dialogCurrent == 0 || this.data.dialogCurrent == 2){
            if (this.data.inputName.length == 0 || this.data.inputPhone.length == 0){
                wx.showModal({
                    title: '提示',
                    content: '姓名和手机号不能为空！',
                    success: function (res) {
                        
                    }
                });
                return ;
            }
        } else{
            if (this.data.inputPhone.length == 0 && this.data.inputPhone.length < 11) {
                wx.showModal({
                    title: '提示',
                    content: '手机号不能为空！',
                    success: function (res) {

                    }
                });
                return ;
            }
        }
    },

    // 打开弹窗
    _showDialog(e){
        let type = e.currentTarget.dataset.type;
        this.setData({
            dialogCurrent: type
        });
        this.onoff('dialogShow');
    },

    // 打电话
    _call(e){
        let phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        });
    },

    // 关闭弹窗
    _closeDialog(){
        this.onoff('dialogShow');
    },
    
    // 占位事件
    _place(){

    },

    //  开关函数
    onoff(obj){
        this.setData({
            [obj]: !this.data[obj]
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    }





})