(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a3d59a0"],{"08c7":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e._self._c;return t("div",[t("el-row",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/index"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("赛程管理")])],1)],1),t("el-row",[t("el-col",{attrs:{span:24}},[t("el-steps",{attrs:{active:e.active,"finish-status":"success"}},[t("el-step",{attrs:{title:"步骤 1"}}),t("el-step",{attrs:{title:"步骤 2"}}),t("el-step",{attrs:{title:"步骤 3"}}),t("el-step",{attrs:{title:"步骤 4"}})],1),t("div",{staticClass:"opeBox"},[1===this.active?[t("el-select",{attrs:{placeholder:"请选择主场战队"},model:{value:e.team1_name,callback:function(t){e.team1_name=t},expression:"team1_name"}},e._l(e.allTeam,(function(e){return t("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1),t("el-select",{attrs:{placeholder:"请选择客场战队"},model:{value:e.team2_name,callback:function(t){e.team2_name=t},expression:"team2_name"}},e._l(e.allTeam,(function(e){return t("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1)]:2===this.active?[t("el-date-picker",{attrs:{type:"datetime",placeholder:"选择比赛开始日期"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),t("el-date-picker",{attrs:{type:"datetime",placeholder:"选择比赛结束日期"},model:{value:e.closeTime,callback:function(t){e.closeTime=t},expression:"closeTime"}})]:3===this.active?[t("el-select",{attrs:{placeholder:"请选择裁判"},model:{value:e.referee_value,callback:function(t){e.referee_value=t},expression:"referee_value"}},e._l(e.referee,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),t("el-select",{attrs:{placeholder:"请选择解说1"},model:{value:e.commentary1_value,callback:function(t){e.commentary1_value=t},expression:"commentary1_value"}},e._l(e.commentary1,(function(e){return t("el-option",{key:e.chinaname,attrs:{label:e.chinaname,value:e.chinaname}})})),1),t("el-select",{attrs:{placeholder:"请选择解说2"},model:{value:e.commentary2_value,callback:function(t){e.commentary2_value=t},expression:"commentary2_value"}},e._l(e.commentary2,(function(e){return t("el-option",{key:e.chinaname,attrs:{label:e.chinaname,value:e.chinaname}})})),1),t("el-select",{attrs:{placeholder:"请选择导播"},model:{value:e.instructor_value,callback:function(t){e.instructor_value=t},expression:"instructor_value"}},e._l(e.instructor,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)]:e._e(),t("div",{staticClass:"btn_wrap"},[1!==e.active?t("el-button",{staticStyle:{"margin-top":"12px"},attrs:{type:"primary"},on:{click:e.retry}},[t("i",{staticClass:"el-icon-caret-left"}),e._v("上一步")]):e._e(),4!==e.active?t("el-button",{staticStyle:{"margin-top":"12px"},attrs:{type:"primary"},on:{click:e.next}},[t("i",{staticClass:"el-icon-caret-right"}),e._v("下一步")]):e._e(),4===e.active?t("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.btnloading,expression:"btnloading"}],staticStyle:{"margin-top":"12px"},attrs:{type:"warning","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},nativeOn:{click:function(t){return e.submit.apply(null,arguments)}}},[e._v("发布")]):e._e()],1)],2)],1)],1),t("el-row",[t("schedule-table")],1)],1)},l=[],i=a("c0c9"),r=a("ba6c"),c={name:"",data(){return{active:1,allTeam:[],team1_name:"",team2_name:"",startTime:"",closeTime:"",btnloading:!1,scheduleData:[],referee:[{label:"落梨",value:"落梨"}],referee_value:"",commentary1:[],commentary1_value:"",commentary2:[],commentary2_value:"",instructor:[{label:"PLFJY",value:"PLFJY"},{label:"星宇",value:"星宇"},{label:"晓月",value:"晓月"}],instructor_value:""}},components:{ScheduleTable:()=>a.e("chunk-fa797e2c").then(a.bind(null,"e601"))},methods:{next(){if(1===this.active||2===this.active)this.active++;else{if(3!==this.active)return;this.active++}},retry(){1!==this.active&&this.active--},submit(){this.btnloading=!0,this.setSchedule(),setTimeout(()=>{this.btnloading=!1},2e3)},setSchedule(){console.log("时间：",this.startTime),Object(i["e"])(this.team1_name,this.team2_name,this.startTime,this.closeTime).then(e=>{this.$message.success(e.data)}).catch(e=>{this.$message.error("设置失败！"),console.log(e)})},initTeamName(){Object(r["c"])(1,100).then(e=>{console.log(e),this.allTeam=e.data}).catch(e=>{console.log(e)})},initGetCommentary(){let e={opname:"Commentator"};Object(i["d"])(e).then(e=>{this.commentary1=e.data,this.commentary2=e.data}).catch(e=>{console.log(e)})}},mounted(){this.initTeamName(1,5),this.initGetCommentary()}},o=c,s=(a("32cd"),a("2877")),u=Object(s["a"])(o,n,l,!1,null,"00e572f4",null);t["default"]=u.exports},1591:function(e,t,a){},"32cd":function(e,t,a){"use strict";a("1591")},ba6c:function(e,t,a){"use strict";a.d(t,"d",(function(){return l})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return c}));var n=a("b775");function l(e){return n["a"].get("/api/v1/admin/form/"+e)}function i(e,t){return n["a"].get(`/api/v1/form/all?page=${e}&page_long=${t}`)}function r(e){return n["a"].delete("/api/v1/admin/form?formname="+e)}function c(){return n["a"].get("/api/v1/user/form")}},c0c9:function(e,t,a){"use strict";a.d(t,"e",(function(){return l})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return c})),a.d(t,"a",(function(){return o})),a.d(t,"f",(function(){return s}));var n=a("b775");function l(e,t,a,l){return n["a"].post("/api/v1/admin/game",{team1_name:e,team2_name:t,opentime:a,closetime:l})}function i(e,t){return n["a"].get(`/api/v1/game?page=${e}&page_long=${t}`)}function r(e){return n["a"].delete("/api/v1/admin/game?gameid="+e)}function c(e){return Object(n["a"])({url:"/api/v1/getuserbyop",method:"get",params:e})}function o(){return n["a"].post("/api/v1/admin/team")}function s(e,t){return n["a"].put("/api/v1/admin/game?gameid="+e,t)}}}]);
//# sourceMappingURL=chunk-6a3d59a0.401a240e.js.map