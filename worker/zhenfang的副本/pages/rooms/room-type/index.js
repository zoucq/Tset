import weSwiper from '../../../public/src/main'
const api = require('../../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        rooms:[
            {
                name: 1, photos: ['http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                    'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg']
            },
            {
                name: 2, photos: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
            }
        ],
        arrs:[],

        current:0,
        name:1,
        id:0,

        //top-slider
        activeIndex:0
    },
    // 初始化weSwiper
    touchstart(e) {
        this.weswiper.touchstart(e)
    },
    touchmove(e) {
        this.weswiper.touchmove(e)
    },
    touchend(e) {
        this.weswiper.touchend(e)
    },
    // 生命周期函数--监听页面加载
    onLoad: function (options) { 
        this.init();
        console.log(options);
        this.setData({
            id:options.house_id || 1,
            current: options.index || 0
        });
        this.getData();
    },
    // 页面显示
    onShow(){
        wx.setNavigationBarTitle({
            title: `户型（${this.data.activeIndex * 1 + 1}/${this.data.rooms.length}）`
        });
    },
    // 初始化weSwiper
    init(len){
        let that = this;
        const device = wx.getSystemInfoSync();
        new weSwiper({
            animationViewName: 'animationData',
            slideLength: len,
            initialSlide: 0,
            width: 250 * device.windowWidth / 750,
            height: 120 * device.windowWidth / 750,
            // swiper初始化后执行
            onInit(weswiper) {

            },
            // swiper从一个slide过渡到另一个slide结束时执行
            onSlideChangeEnd(weswiper) {
                console.log(weswiper.activeIndex);
                that.setData({
                    activeIndex: weswiper.activeIndex,
                    current:0
                });
                wx.setNavigationBarTitle({
                    title: `户型（${that.data.activeIndex * 1 + 1}/${that.data.rooms.length}）`
                });
            }
        });
    },
    // 滑动图片
    handleSlider(e){
        // console.log(e.detail.current);
        let current = e.detail.current;
        this.setData({
            current:current
        });
    },
    // 获取数据
    getData() {
        let that = this;
        that.setData({
            load: true
        });
        api.req.get(api.api.detail.index, { id: this.data.id })
        .then((res) => {
            // console.log('room-type', res.data)
            if (res.data.ret == 0) {
                console.log('列表', res.data.data.rooms);
                let rooms = res.data.data.rooms;
                let statusAll = api.statusAll;
                rooms.map((v, i) => {
                    v.habitable = statusAll.house_room_type[v.habitable];
                    v.mtime = v.mtime.split(' ')[0];
                    v.price_unit = v.price_unit > 0 ? statusAll.house_room_price_unit[v.price_unit] : v.price_unit;
                });
                that.setData({
                    load: false,
                    rooms: rooms
                });
                // that.data.rooms.length
                that.init(that.data.rooms.length);
            } else {
                console.log(res.data.msg);
            }
        }, (err) => {
            console.log(err);
        });
    }
 
})