const coordtansform = require('../../../utils/coordtransform.js');

Page({
    data: {
        height:0,
        locationPos:{},
        name:'',

        //  标记点
        markers: [
            {
                id: 0,
                latitude: 23.099994,
                longitude: 113.324520,
                width: 50,
                height: 50,
                title:'点击出现marks',
                label: { content: 'label标签', color: '#fff', bgColor: '#000', textAlign: 'center', borderRadius:20}
            },
            {
                id: 1,
                latitude: 23.12229,
                longitude: 113.324520,
                width: 50,
                height: 50,
                title: '点击出现marks222',
                label: { content: 'label标签222', color: '#fff', bgColor: '#000', textAlign: 'center', borderRadius: 20 }
            }
        ],
        // 	路线
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.12229
            }],
            color:"#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        //  控件
        controls: [
            
        ]
    },
    // 视野发生变化时触发
    regionchange(e) {
        console.log(e.type)
    },
    // 点击标记点时触发
    markertap(e) {
        console.log(e.markerId)
    },
    // 点击控件时触发
    controltap(e) {
        console.log(e.controlId)
    },

    onLoad(options){
        console.log(options);
        let opt = options;
        let that = this;
        this.setData({
            locationPos:opt,
            name:options.name
        });

        let arrs = this.addrTransform(opt.lon, opt.lat);
        console.log(arrs[0],arrs[1]);
        opt.lon = arrs[0];
        opt.lat = arrs[1];

        wx.openLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            latitude: opt.lat,
            longitude: opt.lon,
            scale: 14, //5-18 默认18-min
            name: opt.name,
            address:opt.addr,
            fail:()=>{
                console.log('err:地图打开失败');
            }
        });
        // wx.getSystemInfo({
        //     success: function (res) {
        //         that.setData({
        //             height: res.windowHeight
        //         });
        //         console.log(that.data.height);
        //     }
        // });
        // wx.getLocation({
        //     type: 'wgs84',
        //     success: function (res) {
        //         console.log(res);
        //         that.setData({
        //             locationPos: res,
        //             'markers[0].latitude': res.latitude,
        //             'markers[0].longitude': res.longitude,
        //             'markers[1].latitude': res.latitude-0.02,
        //             'markers[1].longitude': res.longitude,

        //             'polyline[0].points[0].latitude': res.latitude,
        //             'polyline[0].points[0].longitude': res.longitude,
        //             'polyline[0].points[1].latitude': res.latitude - 0.02,
        //             'polyline[0].points[1].longitude': res.longitude 
        //         });

        //         var latitude = res.latitude
        //         var longitude = res.longitude            
        //         wx.openLocation({
        //             latitude: latitude,
        //             longitude: longitude,
        //             scale: 28,
        //             name:'当前位置'
        //         });
        //     }
        // });

    },
    addrTransform(lon, lat){
        return coordtansform.bd09togcj02(lon, lat);
    }


})