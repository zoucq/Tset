webpackJsonp([18],{JMS0:function(t,e){},Tll7:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("woOf"),o=s.n(a),i=s("mvHQ"),r=s.n(i),l={components:{InputHouseSearch:s("OuSp").a},data:function(){return{bqCurrent:0,customerSelectCurrent:0,searchVisible:!0,form:{ctime:"",last_follow_time:"",name:"",mobile:"",house:"",tag:"",impt_group:"",dep:"",group:"",user_id:"",intention_area:"",keywords:""},dataObj:{},page:1,pageSize:50,total:0,sysTags2:{},sysTags3:{},editIndex:"",dialogEdit:!1,editForm:{tag:"",impt_group:""},formLabelWidth:"120px",sortType:"",sortMode:""}},computed:{infoPos:function(){var t=this.$store.state.user.infoPos;return t.dep&&(this.form.dep=t.dep),t.group&&(this.form.group=t.group),t.fxs&&(this.form.user_id=t.fxs),t},impt:function(){return this.$store.state.user.impt},customerTags:function(){return this.$store.state.user.customerTags},sysTags:function(){return this.$store.state.user.sysTags}},mounted:function(){this.sysTags2=this.sysTagsIn(),this.sysTags3=this.sysTagsIn(),this.getData()},methods:{sysTagsIn:function(){return this.$store.state.user.sysTags&&JSON.parse(r()(this.$store.state.user.sysTags))},selectManyHandle:function(t,e){this.$set(this.sysTags2[t],"active",!this.sysTags2[t].active)},selectHandle2:function(t,e){this.$set(this[e][t],"active",!this[e][t].active)},selectHandle:function(t,e){this[e]=t,3==t?this.getGuidePre():this.getData()},pageChange:function(t){console.log(t),this.page=t,this.getData()},getGuidePre:function(){var t=this,e={action_name:"customerList",dep:this.form.dep,group:this.form.group,user_id:this.form.user_id,impt_group:2};this.$http.post("/api/v1/new_admin",e,function(e){t.dataObj=e.data,t.total=e.data.res.total})},getData:function(){var t=this,e=[];if(this.sysTags2)for(var s in this.sysTags2)this.sysTags2[s].active&&e.push(this.sysTags2[s].value);var a={action_name:"customerList",type:0==this.customerSelectCurrent?this.$route.params.type:1==this.customerSelectCurrent?"abc_overtime":"follow_overtime",sys_tag:e.join(","),ctime_begin:this.form.ctime?this.form.ctime[0]:"",ctime_stop:this.form.ctime?this.form.ctime[1]:"",last_follow_time_begin:this.form.last_follow_time?this.form.last_follow_time[0]:"",last_follow_time_stop:this.form.last_follow_time?this.form.last_follow_time[1]:"",sort_field:this.sortType,sort_mode:this.sortMode,page:this.page,pagesize:this.pageSize},i=JSON.parse(r()(this.form));i.ctime="",i.last_follow_time="",a=o()(i,a),this.$http.post("/api/v1/new_admin",a,function(e){t.dataObj=e.data,t.total=e.data.res.total})},clickSearch:function(){this.page=1,this.getData()},clickSearchVisible:function(){this.searchVisible=!this.searchVisible},resetFrom:function(t){for(var e in this.$refs[t].resetFields(),this.sysTags2)this.$set(this.sysTags2[e],"active",!1);this.page=1,this.getData()},toRenling:function(t){var e=this;this.$http.post("/api/v1/new_admin",{action_name:"renlin",id:t.id},function(t){e.$notify({title:"成功",message:"认领成功！",type:"success"})})},toDetail:function(t,e){if(t={name:"/customer/detail",params:{id:t.id}},e){var s=this.$router.resolve(t).href;window.open(s,"_blank")}else this.$router.push(t)},toEdit:function(t){var e=this;for(var s in console.log(this.dataObj.res.customers[t]),this.sysTags3)this.$set(this.sysTags3[s],"active",!1);this.editForm.tag=this.dataObj.res.customers[t].tag,this.editForm.impt_group=this.dataObj.res.customers[t].impt_group&&this.dataObj.res.customers[t].impt_group.value,this.dataObj.res.customers[t].sys_tags&&this.dataObj.res.customers[t].sys_tags.map(function(t,s){for(var a in e.sysTags3)t.value==e.sysTags3[a].value&&e.$set(e.sysTags3[a],"active",!0)}),this.editIndex=t,this.dialogEdit=!0},saveEditForm:function(){var t=this;if(console.log(22,this.editIndex),!(this.editIndex<0)){var e=[];if(this.sysTags3)for(var s in this.sysTags3)this.sysTags3[s].active&&e.push(this.sysTags3[s].value);this.$http.post("/api/v1/new_admin",{action_name:"customerSave",id:this.dataObj.res.customers[this.editIndex].id,name:this.dataObj.res.customers[this.editIndex].name,impt_group:this.editForm.impt_group,mobile:this.dataObj.res.customers[this.editIndex].mobile_fixed,customer_house:this.dataObj.res.customers[this.editIndex].house_id,tag:this.editForm.tag,sys_tags:e.join(","),log:this.editForm.log},function(e){for(var s in t.$notify({title:"成功",message:"保存成功！",type:"success"}),t.dialogEdit=!1,t.sysTags3)t.$set(t.sysTags3[s],"active",!1);t.editForm.log="",t.getData()})}},sortChange:function(t){"tag"==t.prop?t.order?"ascending"==t.order?(t.prop="",t.sort_mode="desc"):t.sort_mode="asc":t.sort_mode="":t.order?t.sort_mode="ascending"==t.order?"asc":"desc":t.sort_mode="",this.sortType=t.prop,this.sortMode=t.sort_mode,this.getData()}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"my_search"},[a("div",{staticClass:"open_search",on:{click:t.clickSearchVisible}},[t._v("客户分类选择器\n\t\t\t"),a("img",{class:{open:t.searchVisible},attrs:{src:s("Xq76"),alt:""}})]),t._v(" "),a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.searchVisible,expression:"searchVisible"}],staticClass:"search_box"},[a("div",{staticClass:"search_item bq_system"},[a("div",{staticClass:"search_key"},[t._v("系统标签：")]),t._v(" "),a("ul",{staticClass:"search_item_key"},t._l(t.sysTags2,function(e,s){return a("li",{key:s,class:e.active?"active":"",on:{click:function(e){return t.selectManyHandle(s,"sysTags2")}}},[t._v(t._s(e.text))])}),0)]),t._v(" "),a("div",{staticClass:"search_select"},[a("div",{staticClass:"search_title"},[t._v("搜索和筛选：")]),t._v(" "),a("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.form,"label-width":"120px"}},[a("div",{staticClass:"time_group"},[a("el-form-item",{attrs:{label:"登记时间：",prop:"ctime"}},[a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.form.ctime,callback:function(e){t.$set(t.form,"ctime",e)},expression:"form.ctime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"跟进时间：",prop:"last_follow_time"}},[a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.form.last_follow_time,callback:function(e){t.$set(t.form,"last_follow_time",e)},expression:"form.last_follow_time"}})],1)],1),t._v(" "),a("div",{staticClass:"search_group"},[a("el-form-item",{attrs:{label:"客户姓名：",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"部门：",prop:"dep"}},[a("el-select",{attrs:{disabled:!!t.infoPos.dep,placeholder:"请选择"},model:{value:t.form.dep,callback:function(e){t.$set(t.form,"dep",e)},expression:"form.dep"}},t._l(t.infoPos.dep_arr,function(t){return a("el-option",{key:t.k,attrs:{label:t.v,value:t.k}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"客户级别：",prop:"tag"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.tag,callback:function(e){t.$set(t.form,"tag",e)},expression:"form.tag"}},t._l(t.customerTags,function(t,e){return a("el-option",{key:e,attrs:{label:t.text,value:e}})}),1)],1)],1),t._v(" "),a("div",{staticClass:"search_group"},[a("el-form-item",{attrs:{label:"客户电话：",prop:"mobile"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.form.mobile,callback:function(e){t.$set(t.form,"mobile",e)},expression:"form.mobile"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"战队：",prop:"group"}},[a("el-select",{attrs:{disabled:!!t.infoPos.group,placeholder:"请选择"},model:{value:t.form.group,callback:function(e){t.$set(t.form,"group",e)},expression:"form.group"}},t._l(t.infoPos.group_arr[t.form.dep].groups,function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"重点客户分组：",prop:"impt_group"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.impt_group,callback:function(e){t.$set(t.form,"impt_group",e)},expression:"form.impt_group"}},t._l(t.impt,function(t){return a("el-option",{key:t.value,attrs:{label:t.text,value:t.value}})}),1)],1)],1),t._v(" "),a("div",{staticClass:"search_group"},[a("el-form-item",{attrs:{label:"楼盘名称：",prop:"house"}},[a("InputHouseSearch",{model:{value:t.form.house,callback:function(e){t.$set(t.form,"house",e)},expression:"form.house"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"分析师：",prop:"user_id"}},[a("el-select",{attrs:{disabled:!!t.infoPos.fxs,placeholder:"请选择"},model:{value:t.form.user_id,callback:function(e){t.$set(t.form,"user_id",e)},expression:"form.user_id"}},t._l(t.infoPos.fxs_arr[t.form.dep][t.form.group],function(t){return a("el-option",{key:t.v,attrs:{label:t.v,value:t.k}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"意向区域：",prop:"intention_area"}},[a("label",{attrs:{for:""}}),t._v(" "),a("el-input",{attrs:{placeholder:"请输入意向区域"},model:{value:t.form.intention_area,callback:function(e){t.$set(t.form,"intention_area",e)},expression:"form.intention_area"}})],1)],1),t._v(" "),a("div",{staticClass:"search_group"},[a("el-form-item",{attrs:{label:"关键词：",prop:"keywords"}},[a("label",{attrs:{for:""}}),t._v(" "),a("el-input",{attrs:{placeholder:"请输入关键词"},model:{value:t.form.keywords,callback:function(e){t.$set(t.form,"keywords",e)},expression:"form.keywords"}})],1)],1),t._v(" "),a("div",{staticClass:"buttons"},[a("el-button",{staticClass:"btn_clear",on:{click:function(e){return t.resetFrom("form")}}},[t._v("清空条件")]),t._v(" "),a("el-button",{staticClass:"btn_submit",on:{click:function(e){return t.clickSearch("form")}}},[t._v("搜索")])],1)])],1)])])],1),t._v(" "),a("div",{staticClass:"public_mt group my_data"},[a("div",{staticClass:"title"},[a("div",{staticClass:"t_left"},[a("div",{staticClass:"t_type"},t._l(["全部","ABC客户超时","即将进入公池","即将带看客户"],function(e,s){return a("span",{key:s,class:s==t.customerSelectCurrent?"active":"",on:{click:function(e){return t.selectHandle(s,"customerSelectCurrent")}}},[t._v(t._s(e))])}),0)])]),t._v(" "),a("div",{staticClass:"sub_title"},[a("div",[t._v("为你找到"+t._s(t.total)+"个客户")])]),t._v(" "),t.dataObj.res?a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataObj.res.customers,stripe:"",border:"","header-row-class-name":"customer_table_th"},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{prop:"name",label:"客户姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mobile_fixed",label:"客户电话"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.mobile_fixed))]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.row.mobile_location,expression:"scope.row.mobile_location"}]},[t._v("( "+t._s(e.row.mobile_location)+" )")])]}}],null,!1,2838822309)}),t._v(" "),a("el-table-column",{attrs:{prop:"house_name",label:"意向楼盘"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tag",label:"客户级别",sortable:"custom",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.tag?a("div",[a("div",{staticClass:"customer_tags",class:"tag_"+e.row.tag},[t._v(t._s(e.row.tag))]),t._v(" "),a("div",{staticClass:"customer_tags_text"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.customerTags[e.row.tag]&&t.customerTags[e.row.tag].text.split(":")[1])+"\n\t\t\t\t\t\t")])]):t._e()]}}],null,!1,4224146470)}),t._v(" "),a("el-table-column",{attrs:{prop:"saleman",label:"分析师"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ip",label:"IP"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.ip))]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.row.ip_address_string,expression:"scope.row.ip_address_string"}]},[t._v("( "+t._s(e.row.ip_address_string)+" )")])]}}],null,!1,1656427629)}),t._v(" "),a("el-table-column",{attrs:{prop:"reg_time",label:"登记时间",sortable:"custom",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.register_time))])]}}],null,!1,3822565874)}),t._v(" "),a("el-table-column",{attrs:{prop:"impt_group",label:"重点客户分组"}}),t._v(" "),a("el-table-column",{attrs:{label:"标签"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.sys_tags,function(s,o){return a("span",{key:o},[t._v("\n\t\t\t\t\t\t"+t._s(o==e.row.sys_tags.length-1?s.text:s.text+" / ")+"\n\t\t\t\t\t")])})}}],null,!1,1032654051)}),t._v(" "),a("el-table-column",{attrs:{label:"最新跟进",width:"134",sortable:"custom",prop:"last_follow_time"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.brief_remark,function(e,s){return a("div",{key:s,staticClass:"gengjin_item"},[a("div",{domProps:{innerHTML:t._s(e.remark)}}),t._v(" "),a("div",{staticClass:"gengjin_item_time"},[t._v(t._s(e.time))])])})}}],null,!1,1100714574)}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"114"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"caozuo_btn"},[a("el-button",{staticClass:"to_edit_btn",on:{click:function(s){return t.toEdit(e.$index)}}},[t._v("快捷操作")]),t._v(" "),a("el-button",{staticClass:"to_detail_btn",on:{click:function(s){return t.toDetail(e.row,!0)}}},[t._v("详情")])],1)]}}],null,!1,2985720553)})],1):t._e()],1),t._v(" "),0!=t.total?a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.page,"page-size":t.pageSize},on:{"current-change":t.pageChange}}):t._e(),t._v(" "),a("el-dialog",{attrs:{"custom-class":"edit_dialog",title:"快捷操作",visible:t.dialogEdit,center:!0,top:"12vh",width:"426px"},on:{"update:visible":function(e){t.dialogEdit=e}}},[a("el-form",{attrs:{model:t.editForm}},[a("el-form-item",{attrs:{label:"客户级别：","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.editForm.tag,callback:function(e){t.$set(t.editForm,"tag",e)},expression:"editForm.tag"}},t._l(t.customerTags,function(t,e){return a("el-option",{key:e,attrs:{label:t.text,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"重点客户分组：","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.editForm.impt_group,callback:function(e){t.$set(t.editForm,"impt_group",e)},expression:"editForm.impt_group"}},t._l(t.impt,function(t){return a("el-option",{key:t.value,attrs:{label:t.text,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"系统标签：","label-width":t.formLabelWidth}},[a("ul",{staticClass:"search_item_key"},t._l(t.sysTags3,function(e,s){return a("li",{key:s,class:e.active?"active":"",on:{click:function(e){return t.selectHandle2(s,"sysTags3")}}},[t._v(t._s(e.text))])}),0)]),t._v(" "),a("el-form-item",{attrs:{label:"跟进记录：","label-width":t.formLabelWidth}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.editForm.log,expression:"editForm.log"}],attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:t.editForm.log},on:{input:function(e){e.target.composing||t.$set(t.editForm,"log",e.target.value)}}})])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.saveEditForm}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var c=s("VU/8")(l,n,!1,function(t){s("JMS0")},"data-v-3db922a4",null);e.default=c.exports}});