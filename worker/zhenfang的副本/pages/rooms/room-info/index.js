const api = require('../../../utils/api.js')
const util = require('../../../utils/util.js')

Page({

    data: {
        id:0,
        info:{}
    },

    onLoad: function (options) {
        console.log('rooms-info', options);
        this.setData({
            id:options.id
        });
        this.getData();
    },

    getData(){
        let that = this;
        api.req.get(api.api.detail.index,{id:that.data.id})
        .then((res)=>{
            console.log('room-info',res.data.data.house_attrs);
            if (res.data.ret==0){
                let datas = res.data.data;
                let statusAll = api.statusAll;

                datas.house_attrs.ArchitecturalType = statusAll.house_architectural_type[datas.house_attrs.ArchitecturalType];
                datas.house_attrs.RenovationStatus = statusAll.house_renovation_type[datas.house_attrs.RenovationStatus];
                datas.house_attrs.Status = statusAll.house_room_status[datas.house_attrs.Status];
                datas.house_attrs.OpenTime = util.yymmdd(datas.house_attrs.OpenTime);
                datas.house_attrs.ApartmentTime = util.yymmdd2(datas.house_attrs.ApartmentTime);
                datas.house_attrs.PriceUnit = datas.house_attrs.PriceUnit > 0 ? statusAll.house_price_type[datas.house_attrs.PriceUnit] : datas.house_attrs.PriceUnit

                that.setData({
                    info: datas.house_attrs
                });
            }else{
                console.log(res.data.msg);
            }
        },(err)=>{
            console.log(err);
        });
    }

 
})