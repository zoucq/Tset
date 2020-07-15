const bmap = require('../../../utils/bmap-wx.js')
const api = require('../../../utils/api.js')
const coordtansform = require('../../../utils/coordtransform.js');


var wxMarkerData = [];

const app = getApp();
Page({
    data: {
        mark: [
            {
                id: 0, latitude: 30.324643, longitude: 120.148447,
                title: "拱墅区", iconPath: "",
                secondMarkers: [
                    {
                        id: '01', latitude: 30.322643, longitude: 120.148247,
                        title: "拱墅区01号楼盘"
                    },
                    {
                        id: '02', latitude: 30.322443, longitude: 120.141047,
                        title: "拱墅区02号楼盘"
                    }
                ]
            },
            {
                id: 1, latitude: 30.265916, longitude: 120.136438,
                title: "西湖区", iconPath: ""
            },
            {
                id: 2, latitude: 30.286744, longitude: 120.187607,
                title: "下城区", iconPath: ""
            },
            {
                id: 3, latitude: 30.263311, longitude: 120.211539,
                title: "江干区", iconPath: ""
            },
            {
                id: 4, latitude: 30.214333, longitude: 120.218471,
                title: "滨江区", iconPath: ""
            },
            {
                id: 5, latitude: 30.245153, longitude: 120.186934,
                title: "上城区", iconPath: ""
            }
        ],
        markers: [
            {
                id: 0, latitude: 30.324643, longitude: 120.148447, 
                title: "拱墅区", iconPath: "",
                secondMarkers:[
                    { id: '01', latitude: 30.322643, longitude: 120.148247, 
                    title: "拱墅区01号楼盘" }
                ]
            },
            {
                id: 1, latitude: 30.265916, longitude: 120.136438,
                title: "西湖区", iconPath: ""
            },
            {
                id: 2, latitude: 30.286744, longitude: 120.187607,
                title: "下城区", iconPath: ""
            },
            {
                id: 3, latitude: 30.263311, longitude: 120.211539,
                title: "江干区", iconPath: ""
            },
            {
                id: 4, latitude: 30.214333, longitude: 120.218471,
                title: "滨江区", iconPath: ""
            },
            {
                id: 5, latitude: 30.245153, longitude: 120.186934,
                title: "上城区", iconPath: ""
            }
        ],
        circles: [
            // {
            //     latitude: '30.263311',
            //     longitude: '120.211539',
            //     color: '#FF0000DD',
            //     fillColor: '#00ff00',
            //     radius: 1000,
            //     strokeWidth: 2
            // }
        ],
        controls: [{
            id: 1,
            iconPath: '../../image/../tixing.png',
            position: {
                left: 150,
                top: 500,
                width: 50,
                height: 50
            },
            clickable: true
        }],
        latitude: '30.251612',
        longitude: '120.197338',
        scale:12,
        x: '',
        y:'',


        placeData: {},
        winHeight:''
    },
    changeMap(){
        // console.log(e);
        let that = this;
        let scale = that.data.scale;
        let mark = that.data.markers;
        this.getCenterLocation();
        this.getScale();
    },
    controltap(e){
        console.log(e);
    },

    maptap(e){
        console.log(e);
        // this.changeMap();
    },

    makertap: function (e) {
        console.log(e);
        var that = this;
        var id = e.markerId;
        // that.showSearchInfo(wxMarkerData, id);
        // that.changeMarkerColor(wxMarkerData, id);
    },
    callouttap(e){
        console.log(e);
        var that = this;
        let id = e.markerId;
        let arr=[];
        this.data.markers.map((v,i)=>{
            if(v.id==id){
                this.data.longitude = v.longitude;
                this.data.latitude = v.latitude;
                arr = v.secondMarkers;
            }
        });
        arr && arr.map((v, i) => {
            v.width = 20;
            v.height = 20;
            v.iconPath = '';
            v.alpha = 0;
            v.anchor = { x: .5, y: .5 };
            v.callout = {
                // color:'#fff',
                content: v.title,
                display: 'ALWAYS',
                borderRadius: 120,
                padding: 10,
                textAlign: 'center',
                bgColor: '#00ff00'
            }
        });
        that.setData({
            markers: arr
        });

        this.setData({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale:15
        });

        // this.showTap(arr);


    },
    showTap(arr){
        var that = this;
        arr && arr.map((v, i) => {
            v.width = 20;
            v.height = 20;
            v.iconPath = '';
            v.alpha = 0;
            v.anchor = { x: .5, y: .5 };
            v.callout = {
                // color:'#fff',
                content: v.title,
                display: 'ALWAYS',
                borderRadius: 120,
                padding: 10,
                textAlign: 'center',
                bgColor: '#00ff00'
            }
        });
        that.setData({
            markers: arr
        });
        
    },
    addrTransform(lon, lat) {
        return coordtansform.bd09togcj02(lon, lat);
    },

    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('map');

    },
    touchstart(e){
        this.startX = e.changedTouches[0].x
        this.startY = e.changedTouches[0].y

        this.context = wx.createCanvasContext('firstCanvas')
        this.context.setStrokeStyle('#ff9900')
        this.context.setLineWidth(5)
        this.context.setLineCap('round') // 让线条圆润
        this.context.beginPath()

        // this.context = wx.createContext()
        // this.context.setStrokeStyle('#ff9900')
        // this.context.setLineWidth(5)
        // this.context.setLineCap('round') // 让线条圆润
        // this.context.beginPath()

    },
    touchmove(e){
        // console.log(e);
        var startX1 = e.changedTouches[0].x
        var startY1 = e.changedTouches[0].y

        this.context.moveTo(this.startX, this.startY)
        this.context.lineTo(startX1, startY1)
        this.context.stroke()
        this.context.draw(true)
        
        // this.context.moveTo(this.startX, this.startY)
        // this.context.lineTo(startX1, startY1)
        // this.context.stroke()

        this.startX = startX1;
        this.startY = startY1;

       

        // wx.drawCanvas({
        //     canvasId: 'firstCanvas',
        //     reserve: true,
        //     actions: this.context.getActions() // 获取绘图动作数组
        // });
        
    },
    touchend(e){
        console.log('end');
        
    },
    getCenterLocation(){
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },

    getScale(){
        console.log(111)   
        console.log(this.mapCtx);
        let that = this;
        this.mapCtx.getScale({
            success: function (res) {
                console.log(res);
                let scale=res.scale;
                if(scale<=12){
                    that.data.mark.map((v, i) => {
                        v.width = 20;
                        v.height = 20;
                        v.iconPath = '';
                        v.alpha = 0;
                        v.anchor = { x: .5, y: .5 };
                        v.callout = {
                            // color:'#fff',
                            content: v.title + "\n" + v.id + '个',
                            display: 'ALWAYS',
                            borderRadius: 120,
                            padding: 20,
                            textAlign: 'center',
                            bgColor: '#00ff00'
                        }
                    });
                    that.setData({
                        markers: that.data.mark
                    });
                }
            }
        })
    },



    onLoad: function (opt) {
        if(opt)
        this.getHeight();

        // this.data.markers.map((v, i) => {
        //     let arr = this.addrTransform(v.longitude, v.latitude);
        //     v.longitude = arr[0];
        //     v.latitude = arr[1];
        // });

        

        var that = this;
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({
            ak: 'm2D8LweuyhfxT3szoYw2u2VNObZWDqHU'
        });

        

        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            console.log(data);
            wxMarkerData = data.wxMarkerData;
            that.data.markers.map((v,i)=>{
                v.width = 20;
                v.height= 20;
                v.iconPath ='';
                v.alpha=0;
                v.anchor = { x: .5, y: .5 };
                v.callout={
                    // color:'#fff',
                    content: v.title +"\n"+v.id+'个',
                    display:'ALWAYS',
                    borderRadius:120,
                    padding:20,
                    textAlign:'center',
                    bgColor:'#00ff00'
                }
                // ,
                // v.label = {
                //     // color:'#fff',
                //     content: v.title + "\n" + v.id + '个',
                //     display: 'ALWAYS',
                //     borderRadius: 120,
                //     padding: 20,
                //     textAlign: 'center',
                //     bgColor: '#00ff00'
                // }
            });

            that.setData({
                markers: that.data.markers
            });
            console.log(that.data.markers);
            // that.setData({
            //     latitude: wxMarkerData[0].latitude
            // });
            // that.setData({
            //     longitude: wxMarkerData[0].longitude
            // });
        }


        this.data.markers.map((v, i) => {
            this.zh(v.longitude, v.latitude);
            // let arr = this.zh(v.longitude, v.latitude);
            // v.longitude = arr[0];
            // v.latitude = arr[1];
        });

        

        // 发起POI检索请求 
        BMap.search({
            "query": '酒店',
            fail: fail,
            success: success,
            // 此处需要在相应路径放置图片文件 
            iconPath: '',
            // 此处需要在相应路径放置图片文件 
            iconTapPath: ''
        });
        

    },
    zh(lat,lon){
        // ?from = 0 & to=4 & x=longitude & y=latitude
        const url='http://api.map.baidu.com/ag/coord/convert';
        api.req.get(url,{
            from:4,
            to:2,
            x:lon,
            y:lat
        })
        .then((res)=>{
            console.log(res)
        });
    },
    showSearchInfo: function (data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        });
        console.log(that.data.placeData);
    },
    changeMarkerColor: function (data, i) {
        var that = this;
        
    },


    getHeight() {
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                console.log(res);
                that.setData({
                    winHeight: res.windowHeight
                });
            },
        })
    },



})