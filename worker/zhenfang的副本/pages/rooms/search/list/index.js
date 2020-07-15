const api = require('../../../../utils/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        txt:'',
        content:0,
        lastIndex:0,
        filter:0,
        filters:[
            { name: '区域' },
            { name: '价格' },
            { name: '户型' },
            { name: '更多' }
        ],
        addr: [
            { id: 0, name: '不限', active: false },
            { id: 1, name: '江干', active: false },
            { id: 2, name: '江干', active: false },
            { id: 3, name: '江干', active: false },
            { id: 4, name: '江干', active: false },
            { id: 5, name: '江干', active: false },
            { id: 6, name: '江干', active: false },
            { id: 7, name: '江干', active: false },
            { id: 8, name: '江干', active: false },
            { id: 9, name: '江干', active: false }
        ],
        allSearech:[
            { addr: [] },
            { price: [] },
            { types: [] },
            { more: [] }
        ],
        addrSelect:[],
        typeSelect: [],
        priceSelect: [],
        moreSelect:[],
        moreShow:[],
        allSelect:[
            { name: 'addr',attr: [] },
            { name: 'price', attr: [] },
            { name: 'type', attr: [] },
            { name: 'more', attr: [] }
        ],
        price:[
            {
                name:'单价',
                attr:[
                    { id: '',name: "不限", active: false },
                    { id: '0-10000',name: "低于1万元/㎡", active: false },
                    { id: '10000-15000',name: "1万~1万5千元/㎡", active: false },
                    { id: '15000-20000',name: "1万5~2万元/㎡", active: false },
                    { id: '20000-25000',name: "2万~2万5千元/㎡", active: false },
                    { id: '25000-30000', name: "2万5~3万元/㎡", active: false },
                    { id: '30000-35000', name: "3万~3万5元/㎡", active: false },
                    { id: '35000-40000', name: "3万5~4万元/㎡", active: false },
                    { id: '40000-45000',name: "4万~4万5千元/㎡", active: false },
                    { id: '45000-50000', name: "4万5千元~5万元/㎡", active: false },
                    { id: '50000-99999',name: "5万元/㎡以上",active:false},
                ]
            },
            {
                name: '总价',
                attr: [
                    { id: '',name: "不限", active: false },
                    { id: '0-100',name: "低于100万", active: false },
                    { id: '100-150',name: "100~150万", active: false },
                    { id: '150-200',name: "150万~200万", active: false },
                    { id: '200-250', name: "200~250万", active: false },
                    { id: '250-300',name: "250~300万", active: false },
                    { id: '300-350',name: "300~350万", active: false },
                    { id: '350-400',name: "350~400万", active: false },
                    { id: '450-500',name: "400~500万", active: false },
                    { id: '500-1000',name: "500~1000万", active: false },
                    { id: '1000-9999',name: "1000万以上", active: false }
                ]
            }
        ],
        houseType:[
            { name: '不限', active:false },
            { name: '1居室', active: false },
            { name: '2居室', active: false },
            { name: '3居室', active: false },
            { name: '4居室', active: false },
            { name: '5居室', active: false },
            { name: '5居室以上', active: false }
        ],
        more:[
            {
                name:'物业类型',
                attr:[
                    { name: '住宅' ,active:false},
                    { name: '别墅', active: false},
                    { name: '写字楼', active: false },
                    { name: '商铺', active: false},
                    { name: '商住', active: false}
                ]
            },
            {
                name: '面积(㎡)',
                attr: [
                    { id: '0-50',name: '50平以下', active: false},
                    { id: '50-80',name: '50-80', active: false},
                    { id: '80-120',name: '80-120', active: false},
                    { id: '120-150',name: '120-150', active: false},
                    { id: '150-200',name: '150-200', active: false },
                    { id: '200-300',name: '200-300', active: false },
                    { id: '300-999',name: '300以上', active: false}
                ]
            },
            {
                name: '装修情况',
                attr: [
                    { name: '毛坯', active: false },
                    { name: '精装', active: false },
                    { name: '简装', active: false }
                ]
            },
        ],
        list: [],
        total:0,
        page: 1,
        pagesize:10,
        status:'',
        recent_open:false,
        showTime:false,
        roomType:false,

        allArr:[]

    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        console.log(api);
        console.log(options);
        this.wordsList(options);
        this.getData();
    }, 
    // 页面加载完，初始化关键词搜索list
    wordsList(opt){
        let that = this;
        if(opt.type==0){
            
        }else if(opt.type==1){
            this.setData({
                status: opt.status
            }); 
        }else if(opt.type==2){
            this.setData({
                recent_open: 1,
                showTime:true
            });
        }else{
            this.setData({
                txt: opt.words
            }); 
        } 
        this.handleSearch();  
    },
    // 获取筛选相关数据
    getData() {
        let that = this;

        // 更多
        let more = this.data.more;
        more[0].attr=[];
        for (let v in api.statusAll.house_property_type){
            more[0].attr.push({ id: v, name: api.statusAll.house_property_type[v],active:false});
        }
        more[2].attr = [];
        for (let v in api.statusAll.house_renovation_type) {
            more[2].attr.push({ id: v, name: api.statusAll.house_renovation_type[v], active: false });
        }
        that.setData({
            more:more
        });
        console.log('more-init',that.data.more);

        // 户型
        let types = api.statusAll.house_room_type;
        let houseType = [{ id: '', name: '不限', active: false}];
        for (let v in types){
            houseType.push({ id: v, name: types[v],active:false});
        }
        that.setData({
            houseType: houseType
        });
        console.log('types-init',houseType);
        
        // 区域
        api.req.get(api.api.index.addr, { place_id:3301})
        .then((res)=>{
            // console.log(res.data);
            if(res.data.ret==0){
                res.data.data.unshift({Name:'不限',Id:''});
                res.data.data.map((v,i)=>{
                    v.active=false;
                });
                that.setData({
                    addr:res.data.data
                });
                console.log('addr-init', that.data.addr);
            }
        },(err)=>{
            console.log(err);
        });
        
    },
    // 筛选确定按钮
    handleSubmit(e){
        let types=e.currentTarget.dataset.type;

        this.setData({
            content:0,
            lastIndex:0
        });   

        this.setData({
            page:1,
            list:[]
        });
        this.handleSearch();
    },
    // 提取参数，发送筛请求，返回列表
    handleSearch(){
        
        let that = this;
        let data={};

        // 在售和最近开盘处理
        if (that.data.status && that.data.status==2){
            data.status = that.data.status;
        } else if (that.data.recent_open){
            data.recent_open=1;
        }
     

        // 参数判断处理
        if (that.data.txt && that.data.txt.length!=0){
            data.name=that.data.txt;            
        }

        // more
        if (that.data.moreSelect.length != 0) {
            let old = that.data.moreSelect;
            let news = Array.from(
                old.reduce((dict, item) => {
                    if (dict.has(item.name)) {
                        dict.get(item.name).push(item.attr)
                    } else {
                        dict.set(item.name, [item.attr])
                    }
                    return dict
                }, new Map())
            ).map(item => ({ attr: item[1], name: item[0] }));
            console.log(news);
            if (news[0] && news[0].name == 0) {
                data.property_type = news[0].attr.join(',');
            }
            if (news[1] && news[1].name == 1) {
                data.area = news[1].attr.join(',');
            }
            if (news[2] && news[2].name == 2) {
                data.renovation_status = news[2].attr.join(',');
            }
            
        }
        // addr
        if (that.data.addrSelect.length != 0) {
            data.country = that.data.addrSelect.join(',');
        }
        // price
        if (that.data.priceSelect.length != 0) {
            if (that.data.filter == 0) {
                data.single_price = that.data.priceSelect.join(',');
            } else {
                data.total_price = that.data.priceSelect.join(',');
            }        
        }
        // house-type
        if (that.data.typeSelect.length != 0) {
            data.habitable = that.data.typeSelect.join(',');         
        } 
        
        //  page
        data.page = that.data.page;

        console.log('all-data',data);
        
        api.req.get(api.api.index.search, data)
        .then((res) => {
            console.log('all',res.data);
            if (res.data.ret == 0) {

                // 处理展示数据
                that.handleShowWords();
 
                if (res.data.data.list && res.data.data.list.length == 0) {
                    that.setData({
                        noMore: true
                    });
                } else {
                    let datas=res.data.data;
                    datas.list && datas.list.map((v,i)=>{
                        for (let vv in api.statusAll.house_status){
                            if (v.Status==vv){
                                v.Status = api.statusAll.house_status[vv];
                            }
                        }
                        for (let vv in api.statusAll.house_renovation_type) {
                            if (v.RenovationStatus == vv) {
                                v.RenovationStatus = api.statusAll.house_renovation_type[vv];
                            }
                        }
                        for (let vv in api.statusAll.house_property_type) {
                            if (v.PropertyType == vv) {
                                v.PropertyType = api.statusAll.house_property_type[vv];
                            }
                        }
                        for (let vv in api.statusAll.house_architectural_type) {
                            if (v.ArchitecturalType == vv) {
                                v.ArchitecturalType = api.statusAll.house_architectural_type[vv];
                            }
                        }
                        for (let vv in api.statusAll.house_price_type) {
                            if (v.PriceUnit == vv) {
                                v.PriceUnit = api.statusAll.house_price_type[vv];
                            }
                        }
                        
                    });

                    that.setData({
                        noMore: false,
                        page: that.data.page + 1,
                        list: that.data.list.concat(res.data.data.list),
                        total: res.data.data.total_found
                    }); 
                    
                }
                
            }else{
                console.log(res.data.msg);
            }
        }, (err) => {
            console.log(err);
        });
    },
    // 处理选中的展示数据
    handleShowWords(){
        let that = this;
        // 区域
        let allSelect = that.data.allSelect;
        let arr = [];
        that.data.addrSelect.map((vv, ii) => {
            let id = vv;
            that.data.addr.map((v, i) => {
                if (v.Id == id) {
                    arr.push(v.Name);
                }
            });
        });
        allSelect[0].attr = arr;
        that.setData({
            allSelect: allSelect
        });

        // 户型
        arr=[];
        that.data.typeSelect.map((vv, ii) => {
            let id = vv;
            that.data.houseType.map((v, i) => {
                if (v.id == id) {
                    arr.push(v.name);
                }
            });
        });
        allSelect[2].attr = arr;
        that.setData({
            allSelect: allSelect
        });

        // 价格
        arr=[];
        that.data.priceSelect.map((v,i)=>{
            let id=v;
            that.data.price[that.data.filter].attr.map((v, i) => {
                if (v.id == id){
                    arr.push(v.name);
                }
            });
        });
        allSelect[1].attr = arr;
        that.setData({
            allSelect: allSelect
        });   
        
        // 更多
        arr = [];
        arr = that.data.moreSelect;

        let news = Array.from(
            arr.reduce((dict, item) => {
                if (dict.has(item.name)) {
                    dict.get(item.name).push(item.attr)
                } else {
                    dict.set(item.name, [item.attr])
                }
                return dict
            }, new Map())
        ).map(item => ({ attr: item[1], name: item[0] }));

        console.log(arr);
        console.log(this.data.more);
        // console.log(news);


        news.map((v,i)=>{
            let name = v.name;
            let obj = v;

            console.log(v);

            let arr2 = [];
            if (name == 0) {
                arr2=[];
                obj.attr.map((vv,ii)=>{
                    let val=vv;
                    for (let vs in api.statusAll.house_property_type){   
                        if(val==vs){
                            arr2.push(api.statusAll.house_property_type[vs]);
                        }
                    }
                });
                obj.attr = arr2;
                console.log(obj.attr); 
            }

            if(name == 1){
                arr2 = [];
                console.log(this.data.more[1].attr);
                obj.attr.map((vv, ii) => {
                    let val = vv;
                    this.data.more[1].attr.map((v,i)=>{
                        if (val == v.id) {
                            arr2.push(v.name);
                        }
                    });
                });
                obj.attr = arr2;
                console.log(obj.attr);
            }

            if (name == 2) {
                arr2 = [];
                obj.attr.map((vv, ii) => {
                    let val = vv;
                    for (let vs in api.statusAll.house_renovation_type) {
                        if (val == vs) {
                            arr2.push(api.statusAll.house_renovation_type[vs]);
                        }
                    }
                });
                obj.attr = arr2;
                console.log(obj.attr);
            }

        });
        allSelect[3].attr = news;
        that.setData({
            allSelect: allSelect
        });

        console.log(that.data.allSelect);


    },

    //区域切换
    handleFilter(e){
        let keys=e.currentTarget.dataset.key;
        this.data.price.map((v,i)=>{
            v.attr.map((vv,ii)=>{
                vv.active=false;
            });
        });
        this.setData({
            filter:keys,
            price: this.data.price,
            priceSelect:[]
        });
    },
    //区域内容
    handContent(e){    
        let keys = e.currentTarget.dataset.key;
        if (this.data.lastIndex == keys){     
            this.setData({
                content: 0,
                lastIndex: 0
            });
        }else{
            this.setData({
                content: keys,
                lastIndex:keys
            });
        }
    },
    // 筛选多选选中处理
    handleActive(e){
        console.log(e.currentTarget.dataset);
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;

        let name = e.currentTarget.dataset.name;
        let id = e.currentTarget.dataset.id;
        let arr = [];
        let allArr=[];
        
        if(type==0){        
            this.data.addr[index].active = true;
            if (index == 0) {
                this.data.addr.map((v, i) => {
                    i == 0 ? v.active : v.active = false;
                });
                this.setData({
                    addrSelect: [],
                    allArr:[]
                });
            } else {
                arr.push(id);
                this.data.addr[0].active = false;
                allArr.push({ id: id, name: name });
            }
            this.setData({
                addr: this.data.addr,
                addrSelect: this.data.addrSelect.concat(arr),
                allArr: this.data.allArr.concat(allArr)
            });
            console.log(this.data.addrSelect);
            console.log(allArr);
        }else if(type==1){
            this.data.price[this.data.filter].attr[index].active = true;
            let data=this.data.price;
            if (index == 0) {
                data[this.data.filter].attr.map((v, i) => {
                    i == 0 ? v.active : v.active = false;
                });
                this.setData({
                    priceSelect:[]
                });
            } else {
                arr.push(id);
                data[this.data.filter].attr[0].active = false;
            }
            this.setData({
                price: data,
                priceSelect: this.data.priceSelect.concat(arr)
            });
            console.log('filter:' + this.data.filter, this.data.priceSelect);
        } else if (type == 2) {
            this.data.houseType[index].active = true;
            if (index == 0) {
                this.data.houseType.map((v, i) => {
                    i == 0 ? v.active : v.active = false;
                });
                this.setData({
                    typeSelect: []
                });
            } else {
                this.data.houseType[0].active = false;
                arr.push(id);
            }
            this.setData({
                houseType: this.data.houseType,
                typeSelect: this.data.typeSelect.concat(arr)
            });
        }else{
            let index1 = index.split('-')[0];
            let index2 = index.split('-')[1];          
            console.log(index1,index2);
            this.data.more[index1].attr[index2].active = true;

            index1 = id.split('/')[0];
            index2 = id.split('/')[1];  
            arr.push({name:index1,attr:index2});

            this.setData({
                more: this.data.more,
                moreSelect: this.data.moreSelect.concat(arr)
            });

            console.log(this.data.more);
            console.log(this.data.moreSelect);

            arr=[];
            arr = this.data.moreSelect;
            arr.map((v, i) => {
                let attr = v.attr;
                this.data.more[v.name].attr.map((vv, ii) => {
                    if (attr == vv.id) {
                        v.attr = vv.name;
                        v.index = attr;
                    }
                });
            });
            console.log(arr);
            this.setData({
                moreShow: arr
            });

        }
        
    },
    // 更多筛选清空
    handleClearActive(){
        this.data.more.map((v,i)=>{
            v.attr.map((vv,ii)=>{
                vv.active=false;
            });
        });
        this.setData({
            more:this.data.more,
            moreSelect:[],
            moreShow:[]
        });
    },
    // 删除筛选条件
    handleDelSelect(e){
        let index = e.currentTarget.dataset.index;
        let type=e.currentTarget.dataset.type;
        console.log(index,type);

        let obj=[
            { attr: this.data.addrSelect },
            { attr: this.data.priceSelect },
            { attr: this.data.typeSelect }
        ];
        let names=[
            { name: this.data.addr },
            { name: this.data.price },
            { name: this.data.houseType }
        ];
        console.log(obj);
        console.log(names);

        let arr = [];
        
        if(type==0){
            index = index.split('-');
            console.log(index[0],index[1]);
            console.log(obj[index[0]].attr[index[1]]);

            if (index[0]==1){
                console.log(this.data.filter);
                names[index[0]].name[this.data.filter].attr.map((v, i) => {
                    v.id == obj[index[0]].attr[index[1]] ? v.active = false : v.active;
                }); 
            }else if(index[0]==0){
                names[index[0]].name.map((v, i) => {
                    v.Id == obj[index[0]].attr[index[1]] ? v.active = false : v.active;
                });
            }else{
                names[index[0]].name.map((v, i) => {
                    v.id == obj[index[0]].attr[index[1]] ? v.active = false : v.active;
                }); 
            }

            obj[index[0]].attr.splice(index[1],1);
            
            console.log(names[index[0].name]);
            console.log(this.data.addrSelect);

            this.setData({
                addrSelect: obj[0].attr,
                priceSelect: obj[1].attr,
                typeSelect: obj[2].attr,
                addr: names[0].name,
                price: names[1].name,
                houseType: names[2].name
            });
        }else{
            index = index.split('/');
            console.log('type==1 --->',index[0], index[1],index[2]);
            // console.log(this.data.allSelect[3]);
            console.log(this.data.moreSelect);
            console.log(this.data.moreShow);

            let attr = '';
            this.data.moreShow.map((v,i)=>{
                if(index[0]==v.name && index[1]==v.index){
                    attr=v.index;
                }
            });
            this.data.moreShow.splice(index[2],1);
            this.data.moreSelect.map((v,i)=>{
                if (index[0] == v.name && index[1]==v.index){
                    this.data.moreSelect.splice(index[2],1);
                }
            });
            this.data.more[index[0]].attr.map((v, i) => {
                console.log(v);
                v.id == attr ? v.active = false : v.active;
            });

            this.setData({
                // moreSelect: this.data.moreSelect,
                more: this.data.more,
                moreShow: this.data.moreShow
            });

        }
        
        this.handleSearch();

    },
    // 跳转
    handleGo(e) {
        let url = e.currentTarget.dataset.go;
        wx.navigateTo({
            url: url
        });
    },
    // 页面上拉触底事件的处理函数
    onReachBottom: function () {
        console.log('bottom')
        this.handleSearch(); 
    }


})